import React, { useState } from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const ROLE_EMOJI = {
  user: '🙍',
  creator: '🧑‍💻',
  admin: '🛡️',
};

const UserTableRow = ({ user, theme, ROLE_OPTIONS }) => {
  const { role } = user;
  const [selectedRole, setSelectedRole] = useState(role);
  const axiosSecure = useAxiosSecure();

  // Update user role
  const handleUserRoleUpdate = async userId => {
    try {
      const res = await axiosSecure.patch(`users/${userId}`, {
        role: selectedRole.toLowerCase(),
      });
      if (res.data.modifiedCount) {
        toast.success('✅ User role updated successfully');
      }
    } catch {
      toast.error('❌ Failed to update user role');
    }
  };

  return (
    <tr
      className={`border-b transition-colors ${
        theme === 'dark'
          ? 'border-slate-700 '
          : 'border-gray-200'
      }`}
    >
      {/* USER */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-4">
          <img
            src={user.profilePicture}
            alt={user.fullName}
            className={`w-11 h-11 rounded-full object-cover ring-2 ${
              theme === 'dark' ? 'ring-slate-700' : 'ring-gray-300'
            }`}
          />
          <div>
            <p
              className={`font-semibold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
            >
              {user.fullName}
            </p>
            <p
              className={`text-xs ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              ID: {user._id}
            </p>
          </div>
        </div>
      </td>

      {/* EMAIL */}
      <td
        className={`px-6 py-4 text-sm ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
        }`}
      >
        📧 {user.email}
      </td>

      {/* ROLE SELECT */}
      <td className="px-6 py-4">
        <select
          value={selectedRole}
          onChange={e => setSelectedRole(e.target.value)}
          className={`px-3 py-2 rounded-xl text-sm font-medium border transition
          ${
            theme === 'dark'
              ? 'bg-slate-800 border-slate-600 text-gray-200 focus:ring-2 focus:ring-indigo-500'
              : 'bg-white border-gray-300 text-gray-800 focus:ring-2 focus:ring-indigo-500'
          }`}
        >
          {ROLE_OPTIONS.map(r => (
            <option key={r} value={r}>
              {ROLE_EMOJI[r]} {r}
            </option>
          ))}
        </select>
      </td>

      {/* ACTION */}
      <td className="px-6 py-4">
        <button
          onClick={() => handleUserRoleUpdate(user._id)}
          className="px-5 py-2 rounded-xl text-sm font-semibold text-white
          bg-gradient-to-r from-indigo-600 to-purple-600
          hover:from-indigo-700 hover:to-purple-700
          transition-all active:scale-95 shadow-md"
        >
          🔄 Update Role
        </button>
      </td>
    </tr>
  );
};

export default UserTableRow;
