import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import PestDetection from './pages/PestDetection'
import ExpenseTracker from './pages/ExpenseTracker'
// import other pages like Dashboard, Weather, etc. as needed

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate replace to="/pest-detection" />} />
        <Route path="/pest-detection" element={<PestDetection />} />
        <Route path="/expense-tracker" element={<ExpenseTracker />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  )
}
