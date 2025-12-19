import React, { useState } from 'react';
import SubmissionDetailModal from './SubmissionDetailModal';
import useTheme from '../../../../hooks/useTheme';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useAuth from '../../../../hooks/useAuth';
import { FiInbox } from 'react-icons/fi';

const Submissions = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  const { data: submissions = [] } = useQuery({
    enabled: !!user?.email,
    queryKey: ['submissions', user?.email],
    queryFn: async () => {
      const res = await axiosSecure(`/submissions/${user?.email}`);
      return res.data;
    },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      {/* ================= HEADER ================= */}
      <div
        className={`rounded-3xl p-6 md:p-8 border backdrop-blur-xl shadow-lg
        ${
          theme === 'dark'
            ? 'bg-slate-900/70 border-slate-700'
            : 'bg-white/80 border-gray-200'
        }`}
      >
        <p
          className={`text-sm font-medium mb-1 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}
        >
          📂 Dashboard / Submissions
        </p>

        <h1
          className={`text-3xl md:text-4xl font-extrabold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}
        >
          📥 Contest Submissions
        </h1>

        <p
          className={`mt-2 text-lg ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          Review participant submissions and declare winners
        </p>
      </div>

      {/* ================= FILTER TABS (UI ONLY) ================= */}
      <div className="flex flex-wrap gap-2">
        {[
          { label: 'All', emoji: '📋' },
          { label: 'Pending', emoji: '⏳' },
          { label: 'Winner Declared', emoji: '🏆' },
        ].map(tab => (
          <button
            key={tab.label}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all
            ${
              tab.label === 'All'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                : theme === 'dark'
                ? 'bg-slate-800 text-gray-300 hover:bg-slate-700'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {tab.emoji} {tab.label}
          </button>
        ))}
      </div>

      {/* ================= SUBMISSIONS LIST ================= */}
      <div className="space-y-5">
        {submissions.length > 0 ? (
          submissions.map(submission => (
            <div
              key={submission._id}
              onClick={() => setSelectedSubmission(submission)}
              className={`group rounded-2xl p-5 md:p-6 cursor-pointer transition-all duration-300
              hover:-translate-y-1
              ${
                theme === 'dark'
                  ? 'bg-slate-900/70 border border-slate-700 hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-500/20'
                  : 'bg-white border border-gray-200 hover:shadow-xl'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                {/* Left */}
                <div className="flex items-start gap-4 flex-1">
                  <img
                    src={submission.submittedBy.image}
                    alt={submission.submittedBy.name}
                    className="w-14 h-14 rounded-full object-cover ring-2 ring-indigo-500"
                  />

                  <div className="flex-1">
                    <h3
                      className={`text-lg font-bold ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      🙍 {submission.submittedBy.name}
                    </h3>

                    <p
                      className={`text-sm ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      📧 {submission.submittedBy.email}
                    </p>

                    <p
                      className={`mt-2 text-sm ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      <span className="font-semibold">🏆 Contest:</span>{' '}
                      {submission.name}
                    </p>

                    <p
                      className={`mt-1 text-sm break-all ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      🔗 {submission.submissionLink}
                    </p>
                  </div>
                </div>

                {/* Right */}
                <div className="flex flex-col items-end gap-3 shrink-0">
                  <span
                    className={`text-xs ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    📅 {new Date(submission.submitTime).toLocaleDateString()}
                  </span>

                  <button
                    onClick={e => {
                      e.stopPropagation();
                      setSelectedSubmission(submission);
                    }}
                    className="px-4 py-2 rounded-xl text-sm font-semibold text-white
                    bg-gradient-to-r from-emerald-500 to-green-500
                    hover:from-emerald-600 hover:to-green-600
                    hover:shadow-lg hover:shadow-emerald-500/40
                    transition-all active:scale-95"
                  >
                    👁️ View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          /* ================= EMPTY STATE ================= */
          <div
            className={`flex flex-col items-center justify-center text-center p-16 rounded-3xl border-2 border-dashed
            ${
              theme === 'dark'
                ? 'bg-slate-900/60 border-slate-700'
                : 'bg-gray-50 border-gray-200'
            }`}
          >
            <div className="mb-5 p-5 rounded-full bg-indigo-500/10 text-indigo-500">
              <FiInbox size={42} />
            </div>

            <h2
              className={`text-2xl font-extrabold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
            >
              📭 No Submissions Yet
            </h2>

            <p
              className={`max-w-sm text-lg ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              There are no submissions for your contests right now. Once users
              submit entries, they’ll appear here.
            </p>
          </div>
        )}
      </div>

      {/* ================= MODAL ================= */}
      {selectedSubmission && (
        <SubmissionDetailModal
          submission={selectedSubmission}
          theme={theme}
          user={user}
          onClose={() => setSelectedSubmission(null)}
        />
      )}
    </div>
  );
};

export default Submissions;
