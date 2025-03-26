'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const inputStyles = "mt-1 block w-full px-4 py-2 text-base rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white text-gray-900";
const formGroupStyles = "space-y-1.5";
const labelStyles = "block text-sm font-medium text-gray-700 mb-1";
const buttonStyles = {
  primary: "px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm",
  secondary: "px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-md shadow-sm",
  danger: "text-red-600 hover:text-red-900 font-medium",
  link: "text-blue-600 hover:text-blue-900 font-medium"
};

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  });
  const [filters, setFilters] = useState({
    search: '',
    role: '',
    status: '',
  });
  const [editingUser, setEditingUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const roles = ['user', 'admin', 'superadmin'];

  useEffect(() => {
    fetchUsers();
  }, [pagination.page, filters]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page: pagination.page,
        limit: pagination.limit,
        ...filters,
      });

      const response = await fetch(`/api/superadmin/users?${queryParams}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch users');
      }

      setUsers(data.users);
      setPagination(prev => ({ ...prev, ...data.pagination }));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = async (userId, updates) => {
    try {
      const response = await fetch(`/api/superadmin/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update user');
      }

      // Update the users list
      setUsers(users.map(user => 
        user._id === userId ? { ...user, ...data } : user
      ));

      setIsModalOpen(false);
      setEditingUser(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      const response = await fetch(`/api/superadmin/users/${userId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete user');
      }

      // Remove user from the list
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
        <p className="text-gray-600 mt-1">Manage user accounts and permissions</p>
      </div>

      {/* Filters */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={formGroupStyles}>
          <label className={labelStyles}>Search</label>
          <input
            type="text"
            placeholder="Search users..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className={inputStyles}
          />
        </div>
        <div className={formGroupStyles}>
          <label className={labelStyles}>Role</label>
          <select
            value={filters.role}
            onChange={(e) => setFilters({ ...filters, role: e.target.value })}
            className={inputStyles}
          >
            <option value="">All Roles</option>
            {roles.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </div>
        <div className={formGroupStyles}>
          <label className={labelStyles}>Status</label>
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className={inputStyles}
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* Users Table */}
      {!loading && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-xl font-medium text-gray-600">
                              {user.name[0].toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${user.role === 'superadmin' ? 'bg-purple-100 text-purple-800' :
                          user.role === 'admin' ? 'bg-blue-100 text-blue-800' :
                            'bg-green-100 text-green-800'}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${user.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {user.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => {
                          setEditingUser(user);
                          setIsModalOpen(true);
                        }}
                        className={`${buttonStyles.link} mr-4`}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className={buttonStyles.danger}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination */}
      {!loading && users.length > 0 && (
        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-gray-700">
            Showing {((pagination.page - 1) * pagination.limit) + 1} to{' '}
            {Math.min(pagination.page * pagination.limit, pagination.total)} of{' '}
            {pagination.total} results
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
              disabled={pagination.page === 1}
              className={`${buttonStyles.secondary} disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              Previous
            </button>
            <button
              onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
              disabled={pagination.page === pagination.pages}
              className={`${buttonStyles.secondary} disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* No Results */}
      {!loading && users.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No users found
        </div>
      )}

      {/* Edit Modal */}
      {isModalOpen && editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl max-w-lg w-full p-8"
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              {editingUser ? 'Edit User' : 'Create User'}
            </h2>

            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const updates = Object.fromEntries(formData.entries());
              handleUpdateUser(editingUser._id, updates);
            }}>
              <div className="space-y-6">
                <div className={formGroupStyles}>
                  <label className={labelStyles}>Name</label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={editingUser?.name}
                    className={inputStyles}
                    required
                  />
                </div>

                <div className={formGroupStyles}>
                  <label className={labelStyles}>Email</label>
                  <input
                    type="email"
                    name="email"
                    defaultValue={editingUser?.email}
                    className={inputStyles}
                    required
                  />
                </div>

                <div className={formGroupStyles}>
                  <label className={labelStyles}>Role</label>
                  <select
                    name="role"
                    defaultValue={editingUser?.role}
                    className={inputStyles}
                    required
                  >
                    {roles.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>

                <div className={formGroupStyles}>
                  <label className={labelStyles}>Status</label>
                  <select
                    name="active"
                    defaultValue={editingUser?.active}
                    className={inputStyles}
                  >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </div>

                <div className={formGroupStyles}>
                  <label className={labelStyles}>
                    New Password (leave blank to keep current)
                  </label>
                  <input
                    type="password"
                    name="password"
                    className={inputStyles}
                    placeholder="Enter new password"
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className={buttonStyles.secondary}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={buttonStyles.primary}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded shadow-lg z-50">
          <p>{error}</p>
          <button
            onClick={() => setError(null)}
            className="absolute top-2 right-2 text-red-700 hover:text-red-900"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
} 