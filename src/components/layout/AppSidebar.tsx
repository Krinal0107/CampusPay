import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  CreditCard,
  QrCode,
  FileText,
  ArrowLeftRight,
  Mic,
  Receipt,
  Store,
  Zap,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AppSidebarProps {
  mode: 'student' | 'vendor';
  open: boolean;
  onClose: () => void;
}

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  LayoutDashboard,
  CreditCard,
  QrCode,
  FileText,
  ArrowLeftRight,
  Mic,
  Receipt,
  Store,
};

const studentLinks = [
  { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
  { label: 'Payments', path: '/payments', icon: 'CreditCard' },
  { label: 'QR Pay', path: '/qr-pay', icon: 'QrCode' },
  { label: 'Invoices', path: '/invoices', icon: 'FileText' },
  { label: 'Cross-Chain', path: '/cross-chain', icon: 'ArrowLeftRight' },
  { label: 'Voice Assistant', path: '/voice', icon: 'Mic' },
];

const vendorLinks = [
  { label: 'Dashboard', path: '/vendor', icon: 'LayoutDashboard' },
  { label: 'Transactions', path: '/vendor/transactions', icon: 'Receipt' },
  { label: 'Generate QR', path: '/vendor/qr', icon: 'QrCode' },
  { label: 'Invoices', path: '/vendor/invoices', icon: 'FileText' },
];

const AppSidebar: React.FC<AppSidebarProps> = ({ mode, open, onClose }) => {
  const location = useLocation();
  const links = mode === 'student' ? studentLinks : vendorLinks;

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-border/50 p-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Zap className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-heading text-base font-bold text-foreground">
            Campus<span className="text-gradient-gold">Pay+</span>
          </span>
        </Link>
        <button onClick={onClose} className="rounded-lg p-1.5 text-muted-foreground hover:text-foreground lg:hidden">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 p-3">
        <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {mode === 'student' ? 'Student' : 'Vendor'}
        </div>
        <nav className="space-y-1">
          {links.map((link) => {
            const Icon = iconMap[link.icon] || LayoutDashboard;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all ${
                  isActive
                    ? 'bg-primary/10 font-medium text-primary'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                }`}
              >
                <Icon className="h-4 w-4" />
                {link.label}
                {isActive && (
                  <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-border/50 p-4">
        <Link
          to={mode === 'student' ? '/vendor' : '/dashboard'}
          className="flex items-center gap-2 rounded-lg bg-secondary/50 px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <Store className="h-4 w-4" />
          Switch to {mode === 'student' ? 'Vendor' : 'Student'}
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-border/50 bg-sidebar lg:block">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-50 w-64 border-r border-border/50 bg-sidebar lg:hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AppSidebar;
