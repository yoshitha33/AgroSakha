import express from "express"
import {
  getExpenseStats,
  getAllExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
  getExpenseById
} from "../controllers/expenseController.js"

const router = express.Router()

// GET /api/expenses/stats - Get expense statistics
router.get("/stats", getExpenseStats)

// GET /api/expenses - List, filter, search, and paginate expenses
router.get("/", getAllExpenses)

// GET /api/expenses/:id - Get single expense by ID
router.get("/:id", getExpenseById)

// POST /api/expenses - Add new expense
router.post("/", createExpense)

// PATCH /api/expenses/:id - Update expense
router.patch("/:id", updateExpense)

// DELETE /api/expenses/:id - Delete expense
router.delete("/:id", deleteExpense)

export default router
