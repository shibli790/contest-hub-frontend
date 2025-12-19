import React from 'react';
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaGithub } from 'react-icons/fa';
import Logo from '../../../Components/Logo';

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-secondary border-t border-border/50">
      {/* Ambient Glow */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 py-20">
        {/* ================= TOP GRID ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-5">
            <Logo />
            <p className="text-sm leading-relaxed text-text-secondary max-w-md">
              ContestHub is a modern competition platform where creators host
              challenges, participants compete globally, and winners earn real
              rewards.
            </p>

            {/* Social */}
            <div className="flex gap-3 pt-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 flex items-center justify-center rounded-xl
                bg-bg-surface/50 border border-border/40
                text-text-secondary hover:text-white
                hover:bg-indigo-600 transition-all"
              >
                <FaFacebookF />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 flex items-center justify-center rounded-xl
                bg-bg-surface/50 border border-border/40
                text-text-secondary hover:text-white
                hover:bg-indigo-600 transition-all"
              >
                <FaLinkedinIn />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 flex items-center justify-center rounded-xl
                bg-bg-surface/50 border border-border/40
                text-text-secondary hover:text-white
                hover:bg-indigo-600 transition-all"
              >
                <FaTwitter />
              </a>

              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 flex items-center justify-center rounded-xl
                bg-bg-surface/50 border border-border/40
                text-text-secondary hover:text-white
                hover:bg-indigo-600 transition-all"
              >
                <FaGithub />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold uppercase mb-5 text-text-primary">
              Product
            </h4>
            <ul className="space-y-3 text-sm text-text-secondary">
              {[
                'Browse Contests',
                'Create Contest',
                'Pricing',
                'Leaderboard',
                'Winners',
              ].map(item => (
                <li key={item}>
                  <a href="#" className="hover:text-indigo-500 transition">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold uppercase mb-5 text-text-primary">
              Resources
            </h4>
            <ul className="space-y-3 text-sm text-text-secondary">
              {[
                'Documentation',
                'Tutorials',
                'API Reference',
                'Blog',
                'Release Notes',
              ].map(item => (
                <li key={item}>
                  <a href="#" className="hover:text-indigo-500 transition">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold uppercase mb-5 text-text-primary">
              Support
            </h4>
            <ul className="space-y-3 text-sm text-text-secondary">
              {[
                'Help Center',
                'Contact Support',
                'Report Issue',
                'Community',
                'FAQs',
              ].map(item => (
                <li key={item}>
                  <a href="#" className="hover:text-indigo-500 transition">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ================= DIVIDER ================= */}
        <div className="my-12 h-px w-full bg-linear-to-r from-transparent via-border to-transparent" />

        {/* ================= BOTTOM BAR ================= */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-text-secondary">
          <p>© 2025 ContestHub. All rights reserved.</p>

          <div className="flex flex-wrap gap-6">
            {['Privacy Policy', 'Terms', 'Security', 'Cookies'].map(item => (
              <a
                key={item}
                href="#"
                className="hover:text-indigo-500 transition"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
