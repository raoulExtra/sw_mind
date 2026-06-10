import Database from 'better-sqlite3';
import type { Database as DbInterface } from 'better-sqlite3';
import { WriteIntent } from './WriteIntent';

export class AuditLog {
  private db: DbInterface;

  constructor(db: DbInterface) {
    this.db = db;
  }

  async init(): Promise<void> {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS audit_log (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        intent_id TEXT UNIQUE NOT NULL,
        sql TEXT NOT NULL,
        params TEXT,
        agent_id TEXT NOT NULL,
        timestamp INTEGER NOT NULL
      )
    `);
  }

  async store(intent: WriteIntent): Promise<void> {
    const stmt = this.db.prepare(
      'INSERT INTO audit_log (intent_id, sql, params, agent_id, timestamp) VALUES (?, ?, ?, ?, ?)'
    );
    stmt.run(
      intent.id,
      intent.sql,
      intent.params ? JSON.stringify(intent.params) : null,
      intent.agentId,
      intent.timestamp
    );
  }

  async findByExecutorId(agentId: string): Promise<any[]> {
    const stmt = this.db.prepare('SELECT * FROM audit_log WHERE agent_id = ? ORDER BY timestamp');
    return stmt.all(agentId);
  }

  async findAll(): Promise<any[]> {
    const stmt = this.db.prepare('SELECT * FROM audit_log ORDER BY timestamp');
    return stmt.all();
  }

  close(): void {
  }
}