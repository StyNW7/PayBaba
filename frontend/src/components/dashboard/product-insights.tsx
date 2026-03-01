'use client';

import { useState } from 'react';
import { 
  TrendingUp, 
  Lightbulb, 
  Package, 
  Zap, 
  ChevronRight,
  Sparkles,
  ArrowUpRight,
  ShoppingBag,
  Target,
  BarChart3
} from 'lucide-react';
import type { ProductInsights } from '@/services/api';

interface ProductInsightsProps {
  data: ProductInsights;
}

export default function ProductInsights({ data }: ProductInsightsProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>('summary');

  const sections = [
    {
      id: 'summary',
      title: 'Performance Summary',
      icon: BarChart3,
      color: 'from-[#F15A22] to-[#F15A22]/80',
      bgGradient: 'from-[#FFF3ED] to-[#FFE5D5]',
      content: data.performance_summary
    },
    {
      id: 'topProducts',
      title: 'Top Trending Products',
      icon: TrendingUp,
      color: 'from-[#2DAEAA] to-[#2DAEAA]/80',
      bgGradient: 'from-[#E0F7F6] to-[#C7EEE8]',
      content: data.top_trending_products
    },
    {
      id: 'inventory',
      title: 'Inventory Advice',
      icon: Package,
      color: 'from-[#3B82F6] to-[#3B82F6]/80',
      bgGradient: 'from-[#EFF6FF] to-[#DBEAFE]',
      content: data.inventory_advice
    },
    {
      id: 'growth',
      title: 'Growth Opportunity',
      icon: Target,
      color: 'from-[#10B981] to-[#10B981]/80',
      bgGradient: 'from-[#D1FAE5] to-[#A7F3D0]',
      content: data.growth_opportunity
    }
  ];

  const getSentimentColor = (text: string) => {
    if (text.toLowerCase().includes('positif') || text.toLowerCase().includes('meningkat') || text.toLowerCase().includes('tinggi')) {
      return 'text-green-600';
    }
    if (text.toLowerCase().includes('waspada') || text.toLowerCase().includes('menurun') || text.toLowerCase().includes('rendah')) {
      return 'text-yellow-600';
    }
    if (text.toLowerCase().includes('prioritas') || text.toLowerCase().includes('penting')) {
      return 'text-[#F15A22]';
    }
    return 'text-[#2DAEAA]';
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-[#E5E7EB] p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-[#1F2937] text-xl font-bold">AI Product Insights</h3>
            <span className="px-2 py-1 bg-gradient-to-r from-[#F15A22] to-[#2DAEAA] text-white text-xs font-medium rounded-full flex items-center gap-1">
              <Sparkles size={12} />
              AI Powered
            </span>
          </div>
          <p className="text-[#6B7280] text-sm">Smart recommendations based on your sales data</p>
        </div>
        <div className="w-12 h-12 bg-gradient-to-br from-[#F15A22] to-[#2DAEAA] rounded-xl flex items-center justify-center">
          <Lightbulb size={24} className="text-white" />
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-4">
        {sections.map((section) => {
          const Icon = section.icon;
          const isExpanded = expandedSection === section.id;

          return (
            <div
              key={section.id}
              className={`group rounded-xl border border-[#E5E7EB] overflow-hidden transition-all duration-300 hover:shadow-lg ${
                isExpanded ? 'shadow-md' : ''
              }`}
            >
              {/* Section Header */}
              <button
                onClick={() => setExpandedSection(isExpanded ? null : section.id)}
                className={`w-full flex items-center justify-between p-4 bg-gradient-to-r ${section.bgGradient} hover:opacity-90 transition-opacity`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${section.color} flex items-center justify-center text-white`}>
                    <Icon size={20} />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-[#1F2937]">{section.title}</h4>
                    <p className="text-xs text-[#6B7280]">Click to {isExpanded ? 'collapse' : 'expand'}</p>
                  </div>
                </div>
                <ChevronRight
                  size={20}
                  className={`text-[#6B7280] transition-transform duration-300 ${
                    isExpanded ? 'rotate-90' : ''
                  }`}
                />
              </button>

              {/* Section Content */}
              {isExpanded && (
                <div className="p-4 bg-white animate-fadeIn">
                  {section.id === 'topProducts' ? (
                    <div className="space-y-3">
                      {(section.content as ProductInsights['top_trending_products']).map((product, idx) => (
                        <div
                          key={idx}
                          className="group/item p-4 rounded-xl border border-[#E5E7EB] hover:border-[#F15A22] hover:shadow-md transition-all duration-300"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#FFF3ED] to-[#FFE5D5] rounded-lg flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform">
                              <ShoppingBag size={20} className="text-[#F15A22]" />
                            </div>
                            <div>
                              <h5 className="font-semibold text-[#1F2937] mb-1">{product.name}</h5>
                              <p className="text-sm text-[#6B7280]">{product.reason}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="relative">
                      <div className={`absolute top-0 left-0 w-1 h-full rounded-l ${getSentimentColor(section.content as string)} bg-gradient-to-b ${section.color}`}></div>
                      <p className="text-[#4B5563] text-sm leading-relaxed pl-4">
                        {section.content as string}
                      </p>
                    </div>
                  )}

                  {/* Quick Actions */}
                  <div className="mt-4 pt-4 border-t border-[#E5E7EB] flex gap-2">
                    <button className="text-xs text-[#F15A22] hover:text-[#2DAEAA] transition-colors flex items-center gap-1">
                      <Zap size={12} />
                      Apply Recommendation
                    </button>
                    <button className="text-xs text-[#6B7280] hover:text-[#F15A22] transition-colors flex items-center gap-1">
                      <ArrowUpRight size={12} />
                      View Details
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* AI Assistant CTA */}
      <div className="mt-6 p-4 bg-gradient-to-r from-[#F15A22] to-[#2DAEAA] rounded-xl text-white cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <Sparkles size={20} />
            </div>
            <div>
              <h4 className="font-semibold">Ask AI Assistant</h4>
              <p className="text-white/80 text-xs mt-0.5">Get personalized product recommendations</p>
            </div>
          </div>
          <ChevronRight size={20} className="text-white/80" />
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}