import React from 'react';
import { FaSearch, FaSlidersH } from 'react-icons/fa';

const AllContestHeader = ({
  theme,
  searchTerm,
  setSearchTerm,
  contests,
  sortBy,
  setSortBy,
  categories,
  setSelectedCategory,
  selectedCategory,
  refetch,
}) => {
  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* Gradient Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/15 via-purple-600/15 to-pink-600/15 blur-3xl" />

      <div className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* TITLE */}
          <div className="text-center mb-16">
            <h1
              className={`text-5xl sm:text-6xl font-extrabold tracking-tight ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
            >
              Explore{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Contests
              </span>
            </h1>
            <p
              className={`mt-6 text-xl max-w-2xl mx-auto ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              Choose from {contests.length}+ verified contests and prove your
              skills.
            </p>
          </div>

          {/* SEARCH + SORT */}
          <div
            className={` rounded-2xl mb-10 flex flex-col lg:flex-row gap-4`}
          >
            {/* Search */}
            <div className="flex-1 relative">
              <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search contests, keywords..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className={`w-full pl-12 pr-4 py-4 rounded-xl font-medium transition ${
                  theme === 'dark'
                    ? 'bg-slate-900 border border-slate-700 text-white placeholder-gray-500 focus:border-indigo-500'
                    : 'bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-indigo-500'
                }`}
              />
            </div>

            {/* Sort */}
            <div className="relative">
              <FaSlidersH className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className={`pl-11 pr-6 py-4 rounded-xl font-medium transition ${
                  theme === 'dark'
                    ? 'bg-slate-900 border border-slate-700 text-white'
                    : 'bg-gray-50 border border-gray-300 text-gray-900'
                }`}
              >
                <option value="newest">Newest</option>
                <option value="participants">Most Popular</option>
                <option value="prize">Highest Prize</option>
              </select>
            </div>

            {/* Search Button */}
            <button
              onClick={refetch}
              className="px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition shadow-lg hover:shadow-xl flex items-center gap-2 justify-center"
            >
              <FaSearch />
              Search
            </button>
          </div>

          {/* CATEGORIES */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 transform hover:-translate-y-1 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                    : theme === 'dark'
                    ? 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllContestHeader;
