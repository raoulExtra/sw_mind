import { describe, it, expect } from 'vitest';
import { GanttGenerator, GanttResource } from '../gantt-generator';

// Change History
// | Version | Date | Author | Reason |
// |---------|------|--------|--------|
// | V00.01.00 | 2026-06-07 | ai(kilo laguna) | Add version/change-history convention support to TS tests |

describe('Resource Entity Requirements (ATTR-RSC-001 to ATTR-RSC-004)', () => {
  describe('FR-CLI-PRE-01: Support resource tags', () => {
    it('ATTR-RSC-001: should have unique resourceId', () => {
      const generator = new GanttGenerator();
      generator.addResource({ resourceId: 'tm1', resourceName: 'Team Member 1' });
      generator.addResource({ resourceId: 'tm2', resourceName: 'Team Member 2' });
      const result = JSON.parse(generator.generate());
      const ids = result.resources.map((r: GanttResource) => r.resourceId);
      expect(new Set(ids).size).toBe(ids.length);
    });

    it('ATTR-RSC-002: should have resourceName', () => {
      const generator = new GanttGenerator();
      generator.addResource({ resourceId: 'tm1', resourceName: 'Team Member 1' });
      const result = JSON.parse(generator.generate());
      expect(result.resources[0].resourceName).toBe('Team Member 1');
    });

    it('ATTR-RSC-003: should support unit in task resources (1-100)', () => {
      const generator = new GanttGenerator();
      generator.addResource({ resourceId: 'tm1', resourceName: 'Team Member 1' });
      generator.addTask({
        TaskName: 'Task',
        StartDate: '2026-06-01T00:00:00.000Z',
        EndDate: '2026-06-05T00:00:00.000Z',
        Duration: 5,
        resources: [{ resourceId: 'tm1', resourceName: 'Team Member 1', unit: 75 }],
      });
      const result = JSON.parse(generator.generate());
      expect(result.data[0].resources[0].unit).toBe(75);
    });

    it('ATTR-RSC-004: should support tags (equipment, vehicle, facility, housing)', () => {
      const generator = new GanttGenerator();
      generator.addResource({ resourceId: 'eq1', resourceName: 'Excavator', tags: ['equipment'] });
      const result = JSON.parse(generator.generate());
      expect(result.resources[0].tags).toEqual(['equipment']);
    });
  });
});