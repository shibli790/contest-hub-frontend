import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { IoClose } from 'react-icons/io5';
import { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';

const SubmitTaskModal = ({ theme, contest, onClose }) => {
  const dark = theme === 'dark';
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [submissionLink, setSubmissionLink] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!submissionLink) return;
    try {
      setLoading(true);

      const res = await axiosSecure.post('/submissions', {
        contestId: contest._id,
        submissionLink,
        note,
        name: contest.name,
        creatorEmail: contest.creatorEmail,
        submittedBy: {
          name: user?.displayName,
          email: user?.email,
          image: user?.photoURL,
        },
        submitTime: new Date(),
      });

      if (res.data.insertedId) {      
        Swal.fire({
          title: 'Your Task is Submitted !',
          icon: 'success',
          draggable: true,
        });
        console.log(res.data);
      }

      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={true} onClose={onClose} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/40 backdrop-blur-xl" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel
          className={`w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden ${
            dark ? 'bg-slate-800' : 'bg-white'
          }`}
        >
          {/* Header */}
          <div
            className={`flex items-center justify-between px-6 py-4 ${
              dark ? 'bg-slate-900/60' : 'bg-gray-50'
            }`}
          >
            <div>
              <h3
                className={`text-xl font-bold ${
                  dark ? 'text-white' : 'text-gray-900'
                }`}
              >
                Submit Your Task
              </h3>
              <p
                className={`text-sm ${
                  dark ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                Contest: <span className="font-medium">{contest?.name}</span>
              </p>
            </div>

            <button
              onClick={onClose}
              className={`p-2 rounded-md ${
                dark ? 'hover:bg-slate-700' : 'hover:bg-gray-100'
              }`}
            >
              <IoClose
                size={22}
                className={dark ? 'text-gray-300' : 'text-gray-700'}
              />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-5">
            {/* Submission Link */}
            <div>
              <label
                className={`block mb-1 text-sm font-semibold ${
                  dark ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                Submission Link
              </label>
              <input
                type="url"
                placeholder="https://your-work-link.com"
                value={submissionLink}
                onChange={e => setSubmissionLink(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg outline-none transition ${
                  dark
                    ? 'bg-slate-900 border border-slate-700 text-gray-200 placeholder-gray-500 focus:border-indigo-500'
                    : 'bg-white border border-gray-300 text-gray-800 placeholder-gray-400 focus:border-indigo-500'
                }`}
              />
              <p
                className={`text-xs mt-1 ${
                  dark ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                Google Drive, GitHub, Figma, Behance, etc.
              </p>
            </div>

            {/* Optional Note */}
            <div>
              <label
                className={`block mb-1 text-sm font-semibold ${
                  dark ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                Additional Note (Optional)
              </label>
              <textarea
                rows={4}
                placeholder="Explain your approach or any important detail..."
                value={note}
                onChange={e => setNote(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg outline-none resize-none transition ${
                  dark
                    ? 'bg-slate-900 border border-slate-700 text-gray-200 placeholder-gray-500 focus:border-indigo-500'
                    : 'bg-white border border-gray-300 text-gray-800 placeholder-gray-400 focus:border-indigo-500'
                }`}
              />
            </div>

            {/* Info Box */}
            <div
              className={`rounded-lg p-4 text-sm ${
                dark
                  ? 'bg-amber-900/20 border border-amber-700/30 text-amber-300'
                  : 'bg-amber-50 border border-amber-200 text-amber-800'
              }`}
            >
              ⚠️ Make sure your submission link is publicly accessible before
              submitting.
            </div>
          </div>

          {/* Footer */}
          <div
            className={`flex items-center justify-end gap-3 px-6 py-4 border-t ${
              dark ? 'border-slate-700' : 'border-gray-200'
            }`}
          >
            <button
              onClick={onClose}
              className={`px-4 py-2 rounded-md font-semibold ${
                dark
                  ? 'bg-slate-700 text-white hover:bg-slate-600'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              disabled={!submissionLink || loading}
              className={`px-6 py-2 rounded-md font-semibold transition ${
                !submissionLink || loading
                  ? 'opacity-60 cursor-not-allowed'
                  : 'bg-linear-to-r from-green-500 to-emerald-500 text-white shadow-md hover:shadow-green-500/30'
              }`}
            >
              {loading ? 'Submitting...' : 'Submit Task'}
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default SubmitTaskModal;
