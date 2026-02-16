import React, { useState } from 'react';
import API from '../../api/axios';

const TransactionFormModal = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: 'Food',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/transactions', {
        ...formData,
        amount: parseFloat(formData.amount)
      });
      onSuccess();
      onClose();
    } catch (err) {
      alert('Error saving transaction');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl transform transition-all">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">New Transaction</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">&times;</button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Title</label>
            <input required type="text" className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Amount</label>
              <input required type="number" step="0.01" placeholder="-50.00" className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Category</label>
              <select className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                {['Food', 'Rent', 'Transport', 'Entertainment', 'Salary', 'Utilities', 'Misc'].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Date</label>
            <input required type="date" className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
          </div>

          <button type="submit" className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition">
            Add Transaction
          </button>
        </form>
      </div>
    </div>
  );
};

export default TransactionFormModal;