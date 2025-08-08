// src/utils/api.js

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

console.log('API Base URL:', API_BASE_URL); // Debug log

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };
};

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

// =====================
// Authentication APIs
// =====================

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @returns {Promise<Object>} - Response with user and token
 */
export async function register(userData) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error in register:', error);
    throw error;
  }
}

/**
 * Login user
 * @param {Object} loginData - { email, password }
 * @returns {Promise<Object>} - Response with user and token
 */
export async function login(loginData) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error in login:', error);
    throw error;
  }
}

/**
 * Get current user profile
 * @returns {Promise<Object>} - User profile data
 */
export async function getProfile() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error in getProfile:', error);
    throw error;
  }
}

/**
 * Update user profile
 * @param {Object} profileData - Updated profile data
 * @returns {Promise<Object>} - Updated user data
 */
export async function updateProfile(profileData) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(profileData),
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error in updateProfile:', error);
    throw error;
  }
}

/**
 * Change user password
 * @param {Object} passwordData - { currentPassword, newPassword }
 * @returns {Promise<Object>} - Success message
 */
export async function changePassword(passwordData) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/change-password`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(passwordData),
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error in changePassword:', error);
    throw error;
  }
}

/**
 * Logout user
 * @returns {Promise<Object>} - Success message
 */
export async function logout() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
    
    // Clear local storage regardless of response
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    return handleResponse(response);
  } catch (error) {
    // Clear local storage even if API call fails
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.error('Error in logout:', error);
    throw error;
  }
}

// =====================
// Expenses APIs
// =====================

/**
 * Fetch expenses list with optional query parameters
 * @param {Object} params - Query parameters like page, limit, search, etc.
 * @returns {Promise<Object>} - JSON response from backend
 */
export async function fetchExpenses(params = {}) {
  const queryString = new URLSearchParams(params).toString();
  const url = `${API_BASE_URL}/api/expenses${queryString ? `?${queryString}` : ''}`;

  try {
    const response = await fetch(url, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error in fetchExpenses:', error);
    throw error;
  }
}

/**
 * Add a new expense
 * @param {Object} expenseData - { amount, category, date, description }
 * @returns {Promise<Object>} - Created expense response
 */
export async function addExpense(expenseData) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/expenses`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(expenseData),
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error in addExpense:', error);
    throw error;
  }
}

/**
 * Delete an expense
 * @param {string} id - Expense ID to delete
 * @returns {Promise<Object>} - Delete response
 */
export async function deleteExpense(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/expenses/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error in deleteExpense:', error);
    throw error;
  }
}

/**
 * Update an expense
 * @param {string} id - Expense ID to update
 * @param {Object} expenseData - Updated expense data
 * @returns {Promise<Object>} - Updated expense response
 */
export async function updateExpense(id, expenseData) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/expenses/${id}`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(expenseData),
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error in updateExpense:', error);
    throw error;
  }
}

// ========== BUDGET API FUNCTIONS ==========

/**
 * Fetch all budgets with optional filtering
 * @param {Object} params - Query parameters like page, limit, year, month
 * @returns {Promise<Object>} - JSON response with budgets
 */
export async function fetchBudgets(params = {}) {
  const queryString = new URLSearchParams(params).toString();
  const url = `${API_BASE_URL}/api/budgets${queryString ? `?${queryString}` : ''}`;

  try {
    const response = await fetch(url, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error in fetchBudgets:', error);
    throw error;
  }
}

/**
 * Get current month's budget and spending info
 * @returns {Promise<Object>} - Current budget with spending details
 */
export async function getCurrentBudget() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/budgets/current`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      if (response.status === 404) {
        // No budget found for current month
        return null;
      }
      throw new Error(`Failed to fetch current budget: ${response.status} ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error in getCurrentBudget:', error);
    throw error;
  }
}

/**
 * Create a new budget
 * @param {Object} budgetData - { month, year, totalBudget, categoryBudgets }
 * @returns {Promise<Object>} - Created budget response
 */
export async function createBudget(budgetData) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/budgets`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(budgetData),
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error in createBudget:', error);
    throw error;
  }
}

/**
 * Update an existing budget
 * @param {string} id - Budget ID
 * @param {Object} budgetData - Updated budget data
 * @returns {Promise<Object>} - Updated budget response
 */
export async function updateBudget(id, budgetData) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/budgets/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(budgetData),
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error in updateBudget:', error);
    throw error;
  }
}

/**
 * Delete a budget
 * @param {string} id - Budget ID
 * @returns {Promise<Object>} - Delete response
 */
export async function deleteBudget(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/budgets/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error in deleteBudget:', error);
    throw error;
  }
}

