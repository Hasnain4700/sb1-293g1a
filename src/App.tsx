import React from 'react';
import { Toaster } from 'react-hot-toast';
import CustomerList from './components/CustomerList';
import FloatingActions from './components/FloatingActions';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-orange-500 p-4 text-white">
        <h1 className="text-2xl font-bold">Shop Khata</h1>
      </header>
      
      <main className="container mx-auto p-4">
        <CustomerList />
        <FloatingActions />
      </main>

      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;