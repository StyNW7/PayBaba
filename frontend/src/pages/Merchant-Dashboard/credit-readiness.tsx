'use client';

import { useState } from 'react';
import { 
  Shield, 
  TrendingUp, 
  CheckCircle, 
  Clock, 
  ArrowUpRight,
  Target,
  ChevronRight,
  Download,
  Share2,
  Sparkles
} from 'lucide-react';
import CreditScoreMeter from '@/components/credit-readiness/credit-score-meter';
import ScoreComponentsTable from '@/components/credit-readiness/score-component-tables';
import ImprovementTips from '@/components/credit-readiness/improvement-tips';
import AIExplanation from '@/components/credit-readiness/ai-explanation';

// Sample data - In real app, this would come from API
const creditData = {
  credit_score: 78,
  risk_band: 'LOW RISK',
  ready_for_funding: true,
  components: [
    { name: 'Transaction Volume', score: 85, weight: 25, contribution: 21.3, color: '#F15A22' },
    { name: 'Revenue Consistency', score: 75, weight: 25, contribution: 18.8, color: '#2DAEAA' },
    { name: 'Growth Trend', score: 80, weight: 20, contribution: 16.0, color: '#F15A22' },
    { name: 'Refund Rate', score: 90, weight: 10, contribution: 9.0, color: '#10B981' },
    { name: 'Settlement Time', score: 65, weight: 20, contribution: 13.0, color: '#F59E0B' },
  ],
  explanation_text: {
    positives: [
      "Stable income for 6 months",
      "Refund rate only 0.4% (excellent)",
      "Consistent growth 10-15% monthly"
    ],
    warnings: [
      "Settlement sometimes delayed 1-2 days"
    ],
    improvements: [
      "Faster settlement processing",
      "Maintain low refund rates",
      "Increase transaction volume"
    ]
  },
  recommendation_text: "Your business shows strong fundamentals with excellent refund rates and consistent growth. Focus on improving settlement times to unlock better funding options."
};

