/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState, useEffect, type SetStateAction } from 'react';
import {
  Search,
  Download,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Filter,
  DollarSign,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  FileText,
  Printer,
  Share2,
  Package,
  Hash,
  Receipt,
  AlertCircle,
  CreditCard,
  ShoppingBag,
  RefreshCw
} from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

// Types
interface TransactionItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

interface Transaction {
  id: string;
  date: Date;
  customer: {
    name: string;
    email: string;
    avatar?: string;
  };
  grandTotal: number;
  status: 'success' | 'pending' | 'failed' | 'refunded' | 'processing';
  items: TransactionItem[];
  paymentMethod: string;
  transactionId: string;
  category: string;
  location: string;
}

// Generate dummy data - 50+ transactions
const generateDummyTransactions = (): Transaction[] => {
  const customers = [
    { name: 'Acme Corporation', email: 'billing@acme.com', avatar: 'AC' },
    { name: 'TechStart Solutions', email: 'finance@techstart.com', avatar: 'TS' },
    { name: 'Global Retail Inc', email: 'accounts@globalretail.com', avatar: 'GR' },
    { name: 'Digital Media Co', email: 'payments@digitalmedia.co', avatar: 'DM' },
    { name: 'StartUp Labs', email: 'billing@startuplabs.io', avatar: 'SL' },
    { name: 'Ecom Solutions Ltd', email: 'finance@ecomsolutions.com', avatar: 'ES' },
    { name: 'Consulting Group LLC', email: 'invoices@consultinggroup.com', avatar: 'CG' },
    { name: 'Creative Agency', email: 'accounts@creativeagency.com', avatar: 'CA' },
    { name: 'Innovation Hub', email: 'finance@innovationhub.com', avatar: 'IH' },
    { name: 'Cloud Services Pro', email: 'billing@cloudpro.io', avatar: 'CP' },
    { name: 'Data Analytics Inc', email: 'payments@dataanalytics.com', avatar: 'DA' },
    { name: 'Marketing Experts', email: 'finance@marketingexperts.com', avatar: 'ME' },
    { name: 'Software Solutions', email: 'accounts@softwaresol.com', avatar: 'SS' },
    { name: 'Hardware Store', email: 'billing@hardwarestore.com', avatar: 'HS' },
    { name: 'Fashion Retail', email: 'finance@fashionretail.com', avatar: 'FR' },
    { name: 'Food & Beverages', email: 'orders@foodbeverages.com', avatar: 'FB' },
    { name: 'Travel Agency', email: 'bookings@travelagency.com', avatar: 'TA' },
    { name: 'Real Estate Group', email: 'payments@realestate.com', avatar: 'RE' },
    { name: 'Healthcare Plus', email: 'billing@healthcareplus.com', avatar: 'HP' },
    { name: 'Education Portal', email: 'finance@educationportal.com', avatar: 'EP' }
  ];

  const products = [
    { name: 'Enterprise Software License', prices: [45000, 60000, 75000] },
    { name: 'Premium Support Package', prices: [25000, 35000, 50000] },
    { name: 'API Access Credits', prices: [10000, 20000, 30000] },
    { name: 'Cloud Hosting - Annual', prices: [60000, 90000, 120000] },
    { name: 'SSL Certificate', prices: [14500, 25000, 35000] },
    { name: 'POS System License', prices: [35000, 50000, 75000] },
    { name: 'Hardware Bundle', prices: [20000, 40000, 60000] },
    { name: 'Ad Credits', prices: [25000, 50000, 100000] },
    { name: 'Analytics Package', prices: [3500, 7000, 15000] },
    { name: 'Developer License', prices: [4500, 9000, 18000] },
    { name: 'Documentation Access', prices: [2250, 4500, 9000] },
    { name: 'E-commerce Platform', prices: [150000, 250000, 400000] },
    { name: 'Payment Gateway Setup', prices: [45000, 65000, 85000] },
    { name: 'Training Session', prices: [13000, 26000, 52000] },
    { name: 'Consulting Hours', prices: [4500, 9000, 13500] },
    { name: 'Design Package', prices: [28000, 55000, 110000] },
    { name: 'Brand Guidelines', prices: [14800, 30000, 60000] },
    { name: 'SEO Services', prices: [35000, 70000, 140000] },
    { name: 'Social Media Management', prices: [25000, 50000, 100000] },
    { name: 'Content Creation', prices: [15000, 30000, 60000] }
  ];

  const paymentMethods = ['Bank Transfer', 'Credit Card', 'Debit Card', 'UPI', 'PayPal', 'Wire Transfer', 'Cryptocurrency'];
  const categories = ['Software', 'Hardware', 'Services', 'Consulting', 'Marketing', 'Training', 'License', 'Hosting'];
  const locations = ['New York, USA', 'London, UK', 'San Francisco, USA', 'Austin, USA', 'Seattle, USA', 'Chicago, USA', 'Boston, USA', 'Miami, USA', 'Denver, USA', 'Portland, USA', 'San Jose, USA', 'Los Angeles, USA', 'Toronto, Canada', 'Berlin, Germany', 'Singapore', 'Tokyo, Japan', 'Sydney, Australia'];
  const statuses: Array<'success' | 'pending' | 'failed' | 'refunded' | 'processing'> = ['success', 'pending', 'failed', 'refunded', 'processing'];

  const transactions: Transaction[] = [];

  // Generate 60 transactions
  for (let i = 1; i <= 60; i++) {
    const customer = customers[Math.floor(Math.random() * customers.length)];
    const numItems = Math.floor(Math.random() * 4) + 1;
    const items: TransactionItem[] = [];
    let grandTotal = 0;

    // Generate random items
    for (let j = 0; j < numItems; j++) {
      const product = products[Math.floor(Math.random() * products.length)];
      const price = product.prices[Math.floor(Math.random() * product.prices.length)];
      const quantity = Math.floor(Math.random() * 5) + 1;
      const total = price * quantity;
      
      items.push({
        id: j + 1,
        name: product.name,
        quantity,
        price,
        total
      });
      
      grandTotal += total;
    }

    // Random date within last 3 months
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 90));
    date.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60), Math.floor(Math.random() * 60));

    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
    // Adjust status probability (more success, fewer failed)
    const statusRand = Math.random();
    let finalStatus: typeof status;
    if (statusRand < 0.6) finalStatus = 'success';
    else if (statusRand < 0.8) finalStatus = 'pending';
    else if (statusRand < 0.9) finalStatus = 'processing';
    else if (statusRand < 0.95) finalStatus = 'refunded';
    else finalStatus = 'failed';

    transactions.push({
      id: `TXN-2024-${String(i).padStart(3, '0')}`,
      date,
      customer,
      grandTotal,
      status: finalStatus,
      items,
      paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
      transactionId: `pay_${Math.random().toString(36).substring(2, 15)}`,
      category: categories[Math.floor(Math.random() * categories.length)],
      location: locations[Math.floor(Math.random() * locations.length)]
    });
  }

  // Sort by date (newest first)
  return transactions.sort((a, b) => b.date.getTime() - a.date.getTime());
};

