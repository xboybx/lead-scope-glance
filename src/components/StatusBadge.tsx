import { cn } from '@/lib/utils';
import type { WorkStatus } from '@/data/mockData';

interface StatusBadgeProps {
  status: WorkStatus;
  count?: number;
  size?: 'sm' | 'md';
}

const statusLabels: Record<WorkStatus, string> = {
  'on-track': 'On Track',
  'at-risk': 'At Risk',
  'blocked': 'Blocked',
  'completed': 'Completed',
};

export function StatusBadge({ status, count, size = 'md' }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-medium',
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm',
        status === 'on-track' && 'status-on-track',
        status === 'at-risk' && 'status-at-risk',
        status === 'blocked' && 'status-blocked',
        status === 'completed' && 'status-completed'
      )}
    >
      {count !== undefined && <span className="font-semibold">{count}</span>}
      {statusLabels[status]}
    </span>
  );
}
