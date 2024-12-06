import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Customer, Transaction, Settings } from '../types';

interface State {
  customers: Customer[];
  transactions: Transaction[];
  settings: Settings;
  addCustomer: (customer: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateCustomer: (customer: Customer) => void;
  deleteCustomer: (id: string) => void;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateTransaction: (transaction: Transaction) => void;
  deleteTransaction: (id: string) => void;
  updateSettings: (settings: Settings) => void;
}

const useStore = create<State>()(
  persist(
    (set) => ({
      customers: [],
      transactions: [],
      settings: {
        lowBalanceThreshold: 1000,
        currency: '₹',
        notifications: true,
      },
      addCustomer: (customer) =>
        set((state) => ({
          customers: [
            ...state.customers,
            {
              ...customer,
              id: crypto.randomUUID(),
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          ],
        })),
      updateCustomer: (customer) =>
        set((state) => ({
          customers: state.customers.map((c) =>
            c.id === customer.id ? { ...customer, updatedAt: new Date().toISOString() } : c
          ),
        })),
      deleteCustomer: (id) =>
        set((state) => ({
          customers: state.customers.filter((c) => c.id !== id),
          transactions: state.transactions.filter((t) => t.customerId !== id),
        })),
      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [
            ...state.transactions,
            { ...transaction, id: crypto.randomUUID() },
          ],
          customers: state.customers.map((c) =>
            c.id === transaction.customerId
              ? {
                  ...c,
                  balance:
                    c.balance +
                    (transaction.type === 'debit' ? transaction.amount : -transaction.amount),
                  updatedAt: new Date().toISOString(),
                }
              : c
          ),
        })),
      updateTransaction: (transaction) =>
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === transaction.id ? transaction : t
          ),
        })),
      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        })),
      updateSettings: (settings) =>
        set(() => ({
          settings,
        })),
    }),
    {
      name: 'shop-khata-storage',
    }
  )
);

export default useStore;