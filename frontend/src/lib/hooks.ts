import useSWR from 'swr';
import api, { Transaction, Settings } from './api';
import { useFilters } from './FilterContext';

const fetcher = (url: string) => api.get(url).then(res => res.data);

export function useTransactions() {
  const { filters } = useFilters();
  
  let url = '/transactions?';
  const params = new URLSearchParams();
  
  if (filters.type !== 'ALL') {
    params.append('type', filters.type);
  }
  
  if (filters.category) {
    params.append('category', filters.category);
  }
  
  if (filters.dateRange === 'THIS_MONTH') {
    const start = new Date();
    start.setDate(1);
    params.append('start_date', start.toISOString());
  } else if (filters.dateRange === 'THIS_WEEK') {
    const start = new Date();
    start.setDate(start.getDate() - start.getDay());
    params.append('start_date', start.toISOString());
  }
  
  url += params.toString();

  const { data, error, isLoading, mutate } = useSWR<Transaction[]>(url, fetcher);
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

export function useSettings() {
  const { data, error, isLoading, mutate } = useSWR<Settings>('/settings', fetcher);
  return {
    settings: data,
    isLoading,
    isError: error,
    mutate
  };
}
