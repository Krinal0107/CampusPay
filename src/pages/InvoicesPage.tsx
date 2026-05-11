import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Clock, CheckCircle, XCircle, Send, Loader2 } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import { mockInvoices, type Invoice } from '@/lib/mockData';
import { formatCurrency, formatDate, getStatusColor } from '@/lib/constants';

const statusIcons: Record<string, React.FC<{ className?: string }>> = {
  pending: Clock,
  paid: CheckCircle,
  expired: XCircle,
};

const InvoicesPage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'paid' | 'expired'>('all');
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [paying, setPaying] = useState(false);
  const [paid, setPaid] = useState<string[]>([]);

  const filtered = mockInvoices.filter((inv) => {
    if (filter === 'all') return true;
    if (paid.includes(inv.id) && filter === 'paid') return true;
    if (paid.includes(inv.id)) return false;
    return inv.status === filter;
  });

  const handlePay = async (inv: Invoice) => {
    setPaying(true);
    await new Promise((r) => setTimeout(r, 2000));
    setPaying(false);
    setPaid((prev) => [...prev, inv.id]);
    setSelectedInvoice(null);
  };

  return (
    <AppLayout mode="student" title="Invoices">
      <div className="mx-auto max-w-3xl">
        {/* Filter tabs */}
        <div className="mb-6 flex gap-2">
          {(['all', 'pending', 'paid', 'expired'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-lg px-4 py-2 text-xs font-medium capitalize transition-all ${
                filter === f ? 'bg-primary text-primary-foreground' : 'bg-secondary/50 text-muted-foreground hover:bg-secondary'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Invoice list */}
        <div className="space-y-3">
          {filtered.map((inv) => {
            const isPaid = paid.includes(inv.id) || inv.status === 'paid';
            const status = isPaid ? 'paid' : inv.status;
            const StatusIcon = statusIcons[status] || Clock;

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
                      <p className="text-xs text-muted-foreground">{inv.from}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{inv.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-heading text-lg font-bold text-foreground">{formatCurrency(inv.amount)}</p>
                    <div className={`flex items-center justify-end gap-1 ${getStatusColor(status)}`}>
                      <StatusIcon className="h-3 w-3" />
                      <span className="text-xs capitalize">{status}</span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">Due {formatDate(inv.dueDate)}</p>
                  </div>
                </div>

                {inv.status === 'pending' && !isPaid && (
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => setSelectedInvoice(inv)}
                      className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:shadow-[var(--shadow-gold)]"
                    >
                      <Send className="h-3.5 w-3.5" /> Pay Now
                    </button>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Pay modal */}
        {selectedInvoice && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card w-full max-w-md rounded-2xl p-6"
            >
              <h3 className="mb-4 font-heading text-lg font-semibold text-foreground">Confirm Payment</h3>
              <div className="mb-6 space-y-3">
                {[
                  { label: 'Invoice', value: selectedInvoice.title },
                  { label: 'To', value: selectedInvoice.from },
                  { label: 'Amount', value: formatCurrency(selectedInvoice.amount) },
                  { label: 'Network Fee', value: '~$0.00025' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between rounded-lg bg-secondary/50 px-4 py-3">
                    <span className="text-xs text-muted-foreground">{item.label}</span>
                    <span className="text-sm font-medium text-foreground">{item.value}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedInvoice(null)}
                  className="flex-1 rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm font-medium text-secondary-foreground"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handlePay(selectedInvoice)}
                  disabled={paying}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-medium text-primary-foreground"
                >
                  {paying ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
                  {paying ? 'Processing...' : 'Confirm'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default InvoicesPage;
