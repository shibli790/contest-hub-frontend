import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { getAuthErrorMessage } from '../../../utility/auth/getAuthErrorMessage';
import useAuth from '../../../hooks/useAuth';
import { saveUser } from '../../../utility/auth/saveUser';
import Swal from 'sweetalert2';

const SocialLogin = () => {
  const { signInWithGoogle } = useAuth();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoogleLogin = async () => {
    setIsAuthenticating(true);
    try {
      const { user } = await signInWithGoogle();

      saveUser({
        fullName: user.displayName,
        email: user.email,
        profilePicture: user.photoURL,
      });

     
      Swal.fire({
        title: 'Logged in with Google Successfully ✨',
        icon: 'success',
        draggable: true,
      });
      navigate(location.state || '/', { replace: true });
    } catch (error) {
      toast.error(getAuthErrorMessage(error.code));
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      disabled={isAuthenticating}
      className={`w-full py-3.5 rounded-xl font-medium flex items-center justify-center gap-3
      border transition-all duration-300 group
      ${
        isAuthenticating
          ? 'opacity-60 cursor-not-allowed'
          : 'hover:border-cyan-500 hover:shadow-lg hover:shadow-cyan-500/20'
      }
      bg-bg-surface/60 border-border/50 backdrop-blur`}
    >
      {/* Google Icon */}
      <div
        className="w-9 h-9 flex items-center justify-center rounded-lg
        bg-white shadow-sm"
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
      </div>

      {/* Text */}
      <span className="text-text-primary group-hover:text-cyan-400 transition">
        {isAuthenticating ? 'Signing in...' : 'Continue with Google'}
      </span>
    </button>
  );
};

export default SocialLogin;
