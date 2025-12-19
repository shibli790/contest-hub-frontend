import React from "react";
import { Link } from "react-router";
import { FcBusinessman } from 'react-icons/fc';


const ContestCard = ({ contest, index, theme, getCategoryColor }) => {
  return (
    <div
      className={`flex flex-col h-full rounded-2xl overflow-hidden transition-all duration-300 transform hover:-translate-y-1 bg-bg-surface/30 border-border/50 border shadow-sm`}
      style={{
        animation: `slideUpIn 0.5s ease-out forwards`,
        animationDelay: `${index * 0.1}s`,
        opacity: 0,
      }}
    >
      {/* Image Container */}
      <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-linear-to-br from-indigo-300 to-purple-300 shrink-0">
        <img
          src={contest.bannerImage}
          alt={contest.name}
          className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"></div>

        {/* Category Badge */}
      </div>

      {/* Content Container */}
      <div className="p-5 sm:p-6 flex flex-col grow gap-4">
        {/* Title */}
        <div className="flex items-center justify-between gap-3">
          <h3
            className={`text-lg sm:text-xl font-bold leading-snug line-clamp-2 transition-colors duration-300 `}
          >
            {contest.name}
          </h3>
          <div
            className={` px-3 py-1.5 rounded-lg text-xs font-bold text-black bg-[#f236a1] ${getCategoryColor(
              contest.category
            )} shadow-lg backdrop-blur-sm`}
          >
            {contest.category}
          </div>
        </div>

        {/* Description */}
        <p
          className={`text-sm leading-relaxed line-clamp-2 grow text-text-secondary`}
        >
          {contest.description.slice(0, 65)}…
        </p>

        {/* Participants Count Section */}
        <div
          className={`flex items-center gap-3 pt-3 border-t ${
            theme === 'dark' ? 'border-slate-700' : 'border-gray-200'
          }`}
        >
          <span className="text-xl">
            <FcBusinessman />
          </span>
          <div className="flex gap-1 items-center">
            <span
              className={`text-xs font-medium ${
                theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
              }`}
            >
              Participants
            </span>
            <span className="text-sm sm:text-base font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {contest.participants.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Details Button */}
      </div>
      <Link
        to={`/contests/${contest._id}`}
        className={`w-full mt-2 py-2.5 px-4 rounded-b-lg font-semibold text-sm sm:text-base flex items-center justify-center gap-2 transition-all duration-300 transform active:scale-95 bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white hover:shadow-lg hover:shadow-indigo-500/40 hover:-translate-y-0.5  
          }`}
      >
        View Details
        <svg
          className="w-4 h-4 transition-transform duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
      </Link>

      {/* CSS Animations */}
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

export default ContestCard;
