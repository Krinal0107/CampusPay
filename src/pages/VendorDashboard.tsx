import React from 'react';
import { motion } from 'framer-motion';
import {
  DollarSign,
  TrendingUp,
  Receipt,
  Clock,
  ArrowUpRight,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import AppLayout from '@/components/layout/AppLayout';
import TransactionList from '@/components/dashboard/TransactionList';
import { vendorStats, weeklyRevenueData, mockVendorTransactions } from '@/lib/mockData';
import { formatCurrency } from '@/lib/constants';
import { Link } from 'react-router-dom';

const stats = [
  { icon: DollarSign, label: 'Total Revenue', value: formatCurrency(vendorStats.totalRevenue), change: '+18%', color: 'text-primary' },
  { icon: TrendingUp, label: 'Today', value: formatCurrency(vendorStats.todayRevenue), change: '+5%', color: 'text-emerald' },
  { icon: Receipt, label: 'Transactions', value: vendorStats.totalTransactions.toString(), change: '+12', color: 'text-primary' },
  { icon: Clock, label: 'Pending', value: vendorStats.pendingInvoices.toString(), change: '', color: 'text-gold' },
];

const VendorDashboard: React.FC = () => {
  return (
    <AppLayout mode="vendor" title="Vendor Dashboard">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Stats grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card rounded-xl p-5"
            >
              <div className="mb-3 flex items-center justify-between">
                <div className={`flex h-9 w-9 items-center justify-center rounded-lg bg-secondary`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
                {stat.change && (
                  <span className="flex items-center text-xs font-medium text-emerald">
                    <ArrowUpRight className="h-3 w-3" /> {stat.change}
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className="font-heading text-xl font-bold text-foreground">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Revenue chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-xl p-5 lg:col-span-2"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">Weekly Revenue</h3>
              <Link
                to="/vendor/qr"
                className="rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground"
              >
                Generate QR
              </Link>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyRevenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 12%, 16%)" />
                  <XAxis dataKey="day" stroke="hsl(220, 10%, 50%)" fontSize={12} />
                  <YAxis stroke="hsl(220, 10%, 50%)" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      background: 'hsl(220, 15%, 10%)',
                      border: '1px solid hsl(220, 12%, 16%)',
                      borderRadius: '0.5rem',
                      color: 'hsl(40, 10%, 92%)',
                      fontSize: '12px',
                    }}
                  />
                  <Bar dataKey="revenue" fill="hsl(40, 95%, 55%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Quick actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card rounded-xl p-5"
          >
            <h3 className="mb-4 text-sm font-semibold text-foreground">Quick Actions</h3>
            <div className="space-y-2">
              <Link
                to="/vendor/qr"
                className="flex items-center gap-3 rounded-lg bg-primary/10 p-3 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
              >
                <Receipt className="h-4 w-4" />
                Generate Payment QR
              </Link>
              <Link
                to="/vendor/invoices"
                className="flex items-center gap-3 rounded-lg bg-secondary/50 p-3 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <Clock className="h-4 w-4" />
                Create Invoice
              </Link>
            </div>

            <div className="mt-6 rounded-lg bg-emerald/5 p-4">
              <p className="text-xs text-muted-foreground">Today's summary</p>
              <p className="mt-1 font-heading text-lg font-bold text-foreground">$168.00</p>
              <p className="text-xs text-emerald">24 transactions today</p>
            </div>
          </motion.div>
        </div>

        {/* Recent transactions */}
        <TransactionList
          transactions={mockVendorTransactions}
          title="Recent Payments Received"
        />
      </div>
    </AppLayout>
  );
};

export default VendorDashboard;
