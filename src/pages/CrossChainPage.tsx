import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftRight, ArrowDown, Loader2, CheckCircle } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import { SUPPORTED_CHAINS } from '@/lib/constants';

type Step = 'form' | 'routing' | 'bridging' | 'success';

const CrossChainPage: React.FC = () => {
  const [step, setStep] = useState<Step>('form');
  const [sourceChain, setSourceChain] = useState(SUPPORTED_CHAINS[0]);
  const [amount, setAmount] = useState('250');
  const [recipient, setRecipient] = useState('adewale.sol');

  const handleBridge = async () => {
    setStep('routing');
    await new Promise((r) => setTimeout(r, 1500));
    setStep('bridging');
    await new Promise((r) => setTimeout(r, 3000));
    setStep('success');
  };

  return (
    <AppLayout mode="student" title="Cross-Chain Payment">
      <div className="mx-auto max-w-lg">
        {step === 'form' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Send funds from any supported chain to Solana. Powered by LI.FI.
            </p>

            <div className="glass-card rounded-xl p-6 space-y-5">
              {/* Source chain */}
              <div>
                <label className="mb-2 block text-xs font-medium text-muted-foreground">Source Chain</label>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {SUPPORTED_CHAINS.map((chain) => (
                    <button
                      key={chain.id}
                      onClick={() => setSourceChain(chain)}
                      className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 text-left text-sm transition-all ${
                        sourceChain.id === chain.id
                          ? 'border-primary bg-primary/10 text-foreground'
                          : 'border-border bg-secondary/30 text-muted-foreground hover:bg-secondary/50'
                      }`}
                    >
                      <span className="text-base">{chain.icon}</span>
                      <span className="text-xs font-medium">{chain.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                  Amount ({sourceChain.symbol})
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-3 text-lg font-bold text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              {/* Arrow */}
              <div className="flex items-center justify-center gap-3">
                <div className="h-px flex-1 bg-border" />
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 bg-primary/5">
                  <ArrowDown className="h-4 w-4 text-primary" />
                </div>
                <div className="h-px flex-1 bg-border" />
              </div>

              {/* Destination */}
              <div className="rounded-xl border border-emerald/20 bg-emerald/5 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Destination</p>
                    <p className="font-heading font-semibold text-foreground">Solana (USDC)</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Estimated receive</p>
                    <p className="font-heading text-lg font-bold text-emerald">~{amount} USDC</p>
                  </div>
                </div>
              </div>

              {/* Recipient */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Recipient on Solana</label>
                <input
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <button
                onClick={handleBridge}
                disabled={!amount}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-medium text-primary-foreground transition-all hover:shadow-[var(--shadow-gold)] disabled:opacity-50"
              >
                <ArrowLeftRight className="h-4 w-4" />
                Bridge & Send
              </button>
            </div>
          </motion.div>
        )}

        {(step === 'routing' || step === 'bridging') && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card rounded-2xl p-8 text-center">
            <Loader2 className="mx-auto mb-4 h-10 w-10 animate-spin text-primary" />
            <h3 className="mb-2 font-heading text-lg font-semibold text-foreground">
              {step === 'routing' ? 'Finding Best Route...' : 'Bridging Funds...'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {step === 'routing'
                ? 'LI.FI is aggregating the best swap and bridge routes.'
                : `Bridging ${amount} ${sourceChain.symbol} from ${sourceChain.name} to Solana USDC.`}
            </p>

            <div className="mt-6 space-y-3">
              {[
                { label: 'Route found', done: true },
                { label: 'Swap initiated', done: step === 'bridging' },
                { label: 'Bridge in progress', done: false },
                { label: 'Funds received on Solana', done: false },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-3 rounded-lg bg-secondary/50 px-4 py-2.5">
                  {s.done ? (
                    <CheckCircle className="h-4 w-4 text-emerald" />
                  ) : (
                    <div className="h-4 w-4 rounded-full border-2 border-muted-foreground/30" />
                  )}
                  <span className={`text-sm ${s.done ? 'text-foreground' : 'text-muted-foreground'}`}>{s.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {step === 'success' && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card rounded-2xl p-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald/10">
              <CheckCircle className="h-8 w-8 text-emerald" />
            </div>
            <h3 className="mb-2 font-heading text-xl font-bold text-foreground">Bridge Complete!</h3>
            <p className="mb-1 text-sm text-muted-foreground">
              {amount} {sourceChain.symbol} from {sourceChain.name}
            </p>
            <p className="mb-6 text-2xl font-bold text-emerald">{amount} USDC received</p>
            <p className="mb-6 text-sm text-muted-foreground">Delivered to: {recipient}</p>
            <button
              onClick={() => setStep('form')}
              className="w-full rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
            >
              New Transfer
            </button>
          </motion.div>
        )}
      </div>
    </AppLayout>
  );
};

export default CrossChainPage;
