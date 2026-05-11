import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Clock, CheckCircle, XCircle } from 'lucide-react';
import { type Invoice } from '@/lib/mockData';
import { formatCurrency, formatDate, getStatusColor } from '@/lib/constants';
import { Link } from 'react-router-dom';

const statusIcons: Record<string, React.FC<{ className?: string }>> = {
  pending: Clock,
  paid: CheckCircle,
  expired: XCircle,
};

interface InvoiceListProps {
  invoices: Invoice[];
  title?: string;
  compact?: boolean;
}

const InvoiceList: React.FC<InvoiceListProps> = ({
  invoices,
  title = 'Invoices',
  compact = false,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        <Link to="/invoices" className="text-xs text-primary hover:underline">
          View All
        </Link>
      </div>

      <div className="space-y-2">
        {invoices.map((invoice) => {
          const StatusIcon = statusIcons[invoice.status] || Clock;
          return (
            <div
              key={invoice.id}
              className="glass-card flex items-center gap-3 rounded-xl p-3 sm:p-4"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
                <FileText className="h-4 w-4 text-muted-foreground" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-medium text-foreground">{invoice.title}</p>
                <p className="text-xs text-muted-foreground">
                  {invoice.from} &middot; Due {formatDate(invoice.dueDate)}
                </p>
              </div>

              <div className="text-right">
                <p className="text-sm font-semibold text-foreground">
                  {formatCurrency(invoice.amount)}
                </p>
                <div className={`flex items-center justify-end gap-1 ${getStatusColor(invoice.status)}`}>
                  <StatusIcon className="h-3 w-3" />
                  <span className="text-xs capitalize">{invoice.status}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default InvoiceList;
