import { createContext, useContext, useState, useEffect } from "react";
import {
  signUpWithEmail,
  signInWithEmail,
  signInWithGoogle,
  signInWithFacebook,
  signOutUser,
  resetPassword,
  onAuthStateChange,
} from "../services/authService";

// Create the auth context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Auto-clear error after 3 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 3000); // 3 seconds

      // Cleanup timer if error changes or component unmounts
      return () => clearTimeout(timer);
    }
  }, [error]);

  // Sign up function
  const signup = async (email, password, displayName) => {
    setError(null);
    const result = await signUpWithEmail(email, password, displayName);
    if (!result.success) {
      setError(result.error);
    }
    return result;
  };

  // Sign in function
  const login = async (email, password) => {
    setError(null);
    const result = await signInWithEmail(email, password);
    if (!result.success) {
      setError(result.error);
    }
    return result;
  };

  // Google sign in function
  const loginWithGoogle = async () => {
    setError(null);
    const result = await signInWithGoogle();
    if (!result.success) {
      setError(result.error);
    }
    return result;
  };

  // Facebook sign in function
  const loginWithFacebook = async () => {
    setError(null);
    const result = await signInWithFacebook();
    if (!result.success) {
      setError(result.error);
    }
    return result;
  };

  // Sign out function
  const logout = async () => {
    setError(null);
    const result = await signOutUser();
    if (!result.success) {
      setError(result.error);
    }
    return result;
  };

  // Password reset function
  const forgotPassword = async (email) => {
    setError(null);
    const result = await resetPassword(email);
    if (!result.success) {
      setError(result.error);
    }
    return result;
  };

  // Effect to listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      if (user) {
        setCurrentUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          emailVerified: user.emailVerified,
        });
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Context value
  const value = {
    currentUser,
    loading,
    error,
    signup,
    login,
    loginWithGoogle,
    loginWithFacebook,
    logout,
    forgotPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
