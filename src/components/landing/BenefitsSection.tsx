import React from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  Building2,
  Store,
  Users,
  Clock,
  BadgeDollarSign,
  BarChart3,
  Globe,
  Heart,
  Receipt,
  Smartphone,
  ShieldCheck,
} from 'lucide-react';

const benefitGroups = [
  {
    title: 'For Students',
    icon: GraduationCap,
    color: 'primary',
    benefits: [
      { icon: Smartphone, text: 'Pay everything from your phone' },
      { icon: Clock, text: 'No more queuing for payments' },
      { icon: BadgeDollarSign, text: 'Near-zero transaction fees' },
      { icon: Heart, text: 'Receive funds from parents instantly' },
    ],
  },
  {
    title: 'For Universities',
    icon: Building2,
    color: 'emerald',
    benefits: [
      { icon: Receipt, text: 'Automated tuition collection' },
      { icon: BarChart3, text: 'Real-time financial reporting' },
      { icon: ShieldCheck, text: 'Transparent on-chain records' },
      { icon: Globe, text: 'Accept payments from anywhere' },
    ],
  },
  {
    title: 'For Vendors',
    icon: Store,
    color: 'primary',
    benefits: [
      { icon: BadgeDollarSign, text: 'Instant settlement, no delays' },
      { icon: Users, text: 'Reach every student on campus' },
      { icon: Receipt, text: 'Automatic invoicing & tracking' },
      { icon: BarChart3, text: 'Revenue analytics dashboard' },
    ],
  },
];

const BenefitsSection: React.FC = () => {
  return (
    <section id="benefits" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/5 px-4 py-1 text-xs font-medium text-primary">
            Benefits
          </span>
          <h2 className="mb-4 font-heading text-3xl font-bold text-foreground sm:text-4xl">
            Built for Everyone on Campus
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Whether you're a student, university administrator, or campus vendor — CampusPay+ works for you.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          {benefitGroups.map((group, groupIndex) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: groupIndex * 0.1 }}
              className="glass-card rounded-2xl p-6 sm:p-8"
            >
              <div className="mb-6 flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${group.color === 'emerald' ? 'bg-emerald/10' : 'bg-primary/10'}`}>
                  <group.icon className={`h-5 w-5 ${group.color === 'emerald' ? 'text-emerald' : 'text-primary'}`} />
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground">{group.title}</h3>
              </div>
              <div className="space-y-4">
                {group.benefits.map((benefit) => (
                  <div key={benefit.text} className="flex items-start gap-3">
                    <benefit.icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                    <span className="text-sm text-secondary-foreground">{benefit.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
