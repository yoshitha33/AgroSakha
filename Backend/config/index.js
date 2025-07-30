import dotenv from 'dotenv'

dotenv.config()

export const config = {
  // Server
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // Database
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/expense-tracker',
  
  // Frontend
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',
  
  // API
  API_VERSION: process.env.API_VERSION || 'v1',
  
  // Pagination
  DEFAULT_PAGE_SIZE: parseInt(process.env.DEFAULT_PAGE_SIZE) || 10,
  MAX_PAGE_SIZE: parseInt(process.env.MAX_PAGE_SIZE) || 100,
  
  // Security
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
  JWT_EXPIRE: process.env.JWT_EXPIRE || '24h',
  
  // Features
  ENABLE_LOGGING: process.env.ENABLE_LOGGING !== 'false',
  ENABLE_CORS: process.env.ENABLE_CORS !== 'false'
}

// Validate required environment variables
const requiredEnvVars = ['MONGODB_URI']

if (config.NODE_ENV === 'production') {
  requiredEnvVars.push('JWT_SECRET')
}

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`❌ Missing required environment variable: ${envVar}`)
    process.exit(1)
  }
}

export default config
