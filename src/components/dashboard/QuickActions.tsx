import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, UtensilsCrossed, Bus, Ticket, QrCode, ArrowLeftRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const actions = [
  { icon: GraduationCap, label: 'Tuition', path: '/payments?type=tuition', color: 'text-emerald' },
  { icon: UtensilsCrossed, label: 'Cafeteria', path: '/payments?type=cafeteria', color: 'text-primary' },
  { icon: Bus, label: 'Transport', path: '/payments?type=transport', color: 'text-blue-400' },
  { icon: Ticket, label: 'Events', path: '/payments?type=events', color: 'text-purple-400' },
  { icon: QrCode, label: 'QR Pay', path: '/qr-pay', color: 'text-primary' },
  { icon: ArrowLeftRight, label: 'Bridge', path: '/cross-chain', color: 'text-emerald' },
];

const QuickActions: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <h3 className="mb-4 text-sm font-semibold text-foreground">Quick Actions</h3>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
        {actions.map((action) => (
          <Link
            key={action.label}
            to={action.path}
            className="glass-card glass-card-hover flex flex-col items-center gap-2 rounded-xl p-4 transition-all"
          >
            <action.icon className={`h-5 w-5 ${action.color}`} />
            <span className="text-xs text-muted-foreground">{action.label}</span>
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

export default QuickActions;
