import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownLeft, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';

const BalanceCard: React.FC = () => {
  const [hidden, setHidden] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl border border-primary/20 p-6 sm:p-8"
      style={{ background: 'var(--gradient-card)' }}
    >
      <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-emerald/5 blur-3xl" />

      <div className="relative">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Total Balance</p>
            <div className="mt-1 flex items-center gap-3">
              <span className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
                {hidden ? '••••••' : '$3,245.80'}
              </span>
              <button
                onClick={() => setHidden(!hidden)}
                className="rounded-lg p-1.5 text-muted-foreground hover:text-foreground"
              >
                {hidden ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <div className="rounded-lg bg-emerald/10 px-3 py-1.5">
            <span className="text-xs font-medium text-emerald">+12.5%</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            to="/payments"
            className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:shadow-[var(--shadow-gold)]"
          >
            <ArrowUpRight className="h-4 w-4" />
            Send
          </Link>
          <Link
            to="/qr-pay"
            className="flex items-center gap-2 rounded-xl border border-border bg-secondary/50 px-5 py-2.5 text-sm font-medium text-secondary-foreground transition-all hover:bg-secondary"
          >
            <ArrowDownLeft className="h-4 w-4" />
            Receive
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default BalanceCard;
