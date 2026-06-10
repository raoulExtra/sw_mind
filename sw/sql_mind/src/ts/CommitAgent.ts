import DatabaseLib from 'better-sqlite3';
import type { Database as DbInterface } from 'better-sqlite3';
import { WriteIntent } from './WriteIntent';
import { AsyncQueue } from './AsyncQueue';
import { Database as SQLiteDatabase, DatabaseLike } from './Database';
import { AuditLog } from './AuditLog';

export interface CommitResult {
  intentId: string;
  agentId: string;
  success: boolean;
  error?: string;
  timestamp: number;
}

export type LogCallback = (result: CommitResult) => void;

type DbWrapper = DatabaseLike | DbInterface | SQLiteDatabase;

const ALLOWED_STATEMENTS = ['SELECT', 'INSERT', 'UPDATE', 'DELETE', 'CREATE TABLE', 'CREATE INDEX'];

function validateSql(sql: string): boolean {
  const upperSql = sql.trim().toUpperCase();
  return ALLOWED_STATEMENTS.some(stmt => upperSql.startsWith(stmt));
}

export class CommitExecutor {
  private db: DbWrapper;
  private queue: AsyncQueue<WriteIntent>;
  private logCallback?: LogCallback;
  private auditLog?: AuditLog;
  private running = true;
  private drainResolvers: (() => void)[] = [];
  private processedCount = 0;
  private submittedCount = 0;

  constructor(dbOrPath: DbWrapper | string, auditLog?: AuditLog) {
    if (typeof dbOrPath === 'string') {
      this.db = new SQLiteDatabase(dbOrPath);
    } else {
      this.db = dbOrPath;
    }
    this.auditLog = auditLog;
    this.queue = new AsyncQueue<WriteIntent>();
    this.startLoop();
  }

  private startLoop(): void {
    (async () => {
      while (this.running) {
        const intent = await this.queue.pop();
        if (intent === undefined) {
          break;
        }
        await this.process(intent);
        this.processedCount++;
        if (this.processedCount === this.submittedCount) {
          this.drainResolvers.forEach(resolve => resolve());
          this.drainResolvers = [];
        }
      }
    })();
  }

  onLog(callback: LogCallback): void {
    this.logCallback = callback;
  }

  async process(intent: WriteIntent): Promise<CommitResult> {
    const result: CommitResult = {
      intentId: intent.id,
      agentId: intent.agentId,
      success: false,
      timestamp: Date.now(),
    };

    if (!validateSql(intent.sql)) {
      result.error = `SQL statement not allowed: ${intent.sql.split(' ')[0]}`;
      this.logCallback?.(result);
      return result;
    }

    try {
      (this.db as DatabaseLike).exec('BEGIN');
      const stmt = (this.db as DatabaseLike).prepare(intent.sql);
      stmt.run(intent.params ?? []);
      (this.db as DatabaseLike).exec('COMMIT');
      result.success = true;
    } catch (error) {
      (this.db as DatabaseLike).exec('ROLLBACK');
      result.error = error instanceof Error ? error.message : String(error);
    }

    this.auditLog?.store(intent);
    this.logCallback?.(result);
    return result;
  }

  submit(intent: WriteIntent): void {
    this.submittedCount++;
    this.queue.push(intent);
  }

  async drain(): Promise<void> {
    return new Promise(resolve => {
      if (this.processedCount === this.submittedCount) {
        resolve();
        return;
      }
      this.drainResolvers.push(resolve);
    });
  }

  close(): void {
    this.running = false;
    this.queue.close();
    this.drainResolvers.forEach(resolve => resolve());
    this.drainResolvers = [];
  }

  async closeAndWait(): Promise<void> {
    this.close();
    await this.drain();
  }
}