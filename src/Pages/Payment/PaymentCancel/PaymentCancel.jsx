import React from 'react';
import { LucideXCircle } from 'lucide-react';
import { Link } from 'react-router';

const PaymentCancel = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4
      bg-linear-to-br from-slate-100 via-gray-100 to-slate-200
      dark:from-gray-900 dark:via-slate-900 dark:to-gray-800 transition-colors"
    >
      <div
        className="relative max-w-md w-full rounded-3xl p-8 md:p-10
        bg-white/80 dark:bg-slate-900/70
        border border-gray-200 dark:border-slate-700
        shadow-2xl backdrop-blur-xl text-center"
      >
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center
            bg-red-500/10 ring-4 ring-red-500/20"
          >
            <LucideXCircle className="w-10 h-10 text-red-500" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">
          Payment Cancelled ❌
        </h1>

        {/* Description */}
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          Your payment process was cancelled.
          <br />
          If this was unintentional, you can try again anytime.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Link
            to="/all-contests"
            className="flex-1 py-3.5 rounded-xl font-semibold text-white
            bg-gradient-to-r from-indigo-600 to-purple-600
            hover:from-indigo-700 hover:to-purple-700
            transition-all shadow-lg hover:shadow-indigo-500/30
            hover:-translate-y-0.5 active:scale-95"
          >
            🔁 Try Again
          </Link>

          <Link
            to="/"
            className="flex-1 py-3.5 rounded-xl font-semibold
            bg-gray-200 dark:bg-slate-700
            text-gray-900 dark:text-white
            hover:bg-gray-300 dark:hover:bg-slate-600
            transition-all"
          >
            🏠 Go Home
          </Link>
        </div>

        {/* Helper Text */}
        <p className="mt-6 text-sm text-gray-500 dark:text-gray-500">
          Need help? Contact our support team anytime.
        </p>
      </div>
    </div>
  );
};

export default PaymentCancel;
