/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Building2,
  CreditCard,
  PieChart,
  Target,
  CheckCircle,
  AlertCircle,
  Eye,
  Download,
  RefreshCw,
  ChevronRight,
  Users,
  Banknote,
  Percent,
  Calendar,
  Sparkles,
  Brain,
  LineChart
} from 'lucide-react';
import {
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
  ComposedChart
} from 'recharts';

// Dummy data
const revenueData = [
  { month: 'Jan', total: 32, target: 30 },
  { month: 'Feb', total: 35, target: 33 },
  { month: 'Mar', total: 38, target: 36 },
  { month: 'Apr', total: 42, target: 39 },
  { month: 'May', total: 45, target: 42 },
  { month: 'Jun', total: 48, target: 45 },
  { month: 'Jul', total: 52, target: 48 },
  { month: 'Aug', total: 55, target: 52 },
];

const metricsData = [
  {
    metric: 'Merchant Stickiness',
    value: '78%',
    target: '80%',
    status: 'Approaching',
    progress: 78,
    color: '#F15A22'
  },
  {
    metric: 'Active Bank Partners',
    value: '5',
    target: '8',
    status: 'Need More',
    progress: 63,
    color: '#2DAEAA'
  },
  {
    metric: 'Avg Revenue/Merchant',
    value: 'Rp 2.5M',
    target: 'Rp 3.0M',
    status: 'Below',
    progress: 83,
    color: '#F59E0B'
  },
  {
    metric: 'Conversion Rate',
    value: '65%',
    target: '70%',
    status: 'Stable',
    progress: 93,
    color: '#10B981'
  }
];

const bankPartners = [
  { 
    bank: 'Bank BCA', 
    transactions: 45, 
    revenue: 22.5, 
    feeShare: 15,
    logo: 'BCA',
    status: 'Active'
  },
  { 
    bank: 'Bank Mandiri', 
    transactions: 38, 
    revenue: 18.2, 
    feeShare: 15,
    logo: 'BMI',
    status: 'Active'
  },
  { 
    bank: 'Bank BRI', 
    transactions: 29, 
    revenue: 15.1, 
    feeShare: 12,
    logo: 'BRI',
    status: 'Active'
  },
  { 
    bank: 'Bank BNI', 
    transactions: 22, 
    revenue: 11.8, 
    feeShare: 12,
    logo: 'BNI',
    status: 'Active'
  },
  { 
    bank: 'Bank CIMB Niaga', 
    transactions: 18, 
    revenue: 9.4, 
    feeShare: 10,
    logo: 'CIMB',
    status: 'Active'
  }
];

const revenueSources = [
  { name: 'Data Subscription Fee', value: 45.2, percentage: 36, color: '#F15A22' },
  { name: 'Success Fee', value: 80.3, percentage: 64, color: '#2DAEAA' },
  { name: 'Lead Generation', value: 0, percentage: 0, color: '#8B5CF6' }
];

const totalRevenue = 125.5;
const momGrowth = 15;
const dataSubscriptionFee = 45.2;
const successFee = 80.3;
const activeBanks = 5;
const nextMonthProjection = 60;
const projectionGrowth = 9;

