import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const ConfirmPayment = ({
  isPaymentModalOpen,
  setIsPaymentModalOpen,
  theme,
  contest,
}) => {
  const [agree, setAgree] = useState(false);
  const { user } = useAuth();
  // const [paymentProccessing, setPaymentProccessing] = useState(false);
  const axiosSecure = useAxiosSecure();
  const dark = theme === "dark";
  // console.log(contest);
  const handlePayment = async () => {
    const paymentInfo = {
      contestId: contest?._id,
      userEmail: user?.email,
      price: contest?.price,
      creator_name: contest?.creatorName,
      name: contest?.name,
      deadline: contest?.deadline,
      title: contest?.title,
    };

    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);

    console.log("create ceckout seasson", res.data);
    window.location.href = res.data.url;
  };

  return (
    <Dialog
      open={isPaymentModalOpen}
      onClose={() => setIsPaymentModalOpen(false)}
      className="w-full max-w-2xl mx-auto mt-12 p-0 border-0 bg-transparent relative z-50"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/30 backdrop-blur-xl" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel
          className={`mx-4 rounded-xl overflow-hidden shadow-2xl w-full max-w-2xl ${
            dark ? "bg-slate-800" : "bg-white z-50"
          }`}
        >
          {/* Header */}
          <div
            className={`flex items-center justify-between px-6 py-4 ${
              dark ? "bg-slate-900/50" : "bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-md flex items-center justify-center bg-linear-to-r from-indigo-600 to-purple-600 text-white text-lg font-semibold">
                💳
              </div>
              <div>
                <h3
                  id="cp-title"
                  className={`text-lg font-semibold ${
                    dark ? "text-white" : "text-gray-900"
                  }`}
                >
                  Confirm Payment
                </h3>
                <p
                  className={`text-sm ${
                    dark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Secure checkout — Stripe only
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsPaymentModalOpen(false)}
              aria-label="Close"
              className={`p-2 rounded-md ${
                dark ? "hover:bg-slate-700" : "hover:bg-gray-100"
              }`}
            >
              <IoClose
                size={22}
                className={dark ? "text-gray-300" : "text-gray-700"}
              />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-4">
            {/* Contest summary */}
            <div
              className={`flex gap-4 items-center rounded-lg p-3 ${
                dark
                  ? "bg-slate-800/50 border border-slate-700"
                  : "bg-gray-50 border border-gray-100"
              }`}
            >
              <div className="w-28 h-16 rounded-md overflow-hidden bg-gray-200 flex items-center justify-center text-sm text-gray-500">
                {contest?.bannerImage ? (
                  <img
                    src={contest.bannerImage}
                    alt={contest.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  "No image"
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div>
                    <p
                      className={`text-sm ${
                        dark ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Contest
                    </p>
                    <p
                      className={`font-semibold truncate ${
                        dark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {contest?.name || "Unnamed Contest"}
                    </p>
                  </div>

                  <div className="text-right">
                    <p
                      className={`text-xs ${
                        dark ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Prize
                    </p>
                    <p className="text-lg font-bold bg-clip-text text-transparent bg-linear-to-r from-green-500 to-emerald-500">
                      ${contest?.price ?? "0"}
                    </p>
                  </div>
                </div>

                <p
                  className={`mt-2 text-sm ${
                    dark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Registration fee:{" "}
                  <span className="font-medium">${contest?.price}</span>
                </p>
              </div>
            </div>

            {/* Price */}
            <div
              className={`rounded-lg p-4 ${
                dark
                  ? "bg-slate-800/40 border border-slate-700"
                  : "bg-white border border-gray-100"
              }`}
            >
              <div className="flex justify-between text-sm mb-2">
                <span className={dark ? "text-gray-400" : "text-gray-600"}>
                  Registration Fee
                </span>
                <span className={dark ? "text-gray-200" : "text-gray-900"}>
                  ${contest?.price}
                </span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className={dark ? "text-gray-400" : "text-gray-600"}>
                  Platform Fee
                </span>
                <span className={dark ? "text-gray-200" : "text-gray-900"}>
                  $1.00
                </span>
              </div>
              <div
                className={`mt-3 pt-3 border-t ${
                  dark ? "border-slate-700" : "border-gray-100"
                }`}
              >
                <div className="flex justify-between items-center">
                  <span
                    className={`font-semibold ${
                      dark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Total
                  </span>
                  <span className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-indigo-600 to-purple-600">
                    ${Number(contest?.price) + 1}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment methods: Stripe active, others disabled */}
            <fieldset className="space-y-2">
              <legend
                className={`text-sm font-semibold ${
                  dark ? "text-gray-200" : "text-gray-700"
                }`}
              >
                Payment method
              </legend>

              <label
                className={`flex items-center gap-3 p-3 rounded-lg cursor-default border ${
                  dark
                    ? "border-indigo-500 bg-indigo-500/6"
                    : "border-indigo-500 bg-indigo-50"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked
                  readOnly
                  className="w-4 h-4"
                />
                <div className="ml-2 flex items-center gap-3">
                  <div>
                    <div
                      className={`font-medium ${
                        dark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Stripe
                    </div>
                    <div
                      className={`text-xs ${
                        dark ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Secure card processing
                    </div>
                  </div>
                </div>
              </label>

              <label
                className={`flex items-center gap-3 p-3 rounded-lg border opacity-40 cursor-not-allowed ${
                  dark ? "border-slate-700" : "border-gray-200"
                }`}
                aria-disabled="true"
              >
                <input
                  type="radio"
                  name="payment"
                  disabled
                  className="w-4 h-4"
                />
                <div
                  className={`ml-2 ${dark ? "text-gray-400" : "text-gray-700"}`}
                >
                  <div className="font-medium">PayPal (disabled)</div>
                  <div className="text-xs">Not available</div>
                </div>
              </label>

              <label
                className={`flex items-center gap-3 p-3 rounded-lg border opacity-40 cursor-not-allowed ${
                  dark ? "border-slate-700" : "border-gray-200"
                }`}
                aria-disabled="true"
              >
                <input
                  type="radio"
                  name="payment"
                  disabled
                  className="w-4 h-4"
                />
                <div
                  className={`ml-2 ${dark ? "text-gray-400" : "text-gray-700"}`}
                >
                  <div className="font-medium">Google Pay (disabled)</div>
                  <div className="text-xs">Not available</div>
                </div>
              </label>
            </fieldset>

            {/* Terms */}
            <div
              className={`flex items-start gap-3 p-3 rounded-lg ${
                dark
                  ? "bg-blue-900/8 border border-blue-800/20"
                  : "bg-blue-50 border border-blue-100"
              }`}
            >
              <input
                id="cp-terms"
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="w-4 h-4 mt-1"
              />
              <label
                htmlFor="cp-terms"
                className={`${
                  dark ? "text-blue-200" : "text-blue-900"
                } text-sm`}
              >
                I agree to the{" "}
                <span className="font-semibold">Terms & Conditions</span> and{" "}
                <span className="font-semibold">Privacy Policy</span>.
              </label>
            </div>
          </div>

          {/* Footer */}
          <div
            className={`flex items-center justify-end gap-3 px-6 py-4 border-t ${
              dark ? "border-slate-700" : "border-gray-100"
            }`}
          >
            <button
              onClick={() => setIsPaymentModalOpen(false)}
              className={`px-4 py-2 rounded-md font-semibold ${
                dark
                  ? "bg-slate-700 text-white hover:bg-slate-600"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handlePayment}
              disabled={!agree}
              className={`px-5 py-2 rounded-md font-semibold cursor-pointer ${
                !agree
                  ? "opacity-60 cursor-not-allowed border border-border/60"
                  : "bg-linear-to-r from-indigo-600 to-purple-600 text-white shadow-md"
              }`}
            >
              <span className="mr-2">💳</span>
              Pay with Stripe
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default ConfirmPayment;
