import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  ArrowDownLeft,
  GraduationCap,
  UtensilsCrossed,
  Bus,
  Ticket,
  CreditCard,
} from 'lucide-react';
import { type Transaction } from '@/lib/mockData';
import { formatCurrency, formatDate, formatTime, getStatusColor } from '@/lib/constants';

const categoryIcons: Record<string, React.FC<{ className?: string }>> = {
  Food: UtensilsCrossed,
  Tuition: GraduationCap,
  Transport: Bus,
  Events: Ticket,
  Transfer: ArrowDownLeft,
  Other: CreditCard,
};

interface TransactionListProps {
  transactions: Transaction[];
  title?: string;
  showAll?: boolean;
}

const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  title = 'Recent Transactions',
  showAll = false,
}) => {
  const displayed = showAll ? transactions : transactions.slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        {!showAll && (
          <button className="text-xs text-primary hover:underline">View All</button>
        )}
      </div>

      <div className="space-y-2">
        {displayed.map((tx) => {
          const Icon = categoryIcons[tx.category] || CreditCard;
          const isReceived = tx.type === 'received';

          return (
            <div
              key={tx.id}
              className="glass-card flex items-center gap-3 rounded-xl p-3 sm:p-4"
            >
              <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${isReceived ? 'bg-emerald/10' : 'bg-secondary'}`}>
                {isReceived ? (
                  <ArrowDownLeft className="h-4 w-4 text-emerald" />
                ) : (
                  <Icon className="h-4 w-4 text-muted-foreground" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-medium text-foreground">{tx.description}</p>
                <p className="text-xs text-muted-foreground">
                  {formatDate(tx.timestamp)} at {formatTime(tx.timestamp)}
                </p>
              </div>

              <div className="text-right">
                <p className={`text-sm font-semibold ${isReceived ? 'text-emerald' : 'text-foreground'}`}>
                  {isReceived ? '+' : '-'}{formatCurrency(tx.amount)}
                </p>
                <p className={`text-xs capitalize ${getStatusColor(tx.status)}`}>{tx.status}</p>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default TransactionList;