export default function MonetizationDashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedBank, setSelectedBank] = useState<typeof bankPartners[number] | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const formatCompactCurrency = (amount: number) => {
    return `Rp ${amount}M`;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-[#E5E7EB]">
          <p className="text-sm font-medium text-[#1F2937] mb-2">{label} 2026</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-[#6B7280]">{entry.name}:</span>
              <span className="font-medium text-[#1F2937]">{formatCompactCurrency(entry.value)}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const PieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-[#E5E7EB]">
          <p className="font-medium text-[#1F2937]">{data.name}</p>
          <p className="text-sm text-[#6B7280]">{formatCompactCurrency(data.value)}</p>
          <p className="text-sm" style={{ color: data.color }}>{data.percentage}% of total</p>
        </div>
      );
    }
    return null;
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'Approaching':
        return <TrendingUp size={14} className="text-[#F59E0B]" />;
      case 'Need More':
        return <AlertCircle size={14} className="text-[#EF4444]" />;
      case 'Below':
        return <TrendingDown size={14} className="text-[#EF4444]" />;
      case 'Stable':
        return <CheckCircle size={14} className="text-[#10B981]" />;
      default:
        return <CheckCircle size={14} className="text-[#6B7280]" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Approaching':
        return 'text-[#F59E0B] bg-[#F59E0B]/10';
      case 'Need More':
        return 'text-[#EF4444] bg-[#EF4444]/10';
      case 'Below':
        return 'text-[#EF4444] bg-[#EF4444]/10';
      case 'Stable':
        return 'text-[#10B981] bg-[#10B981]/10';
      default:
        return 'text-[#6B7280] bg-[#6B7280]/10';
    }
  };

  const handleExport = () => {
    console.log('Exporting report...');
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="p-4 lg:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#F15A22] to-[#2DAEAA] bg-clip-text text-transparent">
            Monetization Dashboard
          </h1>
          <p className="text-[#6B7280] mt-2">Track revenue, performance metrics, and bank partnerships</p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2.5 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#F15A22] bg-white"
          >
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          
          <button
            onClick={handleRefresh}
            className="p-2.5 border border-[#E5E7EB] rounded-xl hover:border-[#F15A22] transition-colors"
          >
            <RefreshCw size={18} className="text-[#6B7280]" />
          </button>
          
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#F15A22] to-[#2DAEAA] text-white rounded-xl hover:shadow-lg transition-all"
          >
            <Download size={16} />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Header Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Revenue */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 hover:shadow-lg transition-all group">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[#6B7280] mb-1">Total Revenue</p>
              <h3 className="text-2xl font-bold text-[#1F2937]">{formatCompactCurrency(totalRevenue)}</h3>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp size={14} className="text-[#10B981]" />
                <span className="text-xs text-[#10B981]">+{momGrowth}% MoM</span>
              </div>
            </div>
            <div className="w-10 h-10 bg-[#FFF3ED] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <DollarSign size={20} className="text-[#F15A22]" />
            </div>
          </div>
        </div>

        {/* Data Subscription Fee */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 hover:shadow-lg transition-all group">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[#6B7280] mb-1">Data Subscription Fee</p>
              <h3 className="text-2xl font-bold text-[#1F2937]">{formatCompactCurrency(dataSubscriptionFee)}</h3>
              <p className="text-xs text-[#6B7280] mt-2">36% of total</p>
            </div>
            <div className="w-10 h-10 bg-[#E0F7F6] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <CreditCard size={20} className="text-[#2DAEAA]" />
            </div>
          </div>
        </div>

        {/* Success Fee */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 hover:shadow-lg transition-all group">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[#6B7280] mb-1">Success Fee</p>
              <h3 className="text-2xl font-bold text-[#1F2937]">{formatCompactCurrency(successFee)}</h3>
              <p className="text-xs text-[#6B7280] mt-2">64% of total</p>
            </div>
            <div className="w-10 h-10 bg-[#FFF3ED] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Percent size={20} className="text-[#F15A22]" />
            </div>
          </div>
        </div>

        {/* Active Bank Partners */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 hover:shadow-lg transition-all group">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[#6B7280] mb-1">Active Bank Partners</p>
              <h3 className="text-2xl font-bold text-[#1F2937]">{activeBanks} Banks</h3>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp size={14} className="text-[#10B981]" />
                <span className="text-xs text-[#10B981]">+2 this quarter</span>
              </div>
            </div>
            <div className="w-10 h-10 bg-[#E0F7F6] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Building2 size={20} className="text-[#2DAEAA]" />
            </div>
          </div>
        </div>
      </div>

      {/* Section 1 & 4: Monthly Revenue Chart + Pie Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-[#E5E7EB] p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-[#1F2937] flex items-center gap-2">
                <LineChart size={18} className="text-[#F15A22]" />
                Monthly Revenue Trend
              </h2>
              <p className="text-sm text-[#6B7280] mt-1">Actual vs Target (Jan-Aug 2026)</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#F15A22] rounded-full"></div>
                <span className="text-xs text-[#6B7280]">Actual</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#2DAEAA] rounded-full"></div>
                <span className="text-xs text-[#6B7280]">Target</span>
              </div>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" tickFormatter={(value) => `Rp${value}M`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="total" fill="#F15A22" radius={[4, 4, 0, 0]} name="Actual" />
              <Line type="monotone" dataKey="target" stroke="#2DAEAA" strokeWidth={3} dot={{ fill: '#2DAEAA', r: 4 }} name="Target" />
            </ComposedChart>
          </ResponsiveContainer>

          {/* Forecast Card */}
          <div className="mt-6 pt-6 border-t border-[#E5E7EB]">
            <div className="bg-gradient-to-r from-[#F15A22]/10 to-[#2DAEAA]/10 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                    <Target size={20} className="text-[#F15A22]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#6B7280]">Next Month Projection</p>
                    <p className="text-xl font-bold text-[#1F2937]">{formatCompactCurrency(nextMonthProjection)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp size={16} className="text-[#10B981]" />
                  <span className="text-sm font-medium text-[#10B981]">+{projectionGrowth}% growth</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Revenue Source Pie Chart */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-[#1F2937] flex items-center gap-2 mb-6">
            <PieChart size={18} className="text-[#F15A22]" />
            Revenue Sources
          </h2>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie
                  data={revenueSources.filter(s => s.value > 0)}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {revenueSources.filter(s => s.value > 0).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<PieTooltip />} />
              </RePieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-3 mt-4">
            {revenueSources.map((source, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: source.color }} />
                  <span className="text-sm text-[#6B7280]">{source.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-medium text-[#1F2937]">{formatCompactCurrency(source.value)}</span>
                  <span className="text-xs px-2 py-0.5 bg-[#F3F4F6] rounded-full">
                    {source.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-[#E5E7EB]">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#6B7280]">Total</span>
              <span className="font-bold text-[#1F2937]">{formatCompactCurrency(totalRevenue)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Performance Metrics Table */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 shadow-lg">
        <h2 className="text-lg font-semibold text-[#1F2937] flex items-center gap-2 mb-6">
          <Target size={18} className="text-[#F15A22]" />
          Performance Metrics
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-[#FFF3ED] to-[#E0F7F6]">
                <th className="text-left py-3 px-4 text-sm font-semibold text-[#1F2937]">Metric</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[#1F2937]">Value</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[#1F2937]">Target</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[#1F2937]">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[#1F2937]">Progress</th>
              </tr>
            </thead>
            <tbody>
              {metricsData.map((metric, idx) => (
                <tr key={idx} className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB] transition-colors">
                  <td className="py-4 px-4 font-medium text-[#1F2937]">{metric.metric}</td>
                  <td className="py-4 px-4">
                    <span className="font-semibold text-[#1F2937]">{metric.value}</span>
                  </td>
                  <td className="py-4 px-4 text-[#6B7280]">{metric.target}</td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(metric.status)}`}>
                      {getStatusIcon(metric.status)}
                      {metric.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all"
                          style={{ 
                            width: `${metric.progress}%`,
                            backgroundColor: metric.color
                          }}
                        />
                      </div>
                      <span className="text-xs text-[#6B7280]">{metric.progress}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Section 3: Top Bank Partners Table */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-[#1F2937] flex items-center gap-2">
            <Building2 size={18} className="text-[#F15A22]" />
            Top Bank Partners
          </h2>
          <button 
            onClick={() => setShowDetails(!showDetails)}
            className="text-sm text-[#F15A22] hover:text-[#2DAEAA] flex items-center gap-1"
          >
            View All
            <ChevronRight size={14} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-[#FFF3ED] to-[#E0F7F6]">
                <th className="text-left py-3 px-4 text-sm font-semibold text-[#1F2937]">Bank</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[#1F2937]">Transactions</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[#1F2937]">Revenue</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[#1F2937]">Fee Share</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[#1F2937]">Action</th>
              </tr>
            </thead>
            <tbody>
              {bankPartners.map((bank, idx) => (
                <tr key={idx} className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB] transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#F15A22] to-[#2DAEAA] rounded-lg flex items-center justify-center text-white font-bold text-xs">
                        {bank.logo}
                      </div>
                      <span className="font-medium text-[#1F2937]">{bank.bank}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-[#4B5563]">{bank.transactions}</td>
                  <td className="py-4 px-4 font-medium text-[#1F2937]">{formatCompactCurrency(bank.revenue)}</td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-1 bg-[#E0F7F6] text-[#2DAEAA] rounded-full text-xs font-medium">
                      {bank.feeShare}%
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <button 
                      onClick={() => setSelectedBank(bank as any)}
                      className="flex items-center gap-1 text-[#F15A22] hover:text-[#2DAEAA] transition-colors"
                    >
                      <Eye size={14} />
                      <span className="text-sm">Detail</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-[#F15A22]/10 to-[#2DAEAA]/10 rounded-xl p-4 border border-[#E5E7EB]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <Users size={16} className="text-[#F15A22]" />
            </div>
            <div>
              <p className="text-xs text-[#6B7280]">Avg Revenue/Merchant</p>
              <p className="text-sm font-bold text-[#1F2937]">Rp 2.5M</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#F15A22]/10 to-[#2DAEAA]/10 rounded-xl p-4 border border-[#E5E7EB]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <Banknote size={16} className="text-[#2DAEAA]" />
            </div>
            <div>
              <p className="text-xs text-[#6B7280]">Total Transactions</p>
              <p className="text-sm font-bold text-[#1F2937]">152</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#F15A22]/10 to-[#2DAEAA]/10 rounded-xl p-4 border border-[#E5E7EB]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <Percent size={16} className="text-[#F15A22]" />
            </div>
            <div>
              <p className="text-xs text-[#6B7280]">Avg Fee Share</p>
              <p className="text-sm font-bold text-[#1F2937]">13.2%</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#F15A22]/10 to-[#2DAEAA]/10 rounded-xl p-4 border border-[#E5E7EB]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <Calendar size={16} className="text-[#2DAEAA]" />
            </div>
            <div>
              <p className="text-xs text-[#6B7280]">YTD Growth</p>
              <p className="text-sm font-bold text-[#10B981]">+72%</p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Insight Card */}
      <div className="bg-gradient-to-r from-[#F15A22] to-[#2DAEAA] rounded-xl p-6 text-white">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
              <Brain size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-semibold mb-1 flex items-center gap-2">
                AI Revenue Insight
                <Sparkles size={14} />
              </h3>
              <p className="text-white/90 text-sm">
                Based on current trajectory, you're on track to hit Rp 70M by October. 
                Consider expanding to 2 more bank partners to accelerate growth.
              </p>
            </div>
          </div>
          <button className="px-4 py-2 bg-white text-[#F15A22] rounded-lg text-sm font-medium hover:shadow-lg transition-all">
            View Details
          </button>
        </div>
      </div>

      {/* Bank Detail Modal */}
      {selectedBank && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedBank(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-lg w-full"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#F15A22] to-[#2DAEAA] rounded-xl flex items-center justify-center text-white font-bold text-lg">
                    {selectedBank.logo}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#1F2937]">{selectedBank.bank}</h2>
                    <p className="text-sm text-[#6B7280]">Partner since 2024</p>
                  </div>
                </div>
                <button onClick={() => setSelectedBank(null)} className="text-[#6B7280] hover:text-[#1F2937]">✕</button>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="p-3 bg-[#F9FAFB] rounded-lg">
                  <p className="text-xs text-[#6B7280] mb-1">Transactions</p>
                  <p className="text-xl font-bold text-[#1F2937]">{selectedBank.transactions}</p>
                </div>
                <div className="p-3 bg-[#F9FAFB] rounded-lg">
                  <p className="text-xs text-[#6B7280] mb-1">Revenue</p>
                  <p className="text-xl font-bold text-[#1F2937]">{formatCompactCurrency(selectedBank.revenue)}</p>
                </div>
                <div className="p-3 bg-[#F9FAFB] rounded-lg">
                  <p className="text-xs text-[#6B7280] mb-1">Fee Share</p>
                  <p className="text-xl font-bold text-[#2DAEAA]">{selectedBank.feeShare}%</p>
                </div>
                <div className="p-3 bg-[#F9FAFB] rounded-lg">
                  <p className="text-xs text-[#6B7280] mb-1">Status</p>
                  <span className="inline-block px-2 py-1 bg-[#10B981]/10 text-[#10B981] rounded-full text-xs">
                    {selectedBank.status}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-[#1F2937]">Performance Metrics</h3>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-[#6B7280]">Monthly Growth</span>
                      <span className="font-medium text-[#10B981]">+12%</span>
                    </div>
                    <div className="h-1.5 bg-[#E5E7EB] rounded-full overflow-hidden">
                      <div className="h-full bg-[#10B981] rounded-full" style={{ width: '65%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-[#6B7280]">Target Achievement</span>
                      <span className="font-medium text-[#F15A22]">85%</span>
                    </div>
                    <div className="h-1.5 bg-[#E5E7EB] rounded-full overflow-hidden">
                      <div className="h-full bg-[#F15A22] rounded-full" style={{ width: '85%' }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-6 pt-6 border-t border-[#E5E7EB]">
                <button className="flex-1 px-4 py-2 bg-gradient-to-r from-[#F15A22] to-[#2DAEAA] text-white rounded-lg font-medium hover:shadow-lg transition-all">
                  View Full Report
                </button>
                <button className="flex-1 px-4 py-2 border border-[#E5E7EB] rounded-lg font-medium hover:bg-[#F3F4F6] transition-all">
                  Contact Partner
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}