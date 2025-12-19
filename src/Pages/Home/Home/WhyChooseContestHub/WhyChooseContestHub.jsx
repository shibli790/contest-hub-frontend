import { ShieldCheck, Gavel, Globe, Zap, BadgeCheck } from 'lucide-react';
import useTheme from '../../../../hooks/useTheme';

const features = [
  {
    icon: ShieldCheck,
    title: 'Secure Payments',
    desc: 'All payments are protected and processed securely via Stripe.',
  },
  {
    icon: Gavel,
    title: 'Fair Judging',
    desc: 'Transparent and unbiased judging process for every contest.',
  },
  {
    icon: Globe,
    title: 'Global Community',
    desc: 'Join creators and developers from all around the world.',
  },
  {
    icon: Zap,
    title: 'Instant Payouts',
    desc: 'Winners receive payouts quickly without delays.',
  },
  {
    icon: BadgeCheck,
    title: 'Verified Creators',
    desc: 'All contest creators are verified for authenticity.',
  },
];

const WhyChooseContestHub = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section
      className={`relative mt-16  `}
    >
     
      <div className="relative max-w-7xl mx-auto px-4">
        {/* ================= HEADER ================= */}
        <div className="text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl font-extrabold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            Why Choose{' '}
            <span className="bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              ContestHub
            </span>
            ?
          </h2>

          <p
            className={`mt-5 text-lg max-w-2xl mx-auto ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            A trusted, transparent and global contest platform built for
            creators and innovators.
          </p>
        </div>

        {/* ================= FEATURES GRID ================= */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className={`group relative rounded-3xl p-8
                backdrop-blur-xl border shadow-lg
                transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl
                ${
                  isDark
                    ? 'bg-gray-900/60 border-gray-700/60'
                    : 'bg-white/70 border-gray-200/60'
                }`}
              >
                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6
                  bg-gradient-to-br from-indigo-500 to-purple-500
                  text-white shadow-lg shadow-indigo-500/30
                  group-hover:scale-110 transition-transform duration-300"
                >
                  <Icon className="w-7 h-7" />
                </div>

                {/* Title */}
                <h3
                  className={`text-xl font-bold mb-3 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {item.title}
                </h3>

                {/* Description */}
                <p
                  className={`leading-relaxed ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  {item.desc}
                </p>

                {/* Hover Glow */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition pointer-events-none border border-indigo-500/30" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseContestHub;
