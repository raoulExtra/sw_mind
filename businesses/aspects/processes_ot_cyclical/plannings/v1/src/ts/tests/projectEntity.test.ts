import { describe, it, expect } from 'vitest';
import { GanttGenerator, GanttFile } from '../gantt-generator';

// Change History
// | Version | Date | Author | Reason |
// |---------|------|--------|--------|
// | V00.01.00 | 2026-06-07 | ai(kilo laguna) | Add version/change-history convention support to TS tests |

describe('Project Entity Requirements (ATTR-PRO-001 to ATTR-PRO-015)', () => {
  describe('FR-PRO-PRE-01: Support empty projects (data: [])', () => {
    it('ATTR-PRO-001: should support empty data array', () => {
      const generator = new GanttGenerator();
      const result = JSON.parse(generator.generate()) as GanttFile;
      expect(result.data).toEqual([]);
    });
  });

  describe('FR-PRO-PRE-02: Support project date range', () => {
    it('ATTR-PRO-003/004: should support projectStartDate and projectEndDate', () => {
      const generator = new GanttGenerator();
      const result = JSON.parse(generator.generate()) as GanttFile;
      expect(result.projectStartDate).toBeNull();
      expect(result.projectEndDate).toBeNull();
    });
  });

  describe('FR-PRO-PRE-03: Support timezone configuration', () => {
    it('ATTR-PRO-007: should have timezone in advanced settings', () => {
      const generator = new GanttGenerator();
      const result = JSON.parse(generator.generate()) as GanttFile;
      expect(result.advanced.timezone).toBeDefined();
    });
  });

  describe('FR-PRO-PRE-04: Support work week and work time settings', () => {
    it('ATTR-PRO-013: should have workWeek in advanced settings', () => {
      const generator = new GanttGenerator();
      const result = JSON.parse(generator.generate()) as GanttFile;
      expect(result.advanced.workWeek).toBeDefined();
      expect(result.advanced.workWeek).toContain('Monday');
    });

    it('ATTR-PRO-014: should have workTime in advanced settings', () => {
      const generator = new GanttGenerator();
      const result = JSON.parse(generator.generate()) as GanttFile;
      expect(result.advanced.workTime).toBeDefined();
      expect(result.advanced.workTime[0]).toEqual({ from: 8, to: 12 });
    });
  });

  describe('FR-PRO-PRE-05: Support dependency conflict resolution', () => {
    it('ATTR-PRO-009: should have dependencyConflict in advanced settings', () => {
      const generator = new GanttGenerator();
      const result = JSON.parse(generator.generate()) as GanttFile;
      expect(result.advanced.dependencyConflict).toBeDefined();
    });
  });
});