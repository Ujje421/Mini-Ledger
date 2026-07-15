import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
});

export interface Transaction {
  id: number;
  amount: number;
  type: 'INCOME' | 'EXPENSE';
  category: string;
  description?: string;
  date: string;
}

export const fetchTransactions = async (params?: any) => {
  const { data } = await api.get<Transaction[]>('/transactions', { params });
  return data;
};

export const createTransaction = async (transaction: Omit<Transaction, 'id'>) => {
  const { data } = await api.post<Transaction>('/transactions', transaction);
  return data;
};

export const deleteTransaction = async (id: number) => {
  const { data } = await api.delete(`/transactions/${id}`);
  return data;
};

export const fetchSummary = async () => {
  const { data } = await api.get('/summary');
  return data;
};

export const askLedger = async (question: string) => {
  const { data } = await api.post('/ask', { question });
  return data;
};

export default api;
