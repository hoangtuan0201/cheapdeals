import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const FormInput = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  showPasswordToggle = false,
  required = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const inputType = type === "password" && showPassword ? "text" : type;

  const styles = {
    formInputContainer: {
      marginBottom: "18px",
      width: "100%",
    },
    formLabel: {
      display: "block",
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 400,
      fontSize: "13px",
      lineHeight: "1.5em",
      color: "#000",
      marginBottom: "5px",
      paddingLeft: "3px",
    },
    formInputWrapper: {
      position: "relative",
      width: "100%",
    },
    formInput: {
      width: "100%",
      height: "43px",
      background: "rgba(255, 255, 255, 0.65)",
      border: isFocused
        ? "0.5px solid rgba(217, 217, 217, 1)"
        : "0.5px solid rgba(217, 217, 217, 0.96)",
      borderRadius: "6px",
      padding: "12px 16px",
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 400,
      fontSize: "13px",
      lineHeight: "1.5em",
      color: "#000",
      backdropFilter: "blur(8px)",
      transition: "all 0.3s ease",
      boxSizing: "border-box",
      outline: "none",
    },
    formInputFocused: {
      borderColor: "rgba(217, 217, 217, 1)",
      background: "rgba(255, 255, 255, 0.8)",
    },
    placeholder: {
      color: "rgba(0, 0, 0, 0.51)",
    },
    passwordToggle: {
      position: "absolute",
      right: "12px",
      top: "50%",
      transform: "translateY(-50%)",
      background: "none",
      border: "none",
      cursor: "pointer",
      padding: "4px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#0F172A",
      transition: "opacity 0.2s ease",
    },
    passwordToggleHover: {
      opacity: 0.7,
    },
    passwordIcon: {
      width: "18px",
      height: "18px",
    },
  };

  return (
    <div style={styles.formInputContainer}>
      <label style={styles.formLabel}>{label}</label>
      <div style={styles.formInputWrapper}>
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          required={required}
          style={{
            ...styles.formInput,
            ...(isFocused ? styles.formInputFocused : {}),
            paddingRight:
              showPasswordToggle && type === "password" ? "50px" : "16px",
          }}
        />
        {showPasswordToggle && type === "password" && (
          <button
            type="button"
            style={styles.passwordToggle}
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            onMouseEnter={(e) => (e.target.style.opacity = "0.7")}
            onMouseLeave={(e) => (e.target.style.opacity = "1")}
          >
            {showPassword ? (
              <VisibilityOff style={styles.passwordIcon} />
            ) : (
              <Visibility style={styles.passwordIcon} />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default FormInput;
