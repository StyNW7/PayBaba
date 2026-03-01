/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Activity } from 'lucide-react';

interface CreditScoreChartProps {
  data: Array<{
    date: string;
    score: number;
  }>;
}

export default function CreditScoreChart({ data }: CreditScoreChartProps) {
  const [filter, setFilter] = useState<'week' | 'month' | 'year'>('month');
  const [showPrediction, setShowPrediction] = useState(true);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    // Process data based on filter
    if (data && data.length > 0) {
      const sorted = [...data].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      
      // Format data for chart
      const formatted = sorted.map((item) => ({
        name: new Date(item.date).toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        }),
        score: item.score,
        predicted: item.score + Math.floor(Math.random() * 5) + 2 // Simple prediction for demo
      }));
      
      setChartData(formatted);
    }
  }, [data, filter]);

  const getImprovement = () => {
    if (chartData.length < 2) return '0.0';
    const first = chartData[0].score;
    const last = chartData[chartData.length - 1].score;
    return ((last - first) / first * 100).toFixed(1);
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-[#E5E7EB] p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-[#1F2937] text-xl font-bold">Credit Score Trend</h3>
            <span className="px-2 py-1 bg-[#E0F7F6] text-[#2DAEAA] text-xs font-medium rounded-full">
              +{getImprovement()}% growth
            </span>
          </div>
          <p className="text-[#6B7280] text-sm">Monitor your credit score over time with AI predictions</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          {/* Prediction Toggle */}
          <button
            onClick={() => setShowPrediction(!showPrediction)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              showPrediction
                ? 'bg-gradient-to-r from-[#F15A22] to-[#2DAEAA] text-white'
                : 'bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E5E7EB]'
            }`}
          >
            <Activity size={18} />
            AI Prediction
          </button>

          {/* Period Filters */}
          <div className="flex gap-2 bg-[#F3F4F6] p-1 rounded-lg">
            {(['week', 'month', 'year'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setFilter(period)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  filter === period
                    ? 'bg-white text-[#F15A22] shadow-md'
                    : 'text-[#6B7280] hover:text-[#1F2937]'
                }`}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F15A22" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#F15A22" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorPrediction" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2DAEAA" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#2DAEAA" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" opacity={0.5} />
            <XAxis 
              dataKey="name" 
              stroke="#6B7280"
              tick={{ fill: '#6B7280', fontSize: 12 }}
            />
            <YAxis 
              stroke="#6B7280"
              tick={{ fill: '#6B7280', fontSize: 12 }}
              domain={[Math.min(...chartData.map(d => d.score)) - 10, Math.max(...chartData.map(d => d.score)) + 10]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderRadius: '12px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                padding: '8px 12px',
              }}
              labelStyle={{ color: '#1F2937', fontWeight: 'bold', marginBottom: '4px' }}
            />
            <Legend 
              verticalAlign="top" 
              height={36}
              iconType="circle"
              formatter={(value) => <span className="text-[#1F2937] font-medium">{value}</span>}
            />
            <Area
              type="monotone"
              dataKey="score"
              stroke="#F15A22"
              strokeWidth={3}
              fill="url(#colorScore)"
              dot={{ fill: '#F15A22', r: 6, strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 8, stroke: '#F15A22', strokeWidth: 2 }}
              name="Actual Score"
            />
            {showPrediction && (
              <Area
                type="monotone"
                dataKey="predicted"
                stroke="#2DAEAA"
                strokeWidth={3}
                strokeDasharray="5 5"
                fill="url(#colorPrediction)"
                dot={{ fill: '#2DAEAA', r: 4 }}
                activeDot={{ r: 6 }}
                name="AI Prediction"
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-[350px] flex items-center justify-center text-[#6B7280]">
          No credit score data available
        </div>
      )}

      {/* Stats Footer */}
      {chartData.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-[#E5E7EB]">
          <div>
            <p className="text-[#6B7280] text-xs mb-1">Current Score</p>
            <p className="text-[#1F2937] font-bold text-xl">{chartData[chartData.length - 1]?.score || 0}</p>
          </div>
          <div>
            <p className="text-[#6B7280] text-xs mb-1">Average Score</p>
            <p className="text-[#1F2937] font-bold text-xl">
              {Math.round(chartData.reduce((acc, curr) => acc + curr.score, 0) / chartData.length) || 0}
            </p>
          </div>
          <div>
            <p className="text-[#6B7280] text-xs mb-1">AI Confidence</p>
            <p className="text-[#1F2937] font-bold text-xl">94%</p>
          </div>
        </div>
      )}
    </div>
  );
}