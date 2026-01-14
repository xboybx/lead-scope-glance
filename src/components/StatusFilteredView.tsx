import { TeamMember, WorkStatus } from '@/data/mockData';
import { TeamMemberCard } from './TeamMemberCard';
import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';

interface StatusFilteredViewProps {
  status: WorkStatus;
  members: TeamMember[];
  onBack: () => void;
  onSelectMember: (id: string) => void;
}

const statusLabels: Record<WorkStatus, string> = {
  'on-track': 'On Track',
  'at-risk': 'At Risk',
  blocked: 'Blocked',
  completed: 'Completed',
};

export function StatusFilteredView({ status, members, onBack, onSelectMember }: StatusFilteredViewProps) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Overview
        </Button>
        <h1 className="text-2xl font-bold text-foreground">
          Team Members with '{statusLabels[status]}' Items
        </h1>
        <p className="mt-1 text-muted-foreground">
          {members.length > 0
            ? `Found ${members.length} team member(s).`
            : 'No team members found with this status.'}
        </p>
      </div>

      {members.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {members.map((member, index) => (
            <div key={member.id} style={{ animationDelay: `${index * 50}ms` }}>
              <TeamMemberCard
                member={member}
                onClick={() => onSelectMember(member.id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}