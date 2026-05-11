import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, FileText, Send, Clock, CheckCircle, XCircle } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import { formatCurrency, formatDate, getStatusColor } from '@/lib/constants';

interface VendorInvoice {
  id: string;
  title: string;
  studentName: string;
  amount: number;
  status: 'pending' | 'paid' | 'expired';
  dueDate: string;
  description: string;
}

const initialInvoices: VendorInvoice[] = [
  { id: 'vi_001', title: 'Catering - Tech Conference', studentName: 'EventOrganizer.sol', amount: 150.00, status: 'pending', dueDate: '2026-05-20', description: 'Catering for 50 attendees' },
  { id: 'vi_002', title: 'Weekly Meal Plan', studentName: 'adewale.sol', amount: 35.00, status: 'paid', dueDate: '2026-05-10', description: 'Weekly meal subscription' },
  { id: 'vi_003', title: 'Bulk Order - Snacks', studentName: 'chioma.sol', amount: 20.00, status: 'pending', dueDate: '2026-05-15', description: 'Snack pack order for study group' },
  { id: 'vi_004', title: 'Coffee Subscription', studentName: 'kwame.sol', amount: 15.00, status: 'expired', dueDate: '2026-04-30', description: 'Monthly coffee subscription' },
];

const statusIcons: Record<string, React.FC<{ className?: string }>> = {
  pending: Clock,
  paid: CheckCircle,
  expired: XCircle,
};

const VendorInvoicesPage: React.FC = () => {
  const [invoices, setInvoices] = useState<VendorInvoice[]>(initialInvoices);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [studentName, setStudentName] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleCreate = () => {
    if (!title || !studentName || !amount) return;
    const newInv: VendorInvoice = {
      id: Date.now().toString(),
      title,
      studentName,
      amount: parseFloat(amount),
      status: 'pending',
      dueDate: '2026-06-01',
      description,
    };
    setInvoices((prev) => [newInv, ...prev]);
    setTitle('');
    setStudentName('');
    setAmount('');
    setDescription('');
    setShowForm(false);
  };

  return (
    <AppLayout mode="vendor" title="Invoices">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {invoices.filter((i) => i.status === 'pending').length} pending invoices
          </p>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            <Plus className="h-4 w-4" />
            New Invoice
          </button>
        </div>

        {/* Create form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="glass-card mb-6 rounded-xl p-5"
          >
            <h3 className="mb-4 font-heading text-sm font-semibold text-foreground">Create Invoice</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Invoice title"
                className="rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground/50 focus:border-primary focus:outline-none"
              />
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Student (e.g., adewale.sol)"
                className="rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground/50 focus:border-primary focus:outline-none"
              />
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount (USDC)"
                className="rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground/50 focus:border-primary focus:outline-none"
              />
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                className="rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground/50 focus:border-primary focus:outline-none"
              />
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setShowForm(false)}
                className="rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground hover:text-foreground"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
              >
                <Send className="h-3.5 w-3.5" />
                Send Invoice
              </button>
            </div>
          </motion.div>
        )}

        {/* Invoice list */}
        <div className="space-y-3">
          {invoices.map((inv) => {
            const StatusIcon = statusIcons[inv.status] || Clock;
            return (
              <motion.div
                key={inv.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card rounded-xl p-4 sm:p-5"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{inv.title}</p>
                      <p className="text-xs text-muted-foreground">To: {inv.studentName}</p>
                      {inv.description && (
                        <p className="mt-1 text-xs text-muted-foreground">{inv.description}</p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-heading text-lg font-bold text-foreground">
                      {formatCurrency(inv.amount)}
                    </p>
                    <div className={`flex items-center justify-end gap-1 ${getStatusColor(inv.status)}`}>
                      <StatusIcon className="h-3 w-3" />
                      <span className="text-xs capitalize">{inv.status}</span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">Due {formatDate(inv.dueDate)}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
};

export default VendorInvoicesPage;
