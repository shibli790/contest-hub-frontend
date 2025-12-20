import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router';
import Container from '../../../Components/Container';
import useTheme from '../../../hooks/useTheme';
import ProfileDropdown from './ProfileDropdown';
import MobileNav from './MobileNav';
import Logo from '../../../Components/Logo';
import useAuth from '../../../hooks/useAuth';
import ToogleTheme from '../../../Components/ToogleTheme';
import NavbarSkeleton from './NavbarSkeleton';
import './navbar.css';

function Navbar() {
  const { user, logOut, loading } = useAuth();
  const { theme } = useTheme();
  const location = useLocation();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'All Contests', href: '/all-contests' },
    { name: 'Win Board', href: '/leaderboard' },
  ];

  /* ================= CLICK OUTSIDE ================= */
  useEffect(() => {
    const handleClickOutside = e => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (loading) return <NavbarSkeleton />;

  return (
    <nav
      className="sticky top-0 left-0 right-0 z-50
      backdrop-blur shadow-xl min-h-16 py-1.5
      bg-background border-b border-border/80 transition-all duration-300"
    >
      <Container>
        <div className="flex items-center justify-between h-16 px-4">
          {/* ================= LOGO ================= */}
          <Logo />

          {/* ================= DESKTOP NAV ================= */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => {
              const isActive = location.pathname === link.href;

              return (
                <NavLink
                  key={link.name}
                  to={link.href}
                  className={`relative font-medium transition-all duration-300
                  ${
                    isActive
                      ? 'text-primary'
                      : theme === 'dark'
                      ? 'text-gray-300 hover:text-primary'
                      : 'text-gray-700 hover:text-primary'
                  }`}
                >
                  {link.name}

                  {/* underline */}
                  <span
                    className={`absolute left-0 -bottom-1 h-0.5 bg-primary
                    transition-all duration-300
                    ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}
                  />
                </NavLink>
              );
            })}
          </div>

          {/* ================= RIGHT ACTIONS ================= */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <ToogleTheme />

            {/* User / Auth */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="p-1 rounded-full transition hover:scale-105"
                >
                  <img
                    src={user.photoURL}
                    alt="profile"
                    className="w-10 h-10 rounded-full border-2 border-primary object-cover"
                  />
                </button>

                {isDropdownOpen && (
                  <ProfileDropdown user={user} theme={theme} logOut={logOut} />
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-6 py-2 rounded-lg font-medium transition hover:text-primary"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="px-6 py-2 rounded-3xl font-medium
                  bg-bg-reverse text-text-reverse transition hover:scale-105"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* ================= MOBILE TOGGLE ================= */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors duration-300
              ${
                theme === 'dark'
                  ? 'text-gray-300 hover:bg-gray-800'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </Container>

      {/* ================= MOBILE NAV ================= */}
      {isMobileMenuOpen && (
        <MobileNav
          navLinks={navLinks}
          closeMenu={() => setIsMobileMenuOpen(false)}
        />
      )}
    </nav>
  );
}

export default Navbar;
