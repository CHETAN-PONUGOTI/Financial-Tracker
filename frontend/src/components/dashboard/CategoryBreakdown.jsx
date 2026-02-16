import React, { useMemo } from 'react';

const CategoryBreakdown = ({ transactions }) => {
  const breakdown = useMemo(() => {
    const categories = {};
    const expensesOnly = transactions.filter(t => t.amount < 0);
    const totalExp = expensesOnly.reduce((acc, t) => acc + Math.abs(t.amount), 0);

    expensesOnly.forEach(t => {
      categories[t.category] = (categories[t.category] || 0) + Math.abs(t.amount);
    });

    return Object.entries(categories)
      .map(([name, value]) => ({
        name,
        value,
        percentage: totalExp > 0 ? (value / totalExp) * 100 : 0
      }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  if (breakdown.length === 0) return <p className="text-gray-400 italic">No expense data to analyze yet.</p>;

  return (
    <div className="space-y-6">
      {breakdown.map((item) => (
        <div key={item.name} className="group">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-700">{item.name}</span>
            <span className="text-sm font-medium text-gray-500">
              ${item.value.toFixed(2)} ({item.percentage.toFixed(1)}%)
            </span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
            <div 
              className="bg-indigo-600 h-full rounded-full transition-all duration-700 ease-out"
              style={{ width: `${item.percentage}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default React.memo(CategoryBreakdown);