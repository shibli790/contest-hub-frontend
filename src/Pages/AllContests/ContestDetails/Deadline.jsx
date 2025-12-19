import React from "react";

const Deadline = ({ theme, contest, timeLeft }) => {
  return (
    <div
      className={`rounded-2xl p-8 mb-6 transition-colors duration-300 ${
        timeLeft?.ended
          ? theme === "dark"
            ? "bg-red-900/30 border border-red-700/50"
            : "bg-red-50 border border-red-200"
          : theme === "dark"
          ? "bg-linear-to-br from-slate-800 to-slate-700 border border-slate-700"
          : "bg-linear-to-br from-white to-gray-50 border border-gray-200"
      }`}
    >
      <p
        className={`text-sm font-medium mb-4 ${
          theme === "dark" ? "text-gray-400" : "text-gray-600"
        }`}
      >
        {timeLeft?.ended ? "Contest Status" : "Time Remaining"}
      </p>

      {timeLeft?.ended ? (
        <div className="text-center">
          <p
            className={`text-3xl font-bold ${
              theme === "dark" ? "text-red-400" : "text-red-600"
            }`}
          >
            Contest Ended
          </p>
          <p
            className={`text-sm mt-2 ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            This contest has concluded
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-2 mb-4">
          {[
            { label: "Days", value: timeLeft?.days },
            { label: "Hours", value: timeLeft?.hours },
            { label: "Mins", value: timeLeft?.minutes },
            { label: "Secs", value: timeLeft?.seconds },
          ].map((item, index) => (
            <div
              key={index}
              className={`text-center rounded-lg p-3 ${
                theme === "dark" ? "bg-slate-700" : "bg-gray-100"
              }`}
            >
              <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                {String(item.value).padStart(2, "0")}
              </p>
              <p
                className={`text-xs font-semibold ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {item.label}
              </p>
            </div>
          ))}
        </div>
      )}

      <p
        className={`text-xs text-center ${
          theme === "dark" ? "text-gray-500" : "text-gray-500"
        }`}
      >
        Deadline: {new Date(contest.deadline).toLocaleDateString()}
      </p>
    </div>
  );
};

export default Deadline;
