import React from "react";

const DashboardSidebarSkeleton = ({ theme, sidebarOpen }) => {
  return (
    <div
      className={`${
        sidebarOpen ? "w-64" : "w-20"
      } transition-all duration-300 ${
        theme === "dark"
          ? "bg-slate-800 border-r border-slate-700"
          : "bg-white border-r border-gray-200"
      } flex-col h-screen sticky top-0 sm:flex`}
    >
      {/* Logo Skeleton */}
      <div
        className={`h-16 flex items-center px-4 border-b ${
          theme === "dark" ? "border-slate-700" : "border-gray-200"
        }`}
      >
        {sidebarOpen ? (
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gray-300 animate-pulse"></div>
            <div className="w-20 h-6 bg-gray-300 animate-pulse rounded"></div>
          </div>
        ) : (
          <div className="w-10 h-10 rounded-lg bg-gray-300 animate-pulse"></div>
        )}
      </div>

      {/* Menu Items Skeleton */}
      <nav className="flex-1 px-2 py-6 space-y-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
              theme === "dark" ? "bg-slate-700" : "bg-gray-100"
            } animate-pulse`}
          >
            <div className="w-6 h-6 bg-gray-300 rounded"></div>
            {sidebarOpen && (
              <div className="w-24 h-4 bg-gray-300 rounded"></div>
            )}
          </div>
        ))}
      </nav>

      {/* User Profile Skeleton */}
      <div
        className={`h-16 flex items-center px-4 border-t ${
          theme === "dark" ? "border-slate-700" : "border-gray-200"
        }`}
      >
        {sidebarOpen ? (
          <div className="flex items-center gap-3 w-full">
            <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse"></div>
            <div className="flex-1 space-y-1">
              <div className="w-20 h-4 bg-gray-300 animate-pulse rounded"></div>
              <div className="w-16 h-3 bg-gray-300 animate-pulse rounded"></div>
            </div>
          </div>
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse"></div>
        )}
      </div>
    </div>
  );
};

export default DashboardSidebarSkeleton;
