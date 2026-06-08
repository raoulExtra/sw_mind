import { describe, it, expect } from 'vitest';
import { GanttGenerator, GanttTask } from '../gantt-generator';

// Change History
// | Version | Date | Author | Reason |
// |---------|------|--------|--------|
// | V00.01.00 | 2026-06-07 | ai(kilo laguna) | Add version/change-history convention support to TS tests |

describe('Task Entity Requirements (ATTR-TSK-001 to ATTR-TSK-012)', () => {
  describe('FR-TSK-PRE-01: Support task creation with TaskID and TaskName', () => {
    it('ATTR-TSK-001: should assign unique TaskID', () => {
      const generator = new GanttGenerator();
      generator.addTask({ TaskName: 'Task 1' });
      generator.addTask({ TaskName: 'Task 2' });
      const result = JSON.parse(generator.generate());
      expect(result.data[0].TaskID).toBe(1);
      expect(result.data[1].TaskID).toBe(2);
    });

    it('ATTR-TSK-002: should require TaskName', () => {
      const generator = new GanttGenerator();
      generator.addTask({ TaskName: 'Test Task' });
      const result = JSON.parse(generator.generate());
      expect(result.data[0].TaskName).toBe('Test Task');
    });
  });

  describe('FR-TSK-PRE-02: Support task scheduling', () => {
    it('ATTR-TSK-003/004/005: should support dates and duration', () => {
      const generator = new GanttGenerator();
      generator.addTask({
        TaskName: 'Task',
        StartDate: '2026-06-01T00:00:00.000Z',
        EndDate: '2026-06-05T00:00:00.000Z',
        Duration: 5,
      });
      const result = JSON.parse(generator.generate());
      expect(result.data[0].StartDate).toBe('2026-06-01T00:00:00.000Z');
      expect(result.data[0].EndDate).toBe('2026-06-05T00:00:00.000Z');
      expect(result.data[0].Duration).toBe(5);
    });
  });

  describe('FR-TSK-PRE-03: Support task dependencies', () => {
    it('ATTR-TSK-006: should support FS dependency format', () => {
      const generator = new GanttGenerator();
      generator.addTask({
        TaskName: 'Task 1',
        StartDate: '2026-06-01T00:00:00.000Z',
        EndDate: '2026-06-05T00:00:00.000Z',
        Duration: 5,
        Predecessor: '1FS',
      });
      const result = JSON.parse(generator.generate());
      expect(result.data[0].Predecessor).toBe('1FS');
    });
  });

  describe('FR-TSK-PRE-04: Support resource assignment', () => {
    it('ATTR-TSK-007: should support resources array', () => {
      const generator = new GanttGenerator();
      generator.addResource({ resourceId: 'r1', resourceName: 'Person' });
      generator.addTask({
        TaskName: 'Task',
        StartDate: '2026-06-01T00:00:00.000Z',
        EndDate: '2026-06-05T00:00:00.000Z',
        Duration: 5,
        resources: [{ resourceId: 'r1', resourceName: 'Person', unit: 100 }],
      });
      const result = JSON.parse(generator.generate());
      expect(result.data[0].resources).toHaveLength(1);
      expect(result.data[0].resources[0].unit).toBe(100);
    });
  });

  describe('FR-TSK-PRE-05: Support task progress tracking', () => {
    it('ATTR-TSK-008: should support Progress 0-100', () => {
      const generator = new GanttGenerator();
      generator.addTask({
        TaskName: 'Task',
        StartDate: '2026-06-01T00:00:00.000Z',
        EndDate: '2026-06-05T00:00:00.000Z',
        Duration: 5,
        Progress: 50,
      });
      const result = JSON.parse(generator.generate());
      expect(result.data[0].Progress).toBe(50);
    });
  });

  describe('FR-TSK-PRE-06: Support task nesting', () => {
    it('ATTR-TSK-012: should support subtasks', () => {
      const generator = new GanttGenerator();
      generator.addTask({
        TaskName: 'Parent',
        StartDate: '2026-06-01T00:00:00.000Z',
        EndDate: '2026-06-10T00:00:00.000Z',
        Duration: 10,
        subtasks: [
          {
            TaskName: 'Child',
            StartDate: '2026-06-01T00:00:00.000Z',
            EndDate: '2026-06-05T00:00:00.000Z',
            Duration: 5,
          },
        ],
      });
      const result = JSON.parse(generator.generate());
      expect(result.data[0].subtasks).toBeDefined();
      expect(result.data[0].subtasks).toHaveLength(1);
    });
  });

  describe('FR-TSK-PRE-07: Support milestone tasks', () => {
    it('ATTR-TSK-005: should support Duration 0 for milestones', () => {
      const generator = new GanttGenerator();
      generator.addTask({
        TaskName: 'Milestone',
        StartDate: '2026-06-05T00:00:00.000Z',
        EndDate: '2026-06-05T00:00:00.000Z',
        Duration: 0,
      });
      const result = JSON.parse(generator.generate());
      expect(result.data[0].Duration).toBe(0);
    });
  });

  describe('FR-TSK-PRE-08: Support task coloring', () => {
    it('ATTR-TSK-009: should support color attribute', () => {
      const generator = new GanttGenerator();
      generator.addTask({
        TaskName: 'Task',
        StartDate: '2026-06-01T00:00:00.000Z',
        EndDate: '2026-06-05T00:00:00.000Z',
        Duration: 5,
        color: '121',
      });
      const result = JSON.parse(generator.generate());
      expect(result.data[0].color).toBe('121');
    });
  });
});