import { Mail } from 'lucide-react';

const SubscribeSection = ({ theme }) => {
  return (
    <section className=" mt-14 relative overflow-hidden rounded-3xl border border-border/40 bg-bg-surface/40 px-8 py-14 sm:px-14 text-center shadow-xl">
      {/* Background Glow */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl" />
      <div
        className={`relative max-w-5xl mx-auto rounded-3xl p-12 sm:p-16 text-center
        backdrop-blur-xl
        `}
      >
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div
            className="w-14 h-14 flex items-center justify-center rounded-2xl
          bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
          >
            <Mail size={26} />
          </div>
        </div>

        {/* Heading */}
        <h3
          className={`text-4xl font-extrabold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}
        >
          Never Miss a Contest 🚀
        </h3>

        {/* Description */}
        <p
          className={`text-lg max-w-2xl mx-auto mb-10 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          Subscribe to ContestHub and get the latest contests, prize alerts,
          winner announcements, and exclusive opportunities delivered straight
          to your inbox.
        </p>

        {/* Subscribe Form */}
        <form className="flex flex-col sm:flex-row items-center gap-4 max-w-xl mx-auto">
          <div className="relative w-full">
            <Mail
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="email"
              required
              placeholder="Enter your email address"
              className="w-full pl-12 pr-4 py-4 rounded-2xl outline-none
              bg-bg-surface/50 border border-border/40
              focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-10 py-4 rounded-2xl font-semibold text-white
            bg-gradient-to-r from-indigo-600 to-purple-600
            hover:from-indigo-700 hover:to-purple-700
            shadow-lg hover:shadow-xl transition-all duration-300
            hover:-translate-y-1"
          >
            Subscribe
          </button>
        </form>

        {/* Trust Text */}
        <p className="mt-6 text-sm text-text-muted">
          🔒 No spam. Unsubscribe anytime. Trusted by 50,000+ developers.
        </p>
      </div>
    </section>
  );
};

export default SubscribeSection;
