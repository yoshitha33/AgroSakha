// src/utils/api.js

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

console.log('API Base URL:', API_BASE_URL); // Debug log

/**
 * Fetch expenses list with optional query parameters
 * @param {Object} params - Query parameters like page, limit, search, etc.
 * @returns {Promise<Object>} - JSON response from backend
 */
export async function fetchExpenses(params = {}) {
  const queryString = new URLSearchParams(params).toString();
  const url = `${API_BASE_URL}/api/expenses${queryString ? `?${queryString}` : ''}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch expenses: ${response.status} ${response.statusText}`);
    }
    return response.json();
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
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(expenseData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to add expense');
    }
    return response.json();
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
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to delete expense');
    }
    return response.json();
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
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(expenseData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to update expense');
    }
    return response.json();
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
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch budgets: ${response.status} ${response.statusText}`);
    }
    return response.json();
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
    const response = await fetch(`${API_BASE_URL}/api/budgets/current`);
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
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(budgetData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create budget');
    }
    return response.json();
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
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(budgetData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to update budget');
    }
    return response.json();
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
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to delete budget');
    }
    return response.json();
  } catch (error) {
    console.error('Error in deleteBudget:', error);
    throw error;
  }
}

