import Transaction from '../models/Transaction.js';
export const getTransactions = async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword ? { title: { $regex: req.query.keyword, $options: 'i' } } : {};
  const category = req.query.category && req.query.category !== 'All' ? { category: req.query.category } : {};
  
  const count = await Transaction.countDocuments({ user: req.user._id, ...keyword, ...category });
  const transactions = await Transaction.find({ user: req.user._id, ...keyword, ...category })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort({ date: -1 })
    .lean();
    
  res.json({ transactions, page, pages: Math.ceil(count / pageSize) });
};
export const createTransaction = async (req, res) => {
  const { title, amount, category, date, notes } = req.body;
  const transaction = await Transaction.create({ user: req.user._id, title, amount, category, date, notes });
  res.status(201).json(transaction);
};
export const updateTransaction = async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);
  if (transaction && transaction.user.toString() === req.user._id.toString()) {
    Object.assign(transaction, req.body);
    const updated = await transaction.save();
    res.json(updated);
  } else {
    res.status(404).json({ message: 'Not found' });
  }
};
export const deleteTransaction = async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);
  if (transaction && transaction.user.toString() === req.user._id.toString()) {
    await transaction.deleteOne();
    res.json({ message: 'Removed' });
  } else {
    res.status(404).json({ message: 'Not found' });
  }
};