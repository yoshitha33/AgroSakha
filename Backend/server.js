import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import expenseRoutes from "./routes/Expenses.js"
import budgetRoutes from "./routes/Budgets.js"
import { requestLogger, errorHandler, notFoundHandler, corsOptions } from "./middleware/index.js"
import config from "./config/index.js"

const app = express()

// Middleware
app.use(cors(corsOptions))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Request logging
if (config.ENABLE_LOGGING) {
  app.use(requestLogger)
}

// Connect to MongoDB
console.log("Connecting to MongoDB:", config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI)

mongoose.connection.on("connected", () => {
  console.log("✅ Connected to MongoDB successfully")
})

mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB connection error:", err)
})

mongoose.connection.on("disconnected", () => {
  console.log("⚠️ MongoDB disconnected")
})

// Routes
app.use("/api/expenses", expenseRoutes)
app.use("/api/budgets", budgetRoutes)

// Health check route
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Server is running",
    mongodb: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
    timestamp: new Date().toISOString()
  })
})

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "AgroSakha Backend API",
    status: "running",
    endpoints: {
      health: "/api/health",
      expenses: "/api/expenses",
      stats: "/api/expenses/stats",
      budgets: "/api/budgets",
      currentBudget: "/api/budgets/current"
    }
  })
})

// 404 handler for unmatched routes
app.use("*", notFoundHandler)

// Error handling middleware
app.use(errorHandler)

app.listen(config.PORT, () => {
  console.log(`🚀 Server is running on port ${config.PORT}`)
  console.log(`🌍 Environment: ${config.NODE_ENV}`)
  console.log(`📊 Health check: http://localhost:${config.PORT}/api/health`)
  console.log(`💰 Expenses API: http://localhost:${config.PORT}/api/expenses`)
  console.log(`📈 Stats API: http://localhost:${config.PORT}/api/expenses/stats`)
})

export default app
