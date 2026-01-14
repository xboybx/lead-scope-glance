import { teamMembers, WorkStatus } from '@/data/mockData';
import { HealthSummary } from './HealthSummary';
import { TimeHorizonCard } from './TimeHorizonCard';
import { TeamMemberCard } from './TeamMemberCard';
import { Users, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface TeamOverviewProps {
  onSelectMember: (id: string) => void;
  onSelectStatus: (status: WorkStatus) => void;
}

export function TeamOverview({ onSelectMember, onSelectStatus }: TeamOverviewProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-2xl font-bold text-foreground">Team Overview</h1>
          <p className="mt-1 text-muted-foreground">
            Situational awareness for your team's execution health
          </p>
        </div>

        {/* Health Summary */}
        <div className="mb-8">
          <HealthSummary onSelectStatus={onSelectStatus} />
        </div>

        {/* Time Horizons */}
        <div className="mb-8">
          <h2 className="mb-4 text-lg font-semibold text-foreground">Time Horizons</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <TimeHorizonCard horizon="immediate" />
            <TimeHorizonCard horizon="short-term" />
            <TimeHorizonCard horizon="upcoming" />
          </div>
        </div>

        {/* Attention Heatmap */}
        <div className="mb-8">
          <div className="mb-4 flex items-center gap-2">
            <Users className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold text-foreground">Attention Heatmap</h2>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="ml-2 -mt-1 rounded-full p-1 text-muted-foreground hover:text-foreground">
                    <Info className="h-4 w-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="max-w-xs text-sm">
                    <p className="font-medium">How to read the heatmap</p>
                    <p className="mt-1">Colors indicate attention priority:</p>
                    <ul className="mt-1 list-inside list-disc">
                      <li><span className="font-medium text-status-on-track">Green</span>: Stable — no action needed.</li>
                      <li><span className="font-medium text-status-at-risk">Amber</span>: Monitor — watch workload and signals.</li>
                      <li><span className="font-medium text-status-blocked">Red</span>: Action needed — investigate blockers or reassign work.</li>
                    </ul>
                    <p className="mt-2">Hover a person card to see details: assigned items, blockers and signals.</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <p className="mb-4 text-sm text-muted-foreground">
            Colors indicate attention priority:{' '}
            <span className="font-medium text-status-on-track">Green</span> for
            stable, <span className="font-medium text-status-at-risk">Amber</span>{' '}
            for monitor, and{' '}
            <span className="font-medium text-status-blocked">Red</span> for
            action needed.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {teamMembers.map((member, index) => (
              <div key={member.id} style={{ animationDelay: `${index * 50}ms` }}>
                <TeamMemberCard
                  member={member}
                  onClick={() => onSelectMember(member.id)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground animate-fade-in">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-heat-low" />
            <span>Low priority</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-heat-medium" />
            <span>Medium priority</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-heat-high" />
            <span>High priority</span>
          </div>
        </div>
      </div>
    </div>
  );
}