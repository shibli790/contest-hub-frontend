import React, { useEffect, useState } from 'react';
import { LucideCheckCircle } from 'lucide-react';
import { Link, useSearchParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const axiosSecure = useAxiosSecure();
  const sessionId = searchParams.get('session_id');
  const [contestId, setContestId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`payment-success?session_id=${sessionId}`)
        .then(res => {
          setContestId(res?.data?.contestId);
        })
        .finally(() => setLoading(false));
    }
  }, [axiosSecure, sessionId]);

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4
      bg-linear-to-br from-emerald-50 via-green-50 to-lime-50
      dark:from-gray-900 dark:via-slate-900 dark:to-gray-800 transition-colors"
    >
      <div
        className="relative max-w-md w-full rounded-3xl p-8 md:p-10 text-center
        bg-white/80 dark:bg-slate-900/70
        border border-gray-200 dark:border-slate-700
        shadow-2xl backdrop-blur-xl"
      >
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center
            bg-green-500/10 ring-4 ring-green-500/20"
          >
            <LucideCheckCircle className="w-10 h-10 text-green-500" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">
          Payment Successful 🎉
        </h1>

        {/* Description */}
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          Your payment has been completed successfully.
          <br />
          You are now officially registered for the contest.
        </p>

        {/* Loading State */}
        {loading && (
          <p className="mt-6 text-sm text-gray-500 dark:text-gray-400 animate-pulse">
            Finalizing your registration…
          </p>
        )}

        {/* Actions */}
        {!loading && (
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              to={contestId ? `/contests/${contestId}` : '/all-contests'}
              className="flex-1 py-3.5 rounded-xl font-semibold text-white
              bg-gradient-to-r from-emerald-500 to-green-500
              hover:from-emerald-600 hover:to-green-600
              transition-all shadow-lg hover:shadow-green-500/30
              hover:-translate-y-0.5 active:scale-95"
            >
              🚀 Go to Contest
            </Link>

            <Link
              to="/dashboard/my-contests"
              className="flex-1 py-3.5 rounded-xl font-semibold
              bg-gray-200 dark:bg-slate-700
              text-gray-900 dark:text-white
              hover:bg-gray-300 dark:hover:bg-slate-600
              transition-all"
            >
              📊 My Dashboard
            </Link>
          </div>
        )}

        {/* Footer Note */}
        <p className="mt-6 text-sm text-gray-500 dark:text-gray-500">
          Best of luck! Give your best and aim for the top 🏆
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
