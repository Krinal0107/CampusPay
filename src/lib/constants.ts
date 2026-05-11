export const APP_NAME = 'CampusPay+';
export const APP_TAGLINE = 'The Future of Campus Payments in India';

export const SUPPORTED_CHAINS = [
  { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', icon: '⟠' },
  { id: 'polygon', name: 'Polygon', symbol: 'MATIC', icon: '⬡' },
  { id: 'bsc', name: 'BNB Chain', symbol: 'BNB', icon: '◆' },
  { id: 'avalanche', name: 'Avalanche', symbol: 'AVAX', icon: '▲' },
  { id: 'arbitrum', name: 'Arbitrum', symbol: 'ARB', icon: '◈' },
];

export const PAYMENT_CATEGORIES = [
  { id: 'tuition', label: 'Tuition', icon: 'GraduationCap', color: 'emerald' },
  { id: 'cafeteria', label: 'Cafeteria', icon: 'UtensilsCrossed', color: 'gold' },
  { id: 'transport', label: 'Transport', icon: 'Bus', color: 'blue' },
  { id: 'events', label: 'Events', icon: 'Ticket', color: 'purple' },
];

export const NAV_LINKS = {
  student: [
    { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
    { label: 'Payments', path: '/payments', icon: 'CreditCard' },
    { label: 'QR Pay', path: '/qr-pay', icon: 'QrCode' },
    { label: 'Invoices', path: '/invoices', icon: 'FileText' },
    { label: 'Cross-Chain', path: '/cross-chain', icon: 'ArrowLeftRight' },
    { label: 'Voice', path: '/voice', icon: 'Mic' },
  ],
  vendor: [
    { label: 'Dashboard', path: '/vendor', icon: 'LayoutDashboard' },
    { label: 'Transactions', path: '/vendor/transactions', icon: 'Receipt' },
    { label: 'QR Generate', path: '/vendor/qr', icon: 'QrCode' },
    { label: 'Invoices', path: '/vendor/invoices', icon: 'FileText' },
  ],
};

export function shortenAddress(address: string, chars = 4): string {
  if (!address) return '';
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

export function formatCurrency(amount: number, token = 'USDC'): string {
  return `${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${token}`;
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function formatTime(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'completed':
    case 'paid':
      return 'text-emerald';
    case 'pending':
      return 'text-gold';
    case 'failed':
    case 'expired':
      return 'text-destructive';
    default:
      return 'text-muted-foreground';
  }
}
