// src/components/ExpensesChart.jsx
const ExpensesChart = () => {
    // This is a simplified chart using divs - in a real app you'd use a charting library
    const expenses = [
        { month: "Jan", amount: 2000 },
        { month: "Feb", amount: 2500 },
        { month: "Mar", amount: 3000 },
        { month: "Apr", amount: 1500 },
        { month: "May", amount: 3500 },
        { month: "Jun", amount: 4000 },
    ];

    const maxAmount = Math.max(...expenses.map((e) => e.amount));

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Monthly Expenses
            </h2>
            <div className="flex items-end justify-between h-40 mt-6">
                {expenses.map((expense) => (
                    <div key={expense.month} className="flex flex-col items-center">
                        <div
                            className="w-6 bg-green-500 rounded-t-sm"
                            style={{
                                height: `${(expense.amount / maxAmount) * 100}%`,
                            }}
                        ></div>
                        <span className="text-xs text-gray-500 mt-1">{expense.month}</span>
                    </div>
                ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-gray-800 font-medium">Total: $9000</p>
            </div>
        </div>
    );
};

export default ExpensesChart;