Lead Scope — Quick Team Health at a Glance

What this is
---------------
Lead Scope is a lightweight dashboard designed to give people managers fast, high-signal visibility into how work is progressing across their team. It’s built to answer the question: “Where should I focus my attention right now?” — not to replace task trackers or become the single source of truth for every ticket.

Who this helps
---------------
- Primary user: a frontline manager or team lead who needs quick situational awareness across a handful of direct reports.
- Secondary users: program managers, engineering managers, or anyone who needs to triage team-level execution risk rapidly.

Top-level idea
---------------
The app summarizes three simple dimensions for each person and for the team:

- Status (On Track / At Risk / Blocked / Completed)
- Time horizon (when the work becomes urgent)
- Workload (light → overloaded)

If something is "At Risk" or "Blocked" the dashboard helps you see who to talk to and why, and whether that problem is immediate or can wait until the next planning sync.

Key terms (short, practical definitions)
---------------
- On Track — Work is progressing as expected; no immediate action required.
- At Risk — There’s a chance the work will miss its expected outcome or deadline; watch or proactively unblock.
- Blocked — Work is stopped by an external dependency or a condition that must be removed before progress continues. Blockers surface with how long they’ve existed.
- Completed — Work that’s finished and no longer requires attention.

- Time horizons:
	- immediate — due today or needs attention now
	- short-term — due this week
	- upcoming — due in the next weeks

- Workload levels: light, moderate, heavy, overloaded — a quick signal of capacity so you can balance assignments or re-allocate help.

Where these come from in the code
---------------
- The sample data and enums live in [src/data/mockData.ts](src/data/mockData.ts). Look for `WorkStatus`, `TimeHorizon`, and `WorkloadLevel` to see the exact labels and sample shapes.
- Team summary logic is collected in utilities in the same file and rendered in [src/components/HealthSummary.tsx](src/components/HealthSummary.tsx).
- The two main screens are: [src/components/TeamOverview.tsx](src/components/TeamOverview.tsx) (default) and [src/components/IndividualView.tsx](src/components/IndividualView.tsx).

Why this design — the problem we solve
---------------
Managers often don’t have time to open tickets or read long reports. They need:

- A single glance to know who needs a conversation now.
- A small set of signals (status + horizon + load) to prioritize outreach.

This app turns raw task lists into those signals so managers can decide: 1) who to message, 2) who to pair with, 3) who needs escalation.

Key assumptions and one conscious trade-off
---------------
- Assumptions:
	- This is a read-oriented summary for human decision-making, not a replacement for your ticketing system.
	- The model favors aggregated signals over full task-level detail.

- Trade-off (conscious): no inline editing, no automated push notifications. The product intentionally stays low-noise and read-only so that scanning remains fast and interruptions are minimized. If you need deep task management, use the underlying tracker.

One thing intentionally not built
---------------
- Real-time alerts and a full task editor are intentionally omitted. This keeps the interface lightweight, speeds up scanning, and preserves the dashboard as a place for human judgement rather than alert-driven triage.

Screens and why the default was chosen
---------------
- Team Overview (default): chosen because the core job is situational awareness across people — who’s at risk, where blockers live, and where capacity is tight. See [src/components/TeamOverview.tsx](src/components/TeamOverview.tsx).
- Individual View: focused view for a single contributor showing their workload, blocker history, and recent delivery trend. See [src/components/IndividualView.tsx](src/components/IndividualView.tsx).

How to run this project locally
---------------
Install dependencies and start the dev server (Node.js + npm/yarn/pnpm):

```bash
npm install
npm run dev
```

Files worth skimming
---------------
- Data & helpers: [src/data/mockData.ts](src/data/mockData.ts)
- Team overview screen: [src/components/TeamOverview.tsx](src/components/TeamOverview.tsx)
- Individual screen: [src/components/IndividualView.tsx](src/components/IndividualView.tsx)
- Small UI bits: [src/components/TimeHorizonCard.tsx](src/components/TimeHorizonCard.tsx), [src/components/TeamMemberCard.tsx](src/components/TeamMemberCard.tsx), [src/components/StatusBadge.tsx](src/components/StatusBadge.tsx)

Notes for you when answering the prompt questions
---------------
- Which screen was chosen and why
	- Team Overview: it’s the default because the product solves for fast, cross-person awareness.
- The primary user and the problem solved
	- Primary user: frontline manager. Problem: where to spend limited conversation time to keep delivery healthy.
- Key assumptions and one conscious trade-off
	- See "Key assumptions and one conscious trade-off" above.
- One thing intentionally not built, and why
	- Notifications & deep editing: omitted to keep the dashboard fast and low-noise.

If you want, I can:
- Add a short “How to present this” script you can copy into a meeting or an interview answer.
- Add a quick section with copy-ready short answers (one-liners) for each of the four questions.

Thanks — tell me if you want the one-liners or a short speaker script next.
