import React from "react";
import { LayoutDashboard, LogOut } from "lucide-react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import useRole from "../../../hooks/useRole";
const ProfileDropdown = ({ theme, user, logOut }) => {
  const navigate = useNavigate();
  const { role } = useRole();

  const handleLogout = async () => {
    await logOut();
    navigate("/login");
    toast.success("Logout Successful");
  };

  return (
    <div
      className={`absolute right-0 mt-3 w-56 rounded-xl shadow-2xl border border-border overflow-hidden animate-slideDown transition-all duration-200 bg-bg-surface`}
    >
      {/* Dropdown Header */}
      <div className={`px-4 py-3 border-b border-border`}>
        <div className="flex items-center space-x-3">
          <img
            src={user.photoURL}
            alt={user.displayName}
            className={`w-10 h-10 rounded-full border-2 object-cover ${
              theme === "dark" ? "border-blue-400" : "border-blue-600"
            }`}
          />
          <div>
            <p
              className={`text-sm font-semibold ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              {user.displayName}
            </p>
            <p
              className={`text-xs ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              View Profile
            </p>
          </div>
        </div>
      </div>

      {/* Dropdown Menu Items */}
      <div className="py-2">
        <Link
          to={`${
            role === "admin"
              ? "/dashboard/manage-user"
              : role === "creator"
              ? "/dashboard/my-contests"
              : "/dashboard/profile"
          }`}
          className={`flex items-center space-x-3 px-4 py-2.5 transition-colors duration-200 group ${
            theme === "dark"
              ? "text-gray-300 hover:bg-gray-700 hover:text-blue-400"
              : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
          }`}
        >
          <LayoutDashboard
            className={`w-5 h-5 transition-colors ${
              theme === "dark"
                ? "text-gray-500 group-hover:text-blue-400"
                : "text-gray-500 group-hover:text-blue-600"
            }`}
          />
          <span className="text-sm font-medium">Dashboard</span>
        </Link>
        <button
          onClick={handleLogout}
          className={`w-full flex items-center space-x-3 px-4 py-2.5 transition-colors duration-200 group ${
            theme === "dark"
              ? "text-gray-300 hover:bg-red-900/20 hover:text-red-400"
              : "text-gray-700 hover:bg-red-50 hover:text-red-600"
          }`}
        >
          <LogOut
            className={`w-5 h-5 transition-colors ${
              theme === "dark"
                ? "text-gray-500 group-hover:text-red-400"
                : "text-gray-500 group-hover:text-red-600"
            }`}
          />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileDropdown;
