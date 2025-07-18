const SocialLoginButton = ({
  provider,
  onClick,
  disabled = false,
  children,
  icon,
  style = {},
}) => {
  const getProviderStyles = () => {
    switch (provider) {
      case "google":
        return {
          backgroundColor: "#fff",
          border: "1px solid #dadce0",
          color: "#3c4043",
        };
      case "facebook":
        return {
          backgroundColor: "#1877f2",
          border: "1px solid #1877f2",
          color: "#fff",
        };
      case "whatsapp":
        return {
          backgroundColor: "#25d366",
          border: "1px solid #25d366",
          color: "#fff",
        };
      default:
        return {
          backgroundColor: "#fff",
          border: "1px solid #dadce0",
          color: "#3c4043",
        };
    }
  };

  const baseStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    width: "100%",
    height: "43px",
    borderRadius: "6px",
    fontFamily: '"Poppins", sans-serif',
    fontWeight: 400,
    fontSize: "13px",
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "all 0.3s ease",
    opacity: disabled ? 0.6 : 1,
    boxSizing: "border-box",
    padding: "0 16px",
    ...getProviderStyles(),
    ...style,
  };

  const handleMouseEnter = (e) => {
    if (!disabled) {
      e.target.style.opacity = "0.9";
      e.target.style.transform = "translateY(-1px)";
    }
  };

  const handleMouseLeave = (e) => {
    if (!disabled) {
      e.target.style.opacity = "1";
      e.target.style.transform = "translateY(0)";
    }
  };

  const handleMouseDown = (e) => {
    if (!disabled) {
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
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={baseStyles}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {icon && (
        <span style={{ display: "flex", alignItems: "center" }}>{icon}</span>
      )}
      {children}
    </button>
  );
};

export default SocialLoginButton;
