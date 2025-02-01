/**
 * Filter requests by blood group
 * @param {Array} requests - Array of blood requests
 * @param {string} bloodGroup - Blood group to filter by
 * @returns {Array} Filtered requests
 */
export const filterByBloodGroup = (requests, bloodGroup) => {
  return requests.filter(request => request.bloodGroup === bloodGroup);
};

/**
 * Filter requests by status
 * @param {Array} requests - Array of blood requests
 * @param {string} status - Status to filter by (e.g., "Pending", "Approved", "Rejected")
 * @returns {Array} Filtered requests
 */
export const filterByStatus = (requests, status) => {
  return requests.filter(request => request.status === status);
};

/**
 * Filter requests by multiple criteria
 * @param {Array} requests - Array of blood requests
 * @param {Object} filters - Object containing filter criteria
 * @returns {Array} Filtered requests
 */
export const filterRequests = (requests, filters = {}) => {
  return requests.filter(request => {
    // Check each filter criterion
    for (const [key, value] of Object.entries(filters)) {
      if (value && request[key] !== value) {
        return false;
      }
    }
    return true;
  });
};

/**
 * Sort requests by date
 * @param {Array} requests - Array of blood requests
 * @param {string} order - Sort order ('asc' or 'desc')
 * @returns {Array} Sorted requests
 */
export const sortByDate = (requests, order = 'desc') => {
  return [...requests].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return order === 'desc' ? dateB - dateA : dateA - dateB;
  });
};
