import MobileFrame from "./MobileFrame";
import LoadingSpinner from "./LoadingSpinner";
import Logo from "./Logo";

const PageLoader = ({ message = "Loading..." }) => {
  return (
    <MobileFrame>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          padding: "20px",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Logo */}
        <div style={{ marginBottom: "40px" }}>
          <Logo size="medium" />
        </div>

        {/* Loading Spinner */}
        <LoadingSpinner 
          size={50}
          message={message}
          showMessage={true}
        />

        {/* Additional loading text */}
        <p
          style={{
            fontFamily: '"Poppins", sans-serif',
            fontSize: "12px",
            fontWeight: 300,
            color: "#999",
            textAlign: "center",
            marginTop: "20px",
            opacity: 0.7,
          }}
        >
          Please wait while we prepare everything for you...
        </p>
      </div>
    </MobileFrame>
  );
};

export default PageLoader;
