import { buildApiUrl, API_ENDPOINTS } from '../config/api.js';

// Helper function to make authenticated API requests
export const makeAuthenticatedRequest = async (endpoint, options = {}) => {
  const url = buildApiUrl(endpoint);
  
  const defaultOptions = {
    credentials: 'include', // Include cookies for authentication
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);
    
    if (!response.ok) {
      const errorData = await response.text();
      let errorMessage;
      
      try {
        const jsonError = JSON.parse(errorData);
        errorMessage = jsonError.message || `HTTP error! status: ${response.status}`;
      } catch {
        errorMessage = errorData || `HTTP error! status: ${response.status}`;
      }
      
      throw new Error(errorMessage);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`API request failed for ${endpoint}:`, error);
    throw error;
  }
};

// Sign out user
export const signOutUser = async () => {
  return makeAuthenticatedRequest(API_ENDPOINTS.SIGNOUT);
};

// Get user listings
export const getUserListings = async (userId) => {
  return makeAuthenticatedRequest(`${API_ENDPOINTS.GET_USER_LISTINGS}/${userId}`);
};

// Update user profile
export const updateUserProfile = async (userId, userData) => {
  return makeAuthenticatedRequest(`${API_ENDPOINTS.UPDATE_USER}/${userId}`, {
    method: 'POST',
    body: JSON.stringify(userData),
  });
};

// Delete user account
export const deleteUserAccount = async (userId) => {
  return makeAuthenticatedRequest(`${API_ENDPOINTS.DELETE_USER}/${userId}`, {
    method: 'DELETE',
  });
};