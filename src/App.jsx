import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import GetStarted from "./pages/GetStarted/GetStarted";
import SignInForm from "./pages/SignIn/SignInForm";
import SignUpForm from "./pages/SignUp/SignUpForm";
import Home from "./pages/Home/Home";
import Policy from "./pages/Policy/Policy";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="mobile-container">
          <Routes>
            <Route path="/" element={<Navigate to="/get-started" replace />} />
            <Route path="/get-started" element={<GetStarted />} />
            <Route path="/signin" element={<SignInForm />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/home" element={<Home />} />
            <Route path="/policy" element={<Policy />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
