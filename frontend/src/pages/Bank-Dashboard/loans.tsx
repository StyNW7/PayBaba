/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronRight,
  Plus,
  Search,
  RefreshCw,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  DollarSign,
  Calendar,
  FileText,
  ChevronDown,
  ChevronUp,
  ArrowUpDown
} from 'lucide-react';
import { bankApi, type LoanApplication } from '@/services/api';
import LoadingSpinner from '@/components/loading-spinner';
import ErrorState from '@/components/error-state';

// Sample merchant list (since we need to select a merchant)
const sampleMerchants = [
  { id: 'MRC-1772300671201-674', name: 'PT Mega Jaya Commerce', category: 'Retail' },
  { id: 'MRC-1772300674990-350', name: 'CV Maju Bersama', category: 'Retail' },
  { id: 'MRC-1772300676603-278', name: 'UD Sederhana', category: 'Retail' },
];

export default function LoanApplicationsPage() {
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [applications, setApplications] = useState<LoanApplication[]>([]);
  const [selectedMerchantId, setSelectedMerchantId] = useState<string>(sampleMerchants[0].id);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortConfig, setSortConfig] = useState<{ key: keyof LoanApplication; direction: 'asc' | 'desc' } | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch loan applications when merchant changes
  const fetchApplications = async (merchantId: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await bankApi.getLoanApplications(merchantId);
      
      if (response.success && response.data) {
        setApplications(response.data.applications);
      } else {
        setError(response.message || 'Failed to load loan applications');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load loan applications');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (selectedMerchantId) {
      fetchApplications(selectedMerchantId);
    }
  }, [selectedMerchantId]);

  // Handle refresh
  const handleRefresh = () => {
    setRefreshing(true);
    fetchApplications(selectedMerchantId);
  };

  // Get status badge styles
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Draft':
        return {
          bg: 'bg-[#6B7280]/10',
          text: 'text-[#6B7280]',
          icon: FileText,
          label: 'Draft'
        };
      case 'Submitted':
        return {
          bg: 'bg-[#3B82F6]/10',
          text: 'text-[#3B82F6]',
          icon: Clock,
          label: 'Submitted'
        };
      case 'Under Review':
        return {
          bg: 'bg-[#F59E0B]/10',
          text: 'text-[#F59E0B]',
          icon: Clock,
          label: 'Under Review'
        };
      case 'Approved':
        return {
          bg: 'bg-[#10B981]/10',
          text: 'text-[#10B981]',
          icon: CheckCircle,
          label: 'Approved'
        };
      case 'Rejected':
        return {
          bg: 'bg-[#EF4444]/10',
          text: 'text-[#EF4444]',
          icon: XCircle,
          label: 'Rejected'
        };
      case 'Disbursed':
        return {
          bg: 'bg-[#8B5CF6]/10',
          text: 'text-[#8B5CF6]',
          icon: CheckCircle,
          label: 'Disbursed'
        };
      default:
        return {
          bg: 'bg-[#6B7280]/10',
          text: 'text-[#6B7280]',
          icon: AlertCircle,
          label: status
        };
    }
  };

  // Format currency
  const formatCurrency = (amount: string | number) => {
    const num = typeof amount === 'string' ? parseFloat(amount) : amount;
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Filter applications
  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      app.applicationId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.bankId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Sort applications
  const sortedApplications = [...filteredApplications].sort((a, b) => {
    if (sortConfig) {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (aValue && bValue) {
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      }
    }
    return 0;
  });

  // Calculate stats
  const stats = {
    total: applications.length,
    draft: applications.filter(a => a.status === 'Draft').length,
    submitted: applications.filter(a => a.status === 'Submitted').length,
    underReview: applications.filter(a => a.status === 'Under Review').length,
    approved: applications.filter(a => a.status === 'Approved').length,
    rejected: applications.filter(a => a.status === 'Rejected').length,
    disbursed: applications.filter(a => a.status === 'Disbursed').length,
    totalAmount: applications.reduce((sum, a) => sum + parseFloat(a.amount), 0)
  };

  const requestSort = (key: keyof LoanApplication) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key: keyof LoanApplication) => {
    if (!sortConfig || sortConfig.key !== key) {
      return <ArrowUpDown size={14} className="text-[#6B7280]" />;
    }
    return sortConfig.direction === 'asc' ? 
      <ChevronUp size={14} className="text-[#F15A22]" /> : 
      <ChevronDown size={14} className="text-[#F15A22]" />;
  };

  if (loading && !refreshing) {
    return (
      <div className="p-4 lg:p-8 flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#6B7280] text-sm mb-2">
            <span>Bank</span>
            <ChevronRight size={14} />
            <span className="text-[#1F2937] font-medium">Loan Applications</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#F15A22] to-[#2DAEAA] bg-clip-text text-transparent">
            Loan Applications
          </h1>
          <p className="text-[#6B7280] mt-2">Manage and review merchant loan applications</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="p-2.5 border border-[#E5E7EB] rounded-xl hover:border-[#F15A22] transition-colors"
          >
            <RefreshCw size={18} className={`text-[#6B7280] ${refreshing ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={() => navigate('/bank/loan-applications/create')}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#F15A22] to-[#2DAEAA] text-white rounded-xl hover:shadow-lg transition-all"
          >
            <Plus size={16} />
            <span>New Application</span>
          </button>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <ErrorState message={error} onRetry={() => fetchApplications(selectedMerchantId)} />
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 hover:shadow-lg transition-all">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[#6B7280] mb-1">Total Applications</p>
              <h3 className="text-2xl font-bold text-[#1F2937]">{stats.total}</h3>
            </div>
            <div className="w-10 h-10 bg-[#FFF3ED] rounded-lg flex items-center justify-center">
              <FileText size={20} className="text-[#F15A22]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 hover:shadow-lg transition-all">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[#6B7280] mb-1">Total Amount</p>
              <h3 className="text-2xl font-bold text-[#1F2937]">{formatCurrency(stats.totalAmount)}</h3>
            </div>
            <div className="w-10 h-10 bg-[#E0F7F6] rounded-lg flex items-center justify-center">
              <DollarSign size={20} className="text-[#2DAEAA]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 hover:shadow-lg transition-all">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[#6B7280] mb-1">Approved</p>
              <h3 className="text-2xl font-bold text-[#10B981]">{stats.approved}</h3>
            </div>
            <div className="w-10 h-10 bg-[#D1FAE5] rounded-lg flex items-center justify-center">
              <CheckCircle size={20} className="text-[#10B981]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 hover:shadow-lg transition-all">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[#6B7280] mb-1">Pending Review</p>
              <h3 className="text-2xl font-bold text-[#F59E0B]">{stats.submitted + stats.underReview}</h3>
            </div>
            <div className="w-10 h-10 bg-[#FEF3C7] rounded-lg flex items-center justify-center">
              <Clock size={20} className="text-[#F59E0B]" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 shadow-lg">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Merchant Selector */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-[#6B7280] mb-2">Select Merchant</label>
            <select
              value={selectedMerchantId}
              onChange={(e) => setSelectedMerchantId(e.target.value)}
              className="w-full px-4 py-2.5 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#F15A22] bg-white"
            >
              {sampleMerchants.map(merchant => (
                <option key={merchant.id} value={merchant.id}>
                  {merchant.name} ({merchant.category})
                </option>
              ))}
            </select>
          </div>

          {/* Search */}
          <div className="flex-1 relative">
            <label className="block text-sm font-medium text-[#6B7280] mb-2">Search</label>
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" />
              <input
                type="text"
                placeholder="Search by application ID or bank ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#F15A22] transition-colors"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="w-48">
            <label className="block text-sm font-medium text-[#6B7280] mb-2">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2.5 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#F15A22] bg-white"
            >
              <option value="All">All Status</option>
              <option value="Draft">Draft</option>
              <option value="Submitted">Submitted</option>
              <option value="Under Review">Under Review</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
              <option value="Disbursed">Disbursed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-[#FFF3ED] to-[#E0F7F6]">
                <th className="text-left py-3 px-4 text-sm font-semibold text-[#1F2937] cursor-pointer" onClick={() => requestSort('applicationId')}>
                  <div className="flex items-center gap-1">
                    Application ID {getSortIcon('applicationId')}
                  </div>
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[#1F2937] cursor-pointer" onClick={() => requestSort('appliedAt')}>
                  <div className="flex items-center gap-1">
                    Applied Date {getSortIcon('appliedAt')}
                  </div>
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[#1F2937] cursor-pointer" onClick={() => requestSort('amount')}>
                  <div className="flex items-center gap-1">
                    Amount {getSortIcon('amount')}
                  </div>
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[#1F2937] cursor-pointer" onClick={() => requestSort('tenor')}>
                  <div className="flex items-center gap-1">
                    Tenor {getSortIcon('tenor')}
                  </div>
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[#1F2937]">Credit Score</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[#1F2937] cursor-pointer" onClick={() => requestSort('status')}>
                  <div className="flex items-center gap-1">
                    Status {getSortIcon('status')}
                  </div>
                </th>
                {/* <th className="text-left py-3 px-4 text-sm font-semibold text-[#1F2937]">Action</th> */}
              </tr>
            </thead>
            <tbody>
              {sortedApplications.length > 0 ? (
                sortedApplications.map((app) => {
                  const statusStyle = getStatusBadge(app.status);
                  const StatusIcon = statusStyle.icon;
                  
                  return (
                    <tr key={app.applicationId} className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB] transition-colors">
                      <td className="py-3 px-4">
                        <span className="text-sm font-mono text-[#1F2937]">{app.applicationId}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Calendar size={14} className="text-[#6B7280]" />
                          <span className="text-sm text-[#4B5563]">{formatDate(app.appliedAt)}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-bold text-[#1F2937]">{formatCurrency(app.amount)}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-[#4B5563]}">{app.tenor} months</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className={`font-bold ${
                            app.creditScoreAtApplication >= 85 ? 'text-[#10B981]' : 
                            app.creditScoreAtApplication >= 70 ? 'text-[#F59E0B]' : 
                            'text-[#EF4444]'
                          }`}>
                            {app.creditScoreAtApplication}
                          </span>
                          <span className="text-xs text-[#6B7280]">({app.riskBandAtApplication})</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusStyle.bg} ${statusStyle.text}`}>
                          <StatusIcon size={12} />
                          {statusStyle.label}
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-[#6B7280]">
                    No loan applications found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}