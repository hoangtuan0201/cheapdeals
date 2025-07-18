const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "medium",
  disabled = false,
  className = "",
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return {
          background: "rgba(21, 21, 21, 0.65)",
          border: "0.5px solid rgba(217, 217, 217, 0.8)",
          color: "#fff",
        };
      case "secondary":
        return {
          background: "rgba(255, 255, 255, 0.65)",
          border: "0.5px solid rgba(217, 217, 217, 0.96)",
          color: "#000",
        };
      default:
        return {
          background: "rgba(21, 21, 21, 0.65)",
          border: "0.5px solid rgba(217, 217, 217, 0.8)",
          color: "#fff",
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case "small":
        return {
          height: "36px",
          padding: "8px 16px",
          fontSize: "12px",
        };
      case "medium":
        return {
          height: "43px",
          padding: "12px 24px",
          fontSize: "13px",
        };
      case "large":
        return {
          height: "50px",
          padding: "15px 32px",
          fontSize: "14px",
        };
      default:
        return {
          height: "43px",
          padding: "12px 24px",
          fontSize: "13px",
        };
    }
  };

  const baseStyles = {
    fontFamily: '"Poppins", sans-serif',
    fontWeight: 400,
    lineHeight: "1.5em",
    borderRadius: "6px",
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "all 0.3s ease",
    textAlign: "center",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
    boxSizing: "border-box",
    backdropFilter: "blur(8px)",
    opacity: disabled ? 0.6 : 1,
  };

  const getClassNameStyles = () => {
    if (
      className.includes("btn-get-started") ||
      className.includes("btn-auth")
    ) {
      return {
        width: "266px",
        height: "43px",
        margin: "5px auto",
        display: "block",
      };
    }
    return {};
  };

  const styles = {
    ...baseStyles,
    ...getVariantStyles(),
    ...getSizeStyles(),
    ...getClassNameStyles(),
  };

  const handleMouseEnter = (e) => {
    if (!disabled) {
      if (variant === "primary") {
        e.target.style.background = "rgba(21, 21, 21, 0.8)";
        e.target.style.borderColor = "rgba(217, 217, 217, 1)";
      } else {
        e.target.style.background = "rgba(255, 255, 255, 0.8)";
        e.target.style.borderColor = "rgba(217, 217, 217, 1)";
      }
    }
  };

  const handleMouseLeave = (e) => {
    if (!disabled) {
      const variantStyles = getVariantStyles();
      e.target.style.background = variantStyles.background;
      e.target.style.borderColor = variantStyles.border.split(" ")[2];
    }
  };

  const handleMouseDown = (e) => {
    if (!disabled) {
      if (variant === "primary") {
        e.target.style.background = "rgba(21, 21, 21, 0.9)";
      } else {
        e.target.style.background = "rgba(255, 255, 255, 0.9)";
      }
      e.target.style.transform = "translateY(1px)";
    }
  };

  const handleMouseUp = (e) => {
    if (!disabled) {
      e.target.style.transform = "translateY(0)";
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={styles}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {children}
    </button>
  );
};

export default Button;
