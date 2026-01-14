import { TeamMember } from '@/data/mockData';
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertCircle,
  Gauge,
  Package,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { StatusBadge } from './StatusBadge';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  Legend,
} from 'recharts';

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

const statusColors: Record<WorkStatus, string> = {
  completed: 'hsl(var(--chart-4))',
  'on-track': 'hsl(var(--chart-5))',
  'at-risk': 'hsl(var(--chart-2))',
  blocked: 'hsl(var(--chart-1))',
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-popover p-2 text-popover-foreground shadow-md">
        <p className="label">{`${payload[0].name}`}</p>
        <p className="intro">{`Items: ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

export function IndividualView({ member, onBack }: IndividualViewProps) {
  const TrendIcon = trendIcons[member.deliveryTrend];
  const workloadLevel =
    member.workload > 80
      ? 'overloaded'
      : member.workload > 60
      ? 'high'
      : member.workload > 30
      ? 'medium'
      : 'low';

  const statusCounts = {
    completed: member.workItems.filter(i => i.status === 'completed').length,
    onTrack: member.workItems.filter(i => i.status === 'on-track').length,
    atRisk: member.workItems.filter(i => i.status === 'at-risk').length,
    blocked: member.workItems.filter(i => i.status === 'blocked').length,
  };

  const chartData = [
    { name: 'Completed', value: statusCounts.completed, color: statusColors.completed },
    { name: 'On Track', value: statusCounts.onTrack, color: statusColors['on-track'] },
    { name: 'At Risk', value: statusCounts.atRisk, color: statusColors['at-risk'] },
    { name: 'Blocked', value: statusCounts.blocked, color: statusColors.blocked },
  ].filter(item => item.value > 0);

  const blockedItems = member.workItems.filter(i => i.status === 'blocked');
  const longestBlocker =
    blockedItems.length > 0
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
        <div
          className="rounded-xl bg-card p-6 shadow-md animate-fade-in"
          style={{ animationDelay: '150ms' }}
        >
          <div className="mb-4 flex items-center gap-2">
            <Package className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold text-foreground">
              Work Distribution
            </h2>
          </div>
          <div className="grid items-center gap-6 sm:grid-cols-2">
            <div className="relative h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <RechartsTooltip
                    cursor={{ fill: 'hsl(var(--accent))' }}
                    content={<CustomTooltip />}
                  />
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    dataKey="value"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={chartData.length > 1 ? 5 : 0}
                  >
                    {chartData.map(entry => (
                      <Cell key={`cell-${entry.name}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-foreground">
                  {member.workItems.length}
                </span>
                <span className="text-sm text-muted-foreground">Total Items</span>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between pr-2">
                <span className="text-sm font-medium text-muted-foreground">
                  Status
                </span>
                <span className="text-sm font-medium text-muted-foreground">
                  Items
                </span>
              </div>
              <div className="space-y-2">
                {chartData.map(item => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex min-w-0 items-center gap-2">
                      <div
                        className="h-3 w-3 flex-shrink-0 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="truncate text-sm text-muted-foreground">
                        {item.name}
                      </span>
                    </div>
                    <span className="font-semibold text-foreground">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Work Summary */}
        <div
          className="rounded-xl bg-card p-6 shadow-md animate-fade-in"
          style={{ animationDelay: '200ms' }}
        >
          <h2 className="mb-4 text-lg font-semibold text-foreground">Work Summary</h2>

          <div className="mb-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-md bg-muted p-3 text-center">
              <p className="text-xs text-muted-foreground">Assigned</p>
              <p className="text-lg font-semibold text-foreground">{member.workItems.length}</p>
            </div>

            <div className="rounded-md bg-muted p-3 text-center">
              <p className="text-xs text-muted-foreground">In Progress</p>
              <p className="text-lg font-semibold text-foreground">{statusCounts.onTrack}</p>
            </div>

            <div className="rounded-md bg-muted p-3 text-center">
              <p className="text-xs text-muted-foreground">Completed</p>
              <p className="text-lg font-semibold text-foreground">{statusCounts.completed}</p>
            </div>

            <div className="rounded-md bg-muted p-3 text-center">
              <p className="text-xs text-muted-foreground">Delayed / Pending</p>
              <p className="text-lg font-semibold text-foreground">{statusCounts.atRisk + statusCounts.blocked}</p>
            </div>
          </div>

          <h3 className="mb-2 text-sm font-medium text-foreground">Work History</h3>
          <ul className="space-y-2">
            {member.workItems.map((item, idx) => (
              <li key={item.id || idx} className="flex items-center justify-between rounded-md p-2 bg-transparent">
                <div className="flex items-center gap-3">
                  <StatusBadge status={item.status} size="sm" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.id}</p>
                    <p className="text-xs text-muted-foreground">{item.dueHorizon}{item.blockerDays ? ` • ${item.blockerDays}d blocker` : ''}</p>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">{item.status === 'completed' ? 'Done' : 'Open'}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}