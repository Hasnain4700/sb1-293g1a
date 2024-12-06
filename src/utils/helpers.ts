import { format } from 'date-fns';
import { Customer, Transaction } from '../types';

export const formatCurrency = (amount: number, currency: string): string => {
  return `${currency}${amount.toFixed(2)}`;
};

export const formatDate = (date: string): string => {
  return format(new Date(date), 'PPP');
};

const escapeCSV = (value: string | number): string => {
  if (typeof value === 'number') return value.toString();
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
};

const createCSVRow = (values: (string | number)[]): string => {
  return values.map(escapeCSV).join(',');
};

export const generateCSVReport = (
  customers: Customer[],
  transactions: Transaction[]
): string => {
  const headers = ['Customer Name', 'Current Balance', 'Total Transactions', 'Last Updated'];
  const rows = customers.map((customer) => {
    const customerTransactions = transactions.filter(
      (t) => t.customerId === customer.id
    );
    return createCSVRow([
      customer.name,
      customer.balance,
      customerTransactions.length,
      formatDate(customer.updatedAt)
    ]);
  });

  return [createCSVRow(headers), ...rows].join('\n');
};

export const generateTransactionReport = (
  customer: Customer,
  transactions: Transaction[]
): string => {
  const headers = ['Date', 'Type', 'Amount', 'Description'];
  const rows = transactions
    .filter((t) => t.customerId === customer.id)
    .map((t) => createCSVRow([
      formatDate(t.date),
      t.type,
      t.amount,
      t.description
    ]));

  return [createCSVRow(headers), ...rows].join('\n');
};