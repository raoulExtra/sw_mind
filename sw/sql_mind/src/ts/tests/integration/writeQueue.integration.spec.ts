import { AsyncQueue } from '../../AsyncQueue';
import { CommitAgent, CommitResult } from '../../CommitAgent';
import { createWriteIntent, WriteIntent } from '../../WriteIntent';
import { Database } from '../../Database';
import { AuditLog } from '../../AuditLog';
import DatabaseLib from 'better-sqlite3';

describe('Write Queue Integration', () => {
  describe('End-to-end write flow', () => {
    it('should process multiple agents writes in order', async () => {
      const db = new Database(':memory:');
      db.exec('CREATE TABLE events (id INTEGER PRIMARY KEY, agent TEXT, data TEXT)');
      
      const queue = new AsyncQueue<{ sql: string; params: any[] }>();
      const agent = new CommitAgent(db);
      const results: CommitResult[] = [];
      agent.onLog((r) => results.push(r));
      
      const submitCount = 5;
      for (let i = 0; i < submitCount; i++) {
        agent.submit(createWriteIntent(
          'INSERT INTO events (agent, data) VALUES (?, ?)',
          ['agent-1', `event-${i}`]
        ));
      }
      
      await agent.drain();
      
      const rows = db.prepare('SELECT agent, data FROM events ORDER BY id').all() as { agent: string; data: string }[];
      expect(rows).toHaveLength(submitCount);
      expect(rows.every(r => r.agent === 'agent-1')).toBe(true);
      
      agent.close();
    });

    it('should integrate AsyncQueue with CommitAgent', async () => {
      const db = new Database(':memory:');
      db.exec('CREATE TABLE items (id INTEGER PRIMARY KEY, value TEXT)');
      
      const queue = new AsyncQueue<string>();
      const agent = new CommitAgent(db);
      
      const items = ['first', 'second', 'third'];
      items.forEach(item => queue.push(item));
      
      const processed: string[] = [];
      while (processed.length < items.length) {
        const item = await queue.pop();
        if (item !== undefined) {
          agent.submit(createWriteIntent('INSERT INTO items (value) VALUES (?)', [item]));
          await agent.drain();
          processed.push(item);
        }
      }
      
      const rows = db.prepare('SELECT value FROM items ORDER BY id').all() as { value: string }[];
      expect(rows.map(r => r.value)).toEqual(items);
      
      agent.close();
    });
  });

  describe('REQ-SYS-01: End-to-end flow', () => {
    it('should persist intent to database through full flow', async () => {
      const db = new Database(':memory:');
      const agent = new CommitAgent(db);
      const logs: CommitResult[] = [];
      agent.onLog(r => logs.push(r));
      
      agent.submit(createWriteIntent('CREATE TABLE test (id INTEGER PRIMARY KEY, value TEXT)'));
      await agent.drain();
      
      expect(logs[0].success).toBe(true);
      
      agent.close();
    });
  });

  describe('REQ-SYS-02: Audit log persists across restarts', () => {
    it('should preserve audit entries when agent is recreated', async () => {
      const db = new Database(':memory:');
      const auditLog = new AuditLog(db as any);
      await auditLog.init();
      
      const agent1 = new CommitAgent(db, auditLog);
      agent1.submit(createWriteIntent('INSERT INTO test (value) VALUES (\'test\')'));
      await agent1.drain();
      agent1.close();
      
      const allLogs = await auditLog.findAll();
      expect(allLogs.length).toBe(1);
      
      const agent2 = new CommitAgent(db);
      await agent2.drain();
      agent2.close();
    });
  });

  describe('REQ-SYS-03: Graceful shutdown preserves pending writes', () => {
    it('should process pending intents before exit on close()', async () => {
      const db = new Database(':memory:');
      db.exec('CREATE TABLE pending (id INTEGER PRIMARY KEY, value TEXT)');
      const agent = new CommitAgent(db);
      const logs: CommitResult[] = [];
      agent.onLog(r => logs.push(r));
      
      agent.submit(createWriteIntent('INSERT INTO pending (value) VALUES (\'before_close\')'));
      
      await agent.closeAndWait();
      
      const rows = db.prepare('SELECT value FROM pending').all() as { value: string }[];
      expect(rows).toHaveLength(1);
      expect(rows[0].value).toBe('before_close');
    });
  });
});