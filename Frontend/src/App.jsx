import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Weather from './pages/Weather'
import MarketPricesPage from './pages/MarketPrices'
import ExpensesYield from './pages/ExpensesYield'
import CropPlannerFertilizer from './pages/CropPlannerFertilizer'
import ChatBot from './pages/ChatBot'
import GovtSchemesDocuments from './pages/GovtSchemesDocuments'
import Alerts from './pages/Alerts'
import Settings from './pages/Settings'
import AdminPanel from './pages/AdminPanel'
import PestDetection from './pages/PestDetection'
import ExpenseTracker from './pages/ExpenseTracker'

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Protected routes */}
          <Route path="/" element={<Navigate replace to="/dashboard" />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/weather" 
            element={
              <ProtectedRoute>
                <Weather />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/market-prices" 
            element={
              <ProtectedRoute>
                <MarketPricesPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/expenses-yield" 
            element={
              <ProtectedRoute>
                <ExpensesYield />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/crop-planner" 
            element={
              <ProtectedRoute>
                <CropPlannerFertilizer />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/chatbot" 
            element={
              <ProtectedRoute>
                <ChatBot />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/govt-schemes" 
            element={
              <ProtectedRoute>
                <GovtSchemesDocuments />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/alerts" 
            element={
              <ProtectedRoute>
                <Alerts />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/settings" 
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/pest-detection" 
            element={
              <ProtectedRoute>
                <PestDetection />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/expense-tracker" 
            element={
              <ProtectedRoute>
                <ExpenseTracker />
              </ProtectedRoute>
            } 
          />
          
          {/* Catch all route */}
          <Route path="*" element={<Navigate replace to="/dashboard" />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}
