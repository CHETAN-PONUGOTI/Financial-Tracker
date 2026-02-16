import { useState, useEffect } from 'react';
import API from '../api/axios';
import SummaryCards from '../components/dashboard/SummaryCards';
import CategoryBreakdown from '../components/dashboard/CategoryBreakdown';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await API.get('/transactions?limit=100');
      setTransactions(data.transactions);
    };
    fetchData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Financial Overview</h1>
        <Link to="/explorer" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
          Explorer View
        </Link>
      </div>
      
      <SummaryCards transactions={transactions} />
      
      <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold mb-6">Spending by Category</h2>
        <CategoryBreakdown transactions={transactions} />
      </div>
    </div>
  );
};

export default DashboardPage;