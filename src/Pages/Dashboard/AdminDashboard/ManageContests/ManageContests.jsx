import React from 'react';
import useTheme from '../../../../hooks/useTheme';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import ContestTableRow from './ContestTableRow';

export default function ManageContests() {
  const axiosSecure = useAxiosSecure();
  const { theme } = useTheme();

  const {
    data: contests = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['contests'],
    queryFn: async () => {
      const res = await axiosSecure('/contests');
      return res.data;
    },
  });

  /* ================= LOADING ================= */
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p
          className={`text-lg font-semibold animate-pulse ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}
        >
          ⏳ Loading contests...
        </p>
      </div>
    );
  }

  /* ================= ERROR ================= */
  if (error) {
    return (
      <div className="p-6 text-center text-red-500 font-medium">
        ❌ Error loading contests: {error.message}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* ================= HEADER ================= */}
      <div
        className={`rounded-3xl p-6 md:p-8 border backdrop-blur-xl shadow-lg
        ${
          theme === 'dark'
            ? 'bg-slate-900/70 border-slate-700'
            : 'bg-white/80 border-gray-200'
        }`}
      >
        <p
          className={`text-sm font-medium mb-1 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}
        >
          🛡️ Admin / Dashboard
        </p>

        <h1
          className={`text-3xl md:text-4xl font-extrabold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}
        >
          🗂️ Manage Contests
        </h1>

        <p
          className={`mt-2 text-lg ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          Review, approve, reject, or delete contest submissions
        </p>
      </div>

      {/* ================= TABLE ================= */}
      <div
        className={`rounded-3xl border overflow-hidden backdrop-blur-xl shadow-xl
        ${
          theme === 'dark'
            ? 'bg-slate-900/70 border-slate-700'
            : 'bg-white/80 border-gray-200'
        }`}
      >
        <div className="overflow-x-auto">
          <table className="min-w-[1000px] w-full text-sm">
            {/* TABLE HEAD */}
            <thead className="sticky top-0 z-10">
              <tr
                className={`text-left ${
                  theme === 'dark'
                    ? 'bg-slate-800 text-gray-200'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <th className="px-6 py-4 font-semibold">🏆 Contest Name</th>
                <th className="px-6 py-4 font-semibold">📧 Creator Email</th>
                <th className="px-6 py-4 font-semibold">📌 Status</th>
                <th className="px-6 py-4 font-semibold">👁️ Details</th>
                <th className="px-6 py-4 font-semibold text-center">
                  ⚙️ Actions
                </th>
              </tr>
            </thead>

            {/* TABLE BODY */}
            <tbody
              className={`divide-y ${
                theme === 'dark' ? 'divide-slate-700' : 'divide-gray-200'
              }`}
            >
              {contests.map(contest => (
                <ContestTableRow
                  key={contest._id}
                  contest={contest}
                  theme={theme}
                  refetch={refetch}
                  axiosSecure={axiosSecure}
                />
              ))}

              {contests.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className={`py-12 text-center font-medium ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    😕 No contests found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
