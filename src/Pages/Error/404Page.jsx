import { Link } from 'react-router';
import { motion } from 'framer-motion';
import err404 from '../../assets/error/err404.png';

const NotFoundPage = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center
                    bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100
                    text-center px-4"
    >
      {/* Animated Number */}
      <motion.h1
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-9xl font-extrabold 
                   bg-gradient-to-r from-blue-600 to-indigo-600
                   bg-clip-text text-transparent drop-shadow-lg"
      >
        404
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.5 }}
        className="text-2xl md:text-3xl font-bold text-gray-800 mt-4"
      >
        🚫 Oops! Page Not Found
      </motion.p>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45, duration: 0.5 }}
        className="text-gray-600 max-w-md mt-3 leading-relaxed"
      >
        😕 The page you are looking for doesn’t exist or has been moved. Please
        check the URL or go back to the homepage.
      </motion.p>

      {/* Illustration */}
      <motion.img
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.5 }}
        src={err404}
        alt="404 illustration"
        className="w-[140px] mt-8 drop-shadow-md"
      />

      {/* Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="mt-8"
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-3
                     bg-gradient-to-r from-blue-600 to-indigo-600
                     text-white font-semibold text-lg rounded-xl
                     shadow-lg hover:scale-105 hover:shadow-xl
                     transition-transform duration-300"
        >
          🏠 Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
