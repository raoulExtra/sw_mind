import { CommitExecutor, CommitResult } from '../../CommitExecutor';
import { WriteIntent, createWriteIntent } from '../../WriteIntent';
import { Database } from '../../Database';
import { AuditLog } from '../../AuditLog';
import DatabaseLib from 'better-sqlite3';

describe('CommitExecutor', () => {
  describe('FR-WRITEQ-08: Commit agent must process one intent at a time', () => {
    it('should process intents sequentially', async () => {
      const db = new DatabaseLib(':memory:');
      db.exec('CREATE TABLE test (id INTEGER PRIMARY KEY, value TEXT)');
      
      const agent = new CommitExecutor(db);
      const logs: CommitResult[] = [];
      agent.onLog((result: CommitResult) => logs.push(result));
      
      agent.submit(createWriteIntent('INSERT INTO test (value) VALUES (1)'));
      agent.submit(createWriteIntent('INSERT INTO test (value) VALUES (2)'));
      agent.submit(createWriteIntent('INSERT INTO test (value) VALUES (3)'));
      
      await agent.drain();
      
      const rows = db.prepare('SELECT value FROM test ORDER BY id').all() as { value: string }[];
      expect(rows.map(r => r.value)).toEqual(['1', '2', '3']);
      
      agent.close();
      db.close();
    });
  });

describe('FR-WRITEQ-09: Each commit must be ACID-compliant', () => {
    it('should rollback on error', async () => {
      const db = new Database(':memory:');
      db.exec('CREATE TABLE test (id INTEGER PRIMARY KEY, value TEXT)');
      db.exec('CREATE TABLE other (id INTEGER PRIMARY KEY, value TEXT)');
      
      const agent = new CommitExecutor(db);
      const logs: CommitResult[] = [];
      agent.onLog((result: CommitResult) => logs.push(result));
      
      agent.submit(createWriteIntent('INSERT INTO test (value) VALUES (1)'));
      agent.submit(createWriteIntent('INSERT INTO nonexistent (value) VALUES (2)'));
      agent.submit(createWriteIntent('INSERT INTO other (value) VALUES (3)'));
      
      await agent.drain();
      
      expect(logs[0].success).toBe(true);
      expect(logs[1].success).toBe(false);
      expect(logs[2].success).toBe(true);
      
      const otherRows = db.prepare('SELECT * FROM other').all();
      expect(otherRows).toHaveLength(1);
      
      agent.close();
    });

    it('should handle non-Error throws in rollback', async () => {
      const db = new Database(':memory:');
      db.exec('CREATE TABLE test (id INTEGER PRIMARY KEY)');
      
      const agent = new CommitExecutor(db);
      const logs: CommitResult[] = [];
      agent.onLog((result: CommitResult) => logs.push(result));
      
      agent.submit(createWriteIntent('INVALID SQL'));
      await agent.drain();
      
      expect(logs[0].success).toBe(false);
      expect(logs[0].error).toBeDefined();
      expect(logs[0].error).toContain('not allowed');
      
      agent.close();
    });

    it('should handle SQL validation error returning early', async () => {
      const db = new Database(':memory:');
      const agent = new CommitExecutor(db);
      const logs: CommitResult[] = [];
      agent.onLog((result: CommitResult) => logs.push(result));
      
      agent.submit(createWriteIntent('DROP TABLE test'));
      await agent.drain();
      
      expect(logs[0].success).toBe(false);
      expect(logs[0].error).toContain('not allowed');
      
      agent.close();
    });

    it('should handle non-Error throw in try-catch', async () => {
      const db = new Database(':memory:');
      db.exec('CREATE TABLE test (id INTEGER PRIMARY KEY)');
      
      const agent = new CommitExecutor(db);
      const logs: CommitResult[] = [];
      agent.onLog((result: CommitResult) => logs.push(result));
      
      let throwString = true;
      const originalPrepare = db.prepare.bind(db);
      db.prepare = () => {
        if (throwString) {
          throw 'string error';
        }
        return originalPrepare('SELECT 1');
      };
      
      agent.submit(createWriteIntent('SELECT 1'));
      await agent.drain();
      
      expect(logs[0].success).toBe(false);
      expect(logs[0].error).toBe('string error');
      
      agent.close();
    });
  });

  describe('FR-WRITEQ-10: Commit agent must log all operations', () => {
    it('should log success and failure', async () => {
      const db = new DatabaseLib(':memory:');
      db.exec('CREATE TABLE test (id INTEGER PRIMARY KEY, value TEXT)');
      
      const agent = new CommitExecutor(db);
      const logs: CommitResult[] = [];
      
      agent.onLog((result: CommitResult) => logs.push(result));
      
      agent.submit(createWriteIntent('INSERT INTO test (value) VALUES (1)'));
      agent.submit(createWriteIntent('INSERT INTO nonexistent (value) VALUES (2)'));
      
      await agent.drain();
      
      expect(logs).toHaveLength(2);
      expect(logs[0].success).toBe(true);
      expect(logs[1].success).toBe(false);
      
      agent.close();
      db.close();
    });
  });

  describe('REQ-DB-06: CommitExecutor accepts database path or connection', () => {
    it('should accept Database instance', async () => {
      const db = new Database(':memory:');
      db.exec('CREATE TABLE test (id INTEGER PRIMARY KEY, value TEXT)');
      
      const agent = new CommitExecutor(db);
      const logs: CommitResult[] = [];
      agent.onLog((result: CommitResult) => logs.push(result));
      
      agent.submit(createWriteIntent('INSERT INTO test (value) VALUES (\'test\')'));
      await agent.drain();
      
      expect(logs[0].success).toBe(true);
      expect(logs[0].error).toBeUndefined();
      
      agent.close();
    });
    
    it('should accept database path string', async () => {
      const agent = new CommitExecutor(':memory:');
      const logs: CommitResult[] = [];
      agent.onLog((result: CommitResult) => logs.push(result));
      
      agent.submit(createWriteIntent('CREATE TABLE test (id INTEGER PRIMARY KEY)'));
      await agent.drain();
      
      expect(logs[0].success).toBe(true);
      
      agent.close();
    });
  });

  describe('REQ-SHUTDOWN-01: CommitExecutor.close() resolves drain()', () => {
    it('should resolve drain() when close() is called while waiting', async () => {
      const db = new Database(':memory:');
      const agent = new CommitExecutor(db);
      
      const drainPromise = agent.drain();
      
      agent.close();
      
      await expect(drainPromise).resolves.toBeUndefined();
    });
  });

  describe('REQ-SQL-01: Intent SQL must be validated', () => {
    it('should reject DROP TABLE statement', async () => {
      const db = new Database(':memory:');
      db.exec('CREATE TABLE test (id INTEGER PRIMARY KEY)');
      
      const agent = new CommitExecutor(db);
      const logs: CommitResult[] = [];
      agent.onLog((result: CommitResult) => logs.push(result));
      
      agent.submit(createWriteIntent('DROP TABLE test'));
      await agent.drain();
      
      expect(logs[0].success).toBe(false);
      expect(logs[0].error).toContain('not allowed');
      
      agent.close();
    });
  });

  describe('REQ-SQL-02: Safe SQL builder API', () => {
    it('should create INSERT intent with builder', async () => {
      const db = new Database(':memory:');
      db.exec('CREATE TABLE test (value TEXT)');
      const agent = new CommitExecutor(db);
      const logs: CommitResult[] = [];
      agent.onLog((result: CommitResult) => logs.push(result));
      
      const intent = WriteIntent.insert('test', { value: 'hello' });
      agent.submit(intent);
      await agent.drain();
      
      expect(logs[0].success).toBe(true);
      expect(logs[0].error).toBeUndefined();
      
      agent.close();
    });

    it('should create UPDATE intent with builder', async () => {
      const db = new Database(':memory:');
      db.exec('CREATE TABLE test (id INTEGER PRIMARY KEY, value TEXT)');
      const agent = new CommitExecutor(db);
      
      agent.submit(WriteIntent.update('test', { value: 'updated' }, 'id = 1'));
      await agent.drain();
      
      agent.close();
    });

    it('should create DELETE intent with builder', async () => {
      const db = new Database(':memory:');
      db.exec('CREATE TABLE test (id INTEGER PRIMARY KEY)');
      const agent = new CommitExecutor(db);
      
      agent.submit(WriteIntent.delete_('test', 'id = 1'));
      await agent.drain();
      
      agent.close();
    });

    it('should create SELECT intent with builder', async () => {
      const intent1 = WriteIntent.select('test', ['id', 'name']);
      expect(intent1.sql).toBe('SELECT id, name FROM test');
      
      const intent2 = WriteIntent.select('test');
      expect(intent2.sql).toBe('SELECT * FROM test');
    });
  });

  describe('REQ-AUDIT-01: CommitExecutor accepts AuditLog', () => {
    it('should accept AuditLog instance in constructor', async () => {
      const db = new Database(':memory:');
      db.exec('CREATE TABLE test (id INTEGER PRIMARY KEY, value TEXT)');
      const auditLog = new AuditLog(db as any);
      await auditLog.init();
      
      const agent = new CommitExecutor(db, auditLog);
      const logs: CommitResult[] = [];
      agent.onLog((result: CommitResult) => logs.push(result));
      
      agent.submit(createWriteIntent('INSERT INTO test (value) VALUES (\'test\')'));
      await agent.drain();
      
      expect(logs[0].success).toBe(true);
      
      agent.close();
    });
  });
});