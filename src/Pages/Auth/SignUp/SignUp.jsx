import { useState, useRef } from "react";
import { Eye, EyeOff, Upload, X } from "lucide-react";
import Logo from "../../../Components/Logo";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import { Controller, useForm } from "react-hook-form";
import { getImageUrl } from "../../../utility/getImageUrl";
import { getAuthErrorMessage } from "../../../utility/auth/getAuthErrorMessage";
import toast from "react-hot-toast";
import { saveUser } from "../../../utility/auth/saveUser";
import useAuth from "../../../hooks/useAuth";

export default function SignUp() {
  const { createUser, updateUserProfile } = useAuth();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [isAuthenticating, setIsAuthticating] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const fileInputRef = useRef(null);
  const location = useLocation();

  const onSubmit = async (data) => {
    const { fullName, email, password, profilePicture } = data;
    setIsAuthticating(true);
    try {
      const imageURL = (await getImageUrl(profilePicture)) || "";

      await createUser(email, password);
      await updateUserProfile(fullName, imageURL);
      navigate(location.state || "/", { replace: true });

      saveUser({
        fullName,
        email,
        profilePicture: imageURL,
      });
    } catch (error) {
      const message = getAuthErrorMessage(error.code);
      toast.error(message);
    } finally {
      setIsAuthticating(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setPreviewImage("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-116">
          {/* Logo & Title */}
          <div className="mb-4 flex items-center justify-center">
            <Logo />
          </div>
          {/* Form Card */}
          <div className=" rounded-3xl shadow-2x">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Create your account
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              {/* Profile Image Upload */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-3">
                  Profile Picture
                </label>
                <div className="flex gap-4 items-start">
                  {/* Upload Area */}
                  <div
                    onClick={triggerFileInput}
                    className="flex-1 border-2 border-dashed border-border rounded-xl p-6 cursor-pointer hover:border-cyan-500 transition-colors group"
                  >
                    <Controller
                      name="profilePicture"
                      control={control}
                      rules={{ required: "Profile picture is required" }}
                      render={({ field }) => (
                        <input
                          {...field}
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            field.onChange(file);
                            handleImageUpload(e);
                          }}
                          className="hidden"
                          value=""
                        />
                      )}
                    />
                    {previewImage ? (
                      <div className="flex flex-col items-center gap-2">
                        <img
                          src={previewImage}
                          alt="user image"
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                        <p className="text-xs text-gray-500 group-hover:text-cyan-500 transition">
                          Click to change
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <div className="p-3 bg-placeholder/50 rounded-lg group-hover:bg-cyan-500/10 transition">
                          <Upload className="w-6 h-6 text-gray-500 group-hover:text-cyan-500 transition" />
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium">
                            Upload your photo
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            JPG, PNG or GIF (Max 10MB)
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Remove Button */}
                  {previewImage && (
                    <button
                      type="button"
                      onClick={removeImage}
                      className="mt-1 p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition"
                      title="Remove image"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
              {errors?.profilePicture && (
                <p className="text-red-500">
                  {errors?.profilePicture?.message}
                </p>
              )}

              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Full name
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  autoComplete="name"
                  {...register("fullName", {
                    required: "Full name is required",
                  })}
                  className="w-full bg-placeholder/50 px-4 py-3 border border-border rounded-xl placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50 transition"
                />
              </div>
              {errors?.fullName && (
                <p className="text-red-500">{errors.fullName.message}</p>
              )}

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
                    autoComplete="new-password"
                    {...register("password", {
                      required: "Paasword is required",
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
              </div>
              {errors?.password && (
                <p className="text-red-500">{errors?.password?.message}</p>
              )}

              {/* Terms Checkbox */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  {...register("terms", {
                    required: "Confirm Terms and Conditions",
                  })}
                  className="w-5 h-5 rounded bg-gray-800 border-gray-700 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-gray-900"
                />
                <label htmlFor="terms" className="text-sm text-gray-400">
                  I agree to the{" "}
                  <a
                    href="#"
                    className="text-cyan-400 hover:text-cyan-300 underline"
                  >
                    Privacy Policy
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="text-cyan-400 hover:text-cyan-300 underline"
                  >
                    Terms of Use
                  </a>
                </label>
              </div>
              {errors?.terms && (
                <p className="text-red-500">{errors?.terms?.message}</p>
              )}

              {/* Sign Up Button */}
              <button
                disabled={isAuthenticating}
                type="submit"
                className={`${
                  isAuthenticating ? "opacity-60" : "opacity-100"
                } w-full py-3.5 bg-linear-to-r from-blue-600 to-cyan-500 text-white font-medium rounded-xl hover:from-blue-700 hover:to-cyan-600 focus:outline-none focus:ring-4 focus:ring-cyan-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition`}
              >
                {isAuthenticating ? "Creating Account..." : "Sign Up"}
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
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-cyan-400 hover:text-cyan-300 font-medium"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
