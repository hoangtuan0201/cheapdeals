import { CircularProgress } from "@mui/material";

const LoadingSpinner = ({ 
  size = 40, 
  color = "primary", 
  fullScreen = false,
  message = "Loading...",
  showMessage = true 
}) => {
  const containerStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "16px",
    ...(fullScreen && {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      backdropFilter: "blur(4px)",
      zIndex: 9999,
    }),
  };

  const messageStyles = {
    fontFamily: '"Poppins", sans-serif',
    fontSize: "14px",
    fontWeight: 400,
    color: "#666",
    textAlign: "center",
  };

  return (
    <div style={containerStyles}>
      <CircularProgress 
        size={size} 
        color={color}
        sx={{
          color: color === "primary" ? "#1976d2" : color,
        }}
      />
      {showMessage && (
        <p style={messageStyles}>
          {message}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;
