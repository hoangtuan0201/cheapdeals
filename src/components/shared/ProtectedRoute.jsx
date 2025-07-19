import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Warning, Close } from "@mui/icons-material";

const ProtectedRoute = ({ children, redirectTo = "/signin" }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      setShowLoginPopup(true);
    }
  }, [currentUser]);

  const handleClosePopup = () => {
    setShowLoginPopup(false);
    navigate(redirectTo);
  };

  const handleLoginRedirect = () => {
    setShowLoginPopup(false);
    navigate("/signin");
  };

  const popupStyles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
    },
    popup: {
      background: "#FFFFFF",
      borderRadius: "12px",
      padding: "30px 20px",
      width: "300px",
      textAlign: "center",
      boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.3)",
      position: "relative",
    },
    closeButton: {
      position: "absolute",
      top: "10px",
      right: "10px",
      background: "none",
      border: "none",
      cursor: "pointer",
      color: "#666",
    },
    warningIcon: {
      color: "#FF9800",
      fontSize: "48px",
      marginBottom: "16px",
    },
    title: {
      fontSize: "18px",
      fontWeight: "600",
      fontFamily: '"Poppins", sans-serif',
      color: "#000000",
      marginBottom: "8px",
    },
    message: {
      fontSize: "14px",
      fontWeight: "400",
      fontFamily: '"Poppins", sans-serif',
      color: "#666666",
      lineHeight: "1.5",
      marginBottom: "20px",
    },
    buttonContainer: {
      display: "flex",
      gap: "10px",
      justifyContent: "center",
    },
    loginButton: {
      background: "#007AFF",
      color: "#FFFFFF",
      border: "none",
      borderRadius: "8px",
      padding: "10px 20px",
      fontSize: "14px",
      fontWeight: "500",
      fontFamily: '"Poppins", sans-serif',
      cursor: "pointer",
      transition: "background-color 0.2s ease",
    },
    cancelButton: {
      background: "#F5F5F5",
      color: "#666666",
      border: "none",
      borderRadius: "8px",
      padding: "10px 20px",
      fontSize: "14px",
      fontWeight: "500",
      fontFamily: '"Poppins", sans-serif',
      cursor: "pointer",
      transition: "background-color 0.2s ease",
    },
  };

  const LoginRequiredPopup = () => (
    <div style={popupStyles.overlay}>
      <div style={popupStyles.popup}>
        <button style={popupStyles.closeButton} onClick={handleClosePopup}>
          <Close />
        </button>
        <Warning style={popupStyles.warningIcon} />
        <div style={popupStyles.title}>Login Required</div>
        <div style={popupStyles.message}>
          You need to login to access this feature. Please login to continue.
        </div>
        <div style={popupStyles.buttonContainer}>
          <button
            style={popupStyles.loginButton}
            onClick={handleLoginRedirect}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#0056CC")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#007AFF")}
          >
            Login
          </button>
          <button
            style={popupStyles.cancelButton}
            onClick={handleClosePopup}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#E0E0E0")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#F5F5F5")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  // If user is not logged in, show popup
  if (!currentUser) {
    return showLoginPopup ? <LoginRequiredPopup /> : null;
  }

  // If user is logged in, render the protected content
  return children;
};

export default ProtectedRoute;
