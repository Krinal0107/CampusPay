import React from 'react';
import { motion } from 'framer-motion';
import { Zap, DollarSign, Globe, Lock } from 'lucide-react';

const reasons = [
  {
    icon: Zap,
    stat: '400ms',
    label: 'Block Time',
    description: 'Transactions finalize in under a second. Students don\'t wait.',
  },
  {
    icon: DollarSign,
    stat: '$0.00025',
    label: 'Avg. Fee',
    description: 'Transaction costs are negligible. Send $1 or $10,000 for the same fee.',
  },
  {
    icon: Globe,
    stat: '65,000+',
    label: 'TPS Capacity',
    description: 'Solana handles massive throughput. Perfect for campus-scale payments.',
  },
  {
    icon: Lock,
    stat: '100%',
    label: 'On-Chain',
    description: 'Every transaction is verifiable. Full transparency for institutions.',
  },
];

const WhySolanaSection: React.FC = () => {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/5 px-4 py-1 text-xs font-medium text-primary">
            Why Solana
          </span>
          <h2 className="mb-4 font-heading text-3xl font-bold text-foreground sm:text-4xl">
            Built on the Fastest Blockchain
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Solana's speed and low costs make it the ideal backbone for campus payments at scale.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card rounded-xl p-6 text-center"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <reason.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="mb-1 font-heading text-3xl font-bold text-foreground">{reason.stat}</div>
              <div className="mb-3 text-xs font-medium uppercase tracking-wider text-primary">{reason.label}</div>
              <p className="text-xs text-muted-foreground">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySolanaSection;
