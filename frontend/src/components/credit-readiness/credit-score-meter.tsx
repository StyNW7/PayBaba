'use client';

import { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';

interface CreditScoreMeterProps {
  score: number;
  maxScore: number;
  riskBand: string;
  readyForFunding: boolean;
}

export default function CreditScoreMeter({ score, maxScore, riskBand, readyForFunding }: CreditScoreMeterProps) {
  const percentage = (score / maxScore) * 100;
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const increment = score / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= score) {
        setAnimatedScore(score);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.round(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [score]);

  // Determine color based on score
  const getGradientColor = () => {
    if (score >= 70) return 'from-[#10B981] to-[#2DAEAA]'; // Green to Teal
    if (score >= 40) return 'from-[#F59E0B] to-[#F15A22]'; // Yellow to Orange
    return 'from-[#EF4444] to-[#F97316]'; // Red to Orange
  };

  const getRiskColor = () => {
    if (riskBand === 'LOW RISK') return 'text-[#10B981] bg-[#10B981]/10';
    if (riskBand === 'MEDIUM RISK') return 'text-[#F59E0B] bg-[#F59E0B]/10';
    return 'text-[#EF4444] bg-[#EF4444]/10';
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-[#E5E7EB] p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[#1F2937] text-lg font-bold">Credit Health Score</h3>
        <div className="relative group">
          <Info size={16} className="text-[#6B7280] cursor-help" />
          <div className="absolute right-0 top-6 w-48 bg-[#1F2937] text-white text-xs rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
            Based on transaction history, consistency, and risk factors
          </div>
        </div>
      </div>

      {/* Gauge Meter */}
      <div className="relative flex justify-center items-center mb-6">
        <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="8"
            strokeLinecap="round"
          />
          
          {/* Progress circle with gradient */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={`url(#gradient-${score})`}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 45}`}
            strokeDashoffset={`${2 * Math.PI * 45 * (1 - percentage / 100)}`}
            className="transition-all duration-1000 ease-out"
          />
          
          {/* Gradient definition */}
          <defs>
            <linearGradient id={`gradient-${score}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F15A22" />
              <stop offset="100%" stopColor="#2DAEAA" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold bg-gradient-to-r from-[#F15A22] to-[#2DAEAA] bg-clip-text text-transparent">
            {animatedScore}
          </span>
          <span className="text-xs text-[#6B7280]">out of {maxScore}</span>
        </div>
      </div>

      {/* Risk Band Indicator */}
      <div className={`text-center p-3 rounded-xl mb-4 ${getRiskColor()}`}>
        <div className="flex items-center justify-center gap-2">
          {readyForFunding ? (
            <CheckCircle size={16} className="text-[#10B981]" />
          ) : (
            <AlertCircle size={16} className="text-[#F59E0B]" />
          )}
          <span className="font-semibold">{riskBand}</span>
        </div>
        <p className="text-xs mt-1 opacity-80">
          {readyForFunding 
            ? '✓ Ready for funding up to ₹5.2L' 
            : '⚠ Need improvement for funding'}
        </p>
      </div>

      {/* Score Interpretation */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-[#6B7280]">
          <span>Poor</span>
          <span>Fair</span>
          <span>Good</span>
          <span>Excellent</span>
        </div>
        <div className="h-1.5 bg-[#E5E7EB] rounded-full overflow-hidden">
          <div 
            className={`h-full bg-gradient-to-r ${getGradientColor()}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Score Range Legend */}
      <div className="grid grid-cols-4 gap-1 mt-4 text-[10px] text-center">
        <div className="text-[#EF4444]">0-39</div>
        <div className="text-[#F59E0B]">40-59</div>
        <div className="text-[#F15A22]">60-69</div>
        <div className="text-[#10B981]">70-100</div>
      </div>
    </div>
  );
}