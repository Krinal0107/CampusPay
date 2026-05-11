import React from 'react';
import { motion } from 'framer-motion';
import { Mic, Volume2, MessageSquare, Globe } from 'lucide-react';

const commands = [
  { text: '"Pay cafeteria 5 USDC"', response: 'Processing payment to Campus Cafeteria...' },
  { text: '"How much did I spend this month?"', response: 'You\'ve spent 245 USDC this month across 18 transactions.' },
  { text: '"Send 50 USDC to adewale.sol"', response: 'Sending 50 USDC to adewale.sol. Please confirm.' },
];

const AIVoiceSection: React.FC = () => {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="mb-4 inline-block rounded-full border border-emerald/20 bg-emerald/5 px-4 py-1 text-xs font-medium text-emerald">
              AI Voice Assistant
            </span>
            <h2 className="mb-4 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Pay with Your Voice
            </h2>
            <p className="mb-8 text-muted-foreground">
              Powered by ElevenLabs, our AI assistant understands natural language commands.
              Make payments, check balances, and get spending insights — hands-free.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 rounded-lg bg-secondary/50 px-4 py-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-secondary-foreground">English</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-secondary/50 px-4 py-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-secondary-foreground">French</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {commands.map((cmd, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="glass-card rounded-xl p-4"
              >
                <div className="mb-3 flex items-center gap-2">
                  <Mic className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">{cmd.text}</span>
                </div>
                <div className="flex items-start gap-2 rounded-lg bg-emerald/5 p-3">
                  <Volume2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald" />
                  <span className="text-xs text-emerald-light">{cmd.response}</span>
                </div>
              </motion.div>
            ))}

            {/* Voice visualizer */}
            <div className="glass-card flex items-center justify-center gap-1 rounded-xl p-6">
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 rounded-full bg-primary"
                  animate={{
                    height: [8, Math.random() * 32 + 8, 8],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.05,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AIVoiceSection;
