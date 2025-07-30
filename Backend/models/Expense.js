import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema(
  {
    amount: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, trim: true },
    date: { type: Date, required: true, default: Date.now },
    description: { type: String, trim: true, default: "" }
  },
  { timestamps: true }
);

const Expense = mongoose.model("Expense", ExpenseSchema);

export default Expense;
export const getCategoryColor = (category) => {
  switch (category) {
    case "Seeds & Fertilizers":
      return "bg-green-100 text-green-800";
    case "Equipment":
      return "bg-blue-100 text-blue-800";
    case "Labor":
      return "bg-yellow-100 text-yellow-800";
    case "Utilities":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-200 text-gray-700";
  }
};
