import React from "react";
import { Link } from "react-router";

const MobileNav = ({ navLinks }) => {
  return (
    <div
      className={`md:hidden border-b border-border transition-all duration-300 bg-background`}
    >
      <div className="px-4 py-4 space-y-3">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.href}
            className={`block px-4 py-2.5 rounded-lg font-medium transition-all duration-300`}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MobileNav;
