import { useState, useRef } from 'react';
import { Eye, EyeOff, Upload, X } from 'lucide-react';
import Logo from '../../../Components/Logo';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import { Controller, useForm } from 'react-hook-form';
import { getImageUrl } from '../../../utility/getImageUrl';
import { getAuthErrorMessage } from '../../../utility/auth/getAuthErrorMessage';
import toast from 'react-hot-toast';
import { saveUser } from '../../../utility/auth/saveUser';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';

export default function SignUp() {
  const { createUser, updateUserProfile } = useAuth();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const location = useLocation();

  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const fileInputRef = useRef(null);

  const onSubmit = async data => {
    const { fullName, email, password, profilePicture } = data;
    setIsAuthenticating(true);

    try {
      const imageURL = (await getImageUrl(profilePicture)) || '';

      await createUser(email, password);
      await updateUserProfile(fullName, imageURL);

      saveUser({
        fullName,
        email,
        profilePicture: imageURL,
      });

      
      Swal.fire({
        title: 'Account created successfully 🎉',
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

  const handleImageUpload = e => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setPreviewImage(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setPreviewImage('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-bg">
      <div className="w-full max-w-lg">
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
            Create Account ✨
          </h2>
          <p className="text-center text-text-secondary mb-8">
            Join ContestHub and start competing
          </p>

          {/* ================= FORM ================= */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Profile Picture */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Profile Picture
              </label>

              <div className="flex items-start gap-4">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 cursor-pointer rounded-xl border-2 border-dashed
                  border-border/60 p-6 text-center hover:border-cyan-500
                  transition group"
                >
                  <Controller
                    name="profilePicture"
                    control={control}
                    rules={{ required: 'Profile picture is required' }}
                    render={({ field }) => (
                      <input
                        {...field}
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={e => {
                          field.onChange(e.target.files?.[0]);
                          handleImageUpload(e);
                        }}
                        value=""
                      />
                    )}
                  />

                  {previewImage ? (
                    <div className="flex flex-col items-center gap-2">
                      <img
                        src={previewImage}
                        alt="preview"
                        className="w-20 h-20 rounded-xl object-cover"
                      />
                      <p className="text-xs text-text-secondary group-hover:text-cyan-400">
                        Click to change
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-3">
                      <div className="p-3 rounded-lg bg-bg-surface/50">
                        <Upload className="w-6 h-6 text-text-secondary group-hover:text-cyan-400 transition" />
                      </div>
                      <p className="text-sm font-medium">
                        Upload profile photo
                      </p>
                      <p className="text-xs text-text-secondary">
                        JPG, PNG (Max 10MB)
                      </p>
                    </div>
                  )}
                </div>

                {previewImage && (
                  <button
                    type="button"
                    onClick={removeImage}
                    className="p-2 rounded-lg text-red-500
                    hover:bg-red-500/10 transition"
                    title="Remove image"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>

              {errors.profilePicture && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.profilePicture.message}
                </p>
              )}
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Your full name"
                {...register('fullName', {
                  required: 'Full name is required',
                })}
                className="w-full px-4 py-3 rounded-xl bg-bg-surface/50
                border border-border/50 placeholder:text-text-secondary
                focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500
                outline-none transition"
              />
              {errors.fullName && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
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
                  placeholder="Create a password"
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

            {/* Terms */}
            <div className="flex items-start gap-3 text-sm">
              <input
                type="checkbox"
                {...register('terms', {
                  required: 'Please accept terms & conditions',
                })}
                className="mt-1 w-4 h-4 rounded border-border
                text-cyan-500 focus:ring-cyan-500"
              />
              <p className="text-text-secondary">
                I agree to the{' '}
                <a href="#" className="text-cyan-400 hover:underline">
                  Privacy Policy
                </a>{' '}
                and{' '}
                <a href="#" className="text-cyan-400 hover:underline">
                  Terms of Use
                </a>
              </p>
            </div>
            {errors.terms && (
              <p className="text-sm text-red-500">{errors.terms.message}</p>
            )}

            {/* Submit */}
            <button
              disabled={isAuthenticating}
              type="submit"
              className="w-full py-3.5 rounded-xl font-semibold text-white
              bg-gradient-to-r from-blue-600 to-cyan-500
              hover:from-blue-700 hover:to-cyan-600
              focus:ring-4 focus:ring-cyan-500/40
              disabled:opacity-60 disabled:cursor-not-allowed
              transition-all"
            >
              {isAuthenticating ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          {/* ================= DIVIDER ================= */}
          <div className="my-6 flex items-center gap-4">
            <span className="flex-1 h-px bg-border/60" />
            <span className="text-sm text-text-secondary">or</span>
            <span className="flex-1 h-px bg-border/60" />
          </div>

          {/* ================= SOCIAL ================= */}
          <SocialLogin />

          {/* ================= FOOTER ================= */}
          <p className="text-center mt-6 text-sm text-text-secondary">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-cyan-400 hover:text-cyan-300 font-medium transition"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
