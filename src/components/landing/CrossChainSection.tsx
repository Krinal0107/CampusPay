import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeftRight } from 'lucide-react';

const chains = [
  { name: 'Ethereum', symbol: 'ETH', icon: '⟠', color: 'bg-blue-500/10 text-blue-400' },
  { name: 'Polygon', symbol: 'MATIC', icon: '⬡', color: 'bg-purple-500/10 text-purple-400' },
  { name: 'BNB Chain', symbol: 'BNB', icon: '◆', color: 'bg-yellow-500/10 text-yellow-400' },
  { name: 'Avalanche', symbol: 'AVAX', icon: '▲', color: 'bg-red-500/10 text-red-400' },
];

const CrossChainSection: React.FC = () => {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald/3 to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            {/* Cross-chain flow visualization */}
            <div className="glass-card rounded-2xl p-6 sm:p-8">
              <p className="mb-6 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Cross-Chain Payment Flow
              </p>

              <div className="space-y-4">
                {/* Source chains */}
                <div className="grid grid-cols-2 gap-3">
                  {chains.map((chain) => (
                    <div key={chain.name} className="flex items-center gap-2 rounded-lg bg-secondary/50 p-3">
                      <span className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm ${chain.color}`}>
                        {chain.icon}
                      </span>
                      <div>
                        <p className="text-xs font-medium text-foreground">{chain.name}</p>
                        <p className="text-xs text-muted-foreground">{chain.symbol}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Arrow */}
                <div className="flex items-center justify-center gap-2">
                  <div className="h-px flex-1 bg-border" />
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
                    <ArrowLeftRight className="h-4 w-4 text-primary" />
                  </div>
                  <div className="h-px flex-1 bg-border" />
                </div>

                {/* LI.FI bridge */}
                <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-center">
                  <p className="text-xs text-muted-foreground">Powered by</p>
                  <p className="font-heading text-lg font-bold text-foreground">LI.FI Bridge</p>
                  <p className="text-xs text-muted-foreground">Auto-route & swap</p>
                </div>

                {/* Arrow */}
                <div className="flex items-center justify-center">
                  <ArrowRight className="h-5 w-5 text-emerald" />
                </div>

                {/* Destination */}
                <div className="rounded-xl border border-emerald/20 bg-emerald/5 p-4 text-center">
                  <p className="text-xs text-muted-foreground">Received on Solana</p>
                  <p className="font-heading text-2xl font-bold text-foreground">250 USDC</p>
                  <p className="text-xs text-emerald">Confirmed in seconds</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <span className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/5 px-4 py-1 text-xs font-medium text-primary">
              Cross-Chain
            </span>
            <h2 className="mb-4 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Send from Any Chain
            </h2>
            <p className="mb-6 text-muted-foreground">
              Parents and sponsors can send funds from Ethereum, Polygon, BNB Chain, or Avalanche.
              LI.FI automatically bridges and swaps to Solana USDC — the student receives it instantly.
            </p>
            <ul className="space-y-3">
              {[
                'Automatic chain detection & routing',
                'Best rates via aggregated DEX liquidity',
                'Real-time payment status tracking',
                'No crypto knowledge needed for parents',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-secondary-foreground">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CrossChainSection;
