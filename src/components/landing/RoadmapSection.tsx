import React from 'react';
import { motion } from 'framer-motion';
import { Circle, CheckCircle } from 'lucide-react';

const roadmap = [
  {
    quarter: 'Q2 2026',
    title: 'MVP Launch',
    status: 'current',
    items: ['Wallet authentication', 'QR code payments', 'Student dashboard', 'Campus vendor integration'],
  },
  {
    quarter: 'Q3 2026',
    title: 'Pilot Program',
    status: 'upcoming',
    items: ['3 university pilots in Nigeria', 'AI voice assistant', 'Cross-chain payments', 'Mobile app beta'],
  },
  {
    quarter: 'Q4 2026',
    title: 'Scale',
    status: 'upcoming',
    items: ['10+ university partnerships', 'Student ID NFTs', 'Offline payment support', 'API for third-party vendors'],
  },
  {
    quarter: 'Q1 2027',
    title: 'Pan-African Expansion',
    status: 'upcoming',
    items: ['Expand to Ghana, Kenya, South Africa', 'Multi-currency support', 'Government partnerships', 'Full mobile app launch'],
  },
];

const RoadmapSection: React.FC = () => {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/5 px-4 py-1 text-xs font-medium text-primary">
            Roadmap
          </span>
          <h2 className="mb-4 font-heading text-3xl font-bold text-foreground sm:text-4xl">
            Our Journey Forward
          </h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {roadmap.map((phase, index) => (
            <motion.div
              key={phase.quarter}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`glass-card rounded-xl p-6 ${phase.status === 'current' ? 'border-gold-subtle' : ''}`}
            >
              <div className="mb-4 flex items-center justify-between">
                <span className={`text-xs font-bold uppercase tracking-wider ${phase.status === 'current' ? 'text-primary' : 'text-muted-foreground'}`}>
                  {phase.quarter}
                </span>
                {phase.status === 'current' && (
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                    Current
                  </span>
                )}
              </div>
              <h3 className="mb-4 font-heading text-lg font-semibold text-foreground">{phase.title}</h3>
              <ul className="space-y-2">
                {phase.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    {phase.status === 'current' ? (
                      <CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                    ) : (
                      <Circle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground/50" />
                    )}
                    <span className="text-xs text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;
