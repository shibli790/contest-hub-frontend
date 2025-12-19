import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import Logo from "../../../Components/Logo";
import { Eye, EyeOff } from "lucide-react";
import SocialLogin from "../SocialLogin/SocialLogin";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { getAuthErrorMessage } from "../../../utility/auth/getAuthErrorMessage";

const Login = () => {
  const { signIn } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticating, setIsAuthticating] = useState(false);
  const location = useLocation();

  const onSubmit = async (data) => {
    setIsAuthticating(true);
    try {
      await signIn(data.email, data.password);
      toast.success("Login Successful");
      navigate(location.state || "/", { replace: true });
    } catch (error) {
      const message = getAuthErrorMessage(error.code);
      toast.error(message);
    } finally {
      setIsAuthticating(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-116">
        {/* Logo & Title */}
        <div className="mb-4 flex items-center justify-center">
          <Logo />
        </div>
        {/* Form Card */}
        <div className=" rounded-3xl shadow-2x">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Sign in to your account
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                {...register("email", { required: "Email is required" })}
                className="w-full px-4 py-3 bg-placeholder/50 border border-border rounded-xl placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50 transition"
              />
            </div>
            {errors?.email && (
              <p className="text-red-500">{errors?.email?.message}</p>
            )}

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="w-full px-4 py-3 bg-placeholder/50 border border-border rounded-xl placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors?.password && (
                <p className="text-red-500">{errors?.password?.message}</p>
              )}
            </div>

            {/* remember me and forgot password */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  className="w-5 h-5 rounded bg-gray-800 border-gray-700 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-gray-900"
                />
                <label htmlFor="terms" className="text-sm text-gray-400">
                  Remember me
                </label>
              </div>
              <Link>Fogot Password?</Link>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              className="w-full py-3.5 bg-linear-to-r from-blue-600 to-cyan-500 text-white font-medium rounded-xl hover:from-blue-700 hover:to-cyan-600 focus:outline-none focus:ring-4 focus:ring-cyan-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {isAuthenticating ? "Login In..." : "Log in"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-5 flex items-center">
            <div className="flex-1 border-t border-gray-700"></div>
            <span className="px-4 text-sm text-gray-500">or</span>
            <div className="flex-1 border-t border-gray-700"></div>
          </div>

          {/* Google Sign Up */}
          <SocialLogin />

          {/* Sign In Link */}
          <p className="text-center mt-6 text-gray-400 text-sm">
            don't have an account?{" "}
            <Link
              to="/signup"
              className="text-cyan-400 hover:text-cyan-300 font-medium"
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
