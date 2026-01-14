import { getTeamSummary, WorkStatus, teamMembers } from '@/data/mockData';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  BarChart,
  XAxis,
  YAxis,
  Bar,
} from 'recharts';
import { CheckCircle2, AlertTriangle, XCircle, CircleDot } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const COLORS = {
  completed: 'hsl(var(--chart-4))',
  'on-track': 'hsl(var(--chart-5))',
  'at-risk': 'hsl(var(--chart-2))',
  blocked: 'hsl(var(--chart-1))',
};

interface HealthSummaryProps {
  onSelectStatus: (status: WorkStatus) => void;
}

const CustomBarTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const entry = payload[0];
    const statusName = entry?.payload?.name ?? entry.name;
    const statusKey = String(statusName).toLowerCase().replace(' ', '-') as WorkStatus;
    const peopleCount = teamMembers.filter(m => m.workItems.some(i => i.status === statusKey)).length;
    const worksValue = entry?.value ?? entry?.payload?.value ?? 0;
    return (
      <div className="rounded-lg border bg-popover p-2 text-popover-foreground shadow-md">
        <p className="label">{`${statusName}`}</p>
        <p className="intro">{`No. of works: ${worksValue}`}</p>
        <p className="intro">{`People Assigned: ${peopleCount}`}</p>
      </div>
    );
  }

  return null;
};

export function HealthSummary({ onSelectStatus }: HealthSummaryProps) {
  const summary = getTeamSummary();
  const healthScore = Math.round(
    ((summary.onTrack + summary.completed) / summary.total) * 100
  );

  const chartData = [
    { name: 'Blocked', value: summary.blocked },
    { name: 'At Risk', value: summary.atRisk },
    { name: 'On Track', value: summary.onTrack },
    { name: 'Completed', value: summary.completed },
  ];

  const statusDescriptions = {
    Completed: `Shows how many work items are completed in total.`,
    'On Track': `Shows how many work items are on track.`,
    'At Risk': `Shows how many work items are at risk.`,
    Blocked: `Shows how many work items are blocked.`,
  };

  const handleStatusClick = (statusName: string) => {
    const status = statusName.toLowerCase().replace(' ', '-') as WorkStatus;
    onSelectStatus(status);
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="rounded-xl bg-card p-6 shadow-md animate-fade-in">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">
            Team Health
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-foreground">
              {healthScore}%
            </span>
            <span className="text-sm text-muted-foreground">healthy</span>
          </div>
        </div>

        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <RechartsTooltip
                contentStyle={{
                  background: 'hsl(var(--popover))',
                  borderColor: 'hsl(var(--border))',
                }}
              />
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={60}
                fill="#8884d8"
                dataKey="value"
                strokeWidth={2}
                stroke="hsl(var(--card))"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      COLORS[
                        entry.name
                          .toLowerCase()
                          .replace(' ', '-') as keyof typeof COLORS
                      ]
                    }
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {chartData.map(item => (
            <TooltipProvider key={item.name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className="flex cursor-pointer items-center gap-2 rounded-lg p-2 transition-colors hover:bg-accent"
                    onClick={() => handleStatusClick(item.name)}
                  >
                    {item.name === 'Completed' && (
                      <CheckCircle2 className="h-4 w-4 text-status-completed" />
                    )}
                    {item.name === 'On Track' && (
                      <CircleDot className="h-4 w-4 text-status-on-track" />
                    )}
                    {item.name === 'At Risk' && (
                      <AlertTriangle className="h-4 w-4 text-status-at-risk" />
                    )}
                    {item.name === 'Blocked' && (
                      <XCircle className="h-4 w-4 text-status-blocked" />
                    )}
                    <div>
                      <p className="text-lg font-semibold text-foreground">
                        {item.value}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.name}
                      </p>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{statusDescriptions[item.name as keyof typeof statusDescriptions]}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </div>
      <div className="rounded-xl bg-card p-6 shadow-md animate-fade-in">
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          Work Status Distribution
        </h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical" margin={{ right: 20 }}>
              <XAxis type="number" hide />
              <YAxis
                type="category"
                dataKey="name"
                width={90}
                stroke="hsl(var(--muted-foreground))"
                axisLine={false}
                tickLine={false}
              />
              <RechartsTooltip
                cursor={{ fill: 'hsl(var(--accent))' }}
                content={<CustomBarTooltip />}
              />
              <Bar dataKey="value" barSize={20}>
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      COLORS[
                        entry.name
                          .toLowerCase()
                          .replace(' ', '-') as keyof typeof COLORS
                      ]
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}