import React, { useState } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { Menu, Bell } from 'lucide-react';
import AppSidebar from './AppSidebar';
import { shortenAddress } from '@/lib/constants';

interface AppLayoutProps {
  children: React.ReactNode;
  mode: 'student' | 'vendor';
  title: string;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, mode, title }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { publicKey } = useWallet();

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <AppSidebar mode={mode} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex h-14 items-center justify-between border-b border-border/50 bg-background/80 px-4 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 text-muted-foreground hover:text-foreground lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="font-heading text-lg font-semibold text-foreground">{title}</h1>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative rounded-lg p-2 text-muted-foreground hover:text-foreground">
              <Bell className="h-4 w-4" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary" />
            </button>
            {publicKey && (
              <span className="hidden text-xs text-muted-foreground sm:block">
                {shortenAddress(publicKey.toBase58())}
              </span>
            )}
            <WalletMultiButton />
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
