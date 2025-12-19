import useTheme from "../../../hooks/useTheme";
import Header from "./Header";
import Container from "../../../Components/Container";
import ContestCard from "../../../Components/ContestCard";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
const PopularContest = () => {
  const { theme } = useTheme();
  const axiosSecure = useAxiosSecure();
  const { data: popularContests = [], isLoading } = useQuery({
    queryKey: ["popularContests"],
    queryFn: async () => {
      const response = await axiosSecure("/popular-contests");
      return response.data;
    },
  });

  const getCategoryColor = (category) => {
    const colors = {
      Design: "from-pink-500 to-rose-500",
      Programming: "from-blue-500 to-cyan-500",
      Development: "from-purple-500 to-indigo-500",
      Mobile: "from-green-500 to-emerald-500",
      "Data Science": "from-orange-500 to-red-500",
    };
    return colors[category] || "from-indigo-500 to-purple-500";
  };

  if (isLoading) {
    return (
      <section
        className={`py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
          theme === "dark"
            ? "bg-linear-to-b from-slate-900 to-slate-800"
            : "bg-linear-to-b from-gray-50 to-white"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`rounded-2xl overflow-hidden ${
                  theme === "dark" ? "bg-slate-700" : "bg-gray-200"
                } animate-pulse h-96`}
              >
                <div
                  className={`w-full h-48 ${
                    theme === "dark" ? "bg-slate-600" : "bg-gray-300"
                  }`}
                ></div>
                <div className="p-6 space-y-4">
                  <div
                    className={`h-6 rounded ${
                      theme === "dark" ? "bg-slate-600" : "bg-gray-300"
                    }`}
                  ></div>
                  <div
                    className={`h-4 rounded ${
                      theme === "dark" ? "bg-slate-600" : "bg-gray-300"
                    }`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 `}
    >
      <Container>
        {/* Header Section */}
        <Header theme={theme} />

        {/* Contests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
          {popularContests.map((contest, index) => (
            <ContestCard
              key={contest._id}
              contest={contest}
              index={index}
              theme={theme}
              getCategoryColor={getCategoryColor}
            />
          ))}
        </div>
      </Container>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes slideUpIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default PopularContest;
