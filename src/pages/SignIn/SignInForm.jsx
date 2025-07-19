import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox, FormControlLabel, Alert } from "@mui/material";
import MobileFrame from "../../components/shared/MobileFrame";
import Logo from "../../components/shared/Logo";
import FormInput from "../../components/shared/FormInput";
import Button from "../../components/shared/Button";
import SocialLoginButton from "../../components/shared/SocialLoginButton";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import {
  GoogleIcon,
  FacebookIcon,
  WhatsAppIcon,
} from "../../components/shared/SocialIcons";
import { useAuth } from "../../contexts/AuthContext";
import { validateEmail, validatePassword } from "../../utils/validation";

const SignInForm = () => {
  const navigate = useNavigate();
  const { login, loginWithGoogle, error } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
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
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    if (emailError || passwordError) {
      setFieldErrors({
        email: emailError,
        password: passwordError,
      });
      setLoading(false);
      return;
    }

    try {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        console.log("Sign in successful:", result.user);
        navigate("/home"); // Navigate to home
      } else {
        setLocalError(result.error || "Sign in failed");
      }
    } catch (err) {
      setLocalError("An unexpected error occurred");
      console.error("Sign in error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setLocalError("");

    try {
      const result = await loginWithGoogle();
      if (result.success) {
        console.log("Google sign in successful:", result.user);
        navigate("/home"); // Navigate to home
      } else {
        setLocalError(result.error || "Google sign in failed");
      }
    } catch (err) {
      setLocalError("An unexpected error occurred");
      console.error("Google sign in error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleContinueAsGuest = () => {
    navigate("/home");
  };

  const handleFacebookSignIn = async () => {
    setLoading(true);
    setLocalError("");

    try {
      // TODO: Implement Facebook sign in
      console.log("Facebook sign in clicked");
    } catch (err) {
      setLocalError("An unexpected error occurred");
      console.error("Facebook sign in error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppSignIn = async () => {
    setLoading(true);
    setLocalError("");

    try {
      // TODO: Implement WhatsApp sign in
      console.log("WhatsApp sign in clicked");
    } catch (err) {
      setLocalError("An unexpected error occurred");
      console.error("WhatsApp sign in error:", err);
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
          message="Signing you in..."
          size={50}
        />
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100%",
          padding: "20px",
          position: "relative",
          zIndex: 2,
          justifyContent: "center",
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
                  margin: "-15px 0 10px 3px",
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
              placeholder="••••••••••••"
              value={formData.password}
              onChange={(e) =>
                handleInputChange({
                  target: { name: "password", value: e.target.value },
                })
              }
              showPasswordToggle={false}
              required
            />
            {fieldErrors.password && (
              <p
                style={{
                  color: "#f44336",
                  fontSize: "12px",
                  margin: "-15px 0 10px 3px",
                  fontFamily: '"Poppins", sans-serif',
                }}
              >
                {fieldErrors.password}
              </p>
            )}
          </div>

          <div
            style={{
              margin: "20px 0",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  sx={{
                    color: "#D9D9D9",
                    "&.Mui-checked": {
                      color: "#1D1B20",
                    },
                    "& .MuiSvgIcon-root": {
                      fontSize: 20,
                    },
                  }}
                />
              }
              label="Remember Me"
              sx={{
                "& .MuiFormControlLabel-label": {
                  fontFamily: '"Poppins", sans-serif',
                  fontWeight: 400,
                  fontSize: "13px",
                  color: "#000",
                  opacity: 0.7,
                },
              }}
            />
          </div>
          <p
            style={{
              fontFamily: '"Poppins", sans-serif',
              fontWeight: 400,
              fontSize: "13px",
              lineHeight: "1.5em",
              color: "#000",
              textAlign: "center",
              opacity: 0.6,
            }}
          >
            Don't have an account yet?{" "}
            <button
              onClick={handleSignUp}
              style={{
                background: "none",
                border: "none",
                color: "#000",
                fontFamily: '"Poppins", sans-serif',
                fontWeight: 400,
                fontSize: "13px",
                cursor: "pointer",
                textDecoration: "underline",
                padding: 0,
                marginLeft: "4px",
              }}
            >
              Sign Up
            </button>
          </p>
          <Button
            type="submit"
            variant="primary"
            className="btn-auth"
            disabled={loading}
          >
            Sign In
          </Button>
          {/* Continue as Guest Button */}
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
              maxWidth: "320px",
              width: "100%",
            }}
          >
            Continue as Guest
          </Button>
          {/* Or sign in with text */}
          <p
            style={{
              fontFamily: '"Poppins", sans-serif',
              fontWeight: 400,
              fontSize: "13px",
              color: "#000",
              textAlign: "center",
              opacity: 0.6,
              margin: "20px 0 15px 0",
            }}
          >
            - Or sign in with -
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
              onClick={handleGoogleSignIn}
              disabled={loading}
              icon={<GoogleIcon size={18} />}
              style={{ flex: 1, maxWidth: "80px" }}
            />
            <SocialLoginButton
              provider="facebook"
              onClick={handleFacebookSignIn}
              disabled={loading}
              icon={<FacebookIcon size={18} />}
              style={{ flex: 1, maxWidth: "80px" }}
            />
            <SocialLoginButton
              provider="whatsapp"
              onClick={handleWhatsAppSignIn}
              disabled={loading}
              icon={<WhatsAppIcon size={18} />}
              style={{ flex: 1, maxWidth: "80px" }}
            />
          </div>
        </form>

        {/* Terms and Privacy */}
        <div
          style={{
            textAlign: "center",
            marginTop: "20px",
            padding: "0 20px",
            width: "100%",
            maxWidth: "320px",
          }}
        >
          <p
            style={{
              fontFamily: '"Poppins", sans-serif',
              fontWeight: 400,
              fontSize: "12px",
              lineHeight: "1.4em",
              color: "#000",
              margin: "0",
              opacity: 0.6,
              textAlign: "center",
            }}
          >
            By clicking on "Sign In" you agree to{" "}
            <span
              onClick={() => navigate("/policy")}
              style={{
                textDecoration: "underline",
                cursor: "pointer",
                opacity: 0.8,
              }}
            >
              Terms of Service
            </span>
            {" | "}
            <span
              onClick={() => navigate("/policy")}
              style={{
                textDecoration: "underline",
                cursor: "pointer",
                opacity: 0.8,
              }}
            >
              Privacy Policy
            </span>
          </p>
        </div>
      </div>
    </MobileFrame>
  );
};

export default SignInForm;
