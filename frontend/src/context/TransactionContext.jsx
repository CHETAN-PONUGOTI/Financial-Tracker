import { createContext, useState, useCallback } from 'react';
import API from '../api/axios';

export const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const refreshTransactions = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await API.get('/transactions?pageNumber=1&limit=50');
      setTransactions(data.transactions);
    } catch (err) {
      console.error("Error fetching transactions");
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <TransactionContext.Provider value={{ transactions, loading, refreshTransactions }}>
      {children}
    </TransactionContext.Provider>
  );
};