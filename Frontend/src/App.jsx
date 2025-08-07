import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
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
    <Router>
      <Routes>
        <Route path="/" element={<Navigate replace to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/market-prices" element={<MarketPricesPage />} />
        <Route path="/expenses-yield" element={<ExpensesYield />} />
        <Route path="/crop-planner" element={<CropPlannerFertilizer />} />
        <Route path="/chatbot" element={<ChatBot />} />
        <Route path="/govt-schemes" element={<GovtSchemesDocuments />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/pest-detection" element={<PestDetection />} />
        <Route path="/expense-tracker" element={<ExpenseTracker />} />
      </Routes>
    </Router>
  )
}
