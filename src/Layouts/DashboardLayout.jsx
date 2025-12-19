import React, { useState } from "react";
import { Outlet } from "react-router";
import useTheme from "../hooks/useTheme";
import DashboardSidebar from "../Pages/Shared/DashboardSidebar/DashboardSidebar";
import DashboardHeader from "../Pages/Shared/DashboardHeader/DashboardHeader";

const DashboardLayout = () => {
  const { theme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div
      className={`flex h-screen transition-colors duration-300 bg-background`}
    >
      {/* Sidebar */}
      <DashboardSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <DashboardHeader
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Content Area */}
        <main
          className={`flex-1 overflow-y-auto ${
            theme === "dark"
              ? "bg-linear-to-b from-slate-900 to-slate-800"
              : "bg-linear-to-b from-gray-50 to-white"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
