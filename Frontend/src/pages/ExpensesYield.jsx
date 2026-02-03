import React, { useState } from 'react';
import Layout from '../components/Layout';
import ExpensesChart from '../components/ExpensesChart';
import AddExpenseForm from '../components/AddExpenseForm';
import TransactionTable from '../components/TransactionTable';

const ExpensesYield = () => {
  // Sample expense data
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      category: 'Seeds',
      description: 'Rice seeds for winter crop',
      amount: 5000,
      date: '2024-12-10'
    },
    {
      id: 2,
      category: 'Fertilizers',
      description: 'NPK fertilizer',
      amount: 3500,
      date: '2024-12-08'
    },
    {
      id: 3,
      category: 'Equipment',
      description: 'Tractor fuel',
      amount: 2000,
      date: '2024-12-05'
    },
    {
      id: 4,
      category: 'Labor',
      description: 'Harvesting labor',
      amount: 8000,
      date: '2024-12-01'
    }
  ]);

  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const handleAddExpense = (newExpense) => {
    const expense = {
      ...newExpense,
      id: expenses.length + 1,
      amount: parseFloat(newExpense.amount)
    };
    setExpenses([...expenses, expense]);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Expenses & Yield Management</h1>
          <p className="text-gray-600">Track your farm expenses and monitor yield performance</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Add New Expense</h2>
            <AddExpenseForm onAddExpense={handleAddExpense} />
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Expense Overview</h2>
            <ExpensesChart expenses={expenses} />
          </div>
        </div>

        <div className="mb-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
            <TransactionTable expenses={expenses} onDeleteExpense={handleDeleteExpense} />
          </div>
        </div>

        {/* Yield tracking section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Yield Analytics</h3>
            <p className="text-gray-600">Analyze your crop yield performance</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Cost vs Revenue</h3>
            <p className="text-gray-600">Compare expenses with income</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Profit Margins</h3>
            <p className="text-gray-600">Track profitability by crop</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ExpensesYield;
