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

export default function NoticesPage() {
  const [notices, setNotices] = useState([]);
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
    category: '',
    priority: '',
  });
  const [editingNotice, setEditingNotice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = ['cultural', 'sports', 'technical', 'club_activities', 'competitions', 'events'];
  const priorities = ['low', 'medium', 'high', 'urgent'];

  const categoryLabels = {
    cultural: 'Cultural Activities',
    sports: 'Sports & Games',
    technical: 'Technical Activities',
    club_activities: 'Club Activities',
    competitions: 'Competitions',
    events: 'Events & Festivals'
  };

  const categoryColors = {
    cultural: 'bg-purple-100 text-purple-800',
    sports: 'bg-green-100 text-green-800',
    technical: 'bg-blue-100 text-blue-800',
    club_activities: 'bg-yellow-100 text-yellow-800',
    competitions: 'bg-red-100 text-red-800',
    events: 'bg-indigo-100 text-indigo-800'
  };

  useEffect(() => {
    fetchNotices();
  }, [pagination.page, filters]);

  const fetchNotices = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page: pagination.page,
        limit: pagination.limit,
        ...filters,
      });

      const response = await fetch(`/api/superadmin/notices?${queryParams}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch notices');
      }

      setNotices(data.notices);
      setPagination(prev => ({ ...prev, ...data.pagination }));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNotice = async (formData) => {
    try {
      setError(null); // Clear any existing errors
      const token = localStorage.getItem('adminToken'); // Retrieve the token from localStorage
      const response = await fetch('/api/superadmin/notices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Add the authorization token to the headers
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create notice');
      }

      // Add the new notice to the list and refresh to ensure correct order
      await fetchNotices();
      setIsModalOpen(false);
      setEditingNotice(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdateNotice = async (noticeId, updates) => {
    try {
      setError(null); // Clear any existing errors
      const response = await fetch(`/api/superadmin/notices/${noticeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update notice');
      }

      // Refresh notices to ensure we have the latest data
      await fetchNotices();
      setIsModalOpen(false);
      setEditingNotice(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteNotice = async (noticeId) => {
    if (!window.confirm('Are you sure you want to delete this notice?')) {
      return;
    }

    try {
      setError(null); // Clear any existing errors
      const response = await fetch(`/api/superadmin/notices/${noticeId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete notice');
      }

      // Refresh notices to ensure we have the latest data
      await fetchNotices();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notice Management</h1>
          <p className="text-gray-600 mt-1">Create and manage SAC notices</p>
        </div>
        <button
          onClick={() => {
            setEditingNotice(null);
            setIsModalOpen(true);
          }}
          className={buttonStyles.primary}
        >
          Create Notice
        </button>
      </div>

      {/* Filters */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={formGroupStyles}>
          <label className={labelStyles}>Search</label>
          <input
            type="text"
            placeholder="Search notices..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className={inputStyles}
          />
        </div>
        <div className={formGroupStyles}>
          <label className={labelStyles}>Category</label>
          <select
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            className={inputStyles}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{categoryLabels[category]}</option>
            ))}
          </select>
        </div>
        <div className={formGroupStyles}>
          <label className={labelStyles}>Priority</label>
          <select
            value={filters.priority}
            onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
            className={inputStyles}
          >
            <option value="">All Priorities</option>
            {priorities.map(priority => (
              <option key={priority} value={priority}>{priority.charAt(0).toUpperCase() + priority.slice(1)}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* Notices Table */}
      {!loading && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Notice
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
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
                {notices.map((notice) => (
                  <tr key={notice._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <div className="text-sm font-medium text-gray-900">{notice.title}</div>
                        <div className="text-sm text-gray-500 line-clamp-1">{notice.content}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${categoryColors[notice.category] || 'bg-gray-100 text-gray-800'}`}>
                        {categoryLabels[notice.category] || notice.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${notice.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                          notice.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                          notice.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'}`}>
                        {notice.priority.charAt(0).toUpperCase() + notice.priority.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${notice.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {notice.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => {
                          setEditingNotice(notice);
                          setIsModalOpen(true);
                        }}
                        className={`${buttonStyles.link} mr-4`}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteNotice(notice._id)}
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
      {!loading && notices.length > 0 && (
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
      {!loading && notices.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No notices found
        </div>
      )}

      {/* Notice Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-8"
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              {editingNotice ? 'Edit Notice' : 'Create Notice'}
            </h2>

            <form onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const data = Object.fromEntries(formData.entries());
              
              // Validate required fields
              const requiredFields = ['title', 'content', 'category', 'priority', 'expiresAt'];
              const missingFields = requiredFields.filter(field => !data[field]);
              
              if (missingFields.length > 0) {
                setError(`Please fill in all required fields: ${missingFields.join(', ')}`);
                return;
              }

              // Convert isActive to boolean and ensure expiresAt is valid
              data.isActive = data.isActive === 'true';
              
              // Validate expiry date is in the future
              const expiryDate = new Date(data.expiresAt);
              if (expiryDate <= new Date()) {
                setError('Expiry date must be in the future');
                return;
              }
              
              if (editingNotice) {
                await handleUpdateNotice(editingNotice._id, data);
              } else {
                await handleCreateNotice(data);
              }
            }}>
              <div className="space-y-6">
                <div className={formGroupStyles}>
                  <label className={labelStyles}>Title</label>
                  <input
                    type="text"
                    name="title"
                    defaultValue={editingNotice?.title}
                    className={inputStyles}
                    required
                  />
                </div>

                <div className={formGroupStyles}>
                  <label className={labelStyles}>Content</label>
                  <textarea
                    name="content"
                    defaultValue={editingNotice?.content}
                    className={`${inputStyles} h-32`}
                    required
                  />
                </div>

                <div className={formGroupStyles}>
                  <label className={labelStyles}>Category</label>
                  <select
                    name="category"
                    defaultValue={editingNotice?.category}
                    className={inputStyles}
                    required
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{categoryLabels[category]}</option>
                    ))}
                  </select>
                </div>

                <div className={formGroupStyles}>
                  <label className={labelStyles}>Priority</label>
                  <select
                    name="priority"
                    defaultValue={editingNotice?.priority}
                    className={inputStyles}
                    required
                  >
                    {priorities.map(priority => (
                      <option key={priority} value={priority}>
                        {priority.charAt(0).toUpperCase() + priority.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={formGroupStyles}>
                  <label className={labelStyles}>Venue (Optional)</label>
                  <input
                    type="text"
                    name="venue"
                    defaultValue={editingNotice?.venue}
                    className={inputStyles}
                    placeholder="Enter venue if applicable"
                  />
                </div>

                <div className={formGroupStyles}>
                  <label className={labelStyles}>Expiry Date</label>
                  <input
                    type="datetime-local"
                    name="expiresAt"
                    defaultValue={editingNotice?.expiresAt ? new Date(editingNotice.expiresAt).toISOString().slice(0, 16) : ''}
                    className={inputStyles}
                    required
                  />
                </div>

                <div className={formGroupStyles}>
                  <label className={labelStyles}>Status</label>
                  <select
                    name="isActive"
                    defaultValue={editingNotice?.isActive}
                    className={inputStyles}
                  >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
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
                  {editingNotice ? 'Save Changes' : 'Create Notice'}
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