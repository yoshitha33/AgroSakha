
import Expense from "../models/Expense.js";
import Budget from "../models/Budget.js";

// Get expense statistics
export const getExpenseStats = async (req, res) => {
  try {
    const currentMonth = new Date()
    currentMonth.setDate(1)
    currentMonth.setHours(0, 0, 0, 0)

    const nextMonth = new Date(currentMonth)
    nextMonth.setMonth(nextMonth.getMonth() + 1)

    // Get current month expenses
    const monthlyExpenses = await Expense.find({
      date: {
        $gte: currentMonth,
        $lt: nextMonth,
      },
    })

    // Calculate total
    const totalThisMonth = monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0)

    // Get category breakdown
    const categoryStats = monthlyExpenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount
      return acc
    }, {})

    // Get last month's total for comparison
    const lastMonth = new Date(currentMonth)
    lastMonth.setMonth(lastMonth.getMonth() - 1)

    const lastMonthExpenses = await Expense.find({
      date: {
        $gte: lastMonth,
        $lt: currentMonth,
      },
    })

    const totalLastMonth = lastMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0)
    const monthOverMonthChange = totalLastMonth > 0 ? ((totalThisMonth - totalLastMonth) / totalLastMonth) * 100 : 0

    // Get current month's budget
    const currentBudget = await Budget.findOne({
      month: currentMonth.getMonth() + 1,
      year: currentMonth.getFullYear(),
      isActive: true
    })

    // Calculate budget information
    let budgetInfo = null
    if (currentBudget) {
      const remaining = currentBudget.totalBudget - totalThisMonth
      const percentage = (totalThisMonth / currentBudget.totalBudget) * 100
      
      budgetInfo = {
        totalBudget: currentBudget.totalBudget,
        remaining: remaining,
        percentage: Math.round(percentage * 100) / 100,
        isOverBudget: totalThisMonth > currentBudget.totalBudget,
        categoryBudgets: currentBudget.categoryBudgets
      }
    }

    res.json({
      totalThisMonth,
      totalLastMonth,
      monthOverMonthChange: parseFloat(monthOverMonthChange.toFixed(2)),
      categoryStats,
      transactionCount: monthlyExpenses.length,
      budget: budgetInfo,
      monthYear: {
        month: currentMonth.getMonth() + 1,
        year: currentMonth.getFullYear()
      }
    })
  } catch (error) {
    console.error("Error fetching stats:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

// Get all expenses with filtering and pagination
export const getAllExpenses = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "", category = "", startDate = "", endDate = "" } = req.query

    // Validate pagination parameters
    const pageNum = parseInt(page)
    const limitNum = parseInt(limit)
    
    if (isNaN(pageNum) || pageNum < 1) {
      return res.status(400).json({ error: "Page must be a positive integer" })
    }
    
    if (isNaN(limitNum) || limitNum < 1 || limitNum > 100) {
      return res.status(400).json({ error: "Limit must be between 1 and 100" })
    }

    // Build query object
    const query = {}

    // Search in category and description
    if (search) {
      query.$or = [
        { category: { $regex: search, $options: "i" } }, 
        { description: { $regex: search, $options: "i" } }
      ]
    }

    // Filter by category
    if (category) {
      query.category = { $regex: category, $options: "i" }
    }

    // Filter by date range
    if (startDate || endDate) {
      query.date = {}
      if (startDate) {
        const start = new Date(startDate)
        if (isNaN(start.getTime())) {
          return res.status(400).json({ error: "Invalid start date format" })
        }
        query.date.$gte = start
      }
      if (endDate) {
        const end = new Date(endDate)
        if (isNaN(end.getTime())) {
          return res.status(400).json({ error: "Invalid end date format" })
        }
        query.date.$lte = end
      }
    }

    // Execute query with pagination
    const expenses = await Expense.find(query)
      .sort({ date: -1 })
      .limit(limitNum)
      .skip((pageNum - 1) * limitNum)
      .exec()

    // Get total count for pagination
    const total = await Expense.countDocuments(query)

    const response = {
      expenses,
      pagination: {
        totalPages: Math.ceil(total / limitNum),
        currentPage: pageNum,
        total,
        hasNextPage: pageNum < Math.ceil(total / limitNum),
        hasPrevPage: pageNum > 1,
        limit: limitNum
      }
    }

    res.json(response)
  } catch (error) {
    console.error("Error fetching expenses:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

// Create a new expense
export const createExpense = async (req, res) => {
  try {
    const { amount, category, date, description } = req.body

    // Validation
    if (!amount || !category) {
      return res.status(400).json({ error: "Amount and category are required" })
    }

    const numAmount = parseFloat(amount)
    if (isNaN(numAmount) || numAmount <= 0) {
      return res.status(400).json({ error: "Amount must be a valid number greater than 0" })
    }

    if (typeof category !== 'string' || category.trim().length === 0) {
      return res.status(400).json({ error: "Category must be a non-empty string" })
    }

    // Create expense
    const expense = new Expense({
      amount: numAmount,
      category: category.trim(),
      date: date ? new Date(date) : new Date(),
      description: description ? description.trim() : "",
    })

    const savedExpense = await expense.save()
    console.log("New expense created:", savedExpense._id)
    
    res.status(201).json({
      message: "Expense created successfully",
      expense: savedExpense
    })
  } catch (error) {
    console.error("Error creating expense:", error)
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: "Validation error", details: error.message })
    }
    res.status(500).json({ error: "Internal server error" })
  }
}

