import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'What is CampusPay+?',
    a: 'CampusPay+ is a unified campus payment platform powered by Solana blockchain. It enables students, universities, and vendors to send and receive instant payments for tuition, cafeteria, transport, events, and more.',
  },
  {
    q: 'Do I need cryptocurrency knowledge to use it?',
    a: 'Not at all. CampusPay+ is designed for simplicity. Connect your wallet, scan a QR code, and confirm. The blockchain handles everything behind the scenes.',
  },
  {
    q: 'How do parents send money from another blockchain?',
    a: 'Parents can send funds from Ethereum, Polygon, or other supported chains. Our LI.FI integration automatically bridges and converts the payment to Solana USDC, which arrives in the student\'s account instantly.',
  },
  {
    q: 'What are the transaction fees?',
    a: 'Solana transactions typically cost less than $0.01. This is orders of magnitude cheaper than traditional payment processors, making it ideal for even small cafeteria purchases.',
  },
  {
    q: 'Is it secure?',
    a: 'Absolutely. All transactions are secured by Solana\'s blockchain. Your wallet is your identity — no personal data is stored on centralized servers. Funds are only moved with your explicit wallet confirmation.',
  },
  {
    q: 'Which wallets are supported?',
    a: 'Currently we support Phantom and Solflare wallets, the most popular Solana wallets. More wallet integrations are on our roadmap.',
  },
  {
    q: 'Can universities track all payments?',
    a: 'Yes. Universities get a dedicated dashboard with real-time transaction tracking, invoice management, revenue analytics, and full payment reconciliation.',
  },
];

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/5 px-4 py-1 text-xs font-medium text-primary">
            FAQ
          </span>
          <h2 className="mb-4 font-heading text-3xl font-bold text-foreground sm:text-4xl">
            Common Questions
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="glass-card overflow-hidden rounded-xl"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between p-5 text-left"
              >
                <span className="pr-4 text-sm font-medium text-foreground">{faq.q}</span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="border-t border-border/50 px-5 pb-5 pt-4">
                      <p className="text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
