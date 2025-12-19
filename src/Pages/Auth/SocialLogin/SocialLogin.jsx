import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { getAuthErrorMessage } from "../../../utility/auth/getAuthErrorMessage";
import useAuth from "../../../hooks/useAuth";
import { saveUser } from "../../../utility/auth/saveUser";

const SocialLogin = () => {
  const { signInWithGoogle } = useAuth();
  const [isAuthenticating, setIsAuthticating] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  const handleGoogleLogin = async () => {
    setIsAuthticating(true);
    try {
      const { user } = await signInWithGoogle();
      navigate(location.state || "/", { replace: true });
      toast.success("Successfully logged in with Google!");
      saveUser({
        fullName: user.displayName,
        email: user.email,
        profilePicture: user.photoURL,
      });
    } catch (error) {
      const message = getAuthErrorMessage(error.code);
      toast.error(message);
    } finally {
      setIsAuthticating(false);
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="w-full py-3.5 bg-gray-800 border border-gray-700 text-white font-medium rounded-xl hover:bg-gray-750 flex items-center justify-center gap-3 transition"
    >
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path
          fill="#EA4335"
          d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.59 4.418 1.559L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115z"
        />
        <path
          fill="#34A853"
          d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.734-4.856l-4.026 3.115C3.198 21.302 7.27 24 12 24c3.055 0 5.782-1.145 7.91-3l-3.87-3.987z"
        />
        <path
          fill="#4A90E2"
          d="M19.834 21c1.735-1.89 2.91-4.764 2.91-8 0-.54-.05-1.06-.15-1.57h-10.59V15.8h7.73c-.33 1.72-1.29 3.18-2.79 4.2l3.87 3.987z"
        />
        <path
          fill="#FBBC05"
          d="M5.266 14.235A7.077 7.077 0 0 1 4.91 12c0-.776.1-1.53.27-2.235l-4.026-3.115C.222 8.99 0 10.46 0 12c0 1.54.222 3.01.658 4.35l4.608-3.115z"
        />
      </svg>
      {isAuthenticating ? "Login in..." : "Continue with Google"}
    </button>
  );
};

export default SocialLogin;
