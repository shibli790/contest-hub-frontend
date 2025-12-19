import { useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import useRole from '../../../hooks/useRole';
import useTheme from '../../../hooks/useTheme';
import toast from 'react-hot-toast';
import { Bell, LogOut, Menu } from 'lucide-react';

const DashboardHeader = ({ sidebarOpen, setSidebarOpen }) => {
  const { theme } = useTheme();
  const { role, isRoleLoading } = useRole();
  const navigate = useNavigate();
  const { logOut } = useAuth();

  const handleLogout = async () => {
    await logOut();
    navigate('/login');
    toast.success('Logout Successful');
  };

  if (isRoleLoading) {
    return (
      <div className="h-16 flex items-center px-6">
        <div className="animate-pulse h-6 w-40 bg-gray-300 rounded" />
      </div>
    );
  }

  return (
    <header
      className={`sticky top-0 z-40 h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between backdrop-blur-xl border-b transition-all duration-300 ${
        theme === 'dark'
          ? 'bg-gray-900/70 border-gray-700 text-white'
          : 'bg-white/70 border-gray-200 text-gray-900'
      }`}
    >
      {/* ---------- Left ---------- */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`p-2 rounded-xl transition hover:scale-105 sm:hidden ${
            theme === 'dark' ? 'hover:bg-gray-700/60' : 'hover:bg-gray-100'
          }`}
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Title */}
        <h1 className="text-lg md:text-2xl font-extrabold tracking-tight">
          <span className="capitalize">{role}</span>{' '}
          <span className="text-indigo-500">Dashboard</span>
        </h1>

        {/* Role Badge */}
        <span className="hidden sm:inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow">
          {role?.toUpperCase()}
        </span>
      </div>

      {/* ---------- Right ---------- */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <button
          className={`relative p-2 rounded-xl transition hover:scale-105 ${
            theme === 'dark' ? 'hover:bg-gray-700/60' : 'hover:bg-gray-100'
          }`}
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full" />
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="group flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300
          bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-md
          hover:shadow-xl hover:-translate-y-0.5"
        >
          <LogOut className="w-4 h-4 group-hover:rotate-12 transition" />
          Logout
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;
