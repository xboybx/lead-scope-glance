import { TeamMember } from '@/data/mockData';
import { ArrowLeft, TrendingUp, TrendingDown, Minus, AlertCircle, Gauge, Package } from 'lucide-react';
import { cn } from '@/lib/utils';
import { StatusBadge } from './StatusBadge';

interface IndividualViewProps {
  member: TeamMember;
  onBack: () => void;
}

const trendLabels = {
  improving: 'Improving',
  stable: 'Stable',
  declining: 'Declining',
};

const trendIcons = {
  improving: TrendingUp,
  stable: Minus,
  declining: TrendingDown,
};

const workloadLabels: Record<string, string> = {
  light: 'Light',
  moderate: 'Moderate',
  heavy: 'Heavy',
  overloaded: 'Overloaded',
};

export function IndividualView({ member, onBack }: IndividualViewProps) {
  const TrendIcon = trendIcons[member.deliveryTrend];
  
  const statusCounts = {
    completed: member.items.filter(i => i.status === 'completed').length,
    onTrack: member.items.filter(i => i.status === 'on-track').length,
    atRisk: member.items.filter(i => i.status === 'at-risk').length,
    blocked: member.items.filter(i => i.status === 'blocked').length,
  };

  const blockedItems = member.items.filter(i => i.status === 'blocked');
  const longestBlocker = blockedItems.length > 0
    ? Math.max(...blockedItems.map(i => i.blockerDays || 0))
    : 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-8">
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Team Overview
        </button>

        {/* Header */}
        <div className="mb-8 flex items-center gap-4 animate-fade-in">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground shadow-md">
            {member.avatar}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{member.name}</h1>
            <p className="text-muted-foreground">{member.role}</p>
          </div>
        </div>

        {/* Snapshot Cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-card p-5 shadow-md animate-fade-in">
            <div className="mb-2 flex items-center gap-2 text-muted-foreground">
              <Gauge className="h-4 w-4" />
              <span className="text-sm font-medium">Workload</span>
            </div>
            <p className={cn(
              'text-lg font-semibold',
              member.workload === 'light' && 'text-status-on-track',
              member.workload === 'moderate' && 'text-foreground',
              member.workload === 'heavy' && 'text-status-at-risk',
              member.workload === 'overloaded' && 'text-status-blocked'
            )}>
              {workloadLabels[member.workload]}
            </p>
          </div>

          <div className="rounded-xl bg-card p-5 shadow-md animate-fade-in" style={{ animationDelay: '50ms' }}>
            <div className="mb-2 flex items-center gap-2 text-muted-foreground">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm font-medium">Blockers</span>
            </div>
            <div className="flex items-baseline gap-2">
              <p className={cn(
                'text-lg font-semibold',
                statusCounts.blocked > 0 ? 'text-status-blocked' : 'text-status-on-track'
              )}>
                {statusCounts.blocked}
              </p>
              {longestBlocker > 0 && (
                <span className="text-sm text-muted-foreground">
                  ({longestBlocker}d longest)
                </span>
              )}
            </div>
          </div>

          <div className="rounded-xl bg-card p-5 shadow-md animate-fade-in" style={{ animationDelay: '100ms' }}>
            <div className="mb-2 flex items-center gap-2 text-muted-foreground">
              <TrendIcon className="h-4 w-4" />
              <span className="text-sm font-medium">Delivery Trend</span>
            </div>
            <p className={cn(
              'text-lg font-semibold',
              member.deliveryTrend === 'improving' && 'text-status-on-track',
              member.deliveryTrend === 'stable' && 'text-foreground',
              member.deliveryTrend === 'declining' && 'text-status-blocked'
            )}>
              {trendLabels[member.deliveryTrend]}
            </p>
          </div>
        </div>

        {/* Work States */}
        <div className="mb-8 rounded-xl bg-card p-6 shadow-md animate-fade-in" style={{ animationDelay: '150ms' }}>
          <div className="mb-4 flex items-center gap-2">
            <Package className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold text-foreground">Work Distribution</h2>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {statusCounts.completed > 0 && (
              <StatusBadge status="completed" count={statusCounts.completed} />
            )}
            {statusCounts.onTrack > 0 && (
              <StatusBadge status="on-track" count={statusCounts.onTrack} />
            )}
            {statusCounts.atRisk > 0 && (
              <StatusBadge status="at-risk" count={statusCounts.atRisk} />
            )}
            {statusCounts.blocked > 0 && (
              <StatusBadge status="blocked" count={statusCounts.blocked} />
            )}
          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
            <div className="flex h-full">
              <div
                className="bg-status-completed transition-all duration-500"
                style={{ width: `${(statusCounts.completed / member.items.length) * 100}%` }}
              />
              <div
                className="bg-status-on-track transition-all duration-500"
                style={{ width: `${(statusCounts.onTrack / member.items.length) * 100}%` }}
              />
              <div
                className="bg-status-at-risk transition-all duration-500"
                style={{ width: `${(statusCounts.atRisk / member.items.length) * 100}%` }}
              />
              <div
                className="bg-status-blocked transition-all duration-500"
                style={{ width: `${(statusCounts.blocked / member.items.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Signals */}
        <div className="rounded-xl bg-card p-6 shadow-md animate-fade-in" style={{ animationDelay: '200ms' }}>
          <h2 className="mb-4 text-lg font-semibold text-foreground">Signals</h2>
          <ul className="space-y-3">
            {member.signals.map((signal, index) => (
              <li
                key={index}
                className="flex items-start gap-3 animate-slide-in"
                style={{ animationDelay: `${250 + index * 50}ms` }}
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <p className="text-sm text-muted-foreground leading-relaxed">{signal}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
