// API Configuration
const isDevelopment = import.meta.env.DEV;

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || (isDevelopment 
  ? 'http://localhost:3000/api'  // Local development
  : 'https://real-estate-mern-backend-rho.vercel.app/api');  // Production

// API endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  SIGNUP: '/auth/signup',
  SIGNIN: '/auth/signin', 
  SIGNOUT: '/auth/signout',
  GOOGLE_AUTH: '/auth/google',
  
  // User endpoints
  UPDATE_USER: '/user/update',
  DELETE_USER: '/user/delete',
  GET_USER_LISTINGS: '/user/listings',
  GET_USER: '/user',
  
  // Listing endpoints
  CREATE_LISTING: '/listing/create',
  UPDATE_LISTING: '/listing/update',
  DELETE_LISTING: '/listing/delete',
  GET_LISTING: '/listing/get',
  GET_LISTING_BY_ID: '/listing/get'
};

// Helper function to build full API URL
export const buildApiUrl = (endpoint) => `${API_BASE_URL}${endpoint}`;
