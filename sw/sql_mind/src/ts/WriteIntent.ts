import { ulid } from 'ulid';

export interface WriteIntent {
  id: string;
  sql: string;
  params?: any[];
  agentId: string;
  timestamp: number;
}

export function createWriteIntent(
  sql: string,
  params?: any[],
  options?: { agentId?: string }
): WriteIntent {
  return {
    id: ulid(),
    sql,
    params,
    agentId: options?.agentId ?? 'default-agent',
    timestamp: Date.now(),
  };
}

export namespace WriteIntent {
  export function insert(table: string, row: Record<string, unknown>): WriteIntent {
    const columns = Object.keys(row);
    const placeholders = columns.map(() => '?').join(', ');
    const values = columns.map(col => row[col]);
    return createWriteIntent(
      `INSERT INTO ${table} (${columns.join(', ')}) VALUES (${placeholders})`,
      values
    );
  }

  export function select(table: string, columns: string[] = ['*']): WriteIntent {
    return createWriteIntent(`SELECT ${columns.join(', ')} FROM ${table}`);
  }

  export function update(table: string, row: Record<string, unknown>, where: string): WriteIntent {
    const columns = Object.keys(row);
    const values = columns.map(col => row[col]);
    return createWriteIntent(
      `UPDATE ${table} SET ${columns.map(c => `${c} = ?`).join(', ')} WHERE ${where}`,
      values
    );
  }

  export function delete_(table: string, where: string): WriteIntent {
    return createWriteIntent(`DELETE FROM ${table} WHERE ${where}`);
  }
}