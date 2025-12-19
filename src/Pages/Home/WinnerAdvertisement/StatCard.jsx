import React from "react";

const StatCard = ({ icon, label, value }) => {
  return (
    <div
      className="
    group relative overflow-hidden shadow-xl rounded-2xl p-6 text-center
    bg-white/70 dark:bg-white/5
    border border-gray-200/60 dark:border-white/10
    backdrop-blur-xl
    transition-all duration-300
    hover:-translate-y-1 hover:shadow-xl
  "
    >
      {/* Gradient Accent Line */}
      <span
        className="
    absolute inset-x-0 top-0 h-[3px]
    bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500
    opacity-70
  "
      />

      {/* Soft Glow */}
      <span
        className="
    absolute -top-24 -right-24 w-48 h-48 rounded-full
    bg-purple-500/20 blur-3xl
    opacity-0 group-hover:opacity-100
    transition
  "
      />

      {/* Icon */}
      <div className="text-4xl mb-3 relative z-10">{icon}</div>

      {/* Label */}
      <p className="text-sm font-medium mb-2 text-gray-600 dark:text-gray-400 relative z-10">
        {label}
      </p>

      {/* Value */}
      <p
        className="
    text-3xl font-extrabold
    bg-linear-to-r from-indigo-600 to-purple-600
    bg-clip-text text-transparent
    relative z-10
  "
      >
        {value}
      </p>
    </div>
  );
};

export default StatCard;
