import React from 'react';
import { Link, useLocation } from 'react-router';
import useTheme from '../../../hooks/useTheme';
import useRole from '../../../hooks/useRole';
import useAuth from '../../../hooks/useAuth';
import DashboardSidebarSkeleton from './DashboardSidebarSkeleton';
import logoImage from '../../../assets/logo/logo-square.png';

const DashboardSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { theme } = useTheme();
  const { user, loading } = useAuth();
  const { role, isRoleLoading } = useRole();
  const location = useLocation();

  if (isRoleLoading || loading) {
    return <DashboardSidebarSkeleton theme={theme} sidebarOpen={sidebarOpen} />;
  }

  const userMenuItems = [
    { icon: '📝', label: 'Participate', href: '/dashboard/my-participate' },
    {
      icon: '🏆',
      label: 'Winning Contests',
      href: '/dashboard/my-winning-contests',
    },
    { icon: '👤', label: 'Profile', href: '/dashboard/profile' },
  ];

  const creatorMenuItems = [
    { icon: '➕', label: 'Add Contest', href: '/dashboard/add-contest' },
    { icon: '📋', label: 'My Contests', href: '/dashboard/my-contests' },
    { icon: '📤', label: 'Submissions', href: '/dashboard/submissions' },
  ];

  const adminMenuItems = [
    { icon: '👥', label: 'Manage Users', href: '/dashboard/manage-user' },
    {
      icon: '🥉',
      label: 'Manage Contests',
      href: '/dashboard/manage-contests',
    },
  ];

  const menuItems =
    role === 'admin'
      ? adminMenuItems
      : role === 'creator'
      ? creatorMenuItems
      : userMenuItems;

  const isActive = href => location.pathname === href;

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } h-screen sticky top-0 z-40 flex flex-col transition-all duration-300
        backdrop-blur-xl border-r
        ${
          theme === 'dark'
            ? 'bg-gray-900/80 border-gray-700 text-white'
            : 'bg-white/80 border-gray-200 text-gray-900'
        }`}
      >
        {/* ---------- Logo ---------- */}
        <Link
          to="/"
          className={`h-16 flex items-center px-4 border-b ${
            theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl  flex items-center justify-center text-white font-bold shadow-lg">
              <img src={logoImage} alt="DB" />
            </div>
            {sidebarOpen && (
              <span className="font-extrabold text-lg tracking-wide">
                ContestHub
              </span>
            )}
          </div>
        </Link>

        {/* ---------- Menu ---------- */}
        <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
          {menuItems.map(item => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                to={item.href}
                title={!sidebarOpen ? item.label : ''}
                className={`relative group flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300
                ${
                  active
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                    : theme === 'dark'
                    ? 'text-gray-300 hover:bg-gray-800'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {/* Active Indicator */}
                {active && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-full bg-white" />
                )}

                <span className="text-xl shrink-0">{item.icon}</span>
                {sidebarOpen && (
                  <span className="font-medium tracking-wide">
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* ---------- User Profile ---------- */}
        <div
          className={`h-16 px-4 flex items-center border-t ${
            theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
          }`}
        >
          {sidebarOpen ? (
            <div className="flex items-center gap-3 w-full">
              <img
                src={
                  user?.photoURL ||
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop'
                }
                alt="User"
                className="w-10 h-10 rounded-full ring-2 ring-[#bb2121]"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">
                  {user?.displayName || 'Anonymous User'}
                </p>
                <p className="text-xs text-gray-400 truncate capitalize">
                  {role}
                </p>
              </div>
            </div>
          ) : (
            <img
              src={
                user?.photoURL ||
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop'
              }
              alt="User"
              className="w-10 h-10 rounded-full ring-2 ring-[#bb2121] mx-auto"
            />
          )}
        </div>
      </aside>

      {/* ---------- Mobile Backdrop ---------- */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 sm:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default DashboardSidebar;
