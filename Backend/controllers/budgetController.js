import Budget from "../models/Budget.js";
import Expense from "../models/Expense.js";

// Helper function to validate MongoDB ObjectId
const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

// GET /api/budgets - Get all budgets
export const getAllBudgets = async (req, res) => {
  try {
    const { page = 1, limit = 10, year, month } = req.query;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);

    if (isNaN(pageNum) || pageNum < 1) {
      return res.status(400).json({ error: "Page must be a positive integer" });
    }

    if (isNaN(limitNum) || limitNum < 1 || limitNum > 100) {
      return res.status(400).json({ error: "Limit must be between 1 and 100" });
    }

    const query = {};
    if (year) query.year = parseInt(year);
    if (month) query.month = parseInt(month);

    const budgets = await Budget.find(query)
      .sort({ year: -1, month: -1 })
      .limit(limitNum)
      .skip((pageNum - 1) * limitNum);

    const total = await Budget.countDocuments(query);

    res.json({
      budgets,
      pagination: {
        totalPages: Math.ceil(total / limitNum),
        currentPage: pageNum,
        total,
        hasNextPage: pageNum < Math.ceil(total / limitNum),
        hasPrevPage: pageNum > 1,
        limit: limitNum
      }
    });
  } catch (error) {
    console.error("Error fetching budgets:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// GET /api/budgets/current - Get current month's budget
export const getCurrentBudget = async (req, res) => {
  try {
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

    const budget = await Budget.findOne({
      month: currentMonth,
      year: currentYear,
      isActive: true
    });

    if (!budget) {
      return res.status(404).json({ 
        error: "No budget found for current month",
        message: "Please create a budget for this month"
      });
    }

    // Calculate spent amount for current month
    const monthStart = new Date(currentYear, currentMonth - 1, 1);
    const monthEnd = new Date(currentYear, currentMonth, 0, 23, 59, 59);

    const expenses = await Expense.find({
      date: { $gte: monthStart, $lte: monthEnd }
    });

    const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const remaining = budget.totalBudget - totalSpent;

    // Calculate category-wise spending
    const categorySpending = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {});

    res.json({
      budget,
      spending: {
        totalSpent,
        remaining,
        percentage: (totalSpent / budget.totalBudget) * 100,
        categorySpending,
        isOverBudget: totalSpent > budget.totalBudget
      }
    });
  } catch (error) {
    console.error("Error fetching current budget:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// POST /api/budgets - Create new budget
export const createBudget = async (req, res) => {
  try {
    const { month, year, totalBudget, categoryBudgets } = req.body;

    // Validation
    if (!month || !year || !totalBudget) {
      return res.status(400).json({ 
        error: "Month, year, and total budget are required" 
      });
    }

    const monthNum = parseInt(month);
    const yearNum = parseInt(year);
    const budgetAmount = parseFloat(totalBudget);

    if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
      return res.status(400).json({ error: "Month must be between 1 and 12" });
    }

    if (isNaN(yearNum) || yearNum < 2020) {
      return res.status(400).json({ error: "Invalid year" });
    }

    if (isNaN(budgetAmount) || budgetAmount <= 0) {
      return res.status(400).json({ 
        error: "Total budget must be a positive number" 
      });
    }

    // Check if budget already exists for this month/year
    const existingBudget = await Budget.findOne({
      month: monthNum,
      year: yearNum
    });

    if (existingBudget) {
      return res.status(409).json({ 
        error: "Budget already exists for this month and year",
        existingBudget
      });
    }

    const budget = new Budget({
      month: monthNum,
      year: yearNum,
      totalBudget: budgetAmount,
      categoryBudgets: categoryBudgets || new Map(),
      isActive: true
    });

    const savedBudget = await budget.save();
    console.log("New budget created:", savedBudget._id);

    res.status(201).json({
      message: "Budget created successfully",
      budget: savedBudget
    });
  } catch (error) {
    console.error("Error creating budget:", error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        error: "Validation error", 
        details: error.message 
      });
    }
    res.status(500).json({ error: "Internal server error" });
  }
};

// PUT /api/budgets/:id - Update budget
export const updateBudget = async (req, res) => {
  try {
    const { id } = req.params;
    const { totalBudget, categoryBudgets, isActive } = req.body;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ error: "Invalid budget ID format" });
    }

    const updateData = {};
    
    if (totalBudget !== undefined) {
      const budgetAmount = parseFloat(totalBudget);
      if (isNaN(budgetAmount) || budgetAmount <= 0) {
        return res.status(400).json({ 
          error: "Total budget must be a positive number" 
        });
      }
      updateData.totalBudget = budgetAmount;
    }

    if (categoryBudgets !== undefined) {
      updateData.categoryBudgets = categoryBudgets;
    }

    if (isActive !== undefined) {
      updateData.isActive = Boolean(isActive);
    }

    const budget = await Budget.findByIdAndUpdate(
      id, 
      updateData, 
      { new: true, runValidators: true }
    );

    if (!budget) {
      return res.status(404).json({ error: "Budget not found" });
    }

    console.log("Budget updated:", id);
    res.json({
      message: "Budget updated successfully",
      budget
    });
  } catch (error) {
    console.error("Error updating budget:", error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        error: "Validation error", 
        details: error.message 
      });
    }
    res.status(500).json({ error: "Internal server error" });
  }
};

// DELETE /api/budgets/:id - Delete budget
export const deleteBudget = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ error: "Invalid budget ID format" });
    }

    const budget = await Budget.findByIdAndDelete(id);

    if (!budget) {
      return res.status(404).json({ error: "Budget not found" });
    }

    console.log("Budget deleted:", id);
    res.json({ 
      message: "Budget deleted successfully", 
      deletedBudget: budget 
    });
  } catch (error) {
    console.error("Error deleting budget:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// GET /api/budgets/:id - Get budget by ID
export const getBudgetById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ error: "Invalid budget ID format" });
    }

    const budget = await Budget.findById(id);

    if (!budget) {
      return res.status(404).json({ error: "Budget not found" });
    }

    res.json({ budget });
  } catch (error) {
    console.error("Error fetching budget:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
