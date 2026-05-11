import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { QrCode, Copy, Check, Download, Plus } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import AppLayout from '@/components/layout/AppLayout';
import { useWallet } from '@solana/wallet-adapter-react';

interface QRItem {
  id: string;
  label: string;
  amount: string;
  created: string;
}

const VendorQRPage: React.FC = () => {
  const [label, setLabel] = useState('');
  const [amount, setAmount] = useState('');
  const [qrList, setQrList] = useState<QRItem[]>([
    { id: '1', label: 'Lunch Special', amount: '5.00', created: 'Today' },
    { id: '2', label: 'Breakfast Combo', amount: '3.50', created: 'Today' },
    { id: '3', label: 'Event Catering', amount: '150.00', created: 'Yesterday' },
  ]);
  const [selectedQR, setSelectedQR] = useState<QRItem | null>(qrList[0]);
  const [copied, setCopied] = useState(false);
  const { publicKey } = useWallet();

  const walletAddress = publicKey?.toBase58() || 'VendorWallet123...xyz';

  const handleCreate = () => {
    if (!label || !amount) return;
    const newItem: QRItem = {
      id: Date.now().toString(),
      label,
      amount,
      created: 'Just now',
    };
    setQrList((prev) => [newItem, ...prev]);
    setSelectedQR(newItem);
    setLabel('');
    setAmount('');
  };

  const getQRData = (item: QRItem) =>
    `solana:${walletAddress}?amount=${item.amount}&label=${encodeURIComponent(item.label)}&spl-token=USDC`;

  const handleCopy = () => {
    if (!selectedQR) return;
    navigator.clipboard.writeText(getQRData(selectedQR));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AppLayout mode="vendor" title="Generate QR">
      <div className="mx-auto max-w-4xl">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Create form + list */}
          <div className="space-y-4">
            <div className="glass-card rounded-xl p-5">
              <h3 className="mb-4 text-sm font-semibold text-foreground">New Payment QR</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  placeholder="Payment label (e.g., Lunch Special)"
                  className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground placeholder-muted-foreground/50 focus:border-primary focus:outline-none"
                />
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Amount in USDC"
                  className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground placeholder-muted-foreground/50 focus:border-primary focus:outline-none"
                />
                <button
                  onClick={handleCreate}
                  disabled={!label || !amount}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-all hover:shadow-[var(--shadow-gold)] disabled:opacity-50"
                >
                  <Plus className="h-4 w-4" />
                  Create QR Code
                </button>
              </div>
            </div>

            <div className="glass-card rounded-xl p-5">
              <h3 className="mb-3 text-sm font-semibold text-foreground">Saved QR Codes</h3>
              <div className="space-y-2">
                {qrList.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedQR(item)}
                    className={`flex w-full items-center justify-between rounded-lg p-3 text-left transition-all ${
                      selectedQR?.id === item.id
                        ? 'border border-primary/30 bg-primary/10'
                        : 'bg-secondary/30 hover:bg-secondary/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <QrCode className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{item.label}</p>
                        <p className="text-xs text-muted-foreground">{item.created}</p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-foreground">{item.amount} USDC</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* QR Preview */}
          <div className="glass-card rounded-xl p-6">
            {selectedQR ? (
              <motion.div key={selectedQR.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                <h3 className="mb-6 font-heading text-lg font-semibold text-foreground">Payment QR Code</h3>

                <div className="mx-auto inline-flex flex-col items-center rounded-2xl bg-foreground/95 p-8">
                  <QRCodeSVG
                    value={getQRData(selectedQR)}
                    size={220}
                    bgColor="hsl(40, 10%, 92%)"
                    fgColor="hsl(220, 15%, 5%)"
                    level="M"
                    includeMargin
                  />
                  <p className="mt-4 text-sm font-medium text-background">{selectedQR.label}</p>
                  <p className="text-lg font-bold text-background">{selectedQR.amount} USDC</p>
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={handleCopy}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm font-medium text-secondary-foreground hover:bg-secondary"
                  >
                    {copied ? <Check className="h-4 w-4 text-emerald" /> : <Copy className="h-4 w-4" />}
                    {copied ? 'Copied!' : 'Copy Link'}
                  </button>
                  <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-medium text-primary-foreground">
                    <Download className="h-4 w-4" />
                    Download
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="flex h-full items-center justify-center text-center">
                <div>
                  <QrCode className="mx-auto mb-3 h-10 w-10 text-muted-foreground/30" />
                  <p className="text-sm text-muted-foreground">Select or create a QR code</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default VendorQRPage;
