import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import BalanceCard from '@/components/dashboard/BalanceCard';
import QuickActions from '@/components/dashboard/QuickActions';
import TransactionList from '@/components/dashboard/TransactionList';
import SpendingChart from '@/components/dashboard/SpendingChart';
import InvoiceList from '@/components/dashboard/InvoiceList';
import { mockTransactions, mockInvoices } from '@/lib/mockData';

const StudentDashboard: React.FC = () => {
  const pendingInvoices = mockInvoices.filter((inv) => inv.status === 'pending');

  return (
    <AppLayout mode="student" title="Dashboard">
      <div className="mx-auto max-w-6xl space-y-6">
        <BalanceCard />
        <QuickActions />

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <TransactionList transactions={mockTransactions} />
            <InvoiceList invoices={pendingInvoices} title="Pending Invoices" compact />
          </div>
          <div>
            <SpendingChart />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default StudentDashboard;