export default function TransactionsPage() {
  const [transactions] = useState<Transaction[]>(generateDummyTransactions);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(() => {
    const date = new Date();
    date.setMonth(date.getMonth() - 1); // Default to last 30 days
    return date;
  });
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tempStartDate, setTempStartDate] = useState<Date | null>(startDate);
  const [tempEndDate, setTempEndDate] = useState<Date | null>(endDate);

  // Get unique categories for filter
  const categories = ['all', ...new Set(transactions.map(t => t.category))];

  // Filter transactions
  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = 
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    
    const matchesCategory = categoryFilter === 'all' || transaction.category === categoryFilter;
    
    const matchesDate = (!startDate || transaction.date >= startDate) &&
                       (!endDate || transaction.date <= endDate);
    
    return matchesSearch && matchesStatus && matchesCategory && matchesDate;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, categoryFilter, startDate, endDate]);

  // Calculate metrics
  const totalRevenue = filteredTransactions.reduce((sum, t) => sum + t.grandTotal, 0);
  const successfulTransactions = filteredTransactions.filter(t => t.status === 'success').length;
  const pendingPayouts = filteredTransactions
    .filter(t => t.status === 'pending' || t.status === 'processing')
    .reduce((sum, t) => sum + t.grandTotal, 0);
  const failedTransactions = filteredTransactions.filter(t => t.status === 'failed').length;
  const averageTransactionValue = filteredTransactions.length > 0 
    ? totalRevenue / filteredTransactions.length 
    : 0;

  const getStatusStyles = (status: string) => {
    switch(status) {
      case 'success':
        return {
          bg: 'bg-[#10B981]/10',
          text: 'text-[#10B981]',
          border: 'border-[#10B981]/20',
          icon: CheckCircle
        };
      case 'pending':
        return {
          bg: 'bg-[#F59E0B]/10',
          text: 'text-[#F59E0B]',
          border: 'border-[#F59E0B]/20',
          icon: Clock
        };
      case 'processing':
        return {
          bg: 'bg-[#3B82F6]/10',
          text: 'text-[#3B82F6]',
          border: 'border-[#3B82F6]/20',
          icon: RefreshCw
        };
      case 'failed':
        return {
          bg: 'bg-[#EF4444]/10',
          text: 'text-[#EF4444]',
          border: 'border-[#EF4444]/20',
          icon: XCircle
        };
      case 'refunded':
        return {
          bg: 'bg-[#6B7280]/10',
          text: 'text-[#6B7280]',
          border: 'border-[#6B7280]/20',
          icon: AlertCircle
        };
      default:
        return {
          bg: 'bg-[#6B7280]/10',
          text: 'text-[#6B7280]',
          border: 'border-[#6B7280]/20',
          icon: Clock
        };
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const handleApplyDateFilter = () => {
    setStartDate(tempStartDate);
    setEndDate(tempEndDate);
    setShowDatePicker(false);
  };

  const handleClearDateFilter = () => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setMonth(thirtyDaysAgo.getMonth() - 1);
    setStartDate(thirtyDaysAgo);
    setEndDate(new Date());
    setTempStartDate(thirtyDaysAgo);
    setTempEndDate(new Date());
  };

  const handleExport = (format: 'csv' | 'pdf') => {
    // Implement export logic here
    console.log(`Exporting ${filteredTransactions.length} transactions as ${format}`);
    
    // In a real app, you would generate and download the file
    alert(`Exporting ${filteredTransactions.length} transactions as ${format} file...`);
  };

  return (
    <div className="p-4 lg:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#F15A22] to-[#2DAEAA] bg-clip-text text-transparent">
            Transaction Overview
          </h1>
          <p className="text-[#6B7280] mt-2">Monitor and manage all your business transactions</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Date Range Picker - Fixed */}
          <div className="relative">
            <button
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#E5E7EB] rounded-xl hover:border-[#F15A22] transition-all duration-300"
            >
              <Calendar size={16} className="text-[#6B7280]" />
              <span className="text-sm text-[#1F2937]">
                {startDate?.toLocaleDateString()} - {endDate?.toLocaleDateString()}
              </span>
              <ChevronDown size={14} className={`transition-transform ${showDatePicker ? 'rotate-180' : ''}`} />
            </button>

            {/* Date Picker Dropdown */}
            {showDatePicker && (
              <div className="absolute right-0 top-12 z-20 bg-white border border-[#E5E7EB] rounded-xl shadow-2xl p-4 min-w-[300px]">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#1F2937] mb-2">Start Date</label>
                    <DatePicker
                      selected={tempStartDate}
                      onChange={(date: SetStateAction<Date | null>) => setTempStartDate(date)}
                      selectsStart
                      startDate={tempStartDate}
                      endDate={tempEndDate}
                      className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#F15A22]"
                      placeholderText="Select start date"
                      dateFormat="dd/MM/yyyy"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1F2937] mb-2">End Date</label>
                    <DatePicker
                      selected={tempEndDate}
                      onChange={(date: SetStateAction<Date | null>) => setTempEndDate(date)}
                      selectsEnd
                      startDate={tempStartDate}
                      endDate={tempEndDate}
                      minDate={tempStartDate ?? undefined}
                      className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#F15A22]"
                      placeholderText="Select end date"
                      dateFormat="dd/MM/yyyy"
                    />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={handleApplyDateFilter}
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-[#F15A22] to-[#2DAEAA] text-white rounded-lg hover:shadow-lg transition-all"
                    >
                      Apply
                    </button>
                    <button
                      onClick={handleClearDateFilter}
                      className="flex-1 px-4 py-2 border border-[#E5E7EB] rounded-lg hover:bg-[#F3F4F6] transition-all"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Export Button with Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#F15A22] to-[#2DAEAA] text-white rounded-xl hover:shadow-lg transition-all duration-300">
              <Download size={16} />
              <span>Export</span>
              <ChevronDown size={14} />
            </button>
            
            <div className="absolute right-0 top-12 w-40 bg-white border border-[#E5E7EB] rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
              <button
                onClick={() => handleExport('csv')}
                className="w-full text-left px-4 py-2.5 hover:bg-[#F3F4F6] first:rounded-t-xl"
              >
                CSV File
              </button>
              <button
                onClick={() => handleExport('pdf')}
                className="w-full text-left px-4 py-2.5 hover:bg-[#F3F4F6] last:rounded-b-xl"
              >
                PDF Document
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards - Enhanced with more metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Total Revenue */}
        <div className="bg-white border-2 border-[#1F2937] rounded-xl p-4 hover:shadow-[8px_8px_0px_0px_#F15A22] transition-all duration-300 brutalist-card">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[#6B7280] text-xs font-medium mb-1">Total Revenue</p>
              <h3 className="text-lg font-bold text-[#1F2937]">{formatCurrency(totalRevenue)}</h3>
            </div>
            <div className="w-8 h-8 bg-[#FFF3ED] rounded-lg flex items-center justify-center">
              <DollarSign size={16} className="text-[#F15A22]" />
            </div>
          </div>
        </div>

        {/* Successful Transactions */}
        <div className="bg-white border-2 border-[#1F2937] rounded-xl p-4 hover:shadow-[8px_8px_0px_0px_#2DAEAA] transition-all duration-300 brutalist-card">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[#6B7280] text-xs font-medium mb-1">Successful</p>
              <h3 className="text-lg font-bold text-[#1F2937]">{successfulTransactions}</h3>
            </div>
            <div className="w-8 h-8 bg-[#E0F7F6] rounded-lg flex items-center justify-center">
              <CheckCircle size={16} className="text-[#2DAEAA]" />
            </div>
          </div>
        </div>

        {/* Pending Payouts */}
        <div className="bg-white border-2 border-[#1F2937] rounded-xl p-4 hover:shadow-[8px_8px_0px_0px_#F59E0B] transition-all duration-300 brutalist-card">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[#6B7280] text-xs font-medium mb-1">Pending</p>
              <h3 className="text-lg font-bold text-[#1F2937]">{formatCurrency(pendingPayouts)}</h3>
            </div>
            <div className="w-8 h-8 bg-[#FEF3C7] rounded-lg flex items-center justify-center">
              <Clock size={16} className="text-[#F59E0B]" />
            </div>
          </div>
        </div>

        {/* Failed Transactions */}
        <div className="bg-white border-2 border-[#1F2937] rounded-xl p-4 hover:shadow-[8px_8px_0px_0px_#EF4444] transition-all duration-300 brutalist-card">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[#6B7280] text-xs font-medium mb-1">Failed</p>
              <h3 className="text-lg font-bold text-[#1F2937]">{failedTransactions}</h3>
            </div>
            <div className="w-8 h-8 bg-[#FEE2E2] rounded-lg flex items-center justify-center">
              <XCircle size={16} className="text-[#EF4444]" />
            </div>
          </div>
        </div>

        {/* Average Value */}
        <div className="bg-white border-2 border-[#1F2937] rounded-xl p-4 hover:shadow-[8px_8px_0px_0px_#8B5CF6] transition-all duration-300 brutalist-card">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[#6B7280] text-xs font-medium mb-1">Avg. Value</p>
              <h3 className="text-lg font-bold text-[#1F2937]">{formatCurrency(averageTransactionValue)}</h3>
            </div>
            <div className="w-8 h-8 bg-[#EDE9FE] rounded-lg flex items-center justify-center">
              <ShoppingBag size={16} className="text-[#8B5CF6]" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" />
            <input
              type="text"
              placeholder="Search by ID, customer, email, location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#F15A22] transition-colors"
            />
          </div>

          <div className="flex gap-2">
            {/* Status Filter */}
            <div className="relative">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2.5 border border-[#E5E7EB] rounded-lg hover:border-[#F15A22] transition-colors"
              >
                <Filter size={18} className="text-[#6B7280]" />
                <span>Status</span>
                <ChevronDown size={14} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>

              {showFilters && (
                <div className="absolute right-0 top-12 w-48 bg-white border border-[#E5E7EB] rounded-lg shadow-xl z-10 p-2">
                  {['all', 'success', 'pending', 'processing', 'failed', 'refunded'].map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        setStatusFilter(status);
                        setShowFilters(false);
                      }}
                      className={`w-full text-left px-2 py-1.5 rounded text-sm capitalize ${
                        statusFilter === status
                          ? 'bg-[#F15A22] text-white'
                          : 'hover:bg-[#F3F4F6]'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2.5 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#F15A22] bg-white"
            >
              {categories.map(cat => (
                <option key={cat} value={cat} className="capitalize">
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Active Filters */}
        {(searchTerm || statusFilter !== 'all' || categoryFilter !== 'all' || startDate || endDate) && (
          <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-[#E5E7EB]">
            {searchTerm && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#FFF3ED] text-[#F15A22] rounded-full text-sm">
                Search: {searchTerm}
                <button onClick={() => setSearchTerm('')}>×</button>
              </span>
            )}
            {statusFilter !== 'all' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#E0F7F6] text-[#2DAEAA] rounded-full text-sm">
                Status: {statusFilter}
                <button onClick={() => setStatusFilter('all')}>×</button>
              </span>
            )}
            {categoryFilter !== 'all' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#EDE9FE] text-[#8B5CF6] rounded-full text-sm">
                Category: {categoryFilter}
                <button onClick={() => setCategoryFilter('all')}>×</button>
              </span>
            )}
            {(startDate || endDate) && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#F3F4F6] text-[#1F2937] rounded-full text-sm">
                Date: {startDate?.toLocaleDateString()} - {endDate?.toLocaleDateString()}
                <button onClick={handleClearDateFilter}>×</button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#6B7280]">
          Found <span className="font-semibold text-[#1F2937]">{filteredTransactions.length}</span> transactions
        </p>
        <p className="text-xs text-[#6B7280]">
          Page {currentPage} of {totalPages}
        </p>
      </div>

      {/* Transactions Table */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-[#FFF3ED] to-[#E0F7F6]">
                <th className="text-left py-4 px-6 text-sm font-semibold text-[#1F2937]">Transaction ID</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-[#1F2937]">Date & Time</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-[#1F2937]">Customer</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-[#1F2937]">Location</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-[#1F2937]">Category</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-[#1F2937]">Grand Total</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-[#1F2937]">Status</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-[#1F2937]">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((transaction) => {
                const statusStyles = getStatusStyles(transaction.status);
                const StatusIcon = statusStyles.icon;
                const isExpanded = expandedRow === transaction.id;

                return (
                  <>
                    <tr
                      key={transaction.id}
                      className={`border-b border-[#E5E7EB] hover:bg-[#F9FAFB] transition-colors cursor-pointer ${
                        isExpanded ? 'bg-[#F9FAFB]' : ''
                      }`}
                      onClick={() => setExpandedRow(isExpanded ? null : transaction.id)}
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <Hash size={14} className="text-[#6B7280]" />
                          <span className="font-medium text-[#1F2937]">{transaction.id}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <Calendar size={14} className="text-[#6B7280]" />
                          <span className="text-sm text-[#4B5563]">{formatDate(transaction.date)}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-[#F15A22] to-[#2DAEAA] rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                            {transaction.customer.avatar}
                          </div>
                          <div>
                            <p className="font-medium text-[#1F2937]">{transaction.customer.name}</p>
                            <p className="text-xs text-[#6B7280]">{transaction.customer.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm text-[#4B5563]">{transaction.location}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm text-[#4B5563] capitalize">{transaction.category}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-bold text-[#1F2937]">{formatCurrency(transaction.grandTotal)}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 ${statusStyles.bg} ${statusStyles.text} rounded-full text-sm font-medium`}>
                          <StatusIcon size={14} />
                          {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedRow(isExpanded ? null : transaction.id);
                          }}
                          className="flex items-center gap-1 text-[#F15A22] hover:text-[#2DAEAA] transition-colors"
                        >
                          <Eye size={16} />
                          <span className="text-sm">Details</span>
                          {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </button>
                      </td>
                    </tr>
                    
                    {/* Expanded Row - Transaction Details */}
                    {isExpanded && (
                      <tr className="bg-[#F9FAFB]">
                        <td colSpan={8} className="p-6">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <h4 className="font-semibold text-[#1F2937] flex items-center gap-2">
                                <Receipt size={18} className="text-[#F15A22]" />
                                Transaction Details - {transaction.id}
                              </h4>
                              <div className="flex items-center gap-2">
                                <button className="p-2 hover:bg-white rounded-lg transition-colors">
                                  <Printer size={16} className="text-[#6B7280]" />
                                </button>
                                <button className="p-2 hover:bg-white rounded-lg transition-colors">
                                  <Share2 size={16} className="text-[#6B7280]" />
                                </button>
                                <button className="p-2 hover:bg-white rounded-lg transition-colors">
                                  <FileText size={16} className="text-[#6B7280]" />
                                </button>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                              {/* Items List */}
                              <div className="lg:col-span-2">
                                <div className="bg-white rounded-lg border border-[#E5E7EB] overflow-hidden">
                                  <table className="w-full">
                                    <thead className="bg-[#F3F4F6]">
                                      <tr>
                                        <th className="text-left py-2 px-4 text-xs font-semibold text-[#6B7280]">Item</th>
                                        <th className="text-left py-2 px-4 text-xs font-semibold text-[#6B7280]">Qty</th>
                                        <th className="text-left py-2 px-4 text-xs font-semibold text-[#6B7280]">Price</th>
                                        <th className="text-left py-2 px-4 text-xs font-semibold text-[#6B7280]">Total</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {transaction.items.map((item) => (
                                        <tr key={item.id} className="border-t border-[#E5E7EB]">
                                          <td className="py-2 px-4">
                                            <div className="flex items-center gap-2">
                                              <Package size={14} className="text-[#6B7280]" />
                                              <span className="text-sm text-[#1F2937]">{item.name}</span>
                                            </div>
                                          </td>
                                          <td className="py-2 px-4 text-sm text-[#4B5563]}">{item.quantity}</td>
                                          <td className="py-2 px-4 text-sm text-[#4B5563]">{formatCurrency(item.price)}</td>
                                          <td className="py-2 px-4 text-sm font-medium text-[#1F2937]">{formatCurrency(item.total)}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                    <tfoot className="bg-[#F9FAFB] border-t border-[#E5E7EB]">
                                      <tr>
                                        <td colSpan={3} className="py-2 px-4 text-right font-semibold text-[#1F2937]">
                                          Subtotal:
                                        </td>
                                        <td className="py-2 px-4 font-bold text-[#F15A22]">
                                          {formatCurrency(transaction.grandTotal)}
                                        </td>
                                      </tr>
                                    </tfoot>
                                  </table>
                                </div>
                              </div>

                              {/* Payment Summary */}
                              <div className="bg-white rounded-lg border border-[#E5E7EB] p-4">
                                <h5 className="font-medium text-[#1F2937] mb-3 flex items-center gap-2">
                                  <CreditCard size={16} className="text-[#F15A22]" />
                                  Payment Summary
                                </h5>
                                <div className="space-y-2">
                                  <div className="flex justify-between text-sm">
                                    <span className="text-[#6B7280]">Transaction ID</span>
                                    <span className="text-[#1F2937] font-mono text-xs">{transaction.transactionId}</span>
                                  </div>
                                  <div className="flex justify-between text-sm">
                                    <span className="text-[#6B7280]">Payment Method</span>
                                    <span className="text-[#1F2937] font-medium">{transaction.paymentMethod}</span>
                                  </div>
                                  <div className="flex justify-between text-sm">
                                    <span className="text-[#6B7280]">Category</span>
                                    <span className="text-[#1F2937] capitalize">{transaction.category}</span>
                                  </div>
                                  <div className="flex justify-between text-sm">
                                    <span className="text-[#6B7280]">Location</span>
                                    <span className="text-[#1F2937]">{transaction.location}</span>
                                  </div>
                                  <div className="pt-2 mt-2 border-t border-[#E5E7EB]">
                                    <div className="flex justify-between font-bold">
                                      <span className="text-[#1F2937]">Total</span>
                                      <span className="text-[#F15A22]">{formatCurrency(transaction.grandTotal)}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredTransactions.length > 0 && (
          <div className="flex items-center justify-between p-4 border-t border-[#E5E7EB]">
            <p className="text-sm text-[#6B7280]">
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredTransactions.length)} of {filteredTransactions.length} transactions
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 border border-[#E5E7EB] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:border-[#F15A22] transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              
              {/* Page numbers */}
              <div className="flex items-center gap-1">
                {[...Array(Math.min(5, totalPages))].map((_, i) => {
                  let pageNum = currentPage;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-8 h-8 rounded-lg text-sm ${
                        currentPage === pageNum
                          ? 'bg-gradient-to-r from-[#F15A22] to-[#2DAEAA] text-white'
                          : 'border border-[#E5E7EB] hover:border-[#F15A22]'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 border border-[#E5E7EB] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:border-[#F15A22] transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .brutalist-card {
          box-shadow: 4px 4px 0px 0px #1F2937;
        }
      `}</style>
    </div>
  );
}