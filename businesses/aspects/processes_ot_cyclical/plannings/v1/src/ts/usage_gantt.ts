import { GanttGenerator } from './gantt-generator';

// Change History
// | Version | Date | Author | Reason |
// |---------|------|--------|--------|
// | V00.01.00 | 2026-06-07 | ai(kilo laguna) | Add version/change-history convention support to TS usage example |

const generator = new GanttGenerator();
generator
  .addResource({ resourceId: 'Team Member 1', resourceName: 'Team Member 1' })
  .addTask({
    TaskName: 'Example Task',
    StartDate: '2026-06-01T06:00:00.000Z',
    EndDate: '2026-06-05T15:00:00.000Z',
    Duration: 3,
    Progress: 80,
    Predecessor: null,
    DurationUnit: 'day',
    info: null,
    resources: [{ resourceId: 'Team Member 1', resourceName: 'Team Member 1' }],
    subtasks: [
      {
        TaskID: 2,
        TaskName: 'Subtask 1',
        StartDate: '2026-06-01T06:00:00.000Z',
        EndDate: '2026-06-03T15:00:00.000Z',
        Duration: 3,
        resources: [{ resourceId: 'Team Member 1', resourceName: 'Team Member 1' }],
        Progress: 80,
        Predecessor: null,
        DurationUnit: 'day',
        info: null,
      },
    ],
  });

console.log(generator.generate(false));