import React from 'react';
import useTheme from '../../../hooks/useTheme';
import { motion } from 'framer-motion';


const RecentWinerHeader = () => {
  const { theme } = useTheme();
  return (
    <div className="flex flex-col gap-4 mb-16">
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`flex items-center gap-4
                   text-4xl sm:text-5xl font-extrabold
                   ${theme === 'dark' ? 'text-[#fff]' : 'text-black'}`}
      >
        {/* Animated Icon */}
        <motion.span
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="text-5xl"
        >
          🥇
        </motion.span>
        Recent Winner
      </motion.h2>

      {/* Accent Gradient Line */}
      <div
        className="w-28 h-1 rounded-full
                      bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500"
      />
    </div>
  );
};

export default RecentWinerHeader;