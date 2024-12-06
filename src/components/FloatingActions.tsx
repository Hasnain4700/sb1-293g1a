import React, { useState } from 'react';
import { PlusIcon, Cog6ToothIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import AddCustomerModal from './modals/AddCustomerModal';
import SettingsModal from './modals/SettingsModal';
import TransactionSummaryModal from './modals/TransactionSummaryModal';

const FloatingActions: React.FC = () => {
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 right-6 flex flex-col space-y-4">
        <button
          className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-white shadow-lg transition-transform hover:scale-110"
          title="Settings"
          onClick={() => setIsSettingsOpen(true)}
        >
          <Cog6ToothIcon className="h-6 w-6" />
        </button>
        
        <button
          className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-white shadow-lg transition-transform hover:scale-110"
          title="Transaction Summary"
          onClick={() => setIsSummaryOpen(true)}
        >
          <ChartBarIcon className="h-6 w-6" />
        </button>
        
        <button
          className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-600 text-white shadow-lg transition-transform hover:scale-110"
          title="Add Customer"
          onClick={() => setIsAddCustomerOpen(true)}
        >
          <PlusIcon className="h-8 w-8" />
        </button>
      </div>

      <AddCustomerModal
        isOpen={isAddCustomerOpen}
        onClose={() => setIsAddCustomerOpen(false)}
      />
      
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
      
      <TransactionSummaryModal
        isOpen={isSummaryOpen}
        onClose={() => setIsSummaryOpen(false)}
      />
    </>
  );
};

export default FloatingActions;