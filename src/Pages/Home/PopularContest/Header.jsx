import React from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import useTheme from '../../../hooks/useTheme';


const Header = () => {
    const { theme } = useTheme();
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-20">
      {/* Left Content */}
      <div className="space-y-3">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`flex items-center gap-4 text-4xl sm:text-5xl font-extrabold 
                     ${theme === 'dark' ? 'text-[#fff]' : 'text-black'}`}
        >
          <motion.span
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-5xl"
          >
            🏆
          </motion.span>
          Popular Contests
        </motion.h2>

        {/* Accent line */}
        <div className="w-24 h-1 rounded-full bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500" />
      </div>

      {/* Right Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <Link
          to="/all-contests"
          className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl
                     font-semibold text-white
                     bg-linear-to-r from-indigo-600 to-purple-600
                     hover:from-indigo-700 hover:to-purple-700
                     transition-all duration-300
                     shadow-lg shadow-purple-500/30 hover:shadow-2xl
                     hover:-translate-y-1"
        >
          Show All Contests
          <span
            className="w-8 h-8 flex items-center justify-center rounded-full 
                           bg-white/20 group-hover:bg-white/30 transition"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </span>
        </Link>
      </motion.div>
    </div>
  );
};

export default Header;
