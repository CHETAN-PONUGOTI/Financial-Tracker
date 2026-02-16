import React from 'react';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';
import API from '../../api/axios';

const TransactionItem = ({ transaction, refresh }) => {
  const handleDelete = async () => {
    if (window.confirm('Delete this transaction?')) {
      try {
        await API.delete(`/transactions/${transaction._id}`);
        refresh();
      } catch (err) {
        alert('Delete failed');
      }
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:border-indigo-200 transition">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-full ${transaction.amount < 0 ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-500'}`}>
          {transaction.amount < 0 ? '↓' : '↑'}
        </div>
        <div>
          <h4 className="font-bold text-gray-800">{transaction.title}</h4>
          <p className="text-xs text-gray-400 uppercase font-semibold">{transaction.category} • {formatDate(transaction.date)}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <span className={`text-lg font-bold ${transaction.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
          {formatCurrency(transaction.amount)}
        </span>
        <button onClick={handleDelete} className="text-gray-300 hover:text-red-500 transition">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default React.memo(TransactionItem);