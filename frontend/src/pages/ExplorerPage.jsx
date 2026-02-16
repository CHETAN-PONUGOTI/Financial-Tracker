import { useState, useEffect, useCallback } from 'react';
import API from '../api/axios';
import SearchFilters from '../components/explorer/SearchFilters';
import TransactionItem from '../components/explorer/TransactionItem';
import TransactionFormModal from '../components/explorer/TransactionFormModal';
import usePersistedState from '../hooks/usePersistedState';

const ExplorerPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [filters, setFilters] = usePersistedState('explorerFilters', { keyword: '', category: 'All' });
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchTransactions = useCallback(async (pageNum, isNewSearch = false) => {
    const { data } = await API.get(`/transactions?pageNumber=${pageNum}&keyword=${filters.keyword}&category=${filters.category}`);
    setTransactions(prev => isNewSearch ? data.transactions : [...prev, ...data.transactions]);
    setHasMore(data.page < data.pages);
  }, [filters]);

  useEffect(() => {
    setPage(1);
    fetchTransactions(1, true);
  }, [filters, fetchTransactions]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <button onClick={() => setIsModalOpen(true)} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
          + Add New
        </button>
      </div>

      <SearchFilters filters={filters} setFilters={setFilters} />

      <div className="space-y-3 mt-6">
        {transactions.map(t => (
          <TransactionItem key={t._id} transaction={t} refresh={() => fetchTransactions(1, true)} />
        ))}
      </div>

      {hasMore && (
        <button 
          onClick={() => { setPage(p => p + 1); fetchTransactions(page + 1); }}
          className="w-full py-3 mt-6 text-indigo-600 font-semibold border border-indigo-100 rounded-lg hover:bg-indigo-50"
        >
          Load More Transactions
        </button>
      )}

      {isModalOpen && (
        <TransactionFormModal onClose={() => setIsModalOpen(false)} onSuccess={() => fetchTransactions(1, true)} />
      )}
    </div>
  );
};

export default ExplorerPage;