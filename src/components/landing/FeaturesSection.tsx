import React from 'react';
import { motion } from 'framer-motion';
import {
  QrCode,
  CreditCard,
  Mic,
  ArrowLeftRight,
  Shield,
  Zap,
  Smartphone,
  FileText,
} from 'lucide-react';

const features = [
  {
    icon: QrCode,
    title: 'QR Code Payments',
    description: 'Scan and pay instantly at any campus vendor. No cash, no queues.',
  },
  {
    icon: CreditCard,
    title: 'Instant Settlements',
    description: 'Sub-second transaction finality on Solana. Payments confirmed in real-time.',
  },
  {
    icon: Mic,
    title: 'AI Voice Assistant',
    description: 'Pay with your voice. "Pay cafeteria 5 USDC" — and it\'s done.',
  },
  {
    icon: ArrowLeftRight,
    title: 'Cross-Chain Payments',
    description: 'Parents send funds from any chain. Auto-bridged to Solana USDC.',
  },
  {
    icon: Shield,
    title: 'Secure & Transparent',
    description: 'Every transaction is on-chain. Full transparency with wallet security.',
  },
  {
    icon: Zap,
    title: 'Near-Zero Fees',
    description: 'Transaction costs under $0.01. Save thousands compared to traditional systems.',
  },
  {
    icon: Smartphone,
    title: 'Mobile-First Design',
    description: 'Built for smartphones. Optimized for how Indian students actually pay.',
  },
  {
    icon: FileText,
    title: 'Smart Invoicing',
    description: 'Universities create invoices. Students pay with one tap. Auto-reconciled.',
  },
];

const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/5 px-4 py-1 text-xs font-medium text-primary">
            Features
          </span>
          <h2 className="mb-4 font-heading text-3xl font-bold text-foreground sm:text-4xl">
            Everything Campus Payments Need
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            A complete payment ecosystem for students, universities, and vendors.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="glass-card glass-card-hover group rounded-xl p-6 transition-all duration-300"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mb-2 font-heading text-sm font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="text-xs leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
