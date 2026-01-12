export type WorkStatus = 'on-track' | 'at-risk' | 'blocked' | 'completed';
export type WorkloadLevel = 'light' | 'moderate' | 'heavy' | 'overloaded';
export type DeliveryTrend = 'improving' | 'stable' | 'declining';
export type TimeHorizon = 'immediate' | 'short-term' | 'upcoming';

export interface WorkItem {
  id: string;
  status: WorkStatus;
  dueHorizon: TimeHorizon;
  blockerDays?: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  workload: WorkloadLevel;
  deliveryTrend: DeliveryTrend;
  items: WorkItem[];
  signals: string[];
}

export const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'Senior Engineer',
    avatar: 'SC',
    workload: 'moderate',
    deliveryTrend: 'stable',
    items: [
      { id: '1a', status: 'completed', dueHorizon: 'immediate' },
      { id: '1b', status: 'on-track', dueHorizon: 'immediate' },
      { id: '1c', status: 'on-track', dueHorizon: 'short-term' },
      { id: '1d', status: 'on-track', dueHorizon: 'upcoming' },
    ],
    signals: [
      'Completed 2 items ahead of schedule this week',
      'All current work progressing normally',
    ],
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    role: 'Engineer',
    avatar: 'MJ',
    workload: 'heavy',
    deliveryTrend: 'declining',
    items: [
      { id: '2a', status: 'blocked', dueHorizon: 'immediate', blockerDays: 3 },
      { id: '2b', status: 'at-risk', dueHorizon: 'immediate' },
      { id: '2c', status: 'on-track', dueHorizon: 'short-term' },
      { id: '2d', status: 'at-risk', dueHorizon: 'short-term' },
      { id: '2e', status: 'on-track', dueHorizon: 'upcoming' },
    ],
    signals: [
      'Blocked for 3 days waiting on API access',
      'Second item at risk due to dependency on blocked work',
      'Workload increased after scope change mid-week',
    ],
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    role: 'Senior Engineer',
    avatar: 'ER',
    workload: 'moderate',
    deliveryTrend: 'improving',
    items: [
      { id: '3a', status: 'completed', dueHorizon: 'immediate' },
      { id: '3b', status: 'completed', dueHorizon: 'immediate' },
      { id: '3c', status: 'on-track', dueHorizon: 'short-term' },
      { id: '3d', status: 'on-track', dueHorizon: 'upcoming' },
    ],
    signals: [
      'Strong momentum—cleared immediate queue',
      'On pace to complete short-term items early',
    ],
  },
  {
    id: '4',
    name: 'David Kim',
    role: 'Engineer',
    avatar: 'DK',
    workload: 'light',
    deliveryTrend: 'stable',
    items: [
      { id: '4a', status: 'on-track', dueHorizon: 'short-term' },
      { id: '4b', status: 'on-track', dueHorizon: 'upcoming' },
    ],
    signals: [
      'Lower workload than usual—capacity available',
      'All work progressing as expected',
    ],
  },
  {
    id: '5',
    name: 'Lisa Thompson',
    role: 'Senior Engineer',
    avatar: 'LT',
    workload: 'overloaded',
    deliveryTrend: 'declining',
    items: [
      { id: '5a', status: 'at-risk', dueHorizon: 'immediate' },
      { id: '5b', status: 'at-risk', dueHorizon: 'immediate' },
      { id: '5c', status: 'blocked', dueHorizon: 'short-term', blockerDays: 5 },
      { id: '5d', status: 'on-track', dueHorizon: 'short-term' },
      { id: '5e', status: 'on-track', dueHorizon: 'upcoming' },
      { id: '5f', status: 'on-track', dueHorizon: 'upcoming' },
    ],
    signals: [
      'Two immediate items at risk—may miss deadlines',
      'Prolonged blocker (5 days) on security review',
      'Overloaded—consider redistributing work',
    ],
  },
  {
    id: '6',
    name: 'James Wilson',
    role: 'Engineer',
    avatar: 'JW',
    workload: 'moderate',
    deliveryTrend: 'stable',
    items: [
      { id: '6a', status: 'on-track', dueHorizon: 'immediate' },
      { id: '6b', status: 'on-track', dueHorizon: 'short-term' },
      { id: '6c', status: 'on-track', dueHorizon: 'upcoming' },
    ],
    signals: [
      'Steady progress across all time horizons',
      'No issues requiring attention',
    ],
  },
  {
    id: '7',
    name: 'Anna Kowalski',
    role: 'Engineer',
    avatar: 'AK',
    workload: 'heavy',
    deliveryTrend: 'stable',
    items: [
      { id: '7a', status: 'completed', dueHorizon: 'immediate' },
      { id: '7b', status: 'on-track', dueHorizon: 'immediate' },
      { id: '7c', status: 'at-risk', dueHorizon: 'short-term' },
      { id: '7d', status: 'on-track', dueHorizon: 'upcoming' },
      { id: '7e', status: 'on-track', dueHorizon: 'upcoming' },
    ],
    signals: [
      'One short-term item at risk due to complexity',
      'Managing heavy workload effectively',
    ],
  },
];

export function getTeamSummary() {
  const allItems = teamMembers.flatMap(m => m.items);
  
  return {
    total: allItems.length,
    onTrack: allItems.filter(i => i.status === 'on-track').length,
    atRisk: allItems.filter(i => i.status === 'at-risk').length,
    blocked: allItems.filter(i => i.status === 'blocked').length,
    completed: allItems.filter(i => i.status === 'completed').length,
  };
}

export function getHorizonSummary(horizon: TimeHorizon) {
  const items = teamMembers.flatMap(m => m.items).filter(i => i.dueHorizon === horizon);
  
  return {
    total: items.length,
    onTrack: items.filter(i => i.status === 'on-track').length,
    atRisk: items.filter(i => i.status === 'at-risk').length,
    blocked: items.filter(i => i.status === 'blocked').length,
    completed: items.filter(i => i.status === 'completed').length,
  };
}

export function getMemberById(id: string): TeamMember | undefined {
  return teamMembers.find(m => m.id === id);
}
