import React from 'react';
import useTheme from '../../../../hooks/useTheme';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../../hooks/useAuth';
import { Trophy, Sparkles } from 'lucide-react';

const MyWinningContests = () => {
  const { theme } = useTheme();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: winnings = [], isLoading } = useQuery({
    enabled: !!user,
    queryKey: ['winnings', user?.email],
    queryFn: async () => {
      const res = await axiosSecure(`/contests/winner/${user?.email}`);
      return res.data;
    },
  });

  /* ---------- Skeleton ---------- */
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse space-y-5 w-full max-w-md">
          <div className="h-6 bg-gray-300 rounded w-1/2" />
          <div className="h-28 bg-gray-300 rounded-2xl" />
          <div className="h-28 bg-gray-300 rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen py-12 px-6 ${
        theme === 'dark'
          ? 'bg-gradient-to-br rounded-2xl from-gray-900 via-gray-800 to-black text-white'
          : 'bg-gradient-to-br rounded-2xl from-green-50 via-emerald-50 to-blue-50 text-gray-900'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* ---------- Header ---------- */}
        <div className="text-center mb-14">
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-xl">
              <Trophy className="w-10 h-10" />
            </div>
          </div>
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            My Winning Contests
          </h1>
          <p className="mt-3 text-lg text-gray-500 dark:text-gray-400">
            Celebrate your achievements 🎉
          </p>
        </div>

        {/* ---------- Empty State ---------- */}
        {winnings.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Sparkles className="w-16 h-16 text-green-500 mb-5" />
            <h3 className="text-2xl font-semibold mb-2">No wins yet</h3>
            <p className="text-gray-500 max-w-md">
              Participate in contests and your victories will appear here.
            </p>
          </div>
        )}

        {/* ---------- Cards ---------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {winnings.map((win, index) => (
            <div
              key={win._id}
              className="relative group rounded-2xl p-6 backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 border border-white/30 dark:border-gray-700 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              style={{ animationDelay: `${index * 90}ms` }}
            >
              {/* Winner Badge */}
              <span className="absolute -top-4 right-6 px-4 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg animate-pulse">
                🏆 Winner
              </span>

              {/* Contest Name */}
              <h2 className="text-xl font-bold mb-3 text-green-600 dark:text-green-400">
                {win.name}
              </h2>

              {/* Title */}
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 line-clamp-2">
                {win.title}
              </p>

              {/* Prize */}
              <div className="flex items-center justify-between mt-auto">
                <span className="px-4 py-2 rounded-xl text-sm font-semibold bg-green-500/10 text-green-600 dark:text-green-400">
                  💰 Prize: {win.prizeMoney}
                </span>
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition pointer-events-none bg-gradient-to-br from-green-500/10 to-blue-500/10" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyWinningContests;
