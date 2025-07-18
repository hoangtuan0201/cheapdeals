import { useNavigate } from "react-router-dom";
import MobileFrame from "../../components/shared/MobileFrame";
import Logo from "../../components/shared/Logo";
import Button from "../../components/shared/Button";
import "./GetStarted.css";

const GetStarted = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/signup");
  };

  return (
    <MobileFrame>
      <div className="get-started-container">
        <Logo size="large" />

        <div className="get-started-message">
          <p className="tagline">Your Deal - Your Way - Just One Click</p>
        </div>

        <Button
          onClick={handleGetStarted}
          variant="primary"
          className="btn-get-started"
        >
          GET STARTED
        </Button>
      </div>
    </MobileFrame>
  );
};

export default GetStarted;
