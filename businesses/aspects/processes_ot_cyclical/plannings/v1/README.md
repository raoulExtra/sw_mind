# Gantt Generator

TypeScript module for creating `.gantt` files in JSON format.

## Usage

```typescript
import { GanttGenerator, createGantt } from './gantt-generator';

// Class-based approach
const generator = new GanttGenerator();
generator
  .addResource({ resourceId: 'tm1', resourceName: 'Team Member 1' })
  .addTask({
    TaskName: 'Example Task',
    StartDate: '2026-06-01T06:00:00.000Z',
    EndDate: '2026-06-05T15:00:00.000Z',
    Duration: 5,
    resources: [{ resourceId: 'tm1', resourceName: 'Team Member 1', unit: 100 }],
    Progress: 50,
  });

const json = generator.generate();

// Quick function
const json2 = createGantt({
  tasks: [{ TaskName: 'Task', StartDate: '2026-06-01T00:00:00.000Z', EndDate: '2026-06-05T00:00:00.000Z', Duration: 5, resources: [], Progress: 0 }],
  resources: [{ resourceId: 'r1', resourceName: 'Person' }],
});
```

## Output Format

Generates JSON compatible with online Gantt tools:
- `data`: Array of tasks with subtasks support
- `resources`: Team members/resources assigned to tasks
- `advanced.columns`: Column configuration for Gantt view