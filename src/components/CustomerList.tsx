import React, { useState } from 'react';
import useStore from '../store/useStore';
import CustomerCard from './CustomerCard';
import { Customer } from '../types';

const CustomerList: React.FC = () => {
  const { customers } = useStore();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Search customers..."
          className="w-full rounded-lg border p-2 pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <svg
          className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCustomers.map((customer) => (
          <CustomerCard
            key={customer.id}
            customer={customer}
            onSelect={(customer: Customer) => {
              // Handle customer selection
              console.log('Selected customer:', customer);
            }}
          />
        ))}
      </div>

      {filteredCustomers.length === 0 && (
        <div className="text-center text-gray-500">
          {searchTerm ? 'No customers found' : 'No customers yet'}
        </div>
      )}
    </div>
  );
};

export default CustomerList;