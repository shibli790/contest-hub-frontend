import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useTheme from "../../../../hooks/useTheme";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { getImageUrl } from "../../../../utility/getImageUrl";

const EditContest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { data: contest = {}, isLoading } = useQuery({
    queryKey: ["contest-edit", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axiosSecure.get(`/contests/${id}`);
      return res.data;
    },
  });

  /* PREFILL FORM  */
  useEffect(() => {
    if (contest?._id) {
      reset({
        name: contest.name || "",
        title: contest.title || "",
        description: contest.description || "",
        taskDetails: contest.taskDetails || "",
        level: contest.level || "",
        prizeMoney: contest.prizeMoney || 0,
        price: contest.price || 0,
        category: contest.category || "",
        deadline: contest.deadline || "",
        bannerImage: null,
      });
    }
  }, [contest, reset]);

  /* On SUBMIT  */
  const onSubmit = async (data) => {
    try {
      let bannerImage = contest.bannerImage;

      if (data.bannerImage instanceof File) {
        bannerImage = await getImageUrl(data.bannerImage);
      }

      const updatedContest = {
        name: data.name,
        title: data.title,
        description: data.description,
        taskDetails: data.taskDetails,
        prizeMoney: Number(data.prizeMoney),
        price: Number(data.price),
        category: data.category,
        bannerImage,
        deadline: new Date(data.deadline).toISOString().split("T")[0],
      };

      await axiosSecure.patch(`/contests/${id}`, updatedContest);
      toast.success("Contest updated successfully!");
      navigate("/dashboard/my-contests");
    } catch {
      toast.error("Failed to update contest");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* ================= HEADER ================= */}
      <div className="mb-10">
        <h1
          className={`text-4xl font-bold ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          Edit Contest
        </h1>
        <p
          className={`mt-2 ${
            theme === "dark" ? "text-slate-400" : "text-gray-600"
          }`}
        >
          Update contest details before admin approval
        </p>
      </div>

      {/* ================= FORM ================= */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`rounded-2xl p-4 md:p-8 transition-colors duration-300 ${
          theme === "dark"
            ? "bg-slate-800 border border-slate-700"
            : "bg-white border border-gray-200"
        }`}
      >
        <div className="space-y-8">
          {/* Contest Name */}
          <div>
            <label
              className={`block text-sm font-semibold mb-3 ${
                theme === "dark" ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Contest Name *
            </label>
            <input
              type="text"
              placeholder="e.g., Web Design Showdown 2024"
              {...register("name", { required: "Contest name is required" })}
              className={`w-full px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                theme === "dark"
                  ? "bg-slate-700 border border-slate-600 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  : "bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          {/* Contest Title */}
          <div>
            <label
              className={`block text-sm font-semibold mb-3 ${
                theme === "dark" ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Contest Title *
            </label>
            <input
              type="text"
              placeholder="e.g., Analyze datasets and build predictive models to solve real-world problems"
              {...register("title", { required: "Contest Title is required" })}
              className={`w-full px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                theme === "dark"
                  ? "bg-slate-700 border border-slate-600 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  : "bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              }`}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label
              className={`block text-sm font-semibold mb-3 ${
                theme === "dark" ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Description *
            </label>
            <textarea
              placeholder="Describe your contest in detail..."
              rows="5"
              {...register("description", {
                required: "Description is required",
              })}
              className={`w-full px-4 py-3 rounded-lg font-medium transition-all duration-300 resize-none ${
                theme === "dark"
                  ? "bg-slate-700 border border-slate-600 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  : "bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              }`}
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Task Details */}
          <div>
            <label
              className={`block text-sm font-semibold mb-3 ${
                theme === "dark" ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Task Details *
            </label>
            <textarea
              placeholder="Provide detailed instructions for participants..."
              rows="5"
              {...register("taskDetails", {
                required: "Task details are required",
              })}
              className={`w-full px-4 py-3 rounded-lg font-medium transition-all duration-300 resize-none ${
                theme === "dark"
                  ? "bg-slate-700 border border-slate-600 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  : "bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              }`}
            ></textarea>
            {errors.taskDetails && (
              <p className="text-red-500 text-sm mt-1">
                {errors.taskDetails.message}
              </p>
            )}
          </div>

          {/* Grid Row prize money, category, difficulty level, price deadline */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Prize Money */}
            <div>
              <label
                className={`block text-sm font-semibold mb-3 ${
                  theme === "dark" ? "text-gray-200" : "text-gray-700"
                }`}
              >
                Prize Money ($) *
              </label>
              <input
                type="number"
                placeholder="5000"
                {...register("prizeMoney", {
                  required: "Prize money is required",
                })}
                className={`w-full px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-slate-700 border border-slate-600 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    : "bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                }`}
              />
              {errors.prizeMoney && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.prizeMoney.message}
                </p>
              )}
            </div>

            {/* Contest Category */}
            <div>
              <label
                className={`block text-sm font-semibold mb-3 ${
                  theme === "dark" ? "text-gray-200" : "text-gray-700"
                }`}
              >
                Contest category *
              </label>
              <select
                {...register("category", {
                  required: "Contest category is required",
                })}
                className={`w-full px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-slate-700 border border-slate-600 text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    : "bg-gray-50 border border-gray-300 text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                }`}
              >
                <option value="">Select a category</option>
                <option value="design">Design</option>
                <option value="programming">Programming</option>
                <option value="development">Development</option>
                <option value="mobile">Mobile</option>
                <option value="data-science">Data Science</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* Difficulty Level */}
            <div>
              <label
                className={`block text-sm font-semibold mb-3 ${
                  theme === "dark" ? "text-gray-200" : "text-gray-700"
                }`}
              >
                Difficulty Level *
              </label>
              <select
                {...register("level", {
                  required: "Difficulty level is required",
                })}
                className={`w-full px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-slate-700 border border-slate-600 text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    : "bg-gray-50 border border-gray-300 text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                }`}
              >
                <option value="">Select a level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
              {errors.level && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.level.message}
                </p>
              )}
            </div>
            {/* Price  */}
            <div>
              <label
                className={`block text-sm font-semibold mb-3 ${
                  theme === "dark" ? "text-gray-200" : "text-gray-700"
                }`}
              >
                Price($) *
              </label>
              <input
                type="number"
                placeholder="500 - 1000"
                {...register("price", { required: "Price is required" })}
                className={`w-full px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-slate-700 border border-slate-600 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    : "bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                }`}
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>
            {/* Deadline */}
            <div>
              <label
                className={`block text-sm font-semibold mb-3 ${
                  theme === "dark" ? "text-gray-200" : "text-gray-700"
                }`}
              >
                Contest Deadline *
              </label>
              <Controller
                name="deadline"
                control={control}
                rules={{ required: "Deadline is required" }}
                render={({ field }) => (
                  <DatePicker
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    minDate={new Date()}
                    className={`w-full px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                      theme === "dark"
                        ? "bg-slate-700 border border-slate-600 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                        : "bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    }`}
                    placeholderText="Select deadline"
                  />
                )}
              />
              {errors.deadline && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.deadline.message}
                </p>
              )}
            </div>
          </div>

          {/* Buttons */}
          {/* Buttons */}
          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              className="flex-1 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
            >
              Update Contest
            </button>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className={`flex-1 py-3 rounded-lg font-semibold ${
                theme === "dark"
                  ? "bg-slate-700 text-gray-200"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditContest;
