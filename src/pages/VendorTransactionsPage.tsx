import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import TransactionList from '@/components/dashboard/TransactionList';
import { mockVendorTransactions } from '@/lib/mockData';

const VendorTransactionsPage: React.FC = () => {
  return (
    <AppLayout mode="vendor" title="Transactions">
      <div className="mx-auto max-w-3xl">
        <TransactionList
          transactions={mockVendorTransactions}
          title="All Transactions"
          showAll
        />
      </div>
    </AppLayout>
  );
};

export default VendorTransactionsPage;
