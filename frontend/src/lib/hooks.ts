import useSWR from 'swr';
import api, { Transaction } from './api';

const fetcher = (url: string) => api.get(url).then(res => res.data);

export function useTransactions() {
  const { data, error, isLoading, mutate } = useSWR<Transaction[]>('/transactions', fetcher);
  return {
    transactions: data,
    isLoading,
    isError: error,
    mutate
  };
}

export function useSummary() {
  const { data, error, isLoading, mutate } = useSWR('/summary', fetcher);
  return {
    summary: data,
    isLoading,
    isError: error,
    mutate
  };
}