// Update an expense
export const updateExpense = async (req, res) => {
  try {
    const { id } = req.params
    const { amount, category, date, description } = req.body

    // Validate MongoDB ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: "Invalid expense ID format" })
    }

    // Build update object with validation
    const updateData = {}
    if (amount !== undefined) {
      const numAmount = parseFloat(amount)
      if (isNaN(numAmount) || numAmount <= 0) {
        return res.status(400).json({ error: "Amount must be a valid number greater than 0" })
      }
      updateData.amount = numAmount
    }
    if (category !== undefined) {
      if (typeof category !== 'string' || category.trim().length === 0) {
        return res.status(400).json({ error: "Category must be a non-empty string" })
      }
      updateData.category = category.trim()
    }
    if (date !== undefined) {
      const dateObj = new Date(date)
      if (isNaN(dateObj.getTime())) {
        return res.status(400).json({ error: "Invalid date format" })
      }
      updateData.date = dateObj
    }
    if (description !== undefined) updateData.description = description ? description.trim() : ""

    const expense = await Expense.findByIdAndUpdate(id, updateData, { 
      new: true, 
      runValidators: true 
    })

    if (!expense) {
      return res.status(404).json({ error: "Expense not found" })
    }

    console.log("Expense updated:", id)
    res.json({
      message: "Expense updated successfully",
      expense
    })
  } catch (error) {
    console.error("Error updating expense:", error)
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: "Validation error", details: error.message })
    }
    res.status(500).json({ error: "Internal server error" })
  }
}

// Delete an expense
export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params

    // Validate MongoDB ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: "Invalid expense ID format" })
    }

    const expense = await Expense.findByIdAndDelete(id)

    if (!expense) {
      return res.status(404).json({ error: "Expense not found" })
    }

    console.log("Expense deleted:", id)
    res.json({ 
      message: "Expense deleted successfully", 
      deletedExpense: expense 
    })
  } catch (error) {
    console.error("Error deleting expense:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

// Get single expense by ID
export const getExpenseById = async (req, res) => {
  try {
    const { id } = req.params

    // Validate MongoDB ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: "Invalid expense ID format" })
    }

    const expense = await Expense.findById(id)

    if (!expense) {
      return res.status(404).json({ error: "Expense not found" })
    }

    res.json({ expense })
  } catch (error) {
    console.error("Error fetching expense:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}
