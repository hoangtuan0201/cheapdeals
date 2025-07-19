import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  ArrowBack,
  AccountCircle,
  Notifications,
  CardGiftcard,
  Language,
  Logout,
  HelpOutline,
  Policy,
  Email,
  ChevronRight,
  Warning,
  Close,
} from "@mui/icons-material";
import MobileFrame from "../../components/shared/MobileFrame";

const Settings = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const handleBack = () => {
    navigate("/home");
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/get-started");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleNotificationToggle = () => {
    if (!currentUser) {
      setShowLoginPopup(true);
      return;
    }
    setNotificationsEnabled(!notificationsEnabled);
  };

  const handleProtectedAction = (action) => {
    if (!currentUser) {
      setShowLoginPopup(true);
      return;
    }
    action();
  };

  const handleClosePopup = () => {
    setShowLoginPopup(false);
  };

  const handleLoginRedirect = () => {
    setShowLoginPopup(false);
    navigate("/signin");
  };

  const settingsStyles = {
    container: {
      width: "100%",
      height: "100%",
      background: "#FFFFFF",
      position: "relative",
    },
    header: {
      display: "flex",
      alignItems: "center",
      padding: "15px 20px",
      borderBottom: "1px solid #E0E0E0",
      background: "#FFFFFF",
    },
    backButton: {
      cursor: "pointer",
      marginRight: "15px",
    },
    title: {
      fontSize: "16px",
      fontWeight: "700",
      fontFamily: '"Poppins", sans-serif',
      color: "#000000",
    },
    content: {
      padding: "20px",
      height: "calc(100% - 70px)",
      overflowY: "auto",
    },
    userInfo: {
      display: "flex",
      alignItems: "center",
      marginBottom: "30px",
      padding: "0 5px",
    },
    avatar: {
      width: "36px",
      height: "36px",
      borderRadius: "50%",
      background: "#817F7F",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginRight: "15px",
    },
    avatarText: {
      color: "#FFFFFF",
      fontSize: "14px",
      fontWeight: "600",
    },
    userText: {
      fontSize: "13px",
      fontFamily: '"Poppins", sans-serif',
      color: "#000000",
      lineHeight: "1.5",
    },
    sectionTitle: {
      fontSize: "15px",
      fontWeight: "400",
      fontFamily: '"Poppins", sans-serif',
      color: "#000000",
      marginBottom: "15px",
      marginTop: "20px",
    },
    menuItem: {
      display: "flex",
      alignItems: "center",
      padding: "12px 15px",
      background: "#C0C0C0",
      borderRadius: "5px",
      marginBottom: "12px",
      cursor: "pointer",
      transition: "background-color 0.2s ease",
    },
    menuItemHover: {
      background: "#B0B0B0",
    },
    menuIcon: {
      width: "21px",
      height: "21px",
      marginRight: "15px",
      opacity: 0.5,
    },

    menuText: {
      flex: 1,
      fontSize: "13px",
      fontFamily: '"Poppins", sans-serif',
      color: "#000000",
      lineHeight: "1.5",
    },
    menuArrow: {
      color: "#666666",
      fontSize: "20px",
    },
    notificationToggle: {
      width: "40px",
      height: "20px",
      borderRadius: "10px",
      background: notificationsEnabled ? "#4CAF50" : "#CCCCCC",
      position: "relative",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    toggleCircle: {
      width: "16px",
      height: "16px",
      borderRadius: "50%",
      background: "#FFFFFF",
      position: "absolute",
      top: "2px",
      left: notificationsEnabled ? "22px" : "2px",
      transition: "left 0.3s ease",
    },
    languageText: {
      fontSize: "13px",
      fontFamily: '"Poppins", sans-serif',
      color: "#000000",
      opacity: 0.51,
      marginLeft: "auto",
      marginRight: "10px",
    },
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
          <button style={popupStyles.loginButton} onClick={handleLoginRedirect}>
            Login
          </button>
          <button style={popupStyles.cancelButton} onClick={handleClosePopup}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  const MenuItem = ({
    icon,
    text,
    onClick,
    rightElement,
    isLanguage = false,
  }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <div
        style={{
          ...settingsStyles.menuItem,
          ...(isHovered ? settingsStyles.menuItemHover : {}),
        }}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div style={settingsStyles.menuIcon}>{icon}</div>
        <span style={settingsStyles.menuText}>{text}</span>
        {isLanguage && <span style={settingsStyles.languageText}>English</span>}
        {rightElement || <ChevronRight style={settingsStyles.menuArrow} />}
      </div>
    );
  };

  return (
    <MobileFrame>
      <div style={settingsStyles.container}>
        {/* Header */}
        <div style={settingsStyles.header}>
          <ArrowBack style={settingsStyles.backButton} onClick={handleBack} />
          <span style={settingsStyles.title}>Settings</span>
        </div>

        {/* Content */}
        <div style={settingsStyles.content}>
          {/* User Info */}
          <div style={settingsStyles.userInfo}>
            <div style={settingsStyles.avatar}>
              <span style={settingsStyles.avatarText}>
                {currentUser
                  ? currentUser.displayName?.charAt(0) ||
                    currentUser.email?.charAt(0) ||
                    "U"
                  : "G"}
              </span>
            </div>
            <span style={settingsStyles.userText}>
              {currentUser
                ? `You are currently signed in as ${
                    currentUser.displayName || currentUser.email
                  } !`
                : "You are currently browsing as Guest !"}
            </span>
          </div>

          {/* General Section */}
          <div style={settingsStyles.sectionTitle}>GENERAL</div>

          <MenuItem
            icon={<AccountCircle />}
            text="Account"
            onClick={() => handleProtectedAction(() => navigate("/profile"))}
          />

          <MenuItem
            icon={<Notifications />}
            text="Notifications"
            onClick={handleNotificationToggle}
            rightElement={
              <div style={settingsStyles.notificationToggle}>
                <div style={settingsStyles.toggleCircle}></div>
              </div>
            }
          />

          <MenuItem
            icon={<CardGiftcard />}
            text="Coupons"
            onClick={() =>
              handleProtectedAction(() => console.log("Coupons clicked"))
            }
          />

          <MenuItem
            icon={<Language />}
            text="Language:"
            onClick={() => console.log("Language clicked")}
            isLanguage={true}
          />

          {currentUser && (
            <MenuItem icon={<Logout />} text="Logout" onClick={handleLogout} />
          )}

          {/* Feedback Section */}
          <div style={settingsStyles.sectionTitle}>FEEDBACK</div>

          <MenuItem
            icon={<HelpOutline />}
            text="Package Enquiry"
            onClick={() => console.log("Package Enquiry clicked")}
          />

          <MenuItem
            icon={<Policy />}
            text="CheapDeals' Privacy Policy"
            onClick={() => navigate("/policy")}
          />

          <MenuItem
            icon={<Email />}
            text="Contact us: support@cheapdeals.com"
            onClick={() => window.open("mailto:support@cheapdeals.com")}
          />
        </div>

        {/* Login Required Popup */}
        {showLoginPopup && <LoginRequiredPopup />}
      </div>
    </MobileFrame>
  );
};

export default Settings;
