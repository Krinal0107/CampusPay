export interface Transaction {
  id: string;
  type: 'payment' | 'received' | 'tuition' | 'transport' | 'event' | 'cafeteria';
  description: string;
  amount: number;
  token: string;
  status: 'completed' | 'pending' | 'failed';
  timestamp: string;
  from?: string;
  to?: string;
  category: string;
}

export interface Invoice {
  id: string;
  title: string;
  amount: number;
  token: string;
  status: 'pending' | 'paid' | 'expired';
  dueDate: string;
  from: string;
  description: string;
  createdAt: string;
}

export interface VendorStats {
  totalRevenue: number;
  todayRevenue: number;
  totalTransactions: number;
  pendingInvoices: number;
}

export const mockTransactions: Transaction[] = [
  {
    id: 'tx_001',
    type: 'cafeteria',
    description: 'Campus Cafeteria - Lunch',
    amount: 5.00,
    token: 'USDC',
    status: 'completed',
    timestamp: '2026-05-09T12:30:00Z',
    to: 'CafeteriaVendor.sol',
    category: 'Food',
  },
  {
    id: 'tx_002',
    type: 'tuition',
    description: 'Spring Semester Tuition',
    amount: 2500.00,
    token: 'USDC',
    status: 'completed',
    timestamp: '2026-05-08T09:00:00Z',
    to: 'UniversityWallet.sol',
    category: 'Tuition',
  },
  {
    id: 'tx_003',
    type: 'transport',
    description: 'Campus Shuttle Pass',
    amount: 15.00,
    token: 'USDC',
    status: 'completed',
    timestamp: '2026-05-07T08:15:00Z',
    to: 'TransportService.sol',
    category: 'Transport',
  },
  {
    id: 'tx_004',
    type: 'received',
    description: 'Funds from Mom',
    amount: 200.00,
    token: 'USDC',
    status: 'completed',
    timestamp: '2026-05-06T14:00:00Z',
    from: 'Parent.eth',
    category: 'Transfer',
  },
  {
    id: 'tx_005',
    type: 'event',
    description: 'Tech Conference Ticket',
    amount: 25.00,
    token: 'USDC',
    status: 'completed',
    timestamp: '2026-05-05T16:45:00Z',
    to: 'EventOrganizer.sol',
    category: 'Events',
  },
  {
    id: 'tx_006',
    type: 'cafeteria',
    description: 'Morning Coffee & Snacks',
    amount: 3.50,
    token: 'USDC',
    status: 'completed',
    timestamp: '2026-05-05T07:30:00Z',
    to: 'CoffeeShop.sol',
    category: 'Food',
  },
  {
    id: 'tx_007',
    type: 'payment',
    description: 'Library Fine Payment',
    amount: 2.00,
    token: 'USDC',
    status: 'pending',
    timestamp: '2026-05-04T11:00:00Z',
    to: 'Library.sol',
    category: 'Other',
  },
  {
    id: 'tx_008',
    type: 'received',
    description: 'Scholarship Deposit',
    amount: 500.00,
    token: 'USDC',
    status: 'completed',
    timestamp: '2026-05-03T09:00:00Z',
    from: 'ScholarshipFund.sol',
    category: 'Transfer',
  },
];

export const mockInvoices: Invoice[] = [
  {
    id: 'inv_001',
    title: 'Fall Semester Tuition',
    amount: 2500.00,
    token: 'USDC',
    status: 'pending',
    dueDate: '2026-06-15',
    from: 'Lagos State University',
    description: 'Tuition fee for Fall 2026 semester. Includes lab fees and student activity charges.',
    createdAt: '2026-05-01',
  },
  {
    id: 'inv_002',
    title: 'Hostel Accommodation',
    amount: 800.00,
    token: 'USDC',
    status: 'pending',
    dueDate: '2026-05-30',
    from: 'Student Housing Office',
    description: 'Hostel accommodation fee for Block C, Room 204.',
    createdAt: '2026-04-28',
  },
  {
    id: 'inv_003',
    title: 'Campus Gym Membership',
    amount: 50.00,
    token: 'USDC',
    status: 'paid',
    dueDate: '2026-05-10',
    from: 'Campus Sports Center',
    description: 'Monthly gym membership and access to sports facilities.',
    createdAt: '2026-04-15',
  },
  {
    id: 'inv_004',
    title: 'Lab Equipment Fee',
    amount: 120.00,
    token: 'USDC',
    status: 'expired',
    dueDate: '2026-04-20',
    from: 'Science Department',
    description: 'Fee for laboratory equipment usage in Chemistry 301.',
    createdAt: '2026-04-01',
  },
];

export const mockVendorTransactions: Transaction[] = [
  {
    id: 'vtx_001',
    type: 'received',
    description: 'Student Payment - Lunch',
    amount: 5.00,
    token: 'USDC',
    status: 'completed',
    timestamp: '2026-05-09T12:30:00Z',
    from: 'adewale.sol',
    category: 'Food',
  },
  {
    id: 'vtx_002',
    type: 'received',
    description: 'Student Payment - Breakfast',
    amount: 3.50,
    token: 'USDC',
    status: 'completed',
    timestamp: '2026-05-09T08:15:00Z',
    from: 'chioma.sol',
    category: 'Food',
  },
  {
    id: 'vtx_003',
    type: 'received',
    description: 'Bulk Order - Event Catering',
    amount: 150.00,
    token: 'USDC',
    status: 'completed',
    timestamp: '2026-05-08T14:00:00Z',
    from: 'EventOrganizer.sol',
    category: 'Catering',
  },
  {
    id: 'vtx_004',
    type: 'received',
    description: 'Student Payment - Snacks',
    amount: 2.00,
    token: 'USDC',
    status: 'pending',
    timestamp: '2026-05-09T13:00:00Z',
    from: 'kwame.sol',
    category: 'Food',
  },
  {
    id: 'vtx_005',
    type: 'received',
    description: 'Student Payment - Dinner',
    amount: 7.50,
    token: 'USDC',
    status: 'completed',
    timestamp: '2026-05-08T19:30:00Z',
    from: 'fatima.sol',
    category: 'Food',
  },
];

export const vendorStats: VendorStats = {
  totalRevenue: 4280.50,
  todayRevenue: 168.00,
  totalTransactions: 342,
  pendingInvoices: 8,
};

export const weeklyRevenueData = [
  { day: 'Mon', revenue: 120 },
  { day: 'Tue', revenue: 180 },
  { day: 'Wed', revenue: 150 },
  { day: 'Thu', revenue: 210 },
  { day: 'Fri', revenue: 280 },
  { day: 'Sat', revenue: 90 },
  { day: 'Sun', revenue: 60 },
];

export const spendingByCategory = [
  { name: 'Food', value: 35, color: 'hsl(40, 95%, 55%)' },
  { name: 'Tuition', value: 40, color: 'hsl(160, 60%, 45%)' },
  { name: 'Transport', value: 12, color: 'hsl(220, 80%, 60%)' },
  { name: 'Events', value: 8, color: 'hsl(280, 60%, 55%)' },
  { name: 'Other', value: 5, color: 'hsl(0, 0%, 50%)' },
];
