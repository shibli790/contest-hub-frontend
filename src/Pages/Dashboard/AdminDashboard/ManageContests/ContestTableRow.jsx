import React from 'react';
import { FaCheck, FaTimes, FaTrashAlt, FaEye } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2';

export default function ContestTableRow({
  contest,
  theme,
  refetch,
  axiosSecure,
}) {
  /* ✅ APPROVE CONTEST */
  const handleConfirm = async id => {
    const result = await Swal.fire({
      title: 'Approve Contest?',
      text: 'This contest will be visible to users.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#16a34a',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, approve',
    });

    if (!result.isConfirmed) return;

    try {
      await axiosSecure.patch(`/contests/${id}`, { status: 'approved' });
      Swal.fire('Approved!', 'Contest has been approved.', 'success');
      
      refetch();
    } catch (error) {
      Swal.fire('Error!', 'Failed to approve contest.', 'error');
      
      console.error(error);
    }
  };

  /* ❌ REJECT CONTEST */
  const handleReject = async id => {
    const result = await Swal.fire({
      title: 'Reject Contest?',
      text: 'This contest will be rejected.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f97316',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, reject',
    });

    if (!result.isConfirmed) return;

    try {
      await axiosSecure.patch(`/contests/${id}`, { status: 'rejected' });
      Swal.fire('Rejected!', 'Contest has been rejected.', 'success');
     
      refetch();
    } catch (error) {
      Swal.fire('Error!', 'Failed to reject contest.', 'error');
      
      console.error(error);
    }
  };

  /* 🗑️ DELETE CONTEST */
  const handleDelete = async id => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to recover this contest!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!',
    });

    if (!result.isConfirmed) return;

    try {
      await axiosSecure.delete(`/contests/${id}`);
      Swal.fire('Deleted!', 'Contest has been deleted.', 'success');
      
      refetch();
    } catch (error) {
      Swal.fire('Error!', 'Failed to delete contest.', 'error');
      
      console.error(error);
    }
  };

  const isApproved = contest.status === 'approved';
  const isRejected = contest.status === 'rejected';

  /* Row hover */
  const rowClasses =
    theme === 'dark'
      ? 'hover:bg-slate-800/60 border-slate-700'
      : 'hover:bg-gray-50 border-gray-200';

  /* Status badge */
  const statusBadge = () => {
    if (isApproved)
      return 'bg-green-500/10 text-green-600 dark:text-green-400 ring-1 ring-green-500/30';
    if (isRejected)
      return 'bg-red-500/10 text-red-600 dark:text-red-400 ring-1 ring-red-500/30';
    return 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 ring-1 ring-yellow-500/30';
  };

  return (
    <tr className={`border-b transition-all ${rowClasses}`}>
      {/* Contest Name */}
      <td
        className={`px-5 py-4 font-semibold ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}
      >
        {contest.name}
      </td>

      {/* Creator Email */}
      <td
        className={`px-5 py-4 text-sm ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
        }`}
      >
        {contest.creatorEmail || 'naimdrive6@gmail.com'}
      </td>

      {/* Status */}
      <td className="px-5 py-4">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold capitalize ${statusBadge()}`}
        >
          {contest.status || 'pending'}
        </span>
      </td>

      {/* View */}
      <td className="px-5 py-4">
        <button
          onClick={() => console.log('View details for', contest._id)}
          title="View Details"
          className={`p-2 rounded-lg transition-all
          ${
            theme === 'dark'
              ? 'text-indigo-400 hover:bg-slate-700'
              : 'text-indigo-600 hover:bg-indigo-50'
          }`}
        >
          <FaEye />
        </button>
      </td>

      {/* Actions */}
      <td className="px-5 py-4">
        <div className="flex items-center justify-center gap-2">
          {/* Approve */}
          <button
            onClick={() => handleConfirm(contest._id)}
            disabled={isApproved}
            title="Approve Contest"
            className="p-2 rounded-xl bg-green-500/10 text-green-600
            hover:bg-green-500/20 transition disabled:opacity-40"
          >
            <FaCheck />
          </button>

          {/* Reject */}
          <button
            onClick={() => handleReject(contest._id)}
            disabled={isRejected}
            title="Reject Contest"
            className="p-2 rounded-xl bg-yellow-500/10 text-yellow-600
            hover:bg-yellow-500/20 transition disabled:opacity-40"
          >
            <FaTimes />
          </button>

          {/* Delete */}
          <button
            onClick={() => handleDelete(contest._id)}
            title="Delete Contest"
            className="p-2 rounded-xl bg-red-500/10 text-red-600
            hover:bg-red-500/20 transition"
          >
            <FaTrashAlt />
          </button>
        </div>
      </td>
    </tr>
  );
}
