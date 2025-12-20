import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import Logo from '../../../Components/Logo';
import { Eye, EyeOff } from 'lucide-react';
import SocialLogin from '../SocialLogin/SocialLogin';
import useAuth from '../../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { getAuthErrorMessage } from '../../../utility/auth/getAuthErrorMessage';
import Swal from 'sweetalert2';

const Login = () => {
  const { signIn } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const onSubmit = async data => {
    setIsAuthenticating(true);
    try {
      await signIn(data.email, data.password);
    
      Swal.fire({
        title: 'Login successful 🎉 ',
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
    <div className="min-h-screen flex items-center justify-center px-4 bg-bg">
      <div className="w-full max-w-md">
        {/* ================= LOGO ================= */}
        <div className="flex justify-center mb-6">
          <Logo />
        </div>

        {/* ================= CARD ================= */}
        <div
          className="rounded-3xl p-8 md:p-10 border shadow-2xl backdrop-blur-xl
          bg-bg-surface/70 border-border/50"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
            Welcome Back 👋
          </h2>
          <p className="text-center text-text-secondary mb-8">
            Sign in to continue to ContestHub
          </p>

          {/* ================= FORM ================= */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                {...register('email', { required: 'Email is required' })}
                className="w-full px-4 py-3 rounded-xl bg-bg-surface/50
                border border-border/50 placeholder:text-text-secondary
                focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500
                outline-none transition"
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  {...register('password', {
                    required: 'Password is required',
                  })}
                  className="w-full px-4 py-3 rounded-xl bg-bg-surface/50
                  border border-border/50 placeholder:text-text-secondary
                  focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500
                  outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2
                  text-text-secondary hover:text-text-primary transition"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-text-secondary">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-border bg-bg-surface
                  text-cyan-500 focus:ring-cyan-500"
                />
                Remember me
              </label>

              <Link
                to="/forgot-password"
                className="text-cyan-400 hover:text-cyan-300 transition"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isAuthenticating}
              className="w-full py-3.5 rounded-xl font-semibold text-white
              bg-gradient-to-r from-blue-600 to-cyan-500
              hover:from-blue-700 hover:to-cyan-600
              focus:ring-4 focus:ring-cyan-500/40
              disabled:opacity-60 disabled:cursor-not-allowed
              transition-all"
            >
              {isAuthenticating ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* ================= DIVIDER ================= */}
          <div className="my-6 flex items-center gap-4">
            <span className="flex-1 h-px bg-border/60" />
            <span className="text-sm text-text-secondary">or</span>
            <span className="flex-1 h-px bg-border/60" />
          </div>

          {/* ================= SOCIAL LOGIN ================= */}
          <SocialLogin />

          {/* ================= FOOTER ================= */}
          <p className="text-center mt-6 text-sm text-text-secondary">
            Don’t have an account?{' '}
            <Link
              to="/signup"
              className="text-cyan-400 hover:text-cyan-300 font-medium transition"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
