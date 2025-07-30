import { useState, useEffect } from 'react';
import { getCurrentBudget, createBudget, updateBudget } from '../utils/api';

const BudgetModal = ({ isOpen, onClose, onBudgetUpdate }) => {
  const [formData, setFormData] = useState({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    totalBudget: '',
    categoryBudgets: {
      'Seeds & Fertilizers': '',
      'Equipment': '',
      'Labor': '',
      'Utilities': '',
      'Other': ''
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const budgetData = {
        month: parseInt(formData.month),
        year: parseInt(formData.year),
        totalBudget: parseFloat(formData.totalBudget),
        categoryBudgets: Object.entries(formData.categoryBudgets).reduce((acc, [key, value]) => {
          if (value && parseFloat(value) > 0) {
            acc[key] = parseFloat(value);
          }
          return acc;
        }, {})
      };

      await createBudget(budgetData);
      onBudgetUpdate();
      onClose();
      setFormData({
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        totalBudget: '',
        categoryBudgets: {
          'Seeds & Fertilizers': '',
          'Equipment': '',
          'Labor': '',
          'Utilities': '',
          'Other': ''
        }
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryBudgetChange = (category, value) => {
    setFormData(prev => ({
      ...prev,
      categoryBudgets: {
        ...prev.categoryBudgets,
        [category]: value
      }
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Set Monthly Budget</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Month
              </label>
              <select
                value={formData.month}
                onChange={(e) => setFormData(prev => ({ ...prev, month: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {new Date(2024, i).toLocaleString('default', { month: 'long' })}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Year
              </label>
              <input
                type="number"
                value={formData.year}
                onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                min="2020"
                max="2030"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total Monthly Budget (Rupees)
            </label>
            <input
              type="number"
              value={formData.totalBudget}
              onChange={(e) => setFormData(prev => ({ ...prev, totalBudget: e.target.value }))}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter total budget"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Category Budgets (Optional)
            </h3>
            <div className="space-y-2">
              {Object.entries(formData.categoryBudgets).map(([category, value]) => (
                <div key={category} className="flex items-center space-x-2">
                  <label className="text-xs text-gray-600 w-24 flex-shrink-0">
                    {category}:
                  </label>
                  <input
                    type="number"
                    value={value}
                    onChange={(e) => handleCategoryBudgetChange(category, e.target.value)}
                    className="flex-1 p-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-green-500 focus:border-transparent"
                    placeholder="Rupees (Rs)"
                    min="0"
                    step="0.01"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Budget'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const BudgetOverview = ({ currentBudget, onCreateBudget }) => {
  if (!currentBudget) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Budget Set</h3>
          <p className="text-gray-600 mb-4">
            Set a monthly budget to track your spending and stay on track with your farm expenses.
          </p>
          <button
            onClick={onCreateBudget}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Create Monthly Budget
          </button>
        </div>
      </div>
    );
  }

  const { budget, spending } = currentBudget;
  const progressPercentage = Math.min(spending.percentage, 100);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Monthly Budget - {new Date(0, budget.month - 1).toLocaleString('default', { month: 'long' })} {budget.year}
        </h3>
        <button
          onClick={onCreateBudget}
          className="text-sm px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
        >
          Update Budget
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">
            ₹{budget.totalBudget.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Total Budget</div>
        </div>
        
        <div className="text-center">
          <div className={`text-2xl font-bold ${spending.isOverBudget ? 'text-red-600' : 'text-green-600'}`}>
            ₹{spending.totalSpent.toLocaleString()}         
          </div>
          <div className="text-sm text-gray-600">Spent</div>
        </div>
        
        <div className="text-center">
          <div className={`text-2xl font-bold ${spending.remaining < 0 ? 'text-red-600' : 'text-blue-600'}`}>
            ₹{Math.abs(spending.remaining).toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">
            {spending.remaining < 0 ? 'Over Budget' : 'Remaining'}
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Budget Progress</span>
          <span>{spending.percentage.toFixed(1)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all duration-300 ${
              spending.isOverBudget 
                ? 'bg-red-500' 
                : spending.percentage > 80 
                  ? 'bg-yellow-500' 
                  : 'bg-green-500'
            }`}
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {spending.isOverBudget && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3">
          <div className="flex items-center">
            <div className="text-red-500 mr-2">⚠️</div>
            <div className="text-sm text-red-700">
              You have exceeded your monthly budget by ₹{(spending.totalSpent - budget.totalBudget).toLocaleString()}.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const BudgetManager = () => {
  const [currentBudget, setCurrentBudget] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');

  const fetchCurrentBudget = async () => {
    try {
      setLoading(true);
      const budget = await getCurrentBudget();
      setCurrentBudget(budget);
    } catch (err) {
      console.error('Error fetching current budget:', err);
      setError('Failed to load budget information');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentBudget();
  }, []);

  const handleBudgetUpdate = () => {
    fetchCurrentBudget();
    setIsModalOpen(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <div className="text-red-700">{error}</div>
      </div>
    );
  }

  return (
    <div>
      <BudgetOverview 
        currentBudget={currentBudget} 
        onCreateBudget={() => setIsModalOpen(true)} 
      />
      
      <BudgetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onBudgetUpdate={handleBudgetUpdate}
      />
    </div>
  );
};

export default BudgetManager;
