import React, { useState } from 'react';
import useTheme from '../../../../hooks/useTheme';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Pencil, Save, X } from 'lucide-react';

const MyProfile = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();

  const [editingField, setEditingField] = useState(null);
  const [saving, setSaving] = useState(false);

  const {
    data: userData = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['user', user?.email],
    queryFn: async () => {
      const res = await axiosSecure(`/users/${user?.email}`);
      return res.data;
    },
  });

  const winPercentage =
    Math.round((userData?.totalWon / userData?.totalParticipated) * 100) || 0;

  const onSubmit = async data => {
    setSaving(true);
    try {
      const res = await axiosSecure.patch(`/users/${userData?._id}`, data);
      if (res.data.modifiedCount) {
        toast.success('Profile updated successfully ✨');
        setEditingField(null);
        refetch();
      }
    } catch {
      toast.error('Update failed');
    }
    setSaving(false);
  };

  if (isLoading) {
    return <p className="text-center mt-20 text-xl">Loading profile...</p>;
  }

  return (
    <div
      className={`relative min-h-screen overflow-hidden px-6 py-16 rounded-2xl `}
    >
      {/* background glow */}
      <div className="absolute -top-32 -left-32 w-[450px] h-[450px] bg-purple-500/30 rounded-full blur-3xl" />
      <div className="absolute top-1/3 -right-32 w-[450px] h-[450px] bg-indigo-500/30 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* title */}
        <h1 className="text-center text-5xl font-extrabold mb-14 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          My Profile
        </h1>

        {/* stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {[
            { label: 'Participated', value: userData?.totalParticipated || 0 },
            { label: 'Wins', value: userData?.totalWon || 0 },
            { label: 'Win Rate', value: `${winPercentage}%` },
          ].map(stat => (
            <div
              key={stat.label}
              className="rounded-2xl p-6 bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-white/20 shadow-xl"
            >
              <p className="text-sm text-gray-500">{stat.label}</p>
              <h3 className="text-3xl font-extrabold mt-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {stat.value}
              </h3>
            </div>
          ))}
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10"
        >
          {/* profile card */}
          <div className="rounded-3xl p-8 bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-white/20 shadow-2xl">
            {/* avatar */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 blur-md opacity-70" />
                <img
                  src={userData.profilePicture}
                  className="relative w-28 h-28 rounded-full border-4 border-white object-cover"
                />
              </div>

              {editingField === 'profilePicture' && (
                <input
                  {...register('profilePicture')}
                  defaultValue={userData.profilePicture}
                  className="mt-4 w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-800"
                />
              )}

              <button
                type="button"
                onClick={() => setEditingField('profilePicture')}
                className="mt-3 text-sm text-indigo-500 hover:underline"
              >
                Change photo
              </button>

              <h2 className="mt-4 text-2xl font-bold">{userData.fullName}</h2>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>

            {/* editable fields */}
            {['fullName', 'bio', 'address'].map(field => (
              <div key={field} className="mb-6">
                <div className="flex items-center justify-between">
                  <label className="font-semibold capitalize">{field}</label>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingField(field);
                      reset(userData);
                    }}
                    className="text-xs text-indigo-500"
                  >
                    <Pencil size={14} />
                  </button>
                </div>

                {editingField === field ? (
                  field === 'bio' ? (
                    <textarea
                      {...register(field)}
                      defaultValue={userData[field]}
                      rows="3"
                      className={`w-full p-2 rounded ${
                        theme === 'dark'
                          ? 'bg-gray-700 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    />
                  ) : (
                    <input
                      {...register(field)}
                      defaultValue={userData[field]}
                      className={`w-full p-2 rounded ${
                        theme === 'dark'
                          ? 'bg-gray-700 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    />
                  )
                ) : (
                  <p
                    className={`w-full p-2 rounded ${
                      theme === 'dark'
                        ? 'bg-gray-700 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    {userData[field] || '—'}
                  </p>
                )}
              </div>
            ))}

            {/* actions */}
            {editingField && (
              <div className="flex gap-4 mt-6">
                <button
                  disabled={saving}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg`}
                >
                  <Save size={18} />
                  {saving ? 'Saving...' : 'Save'}
                </button>
                <button
                  type="button"
                  onClick={() => setEditingField(null)}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl ${
                    theme === 'dark'
                      ? 'bg-gray-700 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <X size={18} /> Cancel
                </button>
              </div>
            )}

            {/* achievements */}
            <div className="mt-10">
              <h4 className="font-semibold mb-3">Achievements</h4>
              <div className="flex flex-wrap gap-3">
                {userData.totalWon >= 1 && (
                  <span className="px-4 py-1 rounded-full text-xs bg-emerald-500/10 text-emerald-600">
                    🥇 First Win
                  </span>
                )}
                {userData.totalWon >= 5 && (
                  <span className="px-4 py-1 rounded-full text-xs bg-purple-500/10 text-purple-600">
                    🔥 Rising Star
                  </span>
                )}
                {userData.totalParticipated >= 10 && (
                  <span className="px-4 py-1 rounded-full text-xs bg-indigo-500/10 text-indigo-600">
                    🎯 Active Member
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* win rate */}
          <div className="rounded-3xl p-10 bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-white/20 shadow-2xl flex flex-col items-center justify-center">
            <h2 className="text-3xl font-bold mb-8">Win Rate</h2>

            <div className="relative w-44 h-44">
              <svg viewBox="0 0 36 36" className="w-full h-full">
                <path
                  d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="3"
                  strokeDasharray={`${winPercentage}, 100`}
                  className="transition-all duration-700"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-4xl font-extrabold">
                {winPercentage}%
              </span>
            </div>

            <p className="mt-6 text-gray-600 dark:text-gray-300">
              {userData.totalWon || 0} wins from{' '}
              {userData.totalParticipated || 0} contests
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyProfile;
