import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, QrCode, CheckCircle, ArrowRight } from 'lucide-react';

const steps = [
  {
    step: '01',
    icon: Wallet,
    title: 'Connect Wallet',
    description: 'Link your Phantom or Solflare wallet in one click. Your campus identity, secured.',
  },
  {
    step: '02',
    icon: QrCode,
    title: 'Scan & Pay',
    description: 'Scan a vendor QR code, select amount, and confirm. Sub-second settlement.',
  },
  {
    step: '03',
    icon: CheckCircle,
    title: 'Instant Confirmation',
    description: 'Both parties get real-time confirmation. Dashboard updates automatically.',
  },
];

const HowItWorksSection: React.FC = () => {
  return (
    <section id="how-it-works" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-emerald/20 bg-emerald/5 px-4 py-1 text-xs font-medium text-emerald">
            How It Works
          </span>
          <h2 className="mb-4 font-heading text-3xl font-bold text-foreground sm:text-4xl">
            Three Steps to Campus Freedom
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            No sign-ups. No bank accounts. Just your wallet and a QR code.
          </p>
        </motion.div>

        <div className="relative grid gap-8 md:grid-cols-3">
          {/* Connection line */}
          <div className="absolute left-0 right-0 top-16 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent md:block" />

          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative text-center"
            >
              <div className="relative z-10 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-card">
                <step.icon className="h-7 w-7 text-primary" />
              </div>
              <span className="mb-2 block font-heading text-xs font-semibold tracking-widest text-primary">
                STEP {step.step}
              </span>
              <h3 className="mb-3 font-heading text-xl font-bold text-foreground">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
              {index < steps.length - 1 && (
                <ArrowRight className="mx-auto mt-4 h-5 w-5 text-muted-foreground/30 md:hidden" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
