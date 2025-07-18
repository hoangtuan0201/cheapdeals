import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MobileFrame from "../../components/shared/MobileFrame";
import Logo from "../../components/shared/Logo";
import FormInput from "../../components/shared/FormInput";
import Button from "../../components/shared/Button";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    console.log("Sign up form submitted:", formData);
  };

  const handleSwitchToSignIn = () => {
    navigate("/signin");
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
          }}
        >
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

          <Button type="submit" variant="primary" className="btn-auth">
            Create Account
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
            margin: "20px 0",
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
