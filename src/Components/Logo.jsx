import { Trophy } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router';
import logo from '../assets/logo/CONTEST_LOGO1.png';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center cursor-pointer">
      <div className={`p-2 rounded-lg`}>
        {/* <Trophy className={`w-6 h-6`} /> */}
        <img className={`w-10 `} src={logo} alt="" />
      </div>
      <span
        className={`text-2xl font-bold tracking-wide bg-linear-to-r from-blue-600 via-cyan-500 to-purple-600 bg-clip-text text-transparent`}
      >
        ContestHub
      </span>
    </Link>
  );
};

export default Logo;
