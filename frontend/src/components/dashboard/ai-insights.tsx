import { TrendingUp, AlertCircle, CheckCircle, Clock, Target, Zap, ArrowUpRight } from 'lucide-react';

interface AIInsightsProps {
  monthlyGrowth: number;
  refundRate: number;
  creditScore: number;
  estimatedLimit: string;
}

export default function AIInsights({ monthlyGrowth, refundRate, creditScore, estimatedLimit }: AIInsightsProps) {
  const formatCurrency = (value: string) => {
    const num = parseFloat(value);
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num);
  };

  const insights = [
    {
      icon: TrendingUp,
      title: 'Growth Momentum',
      description: monthlyGrowth > 0 
        ? `Transaction volume increased by ${monthlyGrowth.toFixed(1)}% this month. Consider expanding inventory.`
        : `Transaction volume decreased by ${Math.abs(monthlyGrowth).toFixed(1)}% this month. Review recent activities.`,
      type: monthlyGrowth > 5 ? 'positive' : monthlyGrowth > 0 ? 'neutral' : 'warning',
      action: 'View details',
      time: '2 min ago'
    },
    {
      icon: AlertCircle,
      title: 'Refund Rate Alert',
      description: refundRate > 3 
        ? `Refund rate at ${refundRate.toFixed(1)}% exceeds threshold. Review recent transactions.`
        : `Refund rate at ${refundRate.toFixed(1)}% within acceptable range.`,
      type: refundRate > 3 ? 'warning' : 'positive',
      action: refundRate > 3 ? 'Review now' : 'View report',
      time: '15 min ago'
    },
    {
      icon: Target,
      title: 'Credit Limit Opportunity',
      description: `Eligible for limit increase to ${formatCurrency(estimatedLimit)} based on payment history.`,
      type: 'neutral',
      action: 'Apply now',
      time: '1 hour ago'
    },
    {
      icon: CheckCircle,
      title: 'Credit Score Status',
      description: creditScore > 70 
        ? `Credit score at ${creditScore}. Excellent performance in your industry.`
        : creditScore > 50 
          ? `Credit score at ${creditScore}. Room for improvement.`
          : `Credit score at ${creditScore}. Needs attention.`,
      type: creditScore > 70 ? 'positive' : creditScore > 50 ? 'neutral' : 'warning',
      action: 'View report',
      time: '3 hours ago'
    }
  ];

  return (
    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
      {insights.map((insight, idx) => {
        const Icon = insight.icon;
        const bgColor = insight.type === 'positive' ? 'bg-[#E0F7F6]' : insight.type === 'warning' ? 'bg-[#FEF3C7]' : 'bg-[#EFF6FF]';
        const borderColor = insight.type === 'positive' ? 'border-[#2DAEAA]' : insight.type === 'warning' ? 'border-[#F59E0B]' : 'border-[#3B82F6]';
        const iconColor = insight.type === 'positive' ? 'text-[#2DAEAA]' : insight.type === 'warning' ? 'text-[#F59E0B]' : 'text-[#3B82F6]';
        const hoverBg = insight.type === 'positive' ? 'hover:bg-[#C7EEE8]' : insight.type === 'warning' ? 'hover:bg-[#FDE68A]' : 'hover:bg-[#DBEAFE]';

        return (
          <div 
            key={idx} 
            className={`${bgColor} border-l-4 ${borderColor} p-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer group ${hoverBg}`}
          >
            <div className="flex gap-3">
              <div className={`${iconColor} p-2 bg-white/60 rounded-lg group-hover:scale-110 transition-transform`}>
                <Icon size={18} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold text-[#1F2937] text-sm">{insight.title}</h4>
                  <span className="text-[#6B7280] text-xs flex items-center gap-1">
                    <Clock size={10} />
                    {insight.time}
                  </span>
                </div>
                <p className="text-[#6B7280] text-xs leading-relaxed mb-2">{insight.description}</p>
                <button className={`text-xs font-medium flex items-center gap-1 ${
                  insight.type === 'positive' ? 'text-[#2DAEAA]' : 
                  insight.type === 'warning' ? 'text-[#F59E0B]' : 
                  'text-[#3B82F6]'
                }`}>
                  {insight.action}
                  {insight.type === 'positive' ? <ArrowUpRight size={10} /> : <Zap size={10} />}
                </button>
              </div>
            </div>
          </div>
        );
      })}

      {/* AI Assistant CTA */}
      <div className="bg-gradient-to-r from-[#F15A22] to-[#2DAEAA] p-4 rounded-xl text-white mt-4 cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <Zap size={20} />
          </div>
          <div>
            <h4 className="font-semibold text-sm">Ask AI Assistant</h4>
            <p className="text-white/80 text-xs mt-0.5">Get personalized recommendations</p>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #F3F4F6;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #F15A22;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #2DAEAA;
        }
      `}</style>
    </div>
  );
}