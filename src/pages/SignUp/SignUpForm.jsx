import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import MobileFrame from "../../components/shared/MobileFrame";
import Logo from "../../components/shared/Logo";
import FormInput from "../../components/shared/FormInput";
import Button from "../../components/shared/Button";
import SocialLoginButton from "../../components/shared/SocialLoginButton";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import AutoClearAlert from "../../components/shared/AutoClearAlert";
import {
  GoogleIcon,
  FacebookIcon,
  WhatsAppIcon,
} from "../../components/shared/SocialIcons";
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

  // Auto-clear local error after 3 seconds
  useEffect(() => {
    if (localError) {
      const timer = setTimeout(() => {
        setLocalError("");
      }, 3000); // 3 seconds

      // Cleanup timer if error changes or component unmounts
      return () => clearTimeout(timer);
    }
  }, [localError]);

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

  const handleGoogleSignUp = async () => {
    setLoading(true);
    setLocalError("");

    try {
      // TODO: Implement Google sign up
      console.log("Google sign up clicked");
      // const result = await signupWithGoogle();
      // if (result.success) {
      //   navigate("/home");
      // } else {
      //   setLocalError(result.error || "Google sign up failed");
      // }
    } catch (err) {
      setLocalError("An unexpected error occurred");
      console.error("Google sign up error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookSignUp = async () => {
    setLoading(true);
    setLocalError("");

    try {
      // TODO: Implement Facebook sign up
      console.log("Facebook sign up clicked");
    } catch (err) {
      setLocalError("An unexpected error occurred");
      console.error("Facebook sign up error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppSignUp = async () => {
    setLoading(true);
    setLocalError("");

    try {
      // TODO: Implement WhatsApp sign up
      console.log("WhatsApp sign up clicked");
    } catch (err) {
      setLocalError("An unexpected error occurred");
      console.error("WhatsApp sign up error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MobileFrame>
      {/* Loading Overlay */}
      {loading && (
        <LoadingSpinner
          fullScreen={true}
          message="Creating your account..."
          size={50}
        />
      )}

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

        <AutoClearAlert
          message={localError || error}
          severity="error"
          duration={3000}
          onClear={() => {
            if (localError) setLocalError("");
          }}
          style={{
            margin: "20px 0 10px 0",
          }}
        />

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

          <div>
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
            {fieldErrors.email && (
              <p
                style={{
                  color: "#f44336",
                  fontSize: "12px",
                  margin: "5px 0 0 3px",
                  fontFamily: '"Poppins", sans-serif',
                }}
              >
                {fieldErrors.email}
              </p>
            )}
          </div>

          <div>
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
            {fieldErrors.password && (
              <p
                style={{
                  color: "#f44336",
                  fontSize: "12px",
                  margin: "5px 0 0 3px",
                  fontFamily: '"Poppins", sans-serif',
                }}
              >
                {fieldErrors.password}
              </p>
            )}
          </div>

          <div>
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
            {fieldErrors.confirmPassword && (
              <p
                style={{
                  color: "#f44336",
                  fontSize: "12px",
                  margin: "5px 0 0 3px",
                  fontFamily: '"Poppins", sans-serif',
                }}
              >
                {fieldErrors.confirmPassword}
              </p>
            )}
          </div>
          <p
            style={{
              fontFamily: '"Poppins", sans-serif',
              fontWeight: 400,
              fontSize: "13px",
              lineHeight: "1.5em",
              color: "#000",
              textAlign: "center",
              margin: "5px 0",
              opacity: 0.6,
            }}
          >
            Already have an account?{" "}
            <button
              type="button"
              onClick={handleSwitchToSignIn}
              style={{
                background: "none",
                border: "none",
                color: "#000",
                fontFamily: '"Poppins", sans-serif',
                fontWeight: 400,
                fontSize: "13px",
                lineHeight: "1.5em",
                cursor: "pointer",
                textDecoration: "underline",
                padding: 0,
                marginLeft: "4px",
              }}
            >
              Sign In
            </button>
          </p>
          <Button
            type="submit"
            variant="primary"
            className="btn-auth"
            disabled={loading}
          >
            Create Account
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

          {/* Or sign up with text */}
          <p
            style={{
              fontFamily: '"Poppins", sans-serif',
              fontWeight: 400,
              fontSize: "13px",
              color: "#000",
              textAlign: "center",
              opacity: 0.6,
              margin: "10px",
            }}
          >
            - Or sign up with -
          </p>

          {/* Social Login Buttons */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              margin: "0 0 20px 0",
            }}
          >
            <SocialLoginButton
              provider="google"
              onClick={handleGoogleSignUp}
              disabled={loading}
              icon={<GoogleIcon size={18} />}
              style={{ flex: 1, maxWidth: "80px" }}
            />
            <SocialLoginButton
              provider="facebook"
              onClick={handleFacebookSignUp}
              disabled={loading}
              icon={<FacebookIcon size={18} />}
              style={{ flex: 1, maxWidth: "80px" }}
            />
            <SocialLoginButton
              provider="whatsapp"
              onClick={handleWhatsAppSignUp}
              disabled={loading}
              icon={<WhatsAppIcon size={18} />}
              style={{ flex: 1, maxWidth: "80px" }}
            />
          </div>
        </form>
      </div>
    </MobileFrame>
  );
};

export default SignUpForm;
