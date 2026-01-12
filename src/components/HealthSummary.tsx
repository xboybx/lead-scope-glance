import { getTeamSummary } from '@/data/mockData';
import { CheckCircle2, AlertTriangle, XCircle, CircleDot } from 'lucide-react';

export function HealthSummary() {
  const summary = getTeamSummary();
  const healthScore = Math.round(
    ((summary.onTrack + summary.completed) / summary.total) * 100
  );

  return (
    <div className="rounded-xl bg-card p-6 shadow-md animate-fade-in">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Team Health</h2>
        <div className="flex items-center gap-2">
          <span className="text-3xl font-bold text-foreground">{healthScore}%</span>
          <span className="text-sm text-muted-foreground">healthy</span>
        </div>
      </div>

      <div className="mb-4 h-3 overflow-hidden rounded-full bg-muted">
        <div className="flex h-full">
          <div
            className="bg-status-completed transition-all duration-500"
            style={{ width: `${(summary.completed / summary.total) * 100}%` }}
          />
          <div
            className="bg-status-on-track transition-all duration-500"
            style={{ width: `${(summary.onTrack / summary.total) * 100}%` }}
          />
          <div
            className="bg-status-at-risk transition-all duration-500"
            style={{ width: `${(summary.atRisk / summary.total) * 100}%` }}
          />
          <div
            className="bg-status-blocked transition-all duration-500"
            style={{ width: `${(summary.blocked / summary.total) * 100}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-status-completed" />
          <div>
            <p className="text-lg font-semibold text-foreground">{summary.completed}</p>
            <p className="text-xs text-muted-foreground">Completed</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <CircleDot className="h-4 w-4 text-status-on-track" />
          <div>
            <p className="text-lg font-semibold text-foreground">{summary.onTrack}</p>
            <p className="text-xs text-muted-foreground">On Track</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-status-at-risk" />
          <div>
            <p className="text-lg font-semibold text-foreground">{summary.atRisk}</p>
            <p className="text-xs text-muted-foreground">At Risk</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <XCircle className="h-4 w-4 text-status-blocked" />
          <div>
            <p className="text-lg font-semibold text-foreground">{summary.blocked}</p>
            <p className="text-xs text-muted-foreground">Blocked</p>
          </div>
        </div>
      </div>
    </div>
  );
}
