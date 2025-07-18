import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox, FormControlLabel } from "@mui/material";
import MobileFrame from "../../components/shared/MobileFrame";
import Logo from "../../components/shared/Logo";
import FormInput from "../../components/shared/FormInput";
import Button from "../../components/shared/Button";

const SignInForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign in data:", formData, "Remember me:", rememberMe);
    // Handle form submission logic here
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <MobileFrame>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100%",
          padding: "20px",
          position: "relative",
          zIndex: 2,
          overflowY: "auto",
        }}
      >
        <Logo size="large" />

        <form
          onSubmit={handleSubmit}
          style={{
            width: "100%",
            maxWidth: "320px",
            margin: "20px 0",
          }}
        >
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
          <Button type="submit" variant="primary" className="btn-auth">
            Sign In
          </Button>
        </form>

        

        <div
          style={{ textAlign: "center", marginTop: "20px", padding: "0 20px" }}
        >
          <p
            style={{
              fontFamily: '"Poppins", sans-serif',
              fontWeight: 400,
              fontSize: "13px",
              lineHeight: "1.5em",
              color: "#000",
              margin: "0 0 5px 0",
              opacity: 0.6,
            }}
          >
            By clicking on "Sign In" you agree to
          </p>
          <p
            style={{
              fontFamily: '"Poppins", sans-serif',
              fontWeight: 400,
              fontSize: "13px",
              lineHeight: "1.5em",
              color: "#000",
              margin: 0,
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            Terms of Service | Privacy Policy
          </p>
        </div>
      </div>
    </MobileFrame>
  );
};

export default SignInForm;
