import { FaTrophy, FaMedal, FaCrown } from 'react-icons/fa';
import useTheme from '../../hooks/useTheme';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Leaderboard = () => {
  const { theme } = useTheme();
  const axiosSecure = useAxiosSecure();

  const { data: users = [] } = useQuery({
    queryKey: ['top-users'],
    queryFn: async () => {
      const res = await axiosSecure('/top-users');
      return res.data;
    },
  });

  return (
    <section
      className={`min-h-screen ${
        theme === 'dark'
          ? 'bg-slate-900 text-slate-200'
          : 'bg-gray-50 text-gray-800'
      }`}
    >
      {/* HERO */}
      <div className="relative overflow-hidden ">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/200 via-orange-400/200 to-purple-500/200 blur-3xl" />

        <div
          className={`relative py-24 ${
            theme === 'dark' ? 'bg-slate-800/80' : 'bg-white'
          }`}
        >
          <div className="max-w-6xl mx-auto px-4 text-center">
            {/* Background Glow */}
            <div className="absolute -top-24 -left-24 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl" />
            <h1 className="text-4xl md:text-6xl font-extrabold">
              Global <span className="text-yellow-500">Leaderboard</span>
            </h1>
            <p
              className={`mt-6 max-w-2xl mx-auto text-lg ${
                theme === 'dark' ? 'text-slate-400' : 'text-gray-600'
              }`}
            >
              Celebrating top performers based on total contest wins across the
              platform.
            </p>
          </div>
        </div>
      </div>

      {/* TOP 3 PODIUM */}
      <div className="max-w-6xl mx-auto px-4 -mt-16">
        <div className="grid md:grid-cols-3 gap-6">
          {users.slice(0, 3).map((user, index) => (
            <div
              key={user._id}
              className={`relative p-6 rounded-2xl text-center shadow-lg transform hover:-translate-y-2 transition ${
                index === 0
                  ? 'bg-gradient-to-br from-yellow-400 to-orange-400 text-white'
                  : theme === 'dark'
                  ? 'bg-slate-800 border border-slate-700'
                  : 'bg-white border border-gray-200'
              }`}
            >
              {index === 0 && (
                <FaCrown className="absolute -top-5 left-1/2 -translate-x-1/2 text-4xl text-yellow-300" />
              )}

              <div className="text-4xl mb-3">
                {index === 0 ? (
                  <FaTrophy />
                ) : (
                  <FaMedal
                    className={
                      index === 1 ? 'text-gray-400' : 'text-orange-400'
                    }
                  />
                )}
              </div>

              <h3 className="text-xl font-bold">{user.fullName}</h3>
              <p className="mt-2 font-semibold">
                Wins: <span className="text-lg">{user.totalWon}</span>
              </p>

              <span className="absolute top-4 right-4 text-sm font-bold opacity-70">
                #{index + 1}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* TABLE */}
      <div className="max-w-5xl mx-auto px-4 py-20">
        <div
          className={`rounded-2xl overflow-hidden shadow-md ${
            theme === 'dark'
              ? 'bg-slate-800 border border-slate-700'
              : 'bg-white border border-gray-200'
          }`}
        >
          <table className="w-full">
            <thead
              className={`${theme === 'dark' ? 'bg-slate-700' : 'bg-gray-100'}`}
            >
              <tr>
                <th className="px-6 py-4 text-left">Rank</th>
                <th className="px-6 py-4 text-left">User</th>
                <th className="px-6 py-4 text-left">Total Wins</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user._id}
                  className={`border-t transition ${
                    theme === 'dark'
                      ? 'border-slate-700 hover:bg-slate-700'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <td className="px-6 py-4 font-bold">
                    {index < 3 ? (
                      <span className="text-yellow-500">#{index + 1}</span>
                    ) : (
                      index + 1
                    )}
                  </td>
                  <td className="px-6 py-4">{user.fullName}</td>
                  <td className="px-6 py-4 font-extrabold text-indigo-600">
                    {user.totalWon}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Leaderboard;
