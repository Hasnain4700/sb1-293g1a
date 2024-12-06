import React from 'react';
import useStore from '../../store/useStore';
import Button from '../ui/Button';
import { generateCSVReport } from '../../utils/helpers';

interface TransactionSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TransactionSummaryModal: React.FC<TransactionSummaryModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { customers, transactions, settings } = useStore();

  if (!isOpen) return null;

  const totalBalance = customers.reduce((sum, customer) => sum + customer.balance, 0);
  const totalTransactions = transactions.length;

  const handleDownloadCSV = () => {
    const csv = generateCSVReport(customers, transactions);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transaction-summary.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white p-6">
        <h2 className="mb-4 text-xl font-bold">Transaction Summary</h2>
        <div className="mb-4 space-y-2">
          <p>
            Total Customers: <strong>{customers.length}</strong>
          </p>
          <p>
            Total Transactions: <strong>{totalTransactions}</strong>
          </p>
          <p>
            Total Outstanding Balance:{' '}
            <strong>
              {settings.currency}
              {totalBalance.toFixed(2)}
            </strong>
          </p>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button onClick={handleDownloadCSV}>Download CSV</Button>
        </div>
      </div>
    </div>
  );
};

export default TransactionSummaryModal;