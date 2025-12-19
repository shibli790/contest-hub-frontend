export const getAuthErrorMessage = (errorCode) => {
  switch (errorCode) {
    case "auth/email-already-in-use":
      return "This email is already registered. Try logging in.";

    case "auth/invalid-credential":
      return "The provided credential is invalid. Please try again.";

    case "auth/weak-password":
      return "Password must be at least 6 characters.";

    case "auth/user-not-found":
      return "No account found with this email.";

    case "auth/wrong-password":
      return "Incorrect password. Please try again.";

    case "auth/invalid-email":
      return "Please enter a valid email address.";

    case "auth/too-many-requests":
      return "Too many attempts. Please try again later.";

    case "auth/network-request-failed":
      return "Network error. Check your internet connection.";

    // Google Login Errors
    case "auth/popup-closed-by-user":
      return "Popup closed before completing sign in.";

    case "auth/popup-blocked":
      return "Popup blocked by your browser. Enable popup and retry.";

    case "auth/cancelled-popup-request":
      return "Sign-in popup was cancelled.";

    case "auth/account-exists-with-different-credential":
      return "You already have an account with a different login method.";

    case "auth/operation-not-supported-in-this-environment":
      return "Google login not supported in this browser environment.";

    default:
      return "Something went wrong. Please try again.";
  }
};
