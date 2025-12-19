import { Link } from "react-router";
import { motion } from "framer-motion";
import err404 from "../../assets/error/err404.png";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
      {/* Animated Number */}
      <motion.h1
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-9xl font-extrabold text-blue-600 drop-shadow-lg"
      >
        404
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-2xl md:text-3xl font-semibold text-gray-800 mt-4"
      >
        Oops! Page Not Found
      </motion.p>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-gray-500 max-w-md mt-2"
      >
        The page you are looking for doesn’t exist or has been moved. Please
        check the URL or return to the homepage.
      </motion.p>

      {/* Illustration */}
      <motion.img
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        src={err404}
        alt="404 illustration"
        className="w-[100px] mt-6"
      />

      {/* Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <Link
          to="/"
          className="mt-6 inline-block px-8 py-3 bg-blue-600 text-white font-semibold text-lg rounded-lg shadow hover:bg-blue-700 transition"
        >
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
