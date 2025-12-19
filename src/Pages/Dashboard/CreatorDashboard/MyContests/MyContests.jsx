import React from 'react';
import { Link } from 'react-router';
import useTheme from '../../../../hooks/useTheme';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useAuth from '../../../../hooks/useAuth';
import MyContestsTableRow from './MyContestsTableRow';
import { FiFolderMinus } from 'react-icons/fi';

const MyContests = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const axiosSecure = useAxiosSecure();

  const {
    data: myContests = [],
    refetch,
    isLoading,
  } = useQuery({
    enabled: !!user?.email,
    queryKey: ['my-contests', user?.email],
    queryFn: async () => {
      const res = await axiosSecure(`/contests/email/${user?.email}`);
      return res.data;
    },
  });

  const statsData = [
    { label: 'Total Contests', value: myContests.length, icon: '📊' },
    {
      label: 'Active',
      value: myContests.filter(c => c.status === 'approved').length,
      icon: '✅',
    },
    {
      label: 'Submissions',
      value: myContests.reduce((acc, c) => acc + (c.submissions || 0), 0),
      icon: '📤',
    },
    {
      label: 'Participants',
      value: myContests.reduce((acc, c) => acc + (c.participants || 0), 0),
      icon: '👥',
    },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p
          className={`text-lg font-semibold animate-pulse ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}
        >
          ⏳ Loading your contests...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      {/* ================= HEADER ================= */}
      <div
        className={`rounded-3xl p-6 md:p-8 border flex flex-col md:flex-row md:items-center md:justify-between gap-6
        backdrop-blur-xl shadow-lg
        ${
          theme === 'dark'
            ? 'bg-slate-900/70 border-slate-700'
            : 'bg-white/80 border-gray-200'
        }`}
      >
        {/* Left */}
        <div>
          <p
            className={`text-sm font-medium mb-1 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}
          >
            📂 Dashboard / Contests
          </p>
          <h1
            className={`text-3xl md:text-4xl font-extrabold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            🏆 My Contests
          </h1>
          <p
            className={`mt-2 text-lg ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            Manage, monitor and analyze your contests
          </p>
        </div>

        {/* Right */}
        <Link
          to="/dashboard/add-contest"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white
          bg-gradient-to-r from-indigo-600 to-purple-600
          hover:scale-105 transition-all shadow-lg"
        >
          ➕ Create Contest
        </Link>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <div
            key={index}
            className={`rounded-2xl p-6 border backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg
            ${
              theme === 'dark'
                ? 'bg-slate-900/70 border-slate-700'
                : 'bg-white/80 border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl">{stat.icon}</span>
              <span className="text-xs font-semibold px-2 py-1 rounded-full bg-indigo-500/10 text-indigo-500">
                Overview
              </span>
            </div>
            <p
              className={`text-3xl font-extrabold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
            >
              {stat.value}
            </p>
            <p
              className={`mt-1 text-sm font-medium ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* ================= TABLE / EMPTY ================= */}
      {myContests.length > 0 ? (
        <div
          className={`rounded-3xl border overflow-hidden backdrop-blur-xl shadow-xl
          ${
            theme === 'dark'
              ? 'bg-slate-900/70 border-slate-700'
              : 'bg-white/80 border-gray-200'
          }`}
        >
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="sticky top-0 z-10">
                <tr
                  className={`text-left ${
                    theme === 'dark'
                      ? 'bg-slate-800 text-gray-200'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {[
                    '🏆 Contest',
                    '🏷️ Category',
                    '📌 Status',
                    '👥 Participants',
                    '📤 Submissions',
                    '💰 Prize',
                    '⚙️ Actions',
                  ].map(head => (
                    <th key={head} className="px-6 py-4 font-semibold">
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody
                className={`divide-y ${
                  theme === 'dark' ? 'divide-slate-700' : 'divide-gray-200'
                }`}
              >
                {myContests.map(contest => (
                  <MyContestsTableRow
                    key={contest._id}
                    contest={contest}
                    theme={theme}
                    refetch={refetch}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div
          className={`flex flex-col items-center justify-center text-center p-20 rounded-3xl border-2 border-dashed backdrop-blur-xl
          ${
            theme === 'dark'
              ? 'bg-slate-900/60 border-slate-700'
              : 'bg-gray-50 border-gray-200'
          }`}
        >
          <div className="mb-6 p-6 rounded-full bg-indigo-500/10 text-indigo-500">
            <FiFolderMinus size={44} />
          </div>

          <h2
            className={`text-2xl md:text-3xl font-extrabold mb-3 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            😕 No Contests Found
          </h2>

          <p
            className={`max-w-md text-lg ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            You haven’t created any contests yet. Start by creating one to
            engage participants and showcase your ideas.
          </p>

          <Link
            to="/dashboard/add-contest"
            className="mt-6 px-6 py-3 rounded-xl font-semibold text-white
            bg-gradient-to-r from-indigo-600 to-purple-600
            hover:scale-105 transition-all"
          >
            ➕ Create Your First Contest
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyContests;
