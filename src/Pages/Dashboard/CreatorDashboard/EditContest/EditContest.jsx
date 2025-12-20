import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import useTheme from '../../../../hooks/useTheme';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { getImageUrl } from '../../../../utility/getImageUrl';

const EditContest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const axiosSecure = useAxiosSecure();

  const isDark = theme === 'dark';

  /* ================= THEME CLASSES ================= */
  const cardClass = isDark
    ? 'bg-slate-800/90 border border-slate-700 shadow-xl'
    : 'bg-white border border-gray-200 shadow-lg';

  const labelClass = isDark ? 'text-gray-200' : 'text-gray-700';

  const inputClass = isDark
    ? 'bg-slate-700/80 border border-slate-600 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30'
    : 'bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30';

  const secondaryBtn = isDark
    ? 'bg-slate-700 text-gray-200 hover:bg-slate-600'
    : 'bg-gray-200 text-gray-800 hover:bg-gray-300';

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { data: contest = {}, isLoading } = useQuery({
    queryKey: ['contest-edit', id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axiosSecure.get(`/contests/${id}`);
      return res.data;
    },
  });

  useEffect(() => {
    if (contest?._id) {
      reset({
        name: contest.name || '',
        title: contest.title || '',
        description: contest.description || '',
        taskDetails: contest.taskDetails || '',
        prizeMoney: contest.prizeMoney || 0,
        price: contest.price || 0,
        category: contest.category || '',
        deadline: contest.deadline ? new Date(contest.deadline) : null,
        bannerImage: null,
      });
    }
  }, [contest, reset]);

  const onSubmit = async data => {
    try {
      let bannerImage = contest.bannerImage;

      if (data.bannerImage instanceof File) {
        bannerImage = await getImageUrl(data.bannerImage);
      }

      const updatedContest = {
        name: data.name,
        title: data.title,
        description: data.description,
        taskDetails: data.taskDetails,
        prizeMoney: Number(data.prizeMoney),
        price: Number(data.price),
        category: data.category,
        bannerImage,
        deadline: data.deadline.toISOString().split('T')[0],
      };

      await axiosSecure.patch(`/contests/${id}`, updatedContest);
      toast.success('🎉 Contest updated successfully');
      navigate('/dashboard/my-contests');
    } catch {
      toast.error('❌ Failed to update contest');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        ⏳ Loading...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* ================= HEADER ================= */}
      <div className="mb-12 text-center">
        <h1
          className={`text-4xl font-extrabold ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}
        >
          ✏️ Edit Contest
        </h1>
        <p className={`mt-3 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
          🚀 Update contest details before admin approval
        </p>
      </div>

      {/* ================= FORM ================= */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`rounded-2xl p-6 md:p-10 transition-all duration-300 ${cardClass}`}
      >
        <div className="space-y-10">
          {/* Contest Name */}
          <div>
            <label className={`block text-sm font-semibold mb-3 ${labelClass}`}>
              🏷️ Contest Name *
            </label>
            <input
              {...register('name', { required: 'Contest name is required' })}
              className={`w-full px-4 py-3 rounded-xl font-medium ${inputClass}`}
              placeholder="Web Design Showdown 2024"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Contest Title */}
          <div>
            <label className={`block text-sm font-semibold mb-3 ${labelClass}`}>
              📝 Contest Title *
            </label>
            <input
              {...register('title', { required: 'Contest title is required' })}
              className={`w-full px-4 py-3 rounded-xl font-medium ${inputClass}`}
              placeholder="Analyze datasets and build models"
            />
          </div>

          {/* Description */}
          <div>
            <label className={`block text-sm font-semibold mb-3 ${labelClass}`}>
              📖 Description *
            </label>
            <textarea
              rows={5}
              {...register('description', {
                required: 'Description is required',
              })}
              className={`w-full px-4 py-3 rounded-xl resize-none font-medium ${inputClass}`}
            />
          </div>

          {/* Task Details */}
          <div>
            <label className={`block text-sm font-semibold mb-3 ${labelClass}`}>
              🧩 Task Details *
            </label>
            <textarea
              rows={5}
              {...register('taskDetails', {
                required: 'Task details are required',
              })}
              className={`w-full px-4 py-3 rounded-xl resize-none font-medium ${inputClass}`}
            />
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label
                className={`block text-sm font-semibold mb-3 ${labelClass}`}
              >
                💰 Prize Money ($)
              </label>
              <input
                type="number"
                {...register('prizeMoney', { required: 'Required' })}
                className={`w-full px-4 py-3 rounded-xl font-medium ${inputClass}`}
              />
            </div>

            <div>
              <label
                className={`block text-sm font-semibold mb-3 ${labelClass}`}
              >
                🗂️ Category
              </label>
              <select
                {...register('category', { required: 'Required' })}
                className={`w-full px-4 py-3 rounded-xl font-medium ${inputClass}`}
              >
                <option value="">Select category</option>
                <option value="nature">Nature</option>
                <option value="portrait">Portrait</option>
                <option value="street">Street</option>
                <option value="travel">Travel</option>
                <option value="wildlife">Wildlife</option>
                <option value="creative">Creative</option>
              </select>
            </div>

            <div>
              <label
                className={`block text-sm font-semibold mb-3 ${labelClass}`}
              >
                💵 Price ($)
              </label>
              <input
                type="number"
                {...register('price', { required: 'Required' })}
                className={`w-full px-4 py-3 rounded-xl font-medium ${inputClass}`}
              />
            </div>

            <div>
              <label
                className={`block text-sm font-semibold mb-3 ${labelClass}`}
              >
                ⏰ Deadline
              </label>
              <Controller
                name="deadline"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    minDate={new Date()}
                    className={`w-full px-4 py-3 rounded-xl font-medium ${inputClass}`}
                    placeholderText="Select deadline"
                  />
                )}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-8">
            <button
              type="submit"
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600
                         text-white font-semibold hover:opacity-90 transition"
            >
              🚀 Update Contest
            </button>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className={`flex-1 py-3 rounded-xl font-semibold transition ${secondaryBtn}`}
            >
              ❌ Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditContest;
