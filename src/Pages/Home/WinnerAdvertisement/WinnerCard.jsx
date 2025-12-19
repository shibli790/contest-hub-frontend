import React from 'react';
import useTheme from '../../../hooks/useTheme';

const WinnerCard = ({ winner, index }) => {
    const { theme } = useTheme;
  return (
    <div
      className="
        group relative overflow-hidden rounded-2xl
        border border-border/50
        bg-white/70 dark:bg-white/5
        backdrop-blur-xl
        shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)]
        transition-all duration-500
        hover:-translate-y-3 hover:shadow-[0_25px_60px_-15px_rgba(99,102,241,0.45)]
      "
      style={{
        animation: `slideUpIn 0.6s ease-out forwards`,
        animationDelay: `${index * 0.1}s`,
        opacity: 0,
      }}
    >
      {/* ✨ Gradient Glow */}
      <span
        className="
          absolute -top-32 -right-32 w-72 h-72 rounded-full
          bg-indigo-500/20 blur-3xl
          opacity-0 group-hover:opacity-100
          transition duration-500
        "
      />

      {/* ✨ Shine Effect */}
      <span
        className="
          pointer-events-none absolute inset-0
          bg-gradient-to-tr from-white/10 via-transparent to-transparent
          opacity-0 group-hover:opacity-100
          transition
        "
      />

      {/* ===== Header ===== */}
      <div className="relative px-6 pt-6 pb-2">
        <div className="flex items-end justify-between mb-4">
          <div className="flex items-end gap-4">
            {/* Avatar */}
            <div className="relative">
              <img
                src={winner.avatar}
                alt={winner.name}
                className="
              w-16 h-16 rounded-full object-cover
              ring-4 ring-indigo-500/80
            "
              />
              <span className="absolute -bottom-2 -right-2 text-2xl">
                {winner.badge}
              </span>
            </div>

            {/* Name & Position */}
            <div>
              <div className="relative  ">
                <p className="text-xl font-semibold line-clamp-2 opacity-90">
                  {winner.name}
                </p>
              </div>
              <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                {winner.position}
              </p>
            </div>
          </div>

          {/* Badge */}
        </div>
      </div>

      {/* ===== Prize ===== */}
      <div className="relative px-6 py-4 border-t border-border/60">
        <p className="text-xs uppercase tracking-wider opacity-70 mb-1">
          Prize Money
        </p>
        <p
          className="
          text-2xl font-extrabold
          bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400
          bg-clip-text text-transparent
        "
        >
          ${winner.prize.toLocaleString()}
        </p>
      </div>

      {/* ===== Contest ===== */}
      <div className="relative px-6 py-3 border-t border-border/60">
        <p className="text-sm font-semibold line-clamp-2 opacity-90">
          {winner.contestName}
        </p>
      </div>

      {/* ===== Button ===== */}
      <button
        className={`
          group/btn w-full py-3 px-4
          font-semibold text-sm
          flex items-center justify-center gap-2
          transition-all duration-300
          active:scale-95
          ${
            theme === 'dark'
              ? 'text-indigo-400 hover:text-indigo-300'
              : 'text-indigo-600 hover:text-indigo-700'
          }
        `}
      >
        View Profile
        <svg
          className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1"
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
      </button>
    </div>
  );
};

export default WinnerCard;
