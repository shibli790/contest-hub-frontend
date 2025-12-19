import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router';
import ContestCard from '../../Components/ContestCard';
import useTheme from '../../hooks/useTheme';
import useAuth from '../../hooks/useAuth';
import AllContestHeader from './AllContestHeader';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const AllContests = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.get('search') || '';
  const [searchTerm, setSearchTerm] = useState(searchQuery);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  const {
    data: allContest = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['allContest', searchTerm],
    queryFn: async () => {
      const result = await axiosSecure(`/contests/type/approved`);
      return result.data;
    },
  });

  const categories = ['All', ...new Set(allContest.map(c => c.category))];

  const getCategoryColor = category => {
    const colors = {
      design: 'from-pink-500 to-rose-500',
      programming: 'from-blue-500 to-cyan-500',
      development: 'from-purple-500 to-indigo-500',
      mobile: 'from-green-500 to-emerald-500',
      'data science': 'from-orange-500 to-red-500',
      security: 'from-red-500 to-pink-500',
      devops: 'from-cyan-500 to-blue-500',
      'ai/ml': 'from-violet-500 to-purple-500',
    };
    return colors[category] || 'from-indigo-500 to-purple-500';
  };

  const handleContestClick = contestId => {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate(`/contest/${contestId}`);
  };

  return (
    <div
      className={` min-h-screen transition-colors duration-300 ${
        theme === 'dark' ? 'bg-slate-900' : 'bg-gray-50'
      }`}
    >
      {/* HEADER */}
      <AllContestHeader
        theme={theme}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        contests={allContest}
        sortBy={sortBy}
        setSortBy={setSortBy}
        categories={categories}
        setSelectedCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
        refetch={refetch}
      />

      {/* CONTENT */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* LOADING STATE */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className={`h-80 rounded-2xl animate-pulse ${
                    theme === 'dark' ? 'bg-slate-800' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          ) : allContest.length > 0 ? (
            <>
              {/* RESULTS INFO */}
              <div className="flex items-center justify-between mb-10">
                <div
                  className={`inline-flex items-center font-bold  gap-3 px-5 py-2.5 rounded-full text-xl  backdrop-blur ${
                    theme === 'dark'
                      ? 'bg-slate-800/60 text-gray-300 border border-slate-700'
                      : 'bg-white/70 text-gray-700 border border-gray-200'
                  }`}
                >
                  Contests{' '}
                  <span className="text-indigo-600 dark:text-indigo-400">
                    Found
                  </span>
                </div>
                <div
                  className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-full text-sm font-semibold backdrop-blur ${
                    theme === 'dark'
                      ? 'bg-slate-800/60 text-gray-300 border border-slate-700'
                      : 'bg-white/70 text-gray-700 border border-gray-200'
                  }`}
                >
                  <span className="text-indigo-600 dark:text-indigo-400">
                   Total  {allContest.length}
                  </span>
                </div>
              </div>

              {/* GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {allContest.map((contest, index) => (
                  <div
                    key={contest._id}
                    style={{
                      animation: `slideUpIn 0.4s ease-out forwards`,
                      animationDelay: `${index * 0.05}s`,
                      opacity: 0,
                    }}
                  >
                    <ContestCard
                      contest={contest}
                      index={index}
                      theme={theme}
                      getCategoryColor={getCategoryColor}
                      onDetailsClick={() => handleContestClick(contest._id)}
                    />
                  </div>
                ))}
              </div>
            </>
          ) : (
            /* EMPTY STATE */
            <div className="text-center py-24">
              <div className="text-7xl mb-6">🔍</div>
              <h3
                className={`text-3xl font-bold mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                No Contests Found
              </h3>
              <p
                className={`text-lg max-w-md mx-auto ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                Try adjusting your search keywords, category filters, or sorting
                options to discover new contests.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ANIMATIONS */}
      <style jsx>{`
        @keyframes slideUpIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default AllContests;
