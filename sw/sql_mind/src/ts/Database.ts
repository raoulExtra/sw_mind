import DatabaseLib from 'better-sqlite3';
import type { Statement as StatementType } from 'better-sqlite3';

export interface DatabaseLike {
  exec(sql: string): void;
  prepare(sql: string): StatementType;
}

export class Database {
  private db: any;
  private dbPath: string;
  private isClosed = false;

  constructor(path?: string) {
    this.dbPath = path ?? 'sw/sql_mind/res/env.db';
    this.db = new DatabaseLib(this.dbPath);
  }

  getPath(): string {
    return this.dbPath;
  }

  isOpen(): boolean {
    return !this.isClosed;
  }

  exec(sql: string): void {
    this.db.exec(sql);
  }

  prepare(sql: string): StatementType {
    return this.db.prepare(sql);
  }

  close(): void {
    if (!this.isClosed) {
      this.db.close();
      this.isClosed = true;
    }
  }
}