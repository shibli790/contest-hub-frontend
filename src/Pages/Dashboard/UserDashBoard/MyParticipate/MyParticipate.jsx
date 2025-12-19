import React from 'react';
import useTheme from '../../../../hooks/useTheme';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useAuth from '../../../../hooks/useAuth';
import { Link } from 'react-router';
import { Calendar, ArrowRight, Trophy } from 'lucide-react';

const MyParticipate = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: contests = [], isLoading } = useQuery({
    enabled: !!user,
    queryKey: ['contests', user?.email],
    queryFn: async () => {
      const res = await axiosSecure(`/participate-contest/${user?.email}`);
      return res.data;
    },
  });

  /* ---------- Loading Skeleton ---------- */
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse space-y-4 w-full max-w-md">
          <div className="h-6 bg-gray-300 rounded w-2/3" />
          <div className="h-24 bg-gray-300 rounded-xl" />
          <div className="h-24 bg-gray-300 rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen py-12 px-6 ${
        theme === 'dark'
          ? 'bg-gradient-to-br rounded-2xl from-gray-900 via-gray-800 to-black text-white'
          : 'bg-gradient-to-br rounded-2xl from-indigo-50 via-blue-50 to-purple-50 text-gray-900'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* ---------- Header ---------- */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            My Participated Contests
          </h1>
          <p className="mt-3 text-lg text-gray-500 dark:text-gray-400">
            Track your competitions & payment status
          </p>
        </div>

        {/* ---------- Empty State ---------- */}
        {contests.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Trophy className="w-16 h-16 text-indigo-500 mb-4" />
            <h3 className="text-2xl font-semibold mb-2">No contests yet</h3>
            <p className="text-gray-500 mb-6">
              You haven’t participated in any contest.
            </p>
            <Link
              to="/all-contests"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg hover:scale-105 transition"
            >
              Explore Contests
            </Link>
          </div>
        )}

        {/* ---------- Cards ---------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {contests.map((contest, index) => (
            <div
              key={contest.contestId}
              className="group relative rounded-2xl p-6 backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 border border-white/30 dark:border-gray-700 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              {/* Status Badge */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">{contest.name}</h2>

                <span
                  className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${
                    contest.paymentStatus === 'Paid'
                      ? 'bg-green-500/10 text-green-600 dark:text-green-400'
                      : 'bg-red-500/10 text-red-600 dark:text-red-400'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full animate-pulse ${
                      contest.paymentStatus === 'Paid'
                        ? 'bg-green-500'
                        : 'bg-red-500'
                    }`}
                  />
                  {contest.paymentStatus}
                </span>
              </div>

              {/* Title */}
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 line-clamp-2">
                {contest.title}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  {new Date(contest.deadline).toLocaleDateString()}
                </div>

                <Link
                  to={`/contests/${contest.contestId}`}
                  className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold group-hover:gap-3 transition-all"
                >
                  View
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyParticipate;
