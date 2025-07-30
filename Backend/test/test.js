// Simple API test script
const API_BASE = 'http://localhost:5000'

async function testAPI() {
  console.log('🧪 Testing AgroSakha Backend API...\n')

  try {
    // Test 1: Health Check
    console.log('1️⃣ Testing Health Check...')
    const healthResponse = await fetch(`${API_BASE}/api/health`)
    const healthData = await healthResponse.json()
    console.log('✅ Health check:', healthData.status)
    console.log('📊 MongoDB:', healthData.mongodb)
    console.log()

    // Test 2: Get all expenses (empty initially)
    console.log('2️⃣ Testing Get All Expenses...')
    const expensesResponse = await fetch(`${API_BASE}/api/expenses`)
    const expensesData = await expensesResponse.json()
    console.log('✅ Expenses retrieved:', expensesData.expenses.length, 'expenses found')
    console.log('📄 Total pages:', expensesData.pagination?.totalPages || expensesData.totalPages)
    console.log()

    // Test 3: Create a new expense
    console.log('3️⃣ Testing Create Expense...')
    const newExpense = {
      amount: 150.75,
      category: 'Seeds & Fertilizers',
      description: 'Test expense for API validation',
      date: new Date().toISOString()
    }

    const createResponse = await fetch(`${API_BASE}/api/expenses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newExpense)
    })

    if (createResponse.ok) {
      const createdExpense = await createResponse.json()
      console.log('✅ Expense created with ID:', createdExpense.expense?.id || createdExpense.id)
      
      // Test 4: Get stats
      console.log()
      console.log('4️⃣ Testing Get Stats...')
      const statsResponse = await fetch(`${API_BASE}/api/expenses/stats`)
      const statsData = await statsResponse.json()
      console.log('✅ Stats retrieved:')
      console.log('💰 Total this month: $' + statsData.totalThisMonth)
      console.log('📊 Transactions:', statsData.transactionCount)
      console.log('📈 Categories:', Object.keys(statsData.categoryStats).length)
      
    } else {
      const error = await createResponse.json()
      console.log('❌ Failed to create expense:', error.error)
    }

    console.log('\n🎉 API tests completed!')

  } catch (error) {
    console.error('❌ Test failed:', error.message)
    console.log('\n💡 Make sure the backend server is running on port 5000')
    console.log('Run: npm start in the Backend directory')
  }
}

// Run the test
testAPI()
