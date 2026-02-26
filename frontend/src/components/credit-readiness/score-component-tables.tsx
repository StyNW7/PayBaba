import { TrendingUp, TrendingDown, Minus, Info } from 'lucide-react';

interface Component {
  name: string;
  score: number;
  weight: number;
  contribution: number;
  color: string;
}

interface ScoreComponentsTableProps {
  components: Component[];
  totalScore: number;
}

export default function ScoreComponentsTable({ components, totalScore }: ScoreComponentsTableProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-[#10B981]';
    if (score >= 60) return 'text-[#F59E0B]';
    return 'text-[#EF4444]';
  };

  const getTrendIcon = (score: number) => {
    if (score >= 75) return <TrendingUp size={14} className="text-[#10B981]" />;
    if (score >= 50) return <Minus size={14} className="text-[#F59E0B]" />;
    return <TrendingDown size={14} className="text-[#EF4444]" />;
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-[#E5E7EB]">
            <th className="text-left py-4 px-4 text-sm font-semibold text-[#1F2937]">Component</th>
            <th className="text-left py-4 px-4 text-sm font-semibold text-[#1F2937]">Score</th>
            <th className="text-left py-4 px-4 text-sm font-semibold text-[#1F2937]">Weight</th>
            <th className="text-left py-4 px-4 text-sm font-semibold text-[#1F2937]">Contribution</th>
            <th className="text-left py-4 px-4 text-sm font-semibold text-[#1F2937]">Progress</th>
          </tr>
        </thead>
        <tbody>
          {components.map((component, idx) => (
            <tr 
              key={idx} 
              className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB] transition-colors group"
            >
              <td className="py-4 px-4">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-[#1F2937]">{component.name}</span>
                  <div className="relative group">
                    <Info size={14} className="text-[#6B7280] cursor-help opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute left-0 bottom-6 w-32 bg-[#1F2937] text-white text-xs rounded-lg p-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      Click for details
                    </div>
                  </div>
                </div>
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center gap-2">
                  <span className={`font-bold ${getScoreColor(component.score)}`}>
                    {component.score}/100
                  </span>
                  {getTrendIcon(component.score)}
                </div>
              </td>
              <td className="py-4 px-4">
                <span className="text-[#6B7280]">{component.weight}%</span>
              </td>
              <td className="py-4 px-4">
                <span className="font-semibold text-[#1F2937]">{component.contribution.toFixed(1)}</span>
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center gap-3">
                  <div className="w-24 h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500 group-hover:scale-105"
                      style={{ 
                        width: `${component.score}%`,
                        background: `linear-gradient(90deg, ${component.color}, ${component.color}dd)`
                      }}
                    />
                  </div>
                  <span className="text-xs text-[#6B7280]">{component.score}%</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-gradient-to-r from-[#FFF3ED] to-[#E0F7F6]">
            <td className="py-4 px-4 font-bold text-[#1F2937]">TOTAL</td>
            <td className="py-4 px-4"></td>
            <td className="py-4 px-4 font-bold text-[#1F2937]">100%</td>
            <td className="py-4 px-4 font-bold text-[#F15A22] text-lg">{totalScore.toFixed(1)}</td>
            <td className="py-4 px-4">
              <div className="flex items-center gap-3">
                <div className="w-24 h-2.5 bg-[#E5E7EB] rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-[#F15A22] to-[#2DAEAA]"
                    style={{ width: `${totalScore}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-[#1F2937]">{totalScore.toFixed(1)}%</span>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}