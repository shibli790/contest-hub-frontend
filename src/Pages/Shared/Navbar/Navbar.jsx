import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import Container from "../../../Components/Container";
import useTheme from "../../../hooks/useTheme";
import { Link, NavLink } from "react-router";
import "./navbar.css";
import ProfileDropdown from "./ProfileDropdown";
import MobileNav from "./MobileNav";
import Logo from "../../../Components/Logo";
import useAuth from "../../../hooks/useAuth";
import ToogleTheme from "../../../Components/ToogleTheme";
import NavbarSkeleton from "./NavbarSkeleton";

function Navbar() {
  const { user, logOut, loading } = useAuth();
  const { theme } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "All Contests", href: "/all-contests" },
    { name: "Leaderboard", href: "/leaderboard" },
  ];

  // handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (loading) {
    return <NavbarSkeleton />;
  }

  return (
    <nav
      className={`sticky shadow-xl top-0 left-0 right-0 z-50 backdrop-blur min-h-16 py-1.5 transition-all duration-300 bg-background border-b border-border/80`}
      
    >
      <Container>
        <div className="flex items-center justify-between h-16 px-4">
          {/* Logo */}
          <Logo />

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.href}
                className={`relative font-medium transition-all duration-300 group`}
              >
                {link.name}
                <span
                  className={`absolute left-0 -bottom-1 w-0 h-0.5 transition-all duration-300 group-hover:w-full bg-primary`}
                />
              </NavLink>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Dark/Light Mode Toggle */}
            <ToogleTheme />

            {/* Profile or Sign In */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`flex items-center space-x-2 p-1 rounded-full transition-all duration-300 cursor-pointer`}
                >
                  <img
                    src={user.photoURL}
                    alt={user.name}
                    className={`w-10 h-10 rounded-full border-2 object-cover transition-all duration-300 border-primary`}
                  />
                </button>

                {isDropdownOpen && (
                  <ProfileDropdown user={user} theme={theme} logOut={logOut} />
                )}
              </div>
            ) : (
              <div className="flex items-center">
                <Link
                  to="/login"
                  className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 tracking-wide`}
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className={`px-6 py-2 rounded-3xl font-medium transition-all duration-300 bg-bg-reverse text-text-reverse tracking-wide`}
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors duration-300 ${
                theme === "dark"
                  ? "text-gray-300 hover:bg-gray-800"
                  : "text-gray-700 hover:bg-gray-100"
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

      {/* Mobile Menu */}
      {isMobileMenuOpen && <MobileNav navLinks={navLinks} />}
    </nav>
  );
}

export default Navbar;
