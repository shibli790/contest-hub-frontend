import React from 'react';
import useTheme from '../../../../hooks/useTheme';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import UserTableRow from './UserTableRow';

export default function ManageUser() {
  const axiosSecure = useAxiosSecure();
  const { theme } = useTheme();

  const {
    data: users = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure('/users');
      return res.data;
    },
  });

  const ROLE_OPTIONS = ['user', 'creator', 'admin'];

  /* ================= LOADING ================= */
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p
          className={`text-lg font-semibold animate-pulse ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}
        >
          ⏳ Loading users...
        </p>
      </div>
    );
  }

  /* ================= ERROR ================= */
  if (error) {
    return (
      <div className="p-6 text-center text-red-500 font-medium">
        ❌ Failed to load users
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
          👥 Manage Users
        </h1>

        <p
          className={`mt-2 text-lg ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          View users and manage their roles & permissions
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
          <table className="min-w-[720px] w-full text-sm">
            {/* TABLE HEAD */}
            <thead className="sticky top-0 z-10">
              <tr
                className={`text-left ${
                  theme === 'dark'
                    ? 'bg-slate-800 text-gray-200'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <th className="px-6 py-4 font-semibold">🙍 User</th>
                <th className="px-6 py-4 font-semibold">📧 Email</th>
                <th className="px-6 py-4 font-semibold">🎭 Role</th>
                <th className="px-6 py-4 font-semibold">⚙️ Actions</th>
              </tr>
            </thead>

            {/* TABLE BODY */}
            <tbody
              className={`divide-y ${
                theme === 'dark' ? 'divide-slate-700' : 'divide-gray-200'
              }`}
            >
              {users.map(user => (
                <UserTableRow
                  key={user._id}
                  user={user}
                  ROLE_OPTIONS={ROLE_OPTIONS}
                />
              ))}

              {users.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className={`py-12 text-center font-medium ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    😕 No users found
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
