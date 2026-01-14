import { useState } from 'react';
import { TeamOverview } from '@/components/TeamOverview';
import { IndividualView } from '@/components/IndividualView';
import { getMemberById, teamMembers, WorkStatus } from '@/data/mockData';
import { StatusFilteredView } from '@/components/StatusFilteredView';

type ViewState =
  | { type: 'OVERVIEW' }
  | { type: 'INDIVIDUAL'; memberId: string }
  | { type: 'STATUS_FILTER'; status: WorkStatus };

const Index = () => {
  const [viewState, setViewState] = useState<ViewState>({ type: 'OVERVIEW' });

  const handleSelectMember = (memberId: string) => {
    setViewState({ type: 'INDIVIDUAL', memberId });
  };

  const handleSelectStatus = (status: WorkStatus) => {
    setViewState({ type: 'STATUS_FILTER', status });
  };

  const handleBackToOverview = () => {
    setViewState({ type: 'OVERVIEW' });
  };

  if (viewState.type === 'INDIVIDUAL') {
    const selectedMember = getMemberById(viewState.memberId);
    if (selectedMember) {
      return (
        <IndividualView
          member={selectedMember}
          onBack={handleBackToOverview}
        />
      );
    }
  }

  if (viewState.type === 'STATUS_FILTER') {
    const membersWithStatus = teamMembers.filter(member =>
      member.workItems.some(item => item.status === viewState.status)
    );
    return (
      <StatusFilteredView
        status={viewState.status}
        members={membersWithStatus}
        onBack={handleBackToOverview}
        onSelectMember={handleSelectMember}
      />
    );
  }

  return <TeamOverview onSelectMember={handleSelectMember} onSelectStatus={handleSelectStatus} />;
};

export default Index;