"use client"

import { useState, useEffect } from "react"
import StatCard from "../components/StatCard"
import ExpenseChart from "../components/ExpenseChart"
import AddExpenseForm from "../components/AddExpenseForm"
import TransactionTable from "../components/TransactionTable"
import BudgetManager from "../components/BudgetManager"
import Navbar from "../components/Navbar"
import { fetchExpenses as apiFetchExpenses, addExpense as apiAddExpense, deleteExpense as apiDeleteExpense } from "../utils/api"

function ExpenseTracker() {
  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchExpenses()
  }, [])

  const fetchExpenses = async () => {
    try {
      setLoading(true)
      const data = await apiFetchExpenses()
      setExpenses(data.expenses || [])
    } catch (error) {
      console.error("Error fetching expenses:", error)
      // Set mock data for development
      setExpenses([
        {
          _id: "1",
          date: "2024-03-15",
          category: "Seeds & Fertilizers",
          description: "Premium Corn Seeds",
          amount: 1500.0,
        },
        {
          _id: "2",
          date: "2024-03-14",
          category: "Equipment",
          description: "Tractor Maintenance",
          amount: 850.0,
        },
        {
          _id: "3",
          date: "2024-03-13",
          category: "Labor",
          description: "Seasonal Workers",
          amount: 2000.0,
        },
        {
          _id: "4",
          date: "2024-03-12",
          category: "Utilities",
          description: "Electricity Bill",
          amount: 450.0,
        },
        {
          _id: "5",
          date: "2024-03-11",
          category: "Seeds & Fertilizers",
          description: "Organic Fertilizer",
          amount: 750.0,
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const addExpense = async (expenseData) => {
    try {
      console.log("Adding expense:", expenseData)
      const newExpense = await apiAddExpense(expenseData)
      console.log("Expense added successfully:", newExpense)
      await fetchExpenses() // Refresh the data
    } catch (error) {
      console.error("Error adding expense:", error)
      alert("Failed to add expense. Please try again.")
    }
  }

  const deleteExpense = async (id) => {
    try {
      console.log("Deleting expense:", id)
      await apiDeleteExpense(id)
      console.log("Expense deleted successfully")
      await fetchExpenses() // Refresh the data
    } catch (error) {
      console.error("Error deleting expense:", error)
      alert("Failed to delete expense. Please try again.")
    }
  }

  // Calculate stats
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  
  // Get category stats
  const categoryStats = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount
    return acc
  }, {})

  const highestCategory = Object.entries(categoryStats).reduce(
    (max, [category, amount]) => (amount > max.amount ? { category, amount } : max),
    { category: "No expenses yet", amount: 0 },
  )

  // Get most expensive day
  const dailyStats = expenses.reduce((acc, expense) => {
    const date = new Date(expense.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })
    acc[date] = (acc[date] || 0) + expense.amount
    return acc
  }, {})

  const mostExpensiveDay = Object.entries(dailyStats).reduce(
    (max, [date, amount]) => (amount > max.amount ? { date, amount } : max),
    { date: "No expenses yet", amount: 0 },
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Budget Manager */}
        <div className="mb-8">
          <BudgetManager />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Expenses This Month"
            value={`₹${totalExpenses.toLocaleString()}`}
            subtitle={`${expenses.length} transactions`}
            icon="💰"
          />
          <StatCard
            title="Transactions This Month"
            value={expenses.length.toString()}
            subtitle="Track all your farm expenses"
            icon="📊"
          />
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-4">Quick Stats</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-500">Highest Category:</p>
                <p className="text-sm font-medium">{highestCategory.category}</p>
                <p className="text-xs text-gray-400">₹{highestCategory.amount.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Most Expensive Day:</p>
                <p className="text-sm font-medium">{mostExpensiveDay.date}</p>
                <p className="text-xs text-gray-400">₹{mostExpensiveDay.amount.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="bg-white rounded-lg shadow mb-8">
          <ExpenseChart expenses={expenses} />
        </div>

        {/* Add Expense Form and Recent Transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <AddExpenseForm onAddExpense={addExpense} />
          </div>
          <div className="lg:col-span-2">
            <TransactionTable expenses={expenses} onDeleteExpense={deleteExpense} />
          </div>
        </div>
      </main>
    </div>
  )
}

export default ExpenseTracker
