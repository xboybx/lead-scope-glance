import { TeamMember } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus, AlertTriangle } from 'lucide-react';

interface TeamMemberCardProps {
  member: TeamMember;
  onClick: () => void;
}

function getHeatLevel(member: TeamMember): 'low' | 'medium' | 'high' {
  const blockedCount = member.workItems.filter(i => i.status === 'blocked').length;
  const atRiskCount = member.workItems.filter(i => i.status === 'at-risk').length;
  
  if (blockedCount > 0 || member.workload === 'overloaded') return 'high';
  if (atRiskCount > 1 || member.deliveryTrend === 'declining') return 'medium';
  return 'low';
}

const trendIcons = {
  improving: TrendingUp,
  stable: Minus,
  declining: TrendingDown,
};

const workloadColors: Record<string, string> = {
  light: 'text-status-on-track',
  moderate: 'text-muted-foreground',
  heavy: 'text-status-at-risk',
  overloaded: 'text-status-blocked',
};

export function TeamMemberCard({ member, onClick }: TeamMemberCardProps) {
  const heatLevel = getHeatLevel(member);
  const TrendIcon = trendIcons[member.deliveryTrend];
  
  const blockedCount = member.workItems.filter(i => i.status === 'blocked').length;
  const atRiskCount = member.workItems.filter(i => i.status === 'at-risk').length;

  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full rounded-xl p-4 text-left transition-all duration-200',
        'hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]',
        'focus:outline-none focus:ring-2 focus:ring-primary/50',
        'animate-fade-in',
        heatLevel === 'low' && 'bg-heat-low',
        heatLevel === 'medium' && 'bg-heat-medium',
        heatLevel === 'high' && 'bg-heat-high'
      )}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-card font-semibold text-foreground shadow-sm">
          {member.avatar}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="truncate font-medium text-foreground">{member.name}</h3>
            <TrendIcon
              className={cn(
                'h-4 w-4 shrink-0',
                member.deliveryTrend === 'improving' && 'text-status-on-track',
                member.deliveryTrend === 'stable' && 'text-muted-foreground',
                member.deliveryTrend === 'declining' && 'text-status-blocked'
              )}
            />
          </div>
          <p className="text-xs text-muted-foreground">{member.role}</p>
          
          <div className="mt-2 flex flex-wrap gap-2">
            <span className={cn('text-xs font-medium', workloadColors[member.workload])}>
              {member.workload}
            </span>
            {blockedCount > 0 && (
              <span className="flex items-center gap-1 text-xs font-medium text-status-blocked">
                <AlertTriangle className="h-3 w-3" />
                {blockedCount} blocked
              </span>
            )}
            {atRiskCount > 0 && blockedCount === 0 && (
              <span className="text-xs font-medium text-status-at-risk">
                {atRiskCount} at risk
              </span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}