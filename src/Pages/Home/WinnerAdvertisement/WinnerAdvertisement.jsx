import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import useTheme from '../../../hooks/useTheme';
import Container from '../../../Components/Container';
import WinnerHeader from './WinnerHeader';
import StatCard from './StatCard';
import WinnerCard from './WinnerCard';
import { motion } from 'framer-motion';
import RecentWinerHeader from './RecentWinerHeader';

const WinnerAdvertisement = () => {
  const { theme } = useTheme;
  const [winners, setWinners] = useState([]);
  const [stats, setStats] = useState({
    totalWinners: 0,
    totalPrizeMoney: 0,
    activeContests: 0,
  });
  const [loading, setLoading] = useState(true);

  // Sample winner data
  const winnersData = [
    {
      id: 1,
      name: 'Daniel Carter',
      avatar:
        'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop',
      prize: 5000,
      contestName: 'Web Design Showdown',
      position: '1st Place',
      badge: '🥇',
    },
    {
      id: 2,
      name: 'Olivia Bennett',
      avatar:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop',
      prize: 3000,
      contestName: 'Algorithm Master Challenge',
      position: '1st Place',
      badge: '🥇',
    },
    {
      id: 3,
      name: 'Lucas Hernandez',
      avatar:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop',
      prize: 2000,
      contestName: 'UI/UX Innovation',
      position: '1st Place',
      badge: '🥇',
    },
    {
      id: 4,
      name: 'Sophia Reynolds',
      avatar:
        'https://images.unsplash.com/photo-1548142813-c348350df52b?w=150&h=150&fit=crop',
      prize: 2500,
      contestName: 'Full Stack Developer Quest',
      position: '1st Place',
      badge: '🥇',
    },
  ];


  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setWinners(winnersData.slice(0, 4));
      setStats({
        totalWinners: 1250,
        totalPrizeMoney: 125000,
        activeContests: 24,
      });
      setLoading(false);
    }, 600);
  }, []);

  if (loading) {
    return (
      <section
        className={`py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
          theme === 'dark'
            ? 'bg-linear-to-b from-slate-800 to-slate-900'
            : 'bg-linear-to-b from-gray-50 to-white'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`rounded-xl h-40 ${
                  theme === 'dark' ? 'bg-slate-700' : 'bg-gray-200'
                } animate-pulse`}
              ></div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`rounded-xl h-80 ${
                  theme === 'dark' ? 'bg-slate-700' : 'bg-gray-200'
                } animate-pulse`}
              ></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={` px-4 sm:px-6 lg:px-8 transition-colors duration-300 bg-background`}
    >
      <Container>
        {/* Winners Section Header */}
        <RecentWinerHeader />
        {/* Winners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {winners.map((winner, index) => (
            <WinnerCard key={winner.id} winner={winner} index={index} />
          ))}
        </div>

        {/* Section Header */}
        <WinnerHeader />
        {/* Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <StatCard
            icon="👥"
            label="Total Winners"
            theme={theme}
            value={stats.totalWinners.toLocaleString()}
          />
          <StatCard
            icon="💰"
            label="Prize Pool Distributed"
            theme={theme}
            value={`$${(stats.totalPrizeMoney / 1000).toFixed(0)}K`}
          />
          <StatCard
            icon="🏆"
            label="Active Contests"
            theme={theme}
            value={stats.activeContests}
          />
        </div>

        {/* Call to Action */}
        <div className="relative overflow-hidden rounded-3xl border border-border/40 bg-bg-surface/40 px-8 py-14 sm:px-14 text-center shadow-xl">
          {/* Background Glow */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl" />

          {/* Content */}
          <div className="relative z-10">
            <h3 className="text-4xl sm:text-5xl font-extrabold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Ready to Become a Champion?
            </h3>

            <p className="text-lg sm:text-xl mb-10 max-w-2xl mx-auto text-text-secondary">
              Join thousands of talented developers, showcase your skills, and
              compete for amazing prizes. Your journey to success starts here.
            </p>

            <Link
              to="/all-contests"
              className="group inline-flex items-center gap-3 px-10 py-4 rounded-2xl font-semibold text-white
      bg-gradient-to-r from-indigo-600 to-purple-600
      hover:from-indigo-700 hover:to-purple-700
      transition-all duration-300
      shadow-lg hover:shadow-2xl
      hover:-translate-y-1"
            >
              Explore Contests Now
              <svg
                className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>

            {/* Trust Text */}
            <p className="mt-6 text-sm text-text-muted">
              🚀 100+ active contests • 🏆 $50K+ prizes • 🌍 Global community
            </p>
          </div>
        </div>
      </Container>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes slideUpIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default WinnerAdvertisement;
