import { Brain, CheckCircle, AlertCircle, Lightbulb, Zap } from 'lucide-react';

interface AIExplanationProps {
  explanation: {
    positives: string[];
    warnings: string[];
    improvements: string[];
  };
  recommendation: string;
  score: number;
}

export default function AIExplanation({ explanation, recommendation, score }: AIExplanationProps) {
  return (
    <div className="bg-gradient-to-br from-[#F3F4F6] to-[#F9FAFB] rounded-2xl border border-[#E5E7EB] p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
      <div className="flex items-start gap-4">
        {/* AI Icon */}
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-to-br from-[#F15A22] to-[#2DAEAA] rounded-2xl flex items-center justify-center shadow-lg animate-pulse-slow">
            <Brain size={32} className="text-white" />
          </div>
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-xl font-bold text-[#1F2937] flex items-center gap-2">
                AI Credit Analysis
                <span className="text-xs font-normal bg-[#F15A22]/10 text-[#F15A22] px-2 py-1 rounded-full">
                  Powered by Qwen
                </span>
              </h2>
              <p className="text-sm text-[#6B7280] mt-1">Real-time assessment of your credit health</p>
            </div>
            <div className="flex items-center gap-1">
              <Zap size={14} className="text-[#F15A22]" />
              <span className="text-xs font-medium text-[#1F2937]">Updated just now</span>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-[#E5E7EB]">
            <p className="text-lg font-semibold text-[#1F2937] mb-4">
              Your score of {score} is <span className="text-[#10B981]">LOW RISK</span> and ready for funding
            </p>

            {/* Bullet Points */}
            <div className="space-y-3 mb-4">
              {explanation.positives.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 group hover:translate-x-1 transition-transform">
                  <CheckCircle size={18} className="text-[#10B981] flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-[#4B5563]">{item}</span>
                </div>
              ))}
              
              {explanation.warnings.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 group hover:translate-x-1 transition-transform">
                  <AlertCircle size={18} className="text-[#F59E0B] flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-[#4B5563]">{item}</span>
                </div>
              ))}
            </div>

            {/* Improvement Section */}
            <div className="mt-4 pt-4 border-t border-[#E5E7EB]">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb size={16} className="text-[#F15A22]" />
                <span className="text-sm font-semibold text-[#1F2937]">To improve:</span>
              </div>
              <p className="text-sm text-[#6B7280]">{explanation.improvements.join(', ')}</p>
            </div>

            {/* Recommendation */}
            <div className="mt-4 bg-gradient-to-r from-[#F15A22]/5 to-[#2DAEAA]/5 rounded-lg p-4">
              <p className="text-sm text-[#4B5563] italic">"{recommendation}"</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}