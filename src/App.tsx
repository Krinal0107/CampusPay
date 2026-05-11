import React, { useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

import Index from './pages/Index';
import StudentDashboard from './pages/StudentDashboard';
import PaymentsPage from './pages/PaymentsPage';
import QRPayPage from './pages/QRPayPage';
import InvoicesPage from './pages/InvoicesPage';
import CrossChainPage from './pages/CrossChainPage';
import VoiceAssistantPage from './pages/VoiceAssistantPage';
import VendorDashboard from './pages/VendorDashboard';
import VendorQRPage from './pages/VendorQRPage';
import VendorInvoicesPage from './pages/VendorInvoicesPage';
import VendorTransactionsPage from './pages/VendorTransactionsPage';
import NotFound from './pages/NotFound';

import '@solana/wallet-adapter-react-ui/styles.css';

const App = () => {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<StudentDashboard />} />
            <Route path="/payments" element={<PaymentsPage />} />
            <Route path="/qr-pay" element={<QRPayPage />} />
            <Route path="/invoices" element={<InvoicesPage />} />
            <Route path="/cross-chain" element={<CrossChainPage />} />
            <Route path="/voice" element={<VoiceAssistantPage />} />
            <Route path="/vendor" element={<VendorDashboard />} />
            <Route path="/vendor/qr" element={<VendorQRPage />} />
            <Route path="/vendor/invoices" element={<VendorInvoicesPage />} />
            <Route path="/vendor/transactions" element={<VendorTransactionsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default App;
