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

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState([]);
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
    status: '',
  });
  const [editingAchievement, setEditingAchievement] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [deletedImages, setDeletedImages] = useState([]);

  const categories = ['Technical', 'Cultural', 'Sports', 'Academic', 'Other'];
  const statuses = ['active', 'archived'];

  const categoryColors = {
    Technical: 'bg-blue-100 text-blue-800',
    Cultural: 'bg-purple-100 text-purple-800',
    Sports: 'bg-green-100 text-green-800',
    Academic: 'bg-yellow-100 text-yellow-800',
    Other: 'bg-gray-100 text-gray-800'
  };

  useEffect(() => {
    fetchAchievements();
  }, [pagination.page, filters]);

  const fetchAchievements = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page: pagination.page,
        limit: pagination.limit,
        ...filters,
      });

      const response = await fetch(`/api/superadmin/achievements?${queryParams}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch achievements');
      }

      setAchievements(data.achievements);
      setPagination(prev => ({ ...prev, ...data.pagination }));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAchievement = async (formData) => {
    try {
      setError(null);
      setUploadProgress(0);
      
      const data = new FormData();
      data.append('title', formData.title);
      data.append('category', formData.category);
      data.append('description', formData.description);
      data.append('date', formData.date);
      data.append('team', formData.team);
      data.append('highlights', formData.highlights);
      data.append('isRecent', formData.isRecent);
      data.append('linkUrl', formData.linkUrl);
      data.append('linkText', formData.linkText);
      data.append('priority', formData.priority);
      data.append('status', formData.status);

      // Append images
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput && fileInput.files) {
        for (let i = 0; i < fileInput.files.length; i++) {
          data.append('images', fileInput.files[i]);
        }
      }

      const response = await fetch('/api/superadmin/achievements', {
        method: 'POST',
        body: data
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create achievement');
      }

      await fetchAchievements();
      setIsModalOpen(false);
      setEditingAchievement(null);
      setUploadProgress(100);
    } catch (error) {
      setError(error.message);
      setUploadProgress(0);
    }
  };

  const handleUpdateAchievement = async (achievementId, formData) => {
    try {
      setError(null);
      setUploadProgress(0);
      
      const data = new FormData();
      data.append('title', formData.title);
      data.append('category', formData.category);
      data.append('description', formData.description);
      data.append('date', formData.date);
      data.append('team', formData.team);
      data.append('highlights', formData.highlights);
      data.append('isRecent', formData.isRecent);
      data.append('linkUrl', formData.linkUrl);
      data.append('linkText', formData.linkText);
      data.append('priority', formData.priority);
      data.append('status', formData.status);
      data.append('deletedImages', JSON.stringify(deletedImages));

      // Append new images
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput && fileInput.files) {
        for (let i = 0; i < fileInput.files.length; i++) {
          data.append('images', fileInput.files[i]);
        }
      }

      const response = await fetch(`/api/superadmin/achievements/${achievementId}`, {
        method: 'PUT',
        body: data
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to update achievement');
      }

      await fetchAchievements();
      setIsModalOpen(false);
      setEditingAchievement(null);
      setDeletedImages([]);
      setUploadProgress(100);
    } catch (error) {
      setError(error.message);
      setUploadProgress(0);
    }
  };

  const handleDeleteAchievement = async (achievementId) => {
    if (!window.confirm('Are you sure you want to delete this achievement?')) {
      return;
    }

    try {
      setError(null);
      const response = await fetch(`/api/superadmin/achievements/${achievementId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete achievement');
      }

      await fetchAchievements();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteImage = (imageUrl) => {
    setDeletedImages([...deletedImages, imageUrl]);
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Achievement Management</h1>
          <p className="text-gray-600 mt-1">Create and manage achievements</p>
        </div>
        <button
          onClick={() => {
            setEditingAchievement(null);
            setIsModalOpen(true);
          }}
          className={buttonStyles.primary}
        >
          Create Achievement
        </button>
      </div>

      {/* Filters */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={formGroupStyles}>
          <label className={labelStyles}>Search</label>
          <input
            type="text"
            placeholder="Search achievements..."
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
              <option key={category} value={category}>{category}</option>
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
            <option value="">All Statuses</option>
            {statuses.map(status => (
              <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
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

      {/* Achievements Table */}
      {!loading && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Achievement
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
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
                {achievements.map((achievement) => (
                  <tr key={achievement._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <div className="text-sm font-medium text-gray-900">{achievement.title}</div>
                        <div className="text-sm text-gray-500 line-clamp-1">{achievement.description}</div>
                        {achievement.images && achievement.images.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {achievement.images.map((image, index) => (
                              <a
                                key={index}
                                href={image.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-blue-600 hover:text-blue-800"
                              >
                                Image {index + 1}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${categoryColors[achievement.category] || 'bg-gray-100 text-gray-800'}`}>
                        {achievement.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(achievement.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${achievement.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {achievement.status.charAt(0).toUpperCase() + achievement.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => {
                          setEditingAchievement(achievement);
                          setIsModalOpen(true);
                        }}
                        className={`${buttonStyles.link} mr-4`}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteAchievement(achievement._id)}
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
      {!loading && achievements.length > 0 && (
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
      {!loading && achievements.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No achievements found
        </div>
      )}

      {/* Achievement Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 p-4 z-50 top-0 h-screen w-screen overflow-y-scroll">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-8 mx-auto"
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              {editingAchievement ? 'Edit Achievement' : 'Create Achievement'}
            </h2>

            <form onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const data = Object.fromEntries(formData.entries());
              
              if (editingAchievement) {
                await handleUpdateAchievement(editingAchievement._id, data);
              } else {
                await handleCreateAchievement(data);
              }
            }}>
              <div className="space-y-6">
                <div className={formGroupStyles}>
                  <label className={labelStyles}>Title</label>
                  <input
                    type="text"
                    name="title"
                    defaultValue={editingAchievement?.title}
                    className={inputStyles}
                    required
                  />
                </div>

                <div className={formGroupStyles}>
                  <label className={labelStyles}>Category</label>
                  <select
                    name="category"
                    defaultValue={editingAchievement?.category}
                    className={inputStyles}
                    required
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div className={formGroupStyles}>
                  <label className={labelStyles}>Description</label>
                  <textarea
                    name="description"
                    defaultValue={editingAchievement?.description}
                    className={`${inputStyles} h-32`}
                    required
                  />
                </div>

                <div className={formGroupStyles}>
                  <label className={labelStyles}>Date</label>
                  <input
                    type="date"
                    name="date"
                    defaultValue={editingAchievement?.date ? new Date(editingAchievement.date).toISOString().split('T')[0] : ''}
                    className={inputStyles}
                    required
                  />
                </div>

                <div className={formGroupStyles}>
                  <label className={labelStyles}>Team Members (one per line)</label>
                  <textarea
                    name="team"
                    defaultValue={editingAchievement?.team?.join('\n')}
                    className={`${inputStyles} h-24`}
                    placeholder="Enter team members, one per line"
                  />
                </div>

                <div className={formGroupStyles}>
                  <label className={labelStyles}>Highlights (one per line)</label>
                  <textarea
                    name="highlights"
                    defaultValue={editingAchievement?.highlights?.join('\n')}
                    className={`${inputStyles} h-24`}
                    placeholder="Enter highlights, one per line"
                  />
                </div>

                <div className={formGroupStyles}>
                  <label className={labelStyles}>Images</label>
                  <input
                    type="file"
                    name="images"
                    multiple
                    accept="image/*"
                    className={inputStyles}
                  />
                  {editingAchievement?.images && editingAchievement.images.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">Current images:</p>
                      <ul className="mt-1 space-y-1">
                        {editingAchievement.images.map((image, index) => (
                          <li key={index} className="flex items-center justify-between">
                            <a
                              href={image.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-blue-600 hover:text-blue-800"
                            >
                              Image {index + 1}
                            </a>
                            {!deletedImages.includes(image.url) && (
                              <button
                                type="button"
                                onClick={() => handleDeleteImage(image.url)}
                                className="text-red-600 hover:text-red-800"
                              >
                                Delete
                              </button>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className={formGroupStyles}>
                  <label className={labelStyles}>Link URL (Optional)</label>
                  <input
                    type="url"
                    name="linkUrl"
                    defaultValue={editingAchievement?.link?.url}
                    className={inputStyles}
                    placeholder="https://example.com"
                  />
                </div>

                <div className={formGroupStyles}>
                  <label className={labelStyles}>Link Text (Optional)</label>
                  <input
                    type="text"
                    name="linkText"
                    defaultValue={editingAchievement?.link?.text}
                    className={inputStyles}
                    placeholder="Click here to learn more"
                  />
                </div>

                <div className={formGroupStyles}>
                  <label className={labelStyles}>Priority</label>
                  <input
                    type="number"
                    name="priority"
                    defaultValue={editingAchievement?.priority || 0}
                    min="0"
                    className={inputStyles}
                  />
                </div>

                <div className={formGroupStyles}>
                  <label className={labelStyles}>Status</label>
                  <select
                    name="status"
                    defaultValue={editingAchievement?.status || 'active'}
                    className={inputStyles}
                  >
                    {statuses.map(status => (
                      <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={formGroupStyles}>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="isRecent"
                      defaultChecked={editingAchievement?.isRecent}
                      className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <span className="ml-2 text-sm text-gray-700">Mark as Recent Achievement</span>
                  </label>
                </div>
              </div>

              <div className="mt-8 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingAchievement(null);
                    setDeletedImages([]);
                  }}
                  className={buttonStyles.secondary}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={buttonStyles.primary}
                >
                  {editingAchievement ? 'Save Changes' : 'Create Achievement'}
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