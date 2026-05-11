import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  UtensilsCrossed,
  Bus,
  Ticket,
  Send,
  CheckCircle,
  Loader2,
  ArrowLeft,
} from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import { useNavigate } from 'react-router-dom';

const categories = [
  { id: 'tuition', label: 'Tuition', icon: GraduationCap, description: 'Pay semester fees', defaultAmount: '2500.00', recipient: 'Lagos State University' },
  { id: 'cafeteria', label: 'Cafeteria', icon: UtensilsCrossed, description: 'Campus food & drinks', defaultAmount: '', recipient: '' },
  { id: 'transport', label: 'Transport', icon: Bus, description: 'Shuttle & transit passes', defaultAmount: '15.00', recipient: 'Campus Transport' },
  { id: 'events', label: 'Events', icon: Ticket, description: 'Conferences & activities', defaultAmount: '', recipient: '' },
];

type Step = 'select' | 'form' | 'confirm' | 'success';

const PaymentsPage: React.FC = () => {
  const [step, setStep] = useState<Step>('select');
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[0] | null>(null);
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSelect = (cat: typeof categories[0]) => {
    setSelectedCategory(cat);
    setAmount(cat.defaultAmount);
    setRecipient(cat.recipient);
    setStep('form');
  };

  const handleConfirm = () => {
    setStep('confirm');
  };

  const handleSend = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2000));
    setLoading(false);
    setStep('success');
  };

  const reset = () => {
    setStep('select');
    setSelectedCategory(null);
    setAmount('');
    setRecipient('');
    setNote('');
  };

  return (
    <AppLayout mode="student" title="Payments">
      <div className="mx-auto max-w-lg">
        {step === 'select' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
            <p className="mb-6 text-sm text-muted-foreground">Select payment category</p>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleSelect(cat)}
                className="glass-card glass-card-hover flex w-full items-center gap-4 rounded-xl p-4 text-left transition-all"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <cat.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{cat.label}</p>
                  <p className="text-xs text-muted-foreground">{cat.description}</p>
                </div>
              </button>
            ))}
          </motion.div>
        )}

        {step === 'form' && selectedCategory && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <button onClick={() => setStep('select')} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" /> Back
            </button>

            <div className="glass-card rounded-xl p-6">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <selectedCategory.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-heading font-semibold text-foreground">{selectedCategory.label} Payment</p>
                  <p className="text-xs text-muted-foreground">{selectedCategory.description}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Recipient</label>
                  <input
                    type="text"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    placeholder="username.sol or wallet address"
                    className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground placeholder-muted-foreground/50 focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Amount (USDC)</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-3 text-2xl font-bold text-foreground placeholder-muted-foreground/50 focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Note (optional)</label>
                  <input
                    type="text"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="What's this for?"
                    className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground placeholder-muted-foreground/50 focus:border-primary focus:outline-none"
                  />
                </div>

                <button
                  onClick={handleConfirm}
                  disabled={!amount || !recipient}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-medium text-primary-foreground transition-all hover:shadow-[var(--shadow-gold)] disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                  Review Payment
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {step === 'confirm' && selectedCategory && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <button onClick={() => setStep('form')} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" /> Back
            </button>

            <div className="glass-card rounded-xl p-6">
              <h3 className="mb-6 text-center font-heading text-lg font-semibold text-foreground">
                Confirm Payment
              </h3>

              <div className="mb-6 space-y-3">
                {[
                  { label: 'Category', value: selectedCategory.label },
                  { label: 'Recipient', value: recipient },
                  { label: 'Amount', value: `${amount} USDC` },
                  { label: 'Network Fee', value: '~$0.00025' },
                  ...(note ? [{ label: 'Note', value: note }] : []),
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between rounded-lg bg-secondary/50 px-4 py-3">
                    <span className="text-xs text-muted-foreground">{item.label}</span>
                    <span className="text-sm font-medium text-foreground">{item.value}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={handleSend}
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-medium text-primary-foreground transition-all hover:shadow-[var(--shadow-gold)] disabled:opacity-50"
              >
                {loading ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> Processing...</>
                ) : (
                  <><Send className="h-4 w-4" /> Confirm &amp; Send</>
                )}
              </button>
            </div>
          </motion.div>
        )}

        {step === 'success' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card rounded-2xl p-8 text-center"
          >
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald/10">
              <CheckCircle className="h-8 w-8 text-emerald" />
            </div>
            <h3 className="mb-2 font-heading text-xl font-bold text-foreground">Payment Successful!</h3>
            <p className="mb-1 text-2xl font-bold text-foreground">{amount} USDC</p>
            <p className="mb-6 text-sm text-muted-foreground">sent to {recipient}</p>

            <div className="mb-6 rounded-lg bg-secondary/50 p-3">
              <p className="text-xs text-muted-foreground">Transaction ID</p>
              <p className="font-mono text-xs text-foreground">5xGh...j9Kp</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={reset}
                className="flex-1 rounded-xl border border-border bg-secondary/50 px-4 py-2.5 text-sm font-medium text-secondary-foreground hover:bg-secondary"
              >
                New Payment
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="flex-1 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground"
              >
                Dashboard
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </AppLayout>
  );
};

export default PaymentsPage;
