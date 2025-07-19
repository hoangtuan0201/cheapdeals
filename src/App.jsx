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
import Settings from "./pages/Settings/Settings";
import Profile from "./pages/Profile/Profile";
import ProtectedRoute from "./components/shared/ProtectedRoute";
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
            <Route
              path="/settings"
              element={
                <ProtectedRoute redirectTo="/home">
                  <Settings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute redirectTo="/settings">
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
