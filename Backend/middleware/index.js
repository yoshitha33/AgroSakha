// Request logging middleware
export const requestLogger = (req, res, next) => {
  const start = Date.now()
  
  // Log request
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`, 
    req.body && Object.keys(req.body).length > 0 ? req.body : "")

  // Log response time on completion
  res.on('finish', () => {
    const duration = Date.now() - start
    console.log(`${req.method} ${req.path} - ${res.statusCode} - ${duration}ms`)
  })

  next()
}

// Error handling middleware
export const errorHandler = (err, req, res, next) => {
  console.error("Server error:", err)

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message)
    return res.status(400).json({
      error: "Validation Error",
      details: errors
    })
  }

  // Mongoose cast error (invalid ObjectId)
  if (err.name === 'CastError') {
    return res.status(400).json({
      error: "Invalid ID format",
      details: err.message
    })
  }

  // MongoDB duplicate key error
  if (err.code === 11000) {
    return res.status(409).json({
      error: "Duplicate entry",
      details: "A record with this data already exists"
    })
  }

  // Default server error
  res.status(err.status || 500).json({
    error: "Internal server error",
    message: process.env.NODE_ENV === 'development' ? err.message : "Something went wrong"
  })
}

// 404 handler for unmatched routes
export const notFoundHandler = (req, res) => {
  res.status(404).json({
    error: "Route not found",
    message: `The route ${req.method} ${req.originalUrl} does not exist`,
    availableEndpoints: {
      health: "GET /api/health",
      expenses: "GET /api/expenses",
      stats: "GET /api/expenses/stats",
      createExpense: "POST /api/expenses",
      updateExpense: "PATCH /api/expenses/:id",
      deleteExpense: "DELETE /api/expenses/:id"
    }
  })
}

// CORS configuration
export const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL || 'http://localhost:3000'
    : ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:5174', 'http://127.0.0.1:5173', 'http://127.0.0.1:5174'],
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}
