import { cn } from '@/lib/utils';
import type { WorkStatus } from '@/data/mockData';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface StatusBadgeProps {
  status: WorkStatus;
  count?: number;
  size?: 'sm' | 'md';
}

const statusInfo: Record<
  WorkStatus,
  { label: string; description: string }
> = {
  'on-track': {
    label: 'On Track',
    description: 'Work is progressing as expected.',
  },
  'at-risk': {
    label: 'At Risk',
    description: 'Potential issues may impact deadlines or outcomes.',
  },
  blocked: {
    label: 'Blocked',
    description: 'Progress is halted pending resolution of a dependency.',
  },
  completed: {
    label: 'Completed',
    description: 'Work has been finished successfully.',
  },
};

export function StatusBadge({ status, count, size = 'md' }: StatusBadgeProps) {
  const { label, description } = statusInfo[status];

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
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
            {count !== undefined && (
              <span className="font-semibold">{count}</span>
            )}
            {label}
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p>{description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}