import React, { useMemo } from 'react';
import { formatCurrency } from '../../utils/formatCurrency';

const SummaryCards = ({ transactions }) => {
  const { income, expenses, balance } = useMemo(() => {
    return transactions.reduce((acc, curr) => {
      if (curr.amount > 0) acc.income += curr.amount;
      else acc.expenses += Math.abs(curr.amount);
      acc.balance += curr.amount;
      return acc;
    }, { income: 0, expenses: 0, balance: 0 });
  }, [transactions]);

  const cardStyle = "bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col";

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className={cardStyle}>
        <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Balance</span>
        <span className={`text-3xl font-bold mt-2 ${balance >= 0 ? 'text-gray-900' : 'text-red-600'}`}>
          {formatCurrency(balance)}
        </span>
      </div>
      <div className={cardStyle}>
        <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Income</span>
        <span className="text-3xl font-bold mt-2 text-green-600">
          {formatCurrency(income)}
        </span>
      </div>
      <div className={cardStyle}>
        <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Expenses</span>
        <span className="text-3xl font-bold mt-2 text-red-600">
          {formatCurrency(expenses)}
        </span>
      </div>
    </div>
  );
};

export default React.memo(SummaryCards);