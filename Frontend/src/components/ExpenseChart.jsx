"use client"

import { useState } from "react"
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const COLORS = ["#22c55e", "#3b82f6", "#f59e0b", "#8b5cf6", "#6b7280"]

const ExpenseChart = ({ expenses }) => {
  const [chartType, setChartType] = useState("category")

  // Prepare category distribution data with better handling
  const categoryData =
    expenses.length > 0
      ? expenses.reduce((acc, expense) => {
          const existing = acc.find((item) => item.name === expense.category)
          if (existing) {
            existing.value += expense.amount
          } else {
            acc.push({ name: expense.category, value: expense.amount })
          }
          return acc
        }, [])
      : [{ name: "No data", value: 1 }]

  // Prepare monthly trends data from actual expenses
  const monthlyData =
    expenses.length > 0
      ? (() => {
          const monthlyStats = expenses.reduce((acc, expense) => {
            const date = new Date(expense.date)
            const monthKey = `${date.getFullYear()}-${date.getMonth()}`
            const monthName = date.toLocaleDateString("en-US", { month: "short" })

            if (!acc[monthKey]) {
              acc[monthKey] = { month: monthName, amount: 0 }
            }
            acc[monthKey].amount += expense.amount
            return acc
          }, {})

          return Object.values(monthlyStats).sort((a, b) => {
            const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
            return monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month)
          })
        })()
      : [
          { month: "Jan", amount: 0 },
          { month: "Feb", amount: 0 },
          { month: "Mar", amount: 0 },
          { month: "Apr", amount: 0 },
          { month: "May", amount: 0 },
        ]

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Expense Analytics</h2>
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setChartType("category")}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              chartType === "category" ? "bg-green-500 text-white" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Category Distribution
          </button>
          <button
            onClick={() => setChartType("monthly")}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              chartType === "monthly" ? "bg-green-500 text-white" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Monthly Trends
          </button>
        </div>
      </div>

      <div className="h-80">
        {chartType === "category" ? (
          <div className="flex items-center">
            <div className="flex-1">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="ml-8">
              <div className="space-y-2">
                {categoryData.map((entry, index) => (
                  <div key={entry.name} className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <span className="text-sm text-gray-600">{entry.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
              <Bar dataKey="amount" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}

export default ExpenseChart
