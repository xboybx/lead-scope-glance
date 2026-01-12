import { useState } from 'react';
import { TeamOverview } from '@/components/TeamOverview';
import { IndividualView } from '@/components/IndividualView';
import { getMemberById } from '@/data/mockData';

const Index = () => {
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);

  const selectedMember = selectedMemberId ? getMemberById(selectedMemberId) : null;

  if (selectedMember) {
    return (
      <IndividualView
        member={selectedMember}
        onBack={() => setSelectedMemberId(null)}
      />
    );
  }

  return <TeamOverview onSelectMember={setSelectedMemberId} />;
};

export default Index;
