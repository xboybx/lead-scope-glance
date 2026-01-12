import { getHorizonSummary, TimeHorizon } from '@/data/mockData';
import { Clock, Calendar, CalendarDays } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TimeHorizonCardProps {
  horizon: TimeHorizon;
}

const horizonConfig: Record<TimeHorizon, { label: string; sublabel: string; Icon: typeof Clock }> = {
  immediate: { label: 'Immediate', sublabel: 'Due today or overdue', Icon: Clock },
  'short-term': { label: 'Short-term', sublabel: 'Due this week', Icon: Calendar },
  upcoming: { label: 'Upcoming', sublabel: 'Due next week+', Icon: CalendarDays },
};

export function TimeHorizonCard({ horizon }: TimeHorizonCardProps) {
  const summary = getHorizonSummary(horizon);
  const { label, sublabel, Icon } = horizonConfig[horizon];
  
  const hasIssues = summary.atRisk > 0 || summary.blocked > 0;

  return (
    <div
      className={cn(
        'rounded-xl bg-card p-5 shadow-md transition-all duration-200 hover:shadow-lg animate-fade-in',
        hasIssues && horizon === 'immediate' && 'ring-2 ring-status-at-risk/30'
      )}
    >
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-lg bg-secondary p-2">
          <Icon className="h-5 w-5 text-muted-foreground" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">{label}</h3>
          <p className="text-xs text-muted-foreground">{sublabel}</p>
        </div>
      </div>

      <div className="space-y-2">
        {summary.completed > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Completed</span>
            <span className="rounded-full bg-status-completed-bg px-2 py-0.5 text-xs font-medium text-status-completed">
              {summary.completed}
            </span>
          </div>
        )}
        {summary.onTrack > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">On Track</span>
            <span className="rounded-full bg-status-on-track-bg px-2 py-0.5 text-xs font-medium text-status-on-track">
              {summary.onTrack}
            </span>
          </div>
        )}
        {summary.atRisk > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">At Risk</span>
            <span className="rounded-full bg-status-at-risk-bg px-2 py-0.5 text-xs font-medium text-status-at-risk">
              {summary.atRisk}
            </span>
          </div>
        )}
        {summary.blocked > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Blocked</span>
            <span className="rounded-full bg-status-blocked-bg px-2 py-0.5 text-xs font-medium text-status-blocked">
              {summary.blocked}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
