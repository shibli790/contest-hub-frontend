import React from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';

const SubmissionDetailModal = ({ submission, theme, onClose, user }) => {
  const axiosSecure = useAxiosSecure();

  const { data: contest = {}, isLoading } = useQuery({
    enabled: !!user,
    queryKey: ['winner', submission?.contestId],
    queryFn: async () => {
      const res = await axiosSecure(`/contests/${submission?.contestId}`);
      return res.data;
    },
  });

  const isDeadlineOver =
    new Date() > new Date(contest?.deadline).setHours(23, 59, 59, 999);

  const isWinnerDeclared = Boolean(contest?.winner);

  const handleDeclareWinner = async submission => {
    const { submittedBy } = submission;
    try {
      const updatedDoc = {
        winner: submittedBy?.name,
        winnerImage: submittedBy?.image,
        winnerEmail: submittedBy?.email,
      };

      const res = await axiosSecure.patch(
        `/contests/${submission.contestId}`,
        updatedDoc
      );

      await axiosSecure.patch(`/users/email/${submittedBy?.email}`);

      const winnerData = {
        name: submittedBy?.name,
        avatar: submittedBy?.image,
        prize: contest?.prizeMoney,
        email: submittedBy?.email,
        contestName: contest?.name,
        position: '1st Place',
        badge: '🥇',
      };

      await axiosSecure.post('/winners', winnerData);

      if (res.data.modifiedCount) {
        toast.success('Winner declared successfully');
      }
      onClose();
    } catch {
      toast.error('Winner declaration failed');
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div
        className={`relative w-full max-w-2xl rounded-3xl border shadow-2xl backdrop-blur-xl
        ${
          theme === 'dark'
            ? 'bg-slate-900/80 border-slate-700'
            : 'bg-white/90 border-gray-200'
        }`}
      >
        {/* ================= HEADER ================= */}
        <div
          className={`flex items-center justify-between px-6 py-5 border-b
          ${theme === 'dark' ? 'border-slate-700' : 'border-gray-200'}`}
        >
          <h2
            className={`text-2xl font-extrabold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            Submission Details
          </h2>

          <button
            onClick={onClose}
            className={`p-2 rounded-xl transition
            ${
              theme === 'dark'
                ? 'hover:bg-slate-700 text-gray-300'
                : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            ✕
          </button>
        </div>

        {/* ================= CONTENT ================= */}
        <div className="px-6 py-6 space-y-6">
          {/* Participant */}
          <div className="flex items-center gap-5">
            <img
              src={submission.submittedBy.image}
              alt={submission.submittedBy.name}
              className="w-20 h-20 rounded-full object-cover ring-4 ring-indigo-500/40"
            />
            <div>
              <h3
                className={`text-xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                {submission.submittedBy.name}
              </h3>
              <p
                className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                {submission.submittedBy.email}
              </p>
              <p
                className={`mt-1 text-xs ${
                  theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                }`}
              >
                Submitted on{' '}
                {new Date(submission.submitTime).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Contest */}
          <div
            className={`rounded-xl p-4 border
            ${
              theme === 'dark'
                ? 'bg-slate-800/60 border-slate-700'
                : 'bg-gray-50 border-gray-200'
            }`}
          >
            <p
              className={`text-sm font-medium mb-1 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              Contest
            </p>
            <p
              className={`text-lg font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
            >
              {submission.name}
            </p>
          </div>

          {/* Submitted Work */}
          <div>
            <p
              className={`text-sm font-bold mb-3 ${
                theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
              }`}
            >
              📎 Submitted Work
            </p>
            <div
              className={`rounded-xl p-4 text-sm break-all
              ${
                theme === 'dark'
                  ? 'bg-slate-800/60 text-gray-300'
                  : 'bg-gray-50 text-gray-700'
              }`}
            >
              {submission.submissionLink}
            </div>
          </div>

          {/* Warning */}
          <div
            className={`rounded-xl p-4 border
            ${
              isDeadlineOver
                ? theme === 'dark'
                  ? 'bg-emerald-900/30 border-emerald-700/50'
                  : 'bg-emerald-50 border-emerald-200'
                : theme === 'dark'
                ? 'bg-amber-900/30 border-amber-700/50'
                : 'bg-amber-50 border-amber-200'
            }`}
          >
            <p
              className={`text-sm font-medium ${
                isDeadlineOver
                  ? theme === 'dark'
                    ? 'text-emerald-300'
                    : 'text-emerald-800'
                  : theme === 'dark'
                  ? 'text-amber-300'
                  : 'text-amber-900'
              }`}
            >
              {isDeadlineOver
                ? '🏁 Deadline passed. You can declare a winner.'
                : '⏳ Deadline not over yet.'}
            </p>
          </div>
        </div>

        {/* ================= FOOTER ================= */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-end gap-3 px-6 py-5 border-t
          ${theme === 'dark' ? 'border-slate-700' : 'border-gray-200'}`}
        >
          <button
            onClick={onClose}
            className={`px-6 py-2 rounded-xl font-semibold transition
            ${
              theme === 'dark'
                ? 'bg-slate-700 text-white hover:bg-slate-600'
                : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
            }`}
          >
            Close
          </button>

          <button
            disabled={isWinnerDeclared || !isDeadlineOver}
            onClick={() => handleDeclareWinner(submission)}
            className={`px-6 py-2 rounded-xl font-semibold text-white flex items-center gap-2
            transition-all shadow-lg active:scale-95 disabled:opacity-50
            ${
              isWinnerDeclared
                ? 'bg-gradient-to-r from-yellow-500 to-yellow-700'
                : 'bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600'
            }`}
          >
            🏆 {isWinnerDeclared ? 'Winner Already Declared' : 'Declare Winner'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmissionDetailModal;
