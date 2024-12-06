export interface Transaction {
  id: string;
  customerId: string;
  date: string;
  type: 'debit' | 'credit';
  amount: number;
  description: string;
  items?: {
    name: string;
    quantity: number;
    price: number;
  }[];
}

export interface Customer {
  id: string;
  name: string;
  balance: number;
  createdAt: string;
  updatedAt: string;
}

export interface Settings {
  lowBalanceThreshold: number;
  currency: string;
  notifications: boolean;
}