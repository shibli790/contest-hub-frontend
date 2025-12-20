import React from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

const SubmissionDetailModal = ({ submission, theme, onClose, user }) => {
  const axiosSecure = useAxiosSecure();

  const { data: contest = {}, isLoading } = useQuery({
    enabled: !!user,
    queryKey: ["winner", submission.id],
    queryFn: async () => {
      const res = await axiosSecure(`/contests/${submission?.contestId}`);
      return res.data;
    },
  });

  const isDeadlineOver =
    new Date() > new Date(contest?.deadline).setHours(23, 59, 59, 999);

  const isWinnerDeclared = contest?.winner ? true : false;

  const handleDeclareWinner = async (submission) => {
    const { submittedBy } = submission;
    try {
      const updatedDoc = {
        winner: submittedBy?.name,
        winnerImage: submittedBy?.image,
        winnerEmail: submittedBy?.email,
      };
      // add winner in contest
      const res = await axiosSecure.patch(
        `/contests/${submission.contestId}`,
        updatedDoc
      );
      // update user totalWon
      await axiosSecure.patch(`/users/email/${submittedBy?.email}`);

      const winnerData = {
        name: submittedBy?.name,
        avatar: submittedBy?.image,
        prize: contest?.prizeMoney,
        email: submittedBy?.email,
        contestName: contest?.name,
        position: "1st Place",
        badge: "🥇",
      };
      // add user in winners database
      await axiosSecure.post("/winners", winnerData);

      if (res.data.modifiedCount) {
        toast.success("Winner is Declared");
      }
      onClose();
    } catch {
      toast.error("Winner declaretation failed");
    }
  };

  if (isLoading) {
    return <h1 className="text-xl">Loading...</h1>;
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div
        className={`rounded-2xl w-full max-w-2xl transition-colors duration-300 ${
          theme === "dark"
            ? "bg-slate-800 border border-slate-700"
            : "bg-white border border-gray-200"
        }`}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between p-6 border-b ${
            theme === "dark" ? "border-slate-700" : "border-gray-200"
          }`}
        >
          <h2
            className={`text-2xl font-bold ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Submission Details
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors duration-300 ${
              theme === "dark" ? "hover:bg-slate-700" : "hover:bg-gray-100"
            }`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Participant Info */}
          <div className="flex items-center gap-4">
            <img
              src={submission.submittedBy.image}
              alt={submission.submittedBy.name}
              className="w-20 h-20 rounded-full object-cover border-3 border-indigo-500"
            />
            <div>
              <h3
                className={`text-xl font-bold ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                {submission.submittedBy.name}
              </h3>
              <p
                className={`text-sm ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {submission.submittedBy.email}
              </p>
              <p
                className={`text-xs mt-2 font-medium ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Submitted on{" "}
                {new Date(submission.submitTime).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Contest Info */}
          <div
            className={`rounded-lg p-4 ${
              theme === "dark" ? "bg-slate-700/50" : "bg-gray-50"
            }`}
          >
            <p
              className={`text-sm font-medium mb-1 ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Contest Name
            </p>
            <p
              className={`text-lg font-bold ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              {submission.name}
            </p>
          </div>

          {/* Task Information */}
          <div>
            <label
              className={`block text-sm font-bold mb-3 ${
                theme === "dark" ? "text-gray-200" : "text-gray-700"
              }`}
            >
              📋 Submitted Work
            </label>
            <div
              className={`rounded-lg p-4 whitespace-pre-wrap text-sm leading-relaxed ${
                theme === "dark"
                  ? "bg-slate-700/50 text-gray-300"
                  : "bg-gray-50 text-gray-700"
              }`}
            >
              {submission.submissionLink}
            </div>
          </div>

          {isDeadlineOver ? (
            <div
              className={`rounded-lg p-4 border ${
                theme === "dark"
                  ? "bg-amber-900/30 border-amber-700/50"
                  : "bg-amber-50 border-amber-200"
              }`}
            >
              <p
                className={`text-sm font-medium ${
                  theme === "dark" ? "text-amber-300" : "text-amber-900"
                }`}
              >
                ⚠️ Declare this participant as the winner of this contest?
              </p>
            </div>
          ) : (
            <div
              className={`rounded-lg p-4 border ${
                theme === "dark"
                  ? "bg-amber-900/30 border-amber-700/50"
                  : "bg-amber-50 border-amber-200"
              }`}
            >
              <p
                className={`text-sm font-medium ${
                  theme === "dark" ? "text-amber-300" : "text-amber-900"
                }`}
              >
                ⚠️ Deadline is Not over yet
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          className={`flex items-center justify-end gap-3 p-6 border-t ${
            theme === "dark" ? "border-slate-700" : "border-gray-200"
          }`}
        >
          <button
            onClick={onClose}
            className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
              theme === "dark"
                ? "bg-slate-700 hover:bg-slate-600 text-white"
                : "bg-gray-200 hover:bg-gray-300 text-gray-900"
            }`}
          >
            Close
          </button>

          <button
            disabled={isWinnerDeclared || !isDeadlineOver}
            onClick={() => handleDeclareWinner(submission)}
            className={`px-6 py-2 rounded-lg font-semibold flex items-center gap-2  text-white transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 shadow-lg disabled:opacity-55 ${
              isWinnerDeclared
                ? "bg-linear-to-r from-yellow-500 to-yellow-800 hover:from-yellow-600 hover:to-yellow-800"
                : "bg-linear-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
            }`}
          >
            <span>🏆</span>
            {isWinnerDeclared ? "Already Winner Declared" : "Declare Winner"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmissionDetailModal;
