import mongoose from 'mongoose';
const transactionSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User', index: true },
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true, index: true },
  date: { type: Date, required: true, index: true },
  notes: { type: String },
}, { timestamps: true });
export default mongoose.model('Transaction', transactionSchema);
