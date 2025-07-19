const Logo = ({ size = "large" }) => {
  const isLarge = size === "large";

  const styles = {
    logoContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      position: "relative",
      zIndex: 2,
    },
    logoBackground: {
      position: "relative",
      marginBottom: "10px",
    },
   
    logoIcon: {
      width: "64px",
      height: "64px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
    },
    logoImage: {
      width: "64px",
      height: "48px",
      objectFit: "contain",
      filter: "brightness(0) saturate(100%)",
    },
    appTitle: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 600,
      fontSize: isLarge ? "48px" : "32px",
      lineHeight: "1.5em",
      color: "#000",
      margin: 0,
      marginBottom: isLarge ? "0" : "5px",
    },
    appSubtitle: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 400,
      fontSize: "13px",
      lineHeight: "1.5em",
      color: "#000",
      margin: 0,
      opacity: 0.8,
    },
  };

  return (
    <div style={styles.logoContainer}>
        <div style={styles.logoIcon}>
          <img
            src="/phone-vibrate.png"
            alt="CheapDeals Logo"
            style={styles.logoImage}
          />
      </div>
      <h1 style={styles.appTitle}>CheapDeals</h1>
      <p style={styles.appSubtitle}>Buy more for less.</p>
    </div>
  );
};

export default Logo;
