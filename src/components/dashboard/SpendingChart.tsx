import React from 'react';
import { motion } from 'framer-motion';
import { spendingByCategory } from '@/lib/mockData';

const SpendingChart: React.FC = () => {
  const total = spendingByCategory.reduce((sum, cat) => sum + cat.value, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="glass-card rounded-xl p-5"
    >
      <h3 className="mb-4 text-sm font-semibold text-foreground">Spending Breakdown</h3>

      {/* Progress bars */}
      <div className="space-y-3">
        {spendingByCategory.map((cat) => (
          <div key={cat.name}>
            <div className="mb-1 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{cat.name}</span>
              <span className="text-xs font-medium text-foreground">{cat.value}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-secondary">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(cat.value / total) * 100}%` }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="h-full rounded-full"
                style={{ background: cat.color }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-lg bg-primary/5 p-3">
        <p className="text-xs text-muted-foreground">AI Insight</p>
        <p className="mt-1 text-xs font-medium text-foreground">
          You spent 35% on cafeteria this month, up 8% from last month.
        </p>
      </div>
    </motion.div>
  );
};

export default SpendingChart;
