import React from 'react';

const SearchFilters = ({ filters, setFilters }) => {
  const categories = ['All', 'Food', 'Rent', 'Transport', 'Entertainment', 'Salary', 'Utilities', 'Misc'];

  return (
    <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
      <div className="flex-1">
        <input
          type="text"
          placeholder="Search by title..."
          className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
          value={filters.keyword}
          onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
        />
      </div>
      <div className="w-full md:w-48">
        <select
          className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white transition"
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default React.memo(SearchFilters);