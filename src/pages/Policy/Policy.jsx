import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MobileFrame from "../../components/shared/MobileFrame";
import Button from "../../components/shared/Button";

const Policy = () => {
  const navigate = useNavigate();
  const [accepted, setAccepted] = useState(null);

  const handleAccept = () => {
    setAccepted(true);
    // You can add logic here to save the acceptance
    setTimeout(() => {
      navigate(-1); // Go back to previous page
    }, 1000);
  };

  const handleDecline = () => {
    setAccepted(false);
    // You can add logic here to handle decline
    setTimeout(() => {
      navigate("/"); // Go to home page
    }, 1000);
  };

  const policyText = `At CheapDeals, your privacy is important to us. We collect personal information such as your name, email, phone number, shipping address, and payment details to process orders, provide customer support, personalize your experience, and improve our app's functionality. We also collect device, usage, and location data (with permission) to enhance performance and service delivery. Your information may be shared with trusted third-party providers like payment processors and delivery services, but we do not sell your data. You can access, update, or delete your information, and opt out of marketing communications at any time by contacting us at support@cheapdeals.com. We use industry-standard security measures to protect your data, but no system is 100% secure. CheapDeals is not intended for users under 13, and we comply with applicable data protection laws. By continuing to use this app, you acknowledge that you have read, understood, and agree to our Privacy Policy.`;

  return (
    <MobileFrame>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100%",
          padding: "20px",
          position: "relative",
          zIndex: 2,
          justifyContent: "flex-start",
        }}
      >
        {/* Header */}
        <h1
          style={{
            fontFamily: '"Poppins", sans-serif',
            fontWeight: 700,
            fontSize: "24px",
            lineHeight: "1.5em",
            color: "#000",
            textAlign: "center",
            margin: "40px 0 30px 0",
            width: "100%",
            maxWidth: "320px",
          }}
        >
          Privacy Policy
        </h1>

        {/* Policy Content */}
        <div
          style={{
            width: "100%",
            maxWidth: "320px",
            height: "440px",
            overflowY: "auto",
            marginBottom: "30px",
            padding: "0 5px",
          }}
        >
          <p
            style={{
              fontFamily: '"Poppins", sans-serif',
              fontWeight: 400,
              fontSize: "13px",
              lineHeight: "1.5em",
              color: "#000",
              textAlign: "left",
              margin: 0,
            }}
          >
            {policyText}
          </p>
        </div>

        {/* Question */}
        <p
          style={{
            fontFamily: '"Poppins", sans-serif',
            fontWeight: 700,
            fontSize: "13px",
            lineHeight: "1.5em",
            color: "#000",
            textAlign: "center",
            margin: "0 0 20px 0",
            width: "100%",
            maxWidth: "320px",
          }}
        >
          Do you accept our privacy policy?
        </p>

        {/* Action Buttons */}
        <div
          style={{
            display: "flex",
            gap: "15px",
            width: "100%",
            maxWidth: "320px",
            justifyContent: "space-between",
          }}
        >
          <Button
            onClick={handleDecline}
            variant="primary"
            style={{
              width: "137px",
              height: "32px",
              fontSize: "13px",
              fontFamily: '"Poppins", sans-serif',
              background: "rgba(21, 21, 21, 0.65)",
              border: "0.5px solid rgba(217, 217, 217, 0.8)",
              borderRadius: "6px",
              backdropFilter: "blur(8px)",
              textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            }}
          >
            No, I don't.
          </Button>

          <Button
            onClick={handleAccept}
            variant="primary"
            style={{
              width: "137px",
              height: "32px",
              fontSize: "13px",
              fontFamily: '"Poppins", sans-serif',
              background: "rgba(21, 21, 21, 0.65)",
              border: "0.5px solid rgba(217, 217, 217, 0.8)",
              borderRadius: "6px",
              backdropFilter: "blur(8px)",
              textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            }}
          >
            I accept
          </Button>
        </div>

        {/* Feedback Message */}
        {accepted !== null && (
          <div
            style={{
              marginTop: "20px",
              padding: "10px",
              borderRadius: "6px",
              background: accepted 
                ? "rgba(76, 175, 80, 0.1)" 
                : "rgba(244, 67, 54, 0.1)",
              border: `1px solid ${accepted ? "#4CAF50" : "#F44336"}`,
              width: "100%",
              maxWidth: "320px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontFamily: '"Poppins", sans-serif',
                fontWeight: 400,
                fontSize: "12px",
                color: accepted ? "#4CAF50" : "#F44336",
                margin: 0,
              }}
            >
              {accepted 
                ? "Thank you for accepting our privacy policy!" 
                : "You have declined our privacy policy."}
            </p>
          </div>
        )}
      </div>
    </MobileFrame>
  );
};

export default Policy;
