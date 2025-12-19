import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useTheme from '../../../../hooks/useTheme';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { getImageUrl } from '../../../../utility/getImageUrl';
import useAuth from '../../../../hooks/useAuth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const AddContest = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState('');
  const axiosSecure = useAxiosSecure();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleImageUpload = e => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async data => {
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Add!',
      }).then(async result => {
        if (result.isConfirmed) {
          const imageURL = (await getImageUrl(data.bannerImage)) || '';

          const contestDetails = {
            ...data,
            bannerImage: imageURL,
            participants: 0,
            submissions: 0,
            winner: '',
            winnerImage: '',
            winnerEmail: '',
            creatorName: user?.displayName,
            creatorImage: user?.photoURL,
            creatorEmail: user?.email,
            deadline: new Date(data.deadline).toISOString().split('T')[0],
            createdAt: new Date().toISOString().split('T')[0],
            status: 'pending',
          };

          const res = await axiosSecure.post('/contests', contestDetails);

          if (res.data.insertedId) {
            toast.success('Your Contest is Added. Wait for admin approval.');
            navigate('/dashboard/my-contests');
          }
        }
      });
    } catch {
      toast.error('Your Contest is not added');
    }
  };

  const inputStyle = `
    w-full px-4 py-3 rounded-xl font-medium transition-all duration-300
    ${
      theme === 'dark'
        ? 'bg-slate-800 border border-slate-600 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20'
        : 'bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20'
    }
  `;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* ================= HEADER ================= */}
      <div
        className={`mb-12 rounded-3xl p-6 md:p-10 text-center border backdrop-blur-xl shadow-lg
  ${
    theme === 'dark'
      ? 'bg-slate-900/70 border-slate-700'
      : 'bg-white/80 border-gray-200'
  }`}
      >
        <p
          className={`text-sm font-medium mb-2 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}
        >
          📢 Dashboard / Create Contest
        </p>

        <h1
          className={`text-4xl md:text-5xl font-extrabold tracking-tight
    ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
        >
          🚀 Create New Contest
        </h1>

        <p
          className={`mt-4 text-lg max-w-2xl mx-auto
    ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}
        >
          Launch a contest, attract top talents, and discover outstanding ideas
          from creative participants around the world.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`rounded-3xl p-6 md:p-10 border shadow-xl backdrop-blur-xl
        ${
          theme === 'dark'
            ? 'bg-slate-900/70 border-slate-700'
            : 'bg-white/80 border-gray-200'
        }`}
      >
        <div className="space-y-10">
          {/* Contest Info */}
          <div>
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
              Contest Information
            </h2>

            <div className="space-y-5">
              <input
                placeholder="Contest Name"
                {...register('name', { required: 'Contest name is required' })}
                className={inputStyle}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}

              <input
                placeholder="Contest Title"
                {...register('title', { required: 'Title is required' })}
                className={inputStyle}
              />
            </div>
          </div>

          {/* Banner Upload */}
          <div>
            <h2 className="text-xl font-bold mb-4">Contest Banner</h2>

            <div
              className={`rounded-2xl border-2 border-dashed p-8 text-center transition-all
              ${
                theme === 'dark'
                  ? 'border-slate-600 bg-slate-800/40 hover:border-indigo-500'
                  : 'border-gray-300 bg-gray-50 hover:border-indigo-500'
              }`}
            >
              <Controller
                name="bannerImage"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <input
                    type="file"
                    accept="image/*"
                    id="banner"
                    className="hidden"
                    onChange={e => {
                      field.onChange(e.target.files[0]);
                      handleImageUpload(e);
                    }}
                  />
                )}
              />

              {previewImage ? (
                <>
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-full h-64 object-cover rounded-xl shadow-lg ring-4 ring-indigo-500/20 mb-4"
                  />
                  <label
                    htmlFor="banner"
                    className="text-indigo-500 font-semibold cursor-pointer"
                  >
                    Change Image
                  </label>
                </>
              ) : (
                <label htmlFor="banner" className="cursor-pointer">
                  <p className="text-4xl mb-2">🖼️</p>
                  <p className="font-semibold">Click to upload banner</p>
                </label>
              )}
            </div>
          </div>

          {/* Description */}
          <textarea
            rows="4"
            placeholder="Contest Description"
            {...register('description', { required: true })}
            className={inputStyle}
          />

          <textarea
            rows="4"
            placeholder="Task Details"
            {...register('taskDetails', { required: true })}
            className={inputStyle}
          />

          {/* Grid Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-2xl border border-indigo-500/30 bg-indigo-500/5">
            <input
              type="number"
              placeholder="Prize Money ($)"
              {...register('prizeMoney', { required: true })}
              className={inputStyle}
            />

            <select
              {...register('category', { required: true })}
              className={inputStyle}
            >
              <option value="ContestType">Contest type</option>
              <option value="nature">Nature</option>
              <option value="portrait">Portrait</option>
              <option value="street">Street</option>
              <option value="travel">Travel</option>
              <option value="wildlife">Wildlife</option>
              <option value="creative">Creative</option>
            </select>

            <input
              type="number"
              placeholder="Entry Price ($)"
              {...register('price', { required: true })}
              className={inputStyle}
            />

            <Controller
              name="deadline"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <DatePicker
                  selected={field.value}
                  onChange={field.onChange}
                  minDate={new Date()}
                  placeholderText="Deadline"
                  className={inputStyle}
                />
              )}
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              className="flex-1 py-4 rounded-xl font-bold text-white
              bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600
              hover:scale-[1.02] transition-all shadow-xl"
            >
              🚀 Publish Contest
            </button>

            <button
              type="button"
              className={`flex-1 py-4 rounded-xl font-bold ${
                theme === 'dark'
                  ? 'bg-slate-700 text-white'
                  : 'bg-gray-200 text-gray-900'
              }`}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddContest;
