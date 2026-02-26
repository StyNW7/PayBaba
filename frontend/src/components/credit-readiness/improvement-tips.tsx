import { Lightbulb, TrendingUp, Clock, RefreshCw, Target, Zap, ArrowRight } from 'lucide-react';

interface Component {
  name: string;
  score: number;
  weight: number;
  contribution: number;
  color: string;
}

interface ImprovementTipsProps {
  components: Component[];
  recommendations: string[];
}

export default function ImprovementTips({ components, recommendations }: ImprovementTipsProps) {
  // Find lowest scoring components
  const lowestComponents = [...components]
    .sort((a, b) => a.score - b.score)
    .slice(0, 3);

  const getTipIcon = (componentName: string) => {
    if (componentName.includes('Settlement')) return <Clock size={20} />;
    if (componentName.includes('Volume')) return <TrendingUp size={20} />;
    if (componentName.includes('Consistency')) return <RefreshCw size={20} />;
    return <Target size={20} />;
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-[#E5E7EB] p-6 shadow-xl h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-[#1F2937]">Improvement Tips</h2>
          <p className="text-sm text-[#6B7280] mt-1">Focus areas to boost your credit score</p>
        </div>
        <div className="w-10 h-10 bg-gradient-to-br from-[#FFF3ED] to-[#FFE5D5] rounded-xl flex items-center justify-center">
          <Lightbulb size={20} className="text-[#F15A22]" />
        </div>
      </div>

      <div className="space-y-4">
        {lowestComponents.map((component, idx) => (
          <div 
            key={idx} 
            className="group relative overflow-hidden rounded-xl bg-gradient-to-r p-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            style={{
              background: `linear-gradient(135deg, ${component.color}10, ${component.color}20)`
            }}
          >
            {/* Decorative bar */}
            <div 
              className="absolute left-0 top-0 bottom-0 w-1"
              style={{ background: component.color }}
            />
            
            <div className="flex items-start gap-3 pl-2">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
                style={{ background: component.color }}
              >
                {getTipIcon(component.name)}
              </div>
              
              <div className="flex-1">
                <h3 className="font-semibold text-[#1F2937] mb-1">{component.name}</h3>
                <p className="text-sm text-[#6B7280] mb-2">
                  Current score: <span className="font-bold" style={{ color: component.color }}>{component.score}/100</span>
                </p>
                
                {/* Improvement suggestion */}
                <p className="text-xs text-[#4B5563] bg-white/60 p-2 rounded-lg">
                  {component.name === 'Settlement Time' && 'Implement auto-settlement to reduce delays and improve score by 15-20 points'}
                  {component.name === 'Transaction Volume' && 'Increase monthly transactions by 20% to boost this component'}
                  {component.name === 'Revenue Consistency' && 'Maintain steady revenue streams to improve consistency score'}
                  {component.name === 'Growth Trend' && 'Focus on sustained growth rather than spikes'}
                  {component.name === 'Refund Rate' && 'Review refund reasons and implement quality checks'}
                </p>
                
                {/* Potential gain */}
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-[#6B7280]">Potential gain:</span>
                  <span className="text-xs font-semibold text-[#10B981]">
                    +{Math.round((100 - component.score) * component.weight / 100)} points
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Additional Recommendations */}
        <div className="mt-6 pt-4 border-t border-[#E5E7EB]">
          <h3 className="text-sm font-semibold text-[#1F2937] mb-3 flex items-center gap-2">
            <Zap size={16} className="text-[#F15A22]" />
            Quick Recommendations
          </h3>
          <div className="space-y-2">
            {recommendations.map((rec, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm text-[#6B7280] group cursor-pointer hover:text-[#1F2937] transition-colors">
                <ArrowRight size={14} className="text-[#2DAEAA] group-hover:translate-x-1 transition-transform" />
                {rec}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}