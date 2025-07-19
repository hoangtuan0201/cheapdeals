import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebaseConfig";

// Sign up with email and password
export const signUpWithEmail = async (email, password, fullName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Update user profile with full name
    await updateProfile(user, {
      displayName: fullName,
    });

    return {
      success: true,
      user: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      },
    };
  } catch (error) {
    console.error("Sign up error:", error);

    // Handle specific Firebase error codes
    let errorMessage = "An error occurred during sign up";

    switch (error.code) {
      case "auth/email-already-in-use":
        errorMessage =
          "This email address is already registered. Please use a different email or try signing in.";
        break;
      case "auth/weak-password":
        errorMessage =
          "Password is too weak. Please choose a stronger password.";
        break;
      case "auth/invalid-email":
        errorMessage = "Please enter a valid email address.";
        break;
      case "auth/operation-not-allowed":
        errorMessage =
          "Email/password accounts are not enabled. Please contact support.";
        break;
      case "auth/network-request-failed":
        errorMessage =
          "Network error. Please check your internet connection and try again.";
        break;
      default:
        errorMessage =
          error.message || "An unexpected error occurred during sign up";
        break;
    }

    return {
      success: false,
      error: errorMessage,
    };
  }
};

// Sign in with email and password
export const signInWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    return {
      success: true,
      user: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      },
    };
  } catch (error) {
    console.error("Sign in error:", error);

    // Handle specific Firebase error codes
    let errorMessage = "An error occurred during sign in";

    switch (error.code) {
      case "auth/user-not-found":
        errorMessage =
          "No account found with this email address. Please check your email or sign up.";
        break;
      case "auth/wrong-password":
        errorMessage = "Incorrect password. Please try again.";
        break;
      case "auth/invalid-email":
        errorMessage = "Please enter a valid email address.";
        break;
      case "auth/user-disabled":
        errorMessage =
          "This account has been disabled. Please contact support.";
        break;
      case "auth/too-many-requests":
        errorMessage = "Too many failed attempts. Please try again later.";
        break;
      case "auth/network-request-failed":
        errorMessage =
          "Network error. Please check your internet connection and try again.";
        break;
      default:
        errorMessage =
          error.message || "An unexpected error occurred during sign in";
        break;
    }

    return {
      success: false,
      error: errorMessage,
    };
  }
};

// Sign out
export const signOutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

// Reset password
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

// Sign in with Google
export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;

    return {
      success: true,
      user: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      },
    };
  } catch (error) {
    console.error("Google sign in error:", error);

    // Handle specific Firebase error codes
    let errorMessage = "An error occurred during Google sign in";

    switch (error.code) {
      case "auth/popup-closed-by-user":
        errorMessage = "Sign in was cancelled. Please try again.";
        break;
      case "auth/popup-blocked":
        errorMessage =
          "Popup was blocked by your browser. Please allow popups and try again.";
        break;
      case "auth/network-request-failed":
        errorMessage =
          "Network error. Please check your internet connection and try again.";
        break;
      case "auth/account-exists-with-different-credential":
        errorMessage =
          "An account already exists with the same email address but different sign-in credentials.";
        break;
      default:
        errorMessage =
          error.message || "An unexpected error occurred during Google sign in";
        break;
    }

    return {
      success: false,
      error: errorMessage,
    };
  }
};

// Sign in with Facebook
export const signInWithFacebook = async () => {
  try {
    const provider = new FacebookAuthProvider();
    // Request additional permissions
    provider.addScope("email");
    provider.addScope("public_profile");

    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;

    return {
      success: true,
      user: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      },
    };
  } catch (error) {
    console.error("Facebook sign in error:", error);

    // Handle specific Firebase error codes
    let errorMessage = "An error occurred during Facebook sign in";

    switch (error.code) {
      case "auth/popup-closed-by-user":
        errorMessage = "Sign in was cancelled. Please try again.";
        break;
      case "auth/popup-blocked":
        errorMessage =
          "Popup was blocked by your browser. Please allow popups and try again.";
        break;
      case "auth/network-request-failed":
        errorMessage =
          "Network error. Please check your internet connection and try again.";
        break;
      case "auth/account-exists-with-different-credential":
        errorMessage =
          "An account already exists with the same email address but different sign-in credentials. Please try signing in with your original method.";
        break;
      case "auth/auth-domain-config-required":
        errorMessage =
          "Facebook authentication is not properly configured. Please contact support.";
        break;
      case "auth/cancelled-popup-request":
        errorMessage = "Only one popup request is allowed at one time.";
        break;
      default:
        errorMessage =
          error.message ||
          "An unexpected error occurred during Facebook sign in";
        break;
    }

    return {
      success: false,
      error: errorMessage,
    };
  }
};

// Get current user
export const getCurrentUser = () => {
  return auth.currentUser;
};

// Auth state observer
export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};
