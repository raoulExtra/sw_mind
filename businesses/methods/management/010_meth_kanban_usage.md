```yaml
id: kanban_usage_guide
type: documentation_for_meth
created: 2026-06-07
updated: 2026-06-07
data:
  title: Kanban Usage Guide
  description: Guidelines for using Kanban within the business context
  purpose: Visualize workflow, limit work in progress, and optimize delivery
```

# Kanban Usage Guide

## Overview

Kanban is a lean workflow management method for coordinating work and delivery. It visualizes work as cards on a board, limits work-in-progress (WIP), and helps teams focus on finishing tasks before starting new ones.

## Core Principles

1. **Visualize Work** - Make work visible through a Kanban board
2. **Limit Work in Progress** - Set WIP limits to prevent bottlenecks
3. **Manage Flow** - Optimize the flow of work through the system
4. **Make Process Policies Explicit** - Define clear rules for each stage
5. **Improve Collaboratively** - Continuously enhance the process

## Board Structure

### Columns

| Column | Purpose | Entry Criteria | Exit Criteria |
|--------|---------|----------------|---------------|
| Backlog | Ideas/features waiting prioritization | - | Product Manager approval |
| Ready | Work ready to be picked up | Well-defined requirements | Acceptance criteria documented |
| In Progress | Active work | Assigned team member | WIP limit respected |
| Review | Quality check and validation | Code complete, tests passing | Peer review done |
| Done | Completed work | All acceptance criteria met | Deployed to production |

### WIP Limits

- Each column has a maximum number of items allowed
- Team must finish before pulling new work
- Prevents multitasking and context switching

## Usage in Software Development

### For Developers

- Pull tasks from "Ready" column
- Move card through stages as work progresses
- Update card with status notes and blockers
- Collaborate with team on blockers immediately

### For Product Managers

- Prioritize backlog items
- Ensure "Ready" items have clear acceptance criteria
- Refine items that stall in "Ready"

### For Project Managers

- Monitor flow metrics (cycle time, throughput)
- Identify bottlenecks and blockers
- Facilitate cross-team coordination

## Metrics to Track

- **Cycle Time** - Time from "Ready" to "Done"
- **Throughput** - Number of items completed per period
- **WIP Age** - How long items stay in each column
- **Blocked Items** - Count and duration of blocked work

## Best Practices

- Keep cards small and focused
- Limit work to current sprint/iteration
- Hold daily standups at the board
- Address blockers within 24 hours
- Review and adjust WIP limits weekly