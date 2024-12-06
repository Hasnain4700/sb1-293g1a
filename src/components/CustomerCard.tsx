import React from 'react';
import { Card } from './ui/Card';
import Button from './ui/Button';
import { Customer } from '../types';
import useStore from '../store/useStore';

interface CustomerCardProps {
  customer: Customer;
  onSelect: (customer: Customer) => void;
}

const CustomerCard: React.FC<CustomerCardProps> = ({ customer, onSelect }) => {
  const { settings } = useStore();
  const isLowBalance = customer.balance < settings.lowBalanceThreshold;

  return (
    <Card className="w-full">
      <Card.Header>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{customer.name}</h3>
          <span
            className={`text-lg font-bold ${
              isLowBalance ? 'text-red-500' : 'text-green-500'
            }`}
          >
            {settings.currency}
            {customer.balance.toFixed(2)}
          </span>
        </div>
      </Card.Header>
      <Card.Footer>
        <Button
          variant="primary"
          size="sm"
          className="w-full"
          onClick={() => onSelect(customer)}
        >
          View Details
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default CustomerCard;