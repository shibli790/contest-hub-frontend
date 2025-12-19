import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import SubmitTaskModal from "./SubmitTaskModal";
import useTheme from "../../../hooks/useTheme";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { calculateTimeLeft } from "../../../utility/calculateTimeLeft";
import Deadline from "./Deadline";
import ConfirmPayment from "./ConfirmPayment";

const ContestDetails = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  // contest data fetching with tanstack
  const { data: contest = {}, isLoading } = useQuery({
    queryKey: ["contest", id],
    queryFn: async () => {
      const result = await axiosSecure(`/contests/${id}`);
      return result.data;
    },
  });

  // is registeruser checking data fetching
  const { data: registrationData = {}, isLoading: checkingRegistration } =
    useQuery({
      queryKey: ["registration", id],
      enabled: !!id,
      queryFn: async () => {
        const res = await axiosSecure.get(`/registrations/check/${id}`);
        return res.data;
      },
    });

  const [timeLeft, setTimeLeft] = useState();
  const isRegistered = registrationData?.registered;

  const closePaymentModal = () => {
    setIsPaymentModalOpen(false);
  };

  useEffect(() => {
    if (!contest?.deadline) return;

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(contest.deadline));
    }, 1000);

    return () => clearInterval(interval);
  }, [contest?.deadline]);

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev?.ended) return prev;
        if (prev?.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev?.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev?.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev?.days > 0) {
          return {
            ...prev,
            days: prev.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
        } else {
          return {
            ...prev,
            ended: true,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
          };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (isLoading || checkingRegistration) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-xl">Loading...</h1>
      </div>
    );
  }

  return (
    <>
      <div
        className={`min-h-screen transition-colors duration-300 ${
          theme === 'dark'
            ? 'bg-linear-to-b from-slate-900 via-slate-800 to-slate-900'
            : 'bg-linear-to-b from-gray-50 via-white to-gray-50'
        }`}
      >
        {/* Banner Section */}
        <div className="relative h-96 sm:h-[500px]  mx-auto overflow-hidden group max-w-7xl rounded-b-3xl shadow-xl">
          <img
            src={contest.bannerImage}
            alt={contest.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/30 to-transparent"></div>

          {/* ================= Banner Text ================= */}
          <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-2">
                🏆 {contest.name}
              </h1>

              <p className="text-gray-200 text-lg">
                👤 Created by{' '}
                <span className="font-semibold">{contest.creatorName}</span>
              </p>

              <div className="flex justify-between mt-3 flex-wrap items-center gap-4 mb-4">
                {/* Category */}
                <span
                  className="px-4 py-2 rounded-full text-sm font-bold text-white
        bg-gradient-to-r from-blue-900 to-rose-900"
                >
                  📂 {contest.category}
                </span>

                {/* Back Button */}
                <button
                  onClick={() => navigate('/all-contests')}
                  className="flex items-center gap-2 px-5 py-2
        bg-gradient-to-r from-indigo-600 to-purple-600 font-semibold rounded-lg
        transition-all duration-300 hover:scale-105"
                >
                  ⬅️ Back
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ================= Main Content ================= */}
        <div className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* ================= Left Column ================= */}
            <div className="lg:col-span-2">
              {/* About Contest */}
              <div
                className={`rounded-2xl p-8 mb-8 transition-colors duration-300 ${
                  theme === 'dark'
                    ? 'bg-slate-800 border border-slate-700'
                    : 'bg-white border border-gray-200'
                }`}
              >
                <h2
                  className={`text-3xl font-bold mb-4 flex items-center gap-2 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  🧾 About This Contest
                </h2>

                <p
                  className={`text-lg leading-relaxed mb-6 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  {contest.title}
                </p>

                <p
                  className={`text-base leading-relaxed ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  {contest.description}
                </p>
              </div>

              {/* Task Details */}
              <div
                className={`rounded-2xl p-8 mb-8 transition-colors duration-300 ${
                  theme === 'dark'
                    ? 'bg-slate-800 border border-slate-700'
                    : 'bg-white border border-gray-200'
                }`}
              >
                <h2
                  className={`text-3xl font-bold mb-6 flex items-center gap-3 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  📋 Task Details
                </h2>

                <div
                  className={`rounded-xl p-6 mb-6 ${
                    theme === 'dark'
                      ? 'bg-indigo-900/30 border border-indigo-700/50'
                      : 'bg-indigo-50 border border-indigo-200'
                  }`}
                >
                  <p
                    className={`whitespace-pre-line text-base leading-relaxed ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    {contest.taskDetails}
                  </p>
                </div>

                <div
                  className={`rounded-lg p-4 ${
                    theme === 'dark'
                      ? 'bg-amber-900/30 border border-amber-700/50'
                      : 'bg-amber-50 border border-amber-200'
                  }`}
                >
                  <p
                    className={`text-sm font-semibold ${
                      theme === 'dark' ? 'text-amber-300' : 'text-amber-900'
                    }`}
                  >
                    💡 Tip: Carefully follow all instructions before submitting
                    your work.
                  </p>
                </div>
              </div>

              {/* Winner */}
              {contest.winner && (
                <div className="rounded-2xl p-8 mb-8 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30">
                  <h2
                    className={`text-3xl font-bold mb-6 flex items-center gap-3 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    🏆 Contest Winner
                  </h2>

                  <div className="flex items-center gap-6">
                    <img
                      src={contest.winnerImage}
                      alt={contest.winner}
                      className="w-24 h-24 rounded-full border-4 border-yellow-500 object-cover"
                    />
                    <div>
                      <h3 className="text-2xl font-bold">{contest.winner}</h3>
                      <p className="text-gray-500">Champion of this contest</p>
                      <p className="text-xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent mt-2">
                        💰 Won ${contest?.prizeMoney.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ================= Right Column ================= */}
            <div className="lg:col-span-1">
              {/* Prize Card */}
              <div
                className={`rounded-2xl p-8 mb-6 ${
                  theme === 'dark'
                    ? 'bg-gradient-to-br from-slate-800 to-slate-700 border border-slate-700'
                    : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200'
                }`}
              >
                <p className="text-sm text-gray-500 mb-2">💰 Prize Money</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent mb-4">
                  ${contest?.prizeMoney?.toLocaleString()}
                </p>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                  👥 {contest?.participants?.toLocaleString()} Participants
                </div>
              </div>

              {/* Deadline */}
              <Deadline theme={theme} contest={contest} timeLeft={timeLeft} />

              {/* Action Buttons */}
              <div className="space-y-4">
                {isRegistered ? (
                  <>
                    <button
                      onClick={() => setShowSubmitModal(true)}
                      disabled={timeLeft?.ended}
                      className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 ${
                        timeLeft?.ended
                          ? 'bg-gray-400 opacity-50 cursor-not-allowed'
                          : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:shadow-lg hover:-translate-y-1'
                      } text-white`}
                    >
                      📤 Submit Task
                    </button>

                    <div className="rounded-lg p-4 text-center bg-green-50 border border-green-200">
                      ✅ You are Registered
                    </div>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setIsPaymentModalOpen(true)}
                      disabled={timeLeft?.ended}
                      className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 ${
                        timeLeft?.ended
                          ? 'bg-gray-400 opacity-50 cursor-not-allowed'
                          : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-lg hover:-translate-y-1'
                      } text-white`}
                    >
                      💳 Register & Pay
                    </button>

                    {timeLeft?.ended && (
                      <div className="rounded-lg p-4 text-center bg-red-50 border border-red-200">
                        ❌ Registration Closed
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Creator */}
              <div
                className={`rounded-2xl p-6 mt-6 ${
                  theme === 'dark'
                    ? 'bg-slate-800 border border-slate-700'
                    : 'bg-white border border-gray-200'
                }`}
              >
                <p className="text-sm text-gray-500 mb-4">👤 Contest Creator</p>
                <div className="flex items-center gap-4">
                  <img
                    src={contest.creatorImage}
                    alt={contest.creatorName}
                    className="w-16 h-16 rounded-full border-2 border-indigo-500"
                  />
                  <div>
                    <h3 className="font-bold">{contest.creatorName}</h3>
                    <p className="text-sm text-gray-500">Organizer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Task Modal */}
        {showSubmitModal && (
          <SubmitTaskModal
            theme={theme}
            contestName={contest.name}
            contest={contest}
            onClose={() => setShowSubmitModal(false)}
          />
        )}

        {/* Confirm Payment Modal */}
        <ConfirmPayment
          isPaymentModalOpen={isPaymentModalOpen}
          setIsPaymentModalOpen={setIsPaymentModalOpen}
          onClose={closePaymentModal}
          theme={theme}
          contest={contest}
        />

        {/* CSS Animations */}
        <style jsx>{`
          @keyframes slideUpIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default ContestDetails;
