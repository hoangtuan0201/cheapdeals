import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import MobileFrame from "../../components/shared/MobileFrame";
import Button from "../../components/shared/Button";
import PageLoader from "../../components/shared/PageLoader";

const Home = () => {
  const { currentUser, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading time for better UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // 1.5 seconds loading

    return () => clearTimeout(timer);
  }, []);

  const handleSignIn = () => {
    window.location.href = "/signin";
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Show loading screen
  if (isLoading) {
    return <PageLoader message="Welcome to CheapDeals!" />;
  }

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
        <div
          style={{
            textAlign: "center",
            marginBottom: "40px",
          }}
        >
          <h1
            style={{
              fontFamily: '"Poppins", sans-serif',
              fontWeight: 600,
              fontSize: "32px",
              color: "#000",
              margin: "0 0 20px 0",
            }}
          >
            Welcome to CheapDeals!
          </h1>

          {currentUser ? (
            <p
              style={{
                fontFamily: '"Poppins", sans-serif',
                fontWeight: 400,
                fontSize: "16px",
                color: "#000",
                margin: "0 0 10px 0",
                opacity: 0.8,
              }}
            >
              Hello, {currentUser.displayName || currentUser.email}
            </p>
          ) : (
            <p
              style={{
                fontFamily: '"Poppins", sans-serif',
                fontWeight: 400,
                fontSize: "16px",
                color: "#000",
                margin: "0 0 10px 0",
                opacity: 0.8,
              }}
            >
              Welcome, Guest!
            </p>
          )}

          <p
            style={{
              fontFamily: '"Poppins", sans-serif',
              fontWeight: 400,
              fontSize: "14px",
              color: "#000",
              margin: 0,
              opacity: 0.6,
            }}
          >
            Find the best deals with just one click
          </p>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            width: "100%",
            maxWidth: "280px",
          }}
        >
          <Button variant="primary" className="btn-auth">
            Browse Deals
          </Button>

          <Button variant="secondary" className="btn-auth">
            My Favorites
          </Button>

          {currentUser ? (
            <Button
              onClick={handleLogout}
              variant="secondary"
              className="btn-auth"
              style={{
                marginTop: "20px",
                opacity: 0.8,
              }}
            >
              Sign Out
            </Button>
          ) : (
            <Button
              onClick={handleSignIn}
              variant="secondary"
              className="btn-auth"
              style={{
                marginTop: "20px",
                opacity: 0.8,
              }}
            >
              Sign In
            </Button>
          )}
        </div>
      </div>
    </MobileFrame>
  );
};

export default Home;
