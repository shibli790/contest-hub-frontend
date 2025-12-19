import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Sparkles, Zap, Trophy } from 'lucide-react';
import useTheme from '../../hooks/useTheme';
import { useNavigate } from 'react-router';

const BannerSection = () => {
  const [search, setSearch] = useState('');
  const { theme } = useTheme();
  const navigate = useNavigate();

  // quick contest type chips
  const contestTypes = [
    'nature',
    'portrait',
    'street',
    'travel',
    'wildlife',
    'creative',
  ];

  const handleSearch = e => {
    e.preventDefault();

    if (!search.trim()) return;

    navigate(`/all-contests?search=${encodeURIComponent(search)}`);
  };

  const handleTypeClick = type => {
    const normalized = type.toLowerCase();
    setSearch(normalized);
    navigate(`/all-contests?search=${normalized}`);
  };

  return (
    <section className="relative w-full  py-16 flex items-center justify-center overflow-hidden border-b border-border bg-background">
      {/* ===== Background Layers ===== */}
      <div className="absolute inset-0 bg-linear-to-br from-blue-500/10 via-cyan-500/5 to-purple-500/10" />

      {/* Animated Orbs */}
      <motion.div
        animate={{ scale: [1, 1.25, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-15 bg-purple-500"
      />

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute w-1 h-1 rounded-full bg-white/40"
          initial={{
            x: Math.random() * 1400,
            y: Math.random() * 900,
            opacity: 0.3,
          }}
          animate={{
            y: [0, -900],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 20 + Math.random() * 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}

      {/* ===== Content ===== */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative z-10 max-w-6xl mx-auto px-4 text-center"
      >
        {/* Heading */}
        <h1 className="relative text-6xl md:text-8xl font-black leading-tight tracking-tight">
          <span className="absolute inset-0 bg-linear-to-r from-blue-400 via-cyan-400 to-purple-400 blur-2xl opacity-30" />
          <span className="relative bg-linear-to-r from-blue-600 via-cyan-500 to-purple-600 bg-clip-text text-transparent">
            Create Fearlessly <br /> Compete & Win Big
          </span>
        </h1>

        {/* Description */}
        <p
          className={`mt-6 text-lg font-semibold md:text-xl leading-relaxed max-w-3xl mx-auto 
               ${theme === 'dark' ? 'text-[#fff]' : 'text-black'}`}
        >
          Join a global community of creators turning bold ideas into real
          rewards. From design and writing to gaming and business, this is where
          talent gets noticed.
        </p>

        {/* Search */}
        <motion.form
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.25, duration: 0.7, ease: 'easeOut' }}
          onSubmit={handleSearch}
          className={`mt-10 flex items-center rounded-2xl shadow-2xl overflow-hidden
  max-w-2xl mx-auto backdrop-blur-sm border transition-all duration-300 group
  ${
    theme === 'dark'
      ? 'bg-gray-800/60 border-gray-700/60 hover:border-cyan-500/40 focus-within:border-cyan-500/70'
      : 'bg-white/80 border-gray-200/60 hover:border-blue-400/40 focus-within:border-blue-500/70'
  }`}
        >
          {/* Icon */}
          <Search
            className={`ml-6 w-5 h-5 transition-colors duration-300
    ${
      theme === 'dark'
        ? 'text-gray-400 group-focus-within:text-cyan-400'
        : 'text-gray-500 group-focus-within:text-blue-600'
    }`}
          />

          {/* Input */}
          <input
            type="text"
            aria-label="Search contests"
            placeholder="Search contests… 🔍"
            className={`flex-1 px-5 py-4 outline-none text-base bg-transparent transition-colors
    ${
      theme === 'dark'
        ? 'text-white placeholder-gray-500 focus:text-white'
        : 'text-gray-900 placeholder-gray-600 focus:text-gray-900'
    }`}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          {/* Button */}
          <button
            type="submit"
            className={`px-8 py-4 font-semibold flex items-center gap-2
    transition-all duration-300 text-white
    ${
      theme === 'dark'
        ? 'bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg shadow-cyan-500/25'
        : 'bg-linear-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 shadow-lg shadow-blue-500/25'
    } hover:scale-[1.02] active:scale-95`}
          >
            <Search className="w-4 h-4" />
            Search
          </button>
        </motion.form>

        {/* Tags */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {contestTypes.map(type => (
            <button
              key={type}
              onClick={() => handleTypeClick(type)}
              className={`px-4 py-1 rounded-full text-sm transition ${
                search === type
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <button className="px-8 py-4 rounded-xl font-semibold text-white bg-linear-to-r from-blue-600 to-cyan-600 hover:scale-105 transition">
            🚀 Explore more Contests
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default BannerSection;
