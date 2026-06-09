import { AuditLog } from '../../AuditLog';
import Database from 'better-sqlite3';

describe('AuditLog', () => {
  describe('FR-WRITEQ-11: All write intents must be stored before application', () => {
    it('should store write intents in audit_log table', async () => {
      const db = new Database(':memory:');
      const auditLog = new AuditLog(db);
      
      await auditLog.init();
      
      const intent = {
        id: '01ARZ3NDEKTSV4RRFFQ69G5FAV',
        sql: 'INSERT INTO users (name) VALUES (?)',
        params: ['John'],
        agentId: 'agent-1',
        timestamp: Date.now(),
      };
      
      await auditLog.store(intent);
      
      const rows = db.prepare('SELECT * FROM audit_log').all() as any[];
      expect(rows).toHaveLength(1);
      expect(rows[0].intent_id).toBe(intent.id);
      expect(rows[0].sql).toBe(intent.sql);
      expect(rows[0].agent_id).toBe(intent.agentId);
      
      auditLog.close();
      db.close();
    });
  });

  describe('FR-WRITEQ-12: Audit log must be queryable', () => {
    it('should allow SQL queries for replay and debug', async () => {
      const db = new Database(':memory:');
      const auditLog = new AuditLog(db);
      
      await auditLog.init();
      
      await auditLog.store({
        id: '01ARZ3NDEKTSV4RRFFQ69G5FAV',
        sql: 'INSERT INTO users (name) VALUES (?)',
        params: ['John'],
        agentId: 'agent-1',
        timestamp: Date.now(),
      });
      
      await auditLog.store({
        id: '01ARZ3NDEKTSV4RRFFQ69G5FAB',
        sql: 'INSERT INTO users (name) VALUES (?)',
        params: ['Jane'],
        agentId: 'agent-2',
        timestamp: Date.now(),
      });
      
      const byAgent = await auditLog.findByAgentId('agent-1');
      expect(byAgent).toHaveLength(1);
      expect(byAgent[0].agent_id).toBe('agent-1');
      
      const all = await auditLog.findAll();
      expect(all).toHaveLength(2);
      
      auditLog.close();
      db.close();
    });
  });
});