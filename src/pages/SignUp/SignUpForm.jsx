import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import MobileFrame from "../../components/shared/MobileFrame";
import Logo from "../../components/shared/Logo";
import FormInput from "../../components/shared/FormInput";
import Button from "../../components/shared/Button";
import { validateForm } from "../../utils/validation";

const SignUpForm = () => {
  const navigate = useNavigate();
  const { signup, error } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLocalError("");
    setFieldErrors({});

    // Validate form
    const errors = validateForm(formData, [
      "fullName",
      "email",
      "password",
      "confirmPassword",
    ]);

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setLoading(false);
      return;
    }

    try {
      const result = await signup(
        formData.email,
        formData.password,
        formData.fullName
      );
      if (result.success) {
        console.log("Sign up successful:", result.user);
        navigate("/home"); // Navigate to home
      } else {
        setLocalError(result.error || "Sign up failed");
      }
    } catch (err) {
      setLocalError("An unexpected error occurred");
      console.error("Sign up error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSwitchToSignIn = () => {
    navigate("/signin");
  };

  const handleContinueAsGuest = () => {
    navigate("/home");
  };

  return (
    <MobileFrame>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100%",
          padding: "15px",
          position: "relative",
          zIndex: 2,
          justifyContent: "flex-start",
        }}
      >
        <Logo size="small" />

        {(error || localError) && (
          <Alert
            severity="error"
            sx={{
              width: "100%",
              maxWidth: "320px",
              margin: "20px 0 10px 0",
              fontFamily: '"Poppins", sans-serif',
            }}
          >
            {localError || error}
          </Alert>
        )}

        <form
          onSubmit={handleSubmit}
          style={{
            width: "100%",
            maxWidth: "320px",
            margin: "10px 0",
          }}
        >
          <div>
            <FormInput
              label="Full Name"
              type="text"
              placeholder="Please enter your Full name"
              value={formData.fullName}
              onChange={(e) =>
                handleInputChange({
                  target: { name: "fullName", value: e.target.value },
                })
              }
              required
            />
            {fieldErrors.fullName && (
              <p
                style={{
                  color: "#f44336",
                  fontSize: "12px",
                  margin: "-15px 0 10px 3px",
                  fontFamily: '"Poppins", sans-serif',
                }}
              >
                {fieldErrors.fullName}
              </p>
            )}
          </div>

          <FormInput
            label="Email"
            type="email"
            placeholder="Please enter your email"
            value={formData.email}
            onChange={(e) =>
              handleInputChange({
                target: { name: "email", value: e.target.value },
              })
            }
            required
          />

          <FormInput
            label="Password"
            type="password"
            placeholder="Please enter your password"
            value={formData.password}
            onChange={(e) =>
              handleInputChange({
                target: { name: "password", value: e.target.value },
              })
            }
            showPasswordToggle={true}
            required
          />

          <FormInput
            label="Re-enter password"
            type="password"
            placeholder="Please re-enter your password"
            value={formData.confirmPassword}
            onChange={(e) =>
              handleInputChange({
                target: { name: "confirmPassword", value: e.target.value },
              })
            }
            showPasswordToggle={true}
            required
          />

          <Button
            type="submit"
            variant="primary"
            className="btn-auth"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </Button>

          <Button
            type="button"
            variant="secondary"
            className="btn-auth"
            onClick={handleContinueAsGuest}
            disabled={loading}
            style={{
              marginTop: "10px",
              background: "rgba(255, 255, 255, 0.4)",
              border: "0.5px solid rgba(217, 217, 217, 0.6)",
              opacity: 0.8,
            }}
          >
            Continue as Guest
          </Button>
        </form>

        <p
          style={{
            fontFamily: '"Padyakke Expanded One", sans-serif',
            fontWeight: 400,
            fontSize: "13px",
            lineHeight: "1.44em",
            color: "#000",
            textAlign: "center",
            margin: "15px 0",
            opacity: 0.6,
          }}
        >
          Already have an account{" "}
          <button
            onClick={handleSwitchToSignIn}
            style={{
              background: "none",
              border: "none",
              color: "#000",
              fontFamily: '"Padyakke Expanded One", sans-serif',
              fontWeight: 400,
              fontSize: "13px",
              lineHeight: "1.44em",
              cursor: "pointer",
              textDecoration: "underline",
              padding: 0,
              marginLeft: "4px",
            }}
          >
            Sign In
          </button>
        </p>
      </div>
    </MobileFrame>
  );
};

export default SignUpForm;