export default function CreditReadinessPage() {
    
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const totalScore = creditData.components.reduce((acc, comp) => acc + comp.contribution, 0);

  return (
    <div className="p-4 lg:p-8 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#6B7280] text-sm mb-2">
            <span>Pages</span>
            <ChevronRight size={14} />
            <span className="text-[#1F2937] font-medium">Credit Readiness</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#F15A22] to-[#2DAEAA] bg-clip-text text-transparent">
            Credit Health Overview
          </h1>
          <p className="text-[#6B7280] mt-2">Comprehensive analysis of your creditworthiness and funding eligibility</p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button 
            onClick={handleRefresh}
            className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl border border-[#E5E7EB] hover:border-[#F15A22] transition-all duration-300 group"
          >
            <svg 
              className={`w-4 h-4 text-[#6B7280] group-hover:text-[#F15A22] transition-all ${isRefreshing ? 'animate-spin' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span className="text-sm font-medium text-[#1F2937]">Refresh</span>
          </button>
          
          <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#F15A22] to-[#2DAEAA] text-white rounded-xl hover:shadow-lg hover:shadow-[#F15A22]/20 transition-all duration-300 group">
            <Download size={16} className="group-hover:translate-y-0.5 transition-transform" />
            <span className="text-sm font-medium">Export Report</span>
          </button>
        </div>
      </div>

      {/* Status Banner */}
      <div className="bg-gradient-to-r from-[#10B981]/10 to-[#2DAEAA]/10 border border-[#10B981]/20 rounded-2xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#10B981] rounded-xl flex items-center justify-center">
            <CheckCircle size={20} className="text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-[#1F2937]">Ready for Funding</h3>
            <p className="text-sm text-[#6B7280]">Your credit score meets the criteria for instant funding up to ₹5.2L</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-[#E5E7EB] hover:border-[#F15A22] transition-colors">
          <span className="text-sm font-medium">Apply Now</span>
          <ArrowUpRight size={14} />
        </button>
      </div>

      {/* Section 1: Score Meter and Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Large Score Meter */}
        <div className="lg:col-span-1">
          <CreditScoreMeter 
            score={creditData.credit_score} 
            maxScore={100}
            riskBand={creditData.risk_band}
            readyForFunding={creditData.ready_for_funding}
          />
        </div>

        {/* Quick Stats Cards */}
        <div className="lg:col-span-2 grid grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#FFF3ED] to-[#FFE5D5] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <TrendingUp size={24} className="text-[#F15A22]" />
              </div>
              <span className="text-xs font-medium text-[#10B981] bg-[#10B981]/10 px-2 py-1 rounded-full">
                +12.3%
              </span>
            </div>
            <p className="text-[#6B7280] text-sm mb-1">Growth Rate</p>
            <p className="text-2xl font-bold text-[#1F2937]">12.3%</p>
            <p className="text-xs text-[#6B7280] mt-2">vs last month</p>
          </div>

          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#E0F7F6] to-[#C7EEE8] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Clock size={24} className="text-[#2DAEAA]" />
              </div>
              <span className="text-xs font-medium text-[#F59E0B] bg-[#F59E0B]/10 px-2 py-1 rounded-full">
                -2 days
              </span>
            </div>
            <p className="text-[#6B7280] text-sm mb-1">Avg Settlement</p>
            <p className="text-2xl font-bold text-[#1F2937]">1.2 days</p>
            <p className="text-xs text-[#6B7280] mt-2">Industry avg: 2.5 days</p>
          </div>

          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#FFF3ED] to-[#FFE5D5] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Shield size={24} className="text-[#F15A22]" />
              </div>
              <span className="text-xs font-medium text-[#10B981] bg-[#10B981]/10 px-2 py-1 rounded-full">
                Excellent
              </span>
            </div>
            <p className="text-[#6B7280] text-sm mb-1">Refund Rate</p>
            <p className="text-2xl font-bold text-[#1F2937]">0.4%</p>
            <p className="text-xs text-[#6B7280] mt-2">Below threshold</p>
          </div>

          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#E0F7F6] to-[#C7EEE8] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Target size={24} className="text-[#2DAEAA]" />
              </div>
              <span className="text-xs font-medium text-[#F15A22] bg-[#F15A22]/10 px-2 py-1 rounded-full">
                +₹2.1L
              </span>
            </div>
            <p className="text-[#6B7280] text-sm mb-1">Monthly Volume</p>
            <p className="text-2xl font-bold text-[#1F2937]">₹18.5M</p>
            <p className="text-xs text-[#6B7280] mt-2">↑ 15% vs last month</p>
          </div>
        </div>
      </div>

      {/* Section 2: AI Explanation */}
      <div className="animate-fadeIn">
        <AIExplanation 
          explanation={creditData.explanation_text}
          recommendation={creditData.recommendation_text}
          score={creditData.credit_score}
        />
      </div>

      {/* Section 3: Score Components Table */}
      <div className="animate-slideUp" style={{ animationDelay: '0.2s' }}>
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-[#E5E7EB] p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-[#1F2937]">Score Components Breakdown</h2>
              <p className="text-sm text-[#6B7280] mt-1">Detailed analysis of factors affecting your credit score</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="px-3 py-1 bg-[#F3F4F6] rounded-lg text-sm">
                Total Score: <span className="font-bold text-[#F15A22]">{totalScore.toFixed(1)}</span>
              </div>
              <button className="p-2 hover:bg-[#F3F4F6] rounded-lg transition-colors">
                <Share2 size={18} className="text-[#6B7280]" />
              </button>
            </div>
          </div>
          <ScoreComponentsTable components={creditData.components} totalScore={totalScore} />
        </div>
      </div>

      {/* Section 4: Improvement Tips */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 animate-slideUp" style={{ animationDelay: '0.3s' }}>
          <ImprovementTips 
            components={creditData.components}
            recommendations={creditData.explanation_text.improvements}
          />
        </div>

        {/* Additional Resources Card */}
        <div className="bg-gradient-to-br from-[#F15A22] to-[#2DAEAA] rounded-2xl p-6 text-white animate-slideUp" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Sparkles size={20} className="text-white" />
            </div>
            <h3 className="font-bold">Need Assistance?</h3>
          </div>
          <p className="text-white/90 text-sm mb-6 leading-relaxed">
            Our credit experts are here to help you improve your score and secure better funding options.
          </p>
          <button className="w-full bg-white text-[#F15A22] py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
            Talk to Expert
            <ChevronRight size={16} />
          </button>
          <div className="mt-4 pt-4 border-t border-white/20">
            <p className="text-white/80 text-xs">Response time: &lt; 5 minutes</p>
          </div>
        </div>
      </div>

      {/* Add custom animations */}
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        .animate-slideUp {
          animation: slideUp 0.5s ease-out forwards;
          opacity: 0;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
          opacity: 0;
        }
        
        .animate-pulse-slow {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}