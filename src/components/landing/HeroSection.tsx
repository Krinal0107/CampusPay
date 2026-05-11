import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Zap, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen overflow-hidden pt-16">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      <div className="absolute left-1/2 top-1/4 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/5 blur-[120px]" />
      <div className="absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-emerald/5 blur-[100px]" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-4 pt-20 sm:px-6 sm:pt-32 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5"
        >
          <Zap className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs font-medium text-primary">Powered by Solana</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-6 max-w-4xl text-center font-heading text-4xl font-bold leading-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
        >
          The Future of{' '}
          <span className="text-gradient-gold">Campus Payments</span>{' '}
          in Africa
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-10 max-w-2xl text-center text-base text-muted-foreground sm:text-lg"
        >
          Instant, secure, cashless campus payments powered by Solana.
          Pay tuition, cafeteria, transport, and more with a single tap.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mb-16 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Link
            to="/dashboard"
            className="group flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 font-heading text-sm font-semibold text-primary-foreground transition-all hover:shadow-[var(--shadow-gold)]"
          >
            Try Demo
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href="#features"
            className="rounded-xl border border-border bg-secondary/50 px-8 py-3.5 font-heading text-sm font-semibold text-secondary-foreground transition-all hover:bg-secondary"
          >
            Join Pilot Campus
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-16 grid w-full max-w-3xl grid-cols-3 gap-4 sm:gap-8"
        >
          {[
            { label: 'Transaction Speed', value: '<1s' },
            { label: 'Transaction Fee', value: '<$0.01' },
            { label: 'Supported Tokens', value: 'SOL / USDC' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
                {stat.value}
              </div>
              <div className="mt-1 text-xs text-muted-foreground sm:text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Hero Card Preview */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="relative w-full max-w-4xl"
        >
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/20 via-emerald/10 to-primary/20 blur-lg" />
          <div className="glass-card relative rounded-2xl p-6 sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Welcome back</p>
                <p className="font-heading text-lg font-semibold text-foreground">adewale.sol</p>
              </div>
              <div className="rounded-lg bg-emerald/10 px-3 py-1.5">
                <span className="text-xs font-medium text-emerald">Connected</span>
              </div>
            </div>
            <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { icon: Shield, label: 'Tuition', value: '$2,500' },
                { icon: Zap, label: 'Cafeteria', value: '$45.50' },
                { icon: Globe, label: 'Transport', value: '$15.00' },
                { icon: ArrowRight, label: 'Events', value: '$25.00' },
              ].map((item) => (
                <div key={item.label} className="rounded-xl bg-secondary/50 p-3 sm:p-4">
                  <item.icon className="mb-2 h-4 w-4 text-primary" />
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="font-heading text-sm font-semibold text-foreground">{item.value}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between rounded-xl bg-primary/5 p-4">
              <div>
                <p className="text-xs text-muted-foreground">Total Balance</p>
                <p className="font-heading text-2xl font-bold text-foreground">$3,245.80</p>
              </div>
              <div className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
                Send Payment
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
