/**
 * Gantt File Generator
 * Creates .gantt files in the JSON format used by online Gantt tools
 *
 * Change History
 * | Version | Date | Author | Reason |
 * |---------|------|--------|--------|
 * | V00.01.00 | 2026-06-07 | ai(kilo laguna) | Add version/change-history convention support to TS source |
 */

export const VERSION = 'V00.01.00';

export function getVersion(): string {
  return VERSION;
}

export interface GanttResource {
  resourceId: string;
  resourceName: string;
  unit?: number;
  tags?: string[];
}

export interface GanttTask {
  TaskID: number;
  TaskName: string;
  StartDate: string;
  EndDate: string;
  Duration: number;
  resources: GanttResource[];
  Progress: number;
  Predecessor?: string | null;
  DurationUnit?: string;
  info?: string | null;
  subtasks?: GanttTask[];
  color?: string;
}

export interface GanttColumn {
  name: string;
  width: string;
  show: boolean;
}

export interface GanttWorkTime {
  from: number;
  to: number;
}

export interface GanttAdvanced {
  columns: GanttColumn[];
  zoomLevel?: number;
  timezone?: string;
  timezoneOffset?: number;
  dependencyConflict?: string;
  dateFormat?: string;
  timeFormat?: string;
  firstDayOfWeek?: number;
  workWeek?: string[];
  workTime?: GanttWorkTime[];
  holidays?: string[];
}

export interface GanttFile {
  data: GanttTask[];
  resources: GanttResource[];
  projectStartDate: string | null;
  projectEndDate: string | null;
  advanced: GanttAdvanced;
}

export class GanttGenerator {
  private tasks: GanttTask[] = [];
  private resources: Map<string, GanttResource> = new Map();
  private nextTaskId = 1;

  private buildTask(task: Omit<GanttTask, 'TaskID'>, id: number): GanttTask {
    const taskResources = task.resources?.map(r => ({ 
      resourceId: r.resourceId, 
      resourceName: r.resourceName,
      unit: r.unit ?? 100
    })) ?? [];
    
    const result: any = {
      TaskID: id,
      TaskName: task.TaskName ?? '',
      StartDate: task.StartDate ?? '',
      EndDate: task.EndDate ?? '',
      Duration: task.Duration ?? 0,
      resources: taskResources,
      Progress: task.Progress ?? 0,
    };
    
    if (task.subtasks) {
      result.subtasks = task.subtasks.map((st, i) => {
        const subResources = st.resources?.map(r => ({ 
          resourceId: r.resourceId, 
          resourceName: r.resourceName,
          unit: r.unit ?? 100
        })) ?? [];
        return {
          TaskID: i + 2,
          TaskName: st.TaskName ?? '',
          StartDate: st.StartDate ?? '',
          EndDate: st.EndDate ?? '',
          Duration: st.Duration ?? 0,
          resources: subResources,
          Progress: st.Progress ?? 0,
          DurationUnit: st.DurationUnit ?? 'day',
          info: st.info ?? null,
        };
      });
    }
    
    result.Predecessor = task.Predecessor ?? null;
    result.DurationUnit = task.DurationUnit ?? 'day';
    result.info = task.info ?? null;
    
    if (task.color !== undefined) result.color = task.color;
    return result;
  }

  addTask(task: Omit<GanttTask, 'TaskID'>): this {
    this.tasks.push(this.buildTask(task, this.nextTaskId++));
    return this;
  }

  addResource(resource: GanttResource): this {
    this.resources.set(resource.resourceId, {
      resourceId: resource.resourceId,
      resourceName: resource.resourceName,
      tags: resource.tags,
    });
    return this;
  }

  addResources(resources: GanttResource[]): this {
    resources.forEach(r => this.addResource(r));
    return this;
  }

  setNextTaskId(id: number): this {
    this.nextTaskId = id;
    return this;
  }

  generate(pretty?: boolean): string {
    const file: GanttFile = {
      data: this.tasks,
      resources: Array.from(this.resources.values()),
      projectStartDate: null,
      projectEndDate: null,
      advanced: {
        columns: [
          { name: 'Task ID', width: '70', show: true },
          { name: 'Task Name', width: '350', show: true },
          { name: 'Start Date', width: '130', show: false },
          { name: 'End Date', width: '130', show: false },
          { name: 'Duration', width: '130', show: false },
          { name: 'Progress %', width: '100', show: true },
          { name: 'Color', width: '100', show: false },
        ],
        zoomLevel: 0,
        timezone: 'Europe/Berlin',
        timezoneOffset: -120,
        dependencyConflict: 'Add Offset to Dependency',
        dateFormat: 'yyyy-MM-dd',
        timeFormat: 'HH:mm',
        firstDayOfWeek: 0,
        workWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        workTime: [{ from: 8, to: 12 }, { from: 13, to: 17 }],
        holidays: [],
      },
    };
    return pretty ? JSON.stringify(file, null, 2) : JSON.stringify(file);
  }

  static createFilename(prefix: string = 'Gantt'): string {
    const date = new Date().toISOString().split('T')[0];
    return `${prefix} ${date}.gantt`;
  }
}

export function createGantt(options?: {
  tasks?: Omit<GanttTask, 'TaskID'>[];
  resources?: Omit<GanttResource, 'unit'>[];
  pretty?: boolean;
}): string {
  const generator = new GanttGenerator();
  if (options?.tasks) {
    options.tasks.forEach(t => generator.addTask(t));
  }
  if (options?.resources) {
    generator.addResources(options.resources);
  }
  return generator.generate(options?.pretty);
}