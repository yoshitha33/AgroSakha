import mongoose from "mongoose";

const BudgetSchema = new mongoose.Schema(
  {
    month: { type: Number, required: true, min: 1, max: 12 },
    year: { type: Number, required: true, min: 2020 },
    totalBudget: { type: Number, required: true, min: 0 },
    categoryBudgets: {
      type: Map,
      of: Number,
      default: new Map()
    },
    isActive: { type: Boolean, default: true },
    farmerId: { type: String, default: "default" } // For multi-farmer support in future
  },
  { timestamps: true }
);

// Ensure only one active budget per month/year
BudgetSchema.index({ month: 1, year: 1, farmerId: 1 }, { unique: true });

const Budget = mongoose.model("Budget", BudgetSchema);

export default Budget;
