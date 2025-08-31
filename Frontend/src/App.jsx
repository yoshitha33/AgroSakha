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
import FertilizerRecommendation from './pages/FertilizerRecommendation'
import ChatBot from './pages/ChatBot'
import GovtSchemesDocuments from './pages/GovtSchemesDocuments'
import Alerts from './pages/Alerts'
import Settings from './pages/Settings'
import AdminPanel from './pages/AdminPanel'
import PestDetection from './pages/PestDetection'
import ExpenseTracker from './pages/ExpenseTracker'
import NearbyShops from './pages/NearbyShops'
import CropRecommendation from './pages/CropRecommendation'

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
            path="/fertiliser-planner" 
            element={
              <ProtectedRoute>
                <FertilizerRecommendation />
              </ProtectedRoute>
            } 
          />

           
          <Route 
            path="/nearby-shops" 
            element={
              <ProtectedRoute>
                <NearbyShops />
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
          <Route 
            path="/crop-recommendation" 
            element={
              <ProtectedRoute>
                <CropRecommendation />
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
