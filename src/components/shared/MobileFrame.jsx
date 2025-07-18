import { useNavigate, useLocation } from "react-router-dom";
import {
  SignalCellular4Bar,
  Wifi,
  BatteryFull,
  Home,
  ChevronLeft,
  RadioButtonUnchecked,
} from "@mui/icons-material";

const MobileFrame = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBackClick = () => {
    if (location.pathname === "/signin") {
      navigate("/signup");
    } else if (location.pathname === "/signup") {
      navigate("/get-started");
    }
  };

  const handleHomeClick = () => {
    navigate("/get-started");
  };
  const styles = {
    mobileFrame: {
      width: "375px",
      height: "812px",
      backgroundImage: 'url("/background.png")',
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      margin: "0 auto",
      borderRadius: "20px",
      overflow: "hidden",
      boxShadow: "0 0 20px rgba(0, 0, 0, 0.3)",
    },
    statusBar: {
      height: "24px",
      background: "transparent",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0 14px",
      color: "#000",
      fontFamily:
        '"SF Pro Rounded", -apple-system, BlinkMacSystemFont, sans-serif',
      fontSize: "13px",
      fontWeight: 400,
      zIndex: 10,
      position: "relative",
    },
    time: {
      opacity: 0.9,
    },
    statusIcons: {
      display: "flex",
      gap: "4px",
      alignItems: "center",
    },
    statusIcon: {
      width: "14px",
      height: "14px",
      color: "#000",
      opacity: 0.9,
    },
    mobileContent: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      position: "relative",
      overflow: "hidden",
    },
    navigationBar: {
      height: "40px",
      background: "black",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      padding: "0 20px",
      position: "relative",
      zIndex: 10,
    },
    navIcon: {
      width: "22px",
      height: "22px",
      color: "fff",
    },
    navHome: {
      width: "18px",
      height: "20px",
      color: "fff",
    },
    navRecent: {
      width: "20px",
      height: "20px",
      color: "fff",
    },
    // Responsive styles
    "@media (max-width: 480px)": {
      mobileFrame: {
        width: "100vw",
        height: "100vh",
        borderRadius: 0,
        boxShadow: "none",
      },
    },
  };

  return (
    <div style={styles.mobileFrame}>
      {/* Status bar */}
      <div style={styles.statusBar}>
        <span style={styles.time}>10:00</span>
        <div style={styles.statusIcons}>
          <SignalCellular4Bar style={styles.statusIcon} />
          <Wifi style={styles.statusIcon} />
          <BatteryFull style={styles.statusIcon} />
        </div>
      </div>

      {/* Main content */}
      <div style={styles.mobileContent}>{children}</div>

      {/* Navigation bar */}
      <div style={styles.navigationBar}>
        <ChevronLeft
          style={{ ...styles.navIcon, cursor: "pointer" }}
          onClick={handleBackClick}
        />
        <Home
          style={{ ...styles.navHome, cursor: "pointer" }}
          onClick={handleHomeClick}
        />
        <RadioButtonUnchecked style={styles.navRecent} />
      </div>
    </div>
  );
};

export default MobileFrame;
