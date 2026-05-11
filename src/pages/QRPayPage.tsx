import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { QrCode, Camera, CheckCircle, Loader2, Copy, Check } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import AppLayout from '@/components/layout/AppLayout';
import { useWallet } from '@solana/wallet-adapter-react';

type Tab = 'scan' | 'generate';

const QRPayPage: React.FC = () => {
  const [tab, setTab] = useState<Tab>('scan');
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [confirmPayment, setConfirmPayment] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  const [amount, setAmount] = useState('5.00');
  const [label, setLabel] = useState('Campus Cafeteria');
  const [copied, setCopied] = useState(false);
  const { publicKey } = useWallet();

  const walletAddress = publicKey?.toBase58() || 'DemoWallet123...abc';
  const qrData = `solana:${walletAddress}?amount=${amount}&label=${encodeURIComponent(label)}&spl-token=USDC`;

  const handleScan = async () => {
    setScanning(true);
    await new Promise((r) => setTimeout(r, 1500));
    setScanning(false);
    setScanned(true);
  };

  const handleConfirmPay = async () => {
    setConfirmPayment(true);
    await new Promise((r) => setTimeout(r, 2000));
    setConfirmPayment(false);
    setPaymentDone(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(qrData);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetScan = () => {
    setScanned(false);
    setPaymentDone(false);
  };

  return (
    <AppLayout mode="student" title="QR Payment">
      <div className="mx-auto max-w-lg">
        {/* Tab switcher */}
        <div className="mb-6 flex rounded-xl bg-secondary/50 p-1">
          {(['scan', 'generate'] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => { setTab(t); resetScan(); }}
              className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium capitalize transition-all ${
                tab === t ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {t === 'scan' ? 'Scan & Pay' : 'Generate QR'}
            </button>
          ))}
        </div>

        {/* Scan tab */}
        {tab === 'scan' && !scanned && !paymentDone && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card rounded-2xl p-6 text-center">
            <div className="mx-auto mb-6 flex h-64 w-full items-center justify-center rounded-xl border-2 border-dashed border-border bg-secondary/30">
              {scanning ? (
                <div className="text-center">
                  <Loader2 className="mx-auto mb-2 h-8 w-8 animate-spin text-primary" />
                  <p className="text-sm text-muted-foreground">Scanning...</p>
                </div>
              ) : (
                <div className="text-center">
                  <Camera className="mx-auto mb-3 h-10 w-10 text-muted-foreground/50" />
                  <p className="text-sm text-muted-foreground">Camera preview area</p>
                  <p className="text-xs text-muted-foreground/50">Point at a vendor QR code</p>
                </div>
              )}
            </div>
            <button
              onClick={handleScan}
              disabled={scanning}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-medium text-primary-foreground transition-all hover:shadow-[var(--shadow-gold)]"
            >
              <QrCode className="h-4 w-4" />
              {scanning ? 'Scanning...' : 'Simulate Scan'}
            </button>
          </motion.div>
        )}

        {tab === 'scan' && scanned && !paymentDone && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl p-6">
            <h3 className="mb-4 text-center font-heading text-lg font-semibold text-foreground">
              Payment Request Found
            </h3>
            <div className="mb-6 space-y-3">
              {[
                { label: 'Vendor', value: 'Campus Cafeteria' },
                { label: 'Amount', value: '5.00 USDC' },
                { label: 'Network', value: 'Solana Devnet' },
                { label: 'Fee', value: '~$0.00025' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between rounded-lg bg-secondary/50 px-4 py-3">
                  <span className="text-xs text-muted-foreground">{item.label}</span>
                  <span className="text-sm font-medium text-foreground">{item.value}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={resetScan} className="flex-1 rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm font-medium text-secondary-foreground">
                Cancel
              </button>
              <button
                onClick={handleConfirmPay}
                disabled={confirmPayment}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-medium text-primary-foreground"
              >
                {confirmPayment ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                {confirmPayment ? 'Processing...' : 'Confirm Pay'}
              </button>
            </div>
          </motion.div>
        )}

        {tab === 'scan' && paymentDone && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card rounded-2xl p-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald/10">
              <CheckCircle className="h-8 w-8 text-emerald" />
            </div>
            <h3 className="mb-2 font-heading text-xl font-bold text-foreground">Payment Successful!</h3>
            <p className="mb-1 text-2xl font-bold text-foreground">5.00 USDC</p>
            <p className="mb-6 text-sm text-muted-foreground">paid to Campus Cafeteria</p>
            <div className="mb-6 rounded-lg bg-emerald/5 p-3">
              <p className="text-xs text-emerald">Voice: "Payment of 5 USDC to Campus Cafeteria confirmed."</p>
            </div>
            <button onClick={resetScan} className="w-full rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground">
              Scan Another
            </button>
          </motion.div>
        )}

        {/* Generate tab */}
        {tab === 'generate' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card rounded-2xl p-6">
            <div className="mb-6 space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Label</label>
                <input
                  type="text"
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground placeholder-muted-foreground/50 focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Amount (USDC)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground placeholder-muted-foreground/50 focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col items-center rounded-xl bg-foreground/95 p-8">
              <QRCodeSVG
                value={qrData}
                size={200}
                bgColor="hsl(40, 10%, 92%)"
                fgColor="hsl(220, 15%, 5%)"
                level="M"
                includeMargin
              />
              <p className="mt-4 text-xs font-medium text-background">{label}</p>
              <p className="text-sm font-bold text-background">{amount} USDC</p>
            </div>

            <button
              onClick={handleCopy}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm font-medium text-secondary-foreground transition-all hover:bg-secondary"
            >
              {copied ? <Check className="h-4 w-4 text-emerald" /> : <Copy className="h-4 w-4" />}
              {copied ? 'Copied!' : 'Copy Payment Link'}
            </button>
          </motion.div>
        )}
      </div>
    </AppLayout>
  );
};

export default QRPayPage;
