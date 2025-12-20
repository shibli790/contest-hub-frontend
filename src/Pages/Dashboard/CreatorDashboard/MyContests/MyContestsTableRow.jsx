import React from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const MyContestsTableRow = ({ theme, contest, refetch }) => {
  const axiosSecure = useAxiosSecure();

  /* Status badge colors */
  const getStatusColor = status => {
    switch (status) {
      case 'approved':
        return 'bg-green-500/10 text-green-600 dark:text-green-400 ring-1 ring-green-500/30';
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 ring-1 ring-yellow-500/30';
      case 'rejected':
        return 'bg-red-500/10 text-red-600 dark:text-red-400 ring-1 ring-red-500/30';
      default:
        return 'bg-gray-500/10 text-gray-600 ring-1 ring-gray-500/30';
    }
  };

  /* Category gradient */
  const getCategoryColor = category => {
    const colors = {
      design: 'from-pink-500 to-rose-500',
      programming: 'from-blue-500 to-cyan-500',
      development: 'from-purple-500 to-indigo-500',
      mobile: 'from-green-500 to-emerald-500',
      security: 'from-emerald-500 to-teal-500',
    };
    return colors[category] || 'from-indigo-500 to-purple-500';
  };

  const handleDeleteContest = async id => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#6366f1',
      cancelButtonColor: '#ef4444',
      confirmButtonText: 'Yes, delete it',
    }).then(async result => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/contests/${id}`);

          Swal.fire('Deleted!', 'Contest deleted successfully.', 'success');
          toast.success('Contest Deleted!');
          refetch();
        } catch (error) {
          Swal.fire('Error!', 'Failed to delete contest.', 'error');
          console.error(error);
        }
      }
    });
  };

  return (
    <tr
      className={`transition-all duration-300 ${
        theme === 'dark' ? 'hover:bg-slate-800/70' : 'hover:bg-gray-50'
      }`}
    >
      {/* Contest Name */}
      <td
        className={`px-6 py-4 font-semibold ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}
      >
        {contest?.name}
      </td>

      {/* Category */}
      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-white
          bg-gradient-to-r ${getCategoryColor(contest?.category)}`}
        >
          {contest?.category}
        </span>
      </td>

      {/* Status */}
      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold capitalize
          ${getStatusColor(contest?.status)}`}
        >
          {contest?.status}
        </span>
      </td>

      {/* Participants */}
      <td
        className={`px-6 py-4 font-semibold ${
          theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
        }`}
      >
        {contest?.participants}
      </td>

      {/* Submissions */}
      <td className="px-6 py-4 font-semibold text-indigo-600 dark:text-indigo-400">
        {contest?.submissions}
      </td>

      {/* Price */}
      <td className="px-6 py-4 font-extrabold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
        ${contest?.price}
      </td>

      {/* Actions */}
      <td className="px-6 py-4">
        <div className="flex flex-wrap gap-2">
          {contest?.status === 'pending' && (
            <>
              <Link
                to={`/dashboard/contest/edit/${contest._id}`}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold
                bg-indigo-500/10 text-indigo-600 dark:text-indigo-400
                hover:bg-indigo-500/20 transition-all"
              >
                ✏️ Edit
              </Link>

              <button
                onClick={() => handleDeleteContest(contest._id)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold
                bg-red-500/10 text-red-600 dark:text-red-400
                hover:bg-red-500/20 transition-all"
              >
                🗑 Delete
              </button>
            </>
          )}

          <Link
            to={`/dashboard/submissions?contestId=${contest._id}`}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold
            bg-emerald-500/10 text-emerald-600 dark:text-emerald-400
            hover:bg-emerald-500/20 transition-all"
          >
            📂 Submissions
          </Link>
        </div>
      </td>
    </tr>
  );
};

export default MyContestsTableRow;
