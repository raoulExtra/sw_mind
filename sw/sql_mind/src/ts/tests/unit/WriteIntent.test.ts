import { WriteIntent, createWriteIntent } from '../../WriteIntent';

describe('WriteIntent', () => {
  describe('FR-WRITEQ-04: Write intents must include unique identifier', () => {
    it('should have a ULID identifier', () => {
      const intent = createWriteIntent('INSERT INTO test VALUES (?)', ['value']);
      
      expect(intent.id).toBeDefined();
      expect(typeof intent.id).toBe('string');
      expect(intent.id.length).toBe(26);
    });

    it('should generate lexicographically sortable IDs', () => {
      const intents = [
        createWriteIntent('sql1', ['a']),
        createWriteIntent('sql2', ['b']),
        createWriteIntent('sql3', ['c']),
      ];
      
      intents.sort((a, b) => a.id.localeCompare(b.id));
      
      expect(intents[0].id < intents[1].id).toBe(true);
      expect(intents[1].id < intents[2].id).toBe(true);
    });
  });

  describe('FR-WRITEQ-05: Write intents must include SQL statement', () => {
    it('should include parameterized SQL', () => {
      const sql = 'INSERT INTO users (name, email) VALUES (?, ?)';
      const intent = createWriteIntent(sql, ['John', 'john@example.com']);
      
      expect(intent.sql).toBe(sql);
    });

    it('should support SQL without parameters', () => {
      const sql = 'CREATE TABLE test (id INTEGER PRIMARY KEY)';
      const intent = createWriteIntent(sql);
      
      expect(intent.sql).toBe(sql);
      expect(intent.params).toBeUndefined();
    });
  });

  describe('FR-WRITEQ-06: Write intents must include agent identifier', () => {
    it('should include agent ID', () => {
      const intent = createWriteIntent('INSERT INTO test VALUES (?)', ['value'], { agentId: 'agent-123' });
      
      expect(intent.agentId).toBe('agent-123');
    });

    it('should use default agent ID if not provided', () => {
      const intent = createWriteIntent('INSERT INTO test VALUES (?)', ['value']);
      
      expect(intent.agentId).toBeDefined();
      expect(typeof intent.agentId).toBe('string');
    });
  });

  describe('FR-WRITEQ-07: Write intents must include timestamp', () => {
    it('should include Unix timestamp', () => {
      const before = Date.now();
      const intent = createWriteIntent('INSERT INTO test VALUES (?)', ['value']);
      const after = Date.now();
      
      expect(intent.timestamp).toBeGreaterThanOrEqual(before);
      expect(intent.timestamp).toBeLessThanOrEqual(after);
    });
  });

  describe('WriteIntent validation', () => {
    it('should validate required fields', () => {
      const intent: WriteIntent = {
        id: '01ARZ3NDEKTSV4RRFFQ69G5FAV',
        sql: 'INSERT INTO test VALUES (?)',
        agentId: 'agent-1',
        timestamp: Date.now(),
      };
      
      expect(intent.id).toBeDefined();
      expect(intent.sql).toBeDefined();
      expect(intent.agentId).toBeDefined();
      expect(intent.timestamp).toBeDefined();
    });
  });

  describe('WriteIntent builder methods', () => {
    it('should create INSERT intent with builder', () => {
      const intent = WriteIntent.insert('users', { name: 'John', email: 'john@example.com' });
      expect(intent.sql).toContain('INSERT INTO users');
      expect(intent.sql).toContain('name');
      expect(intent.sql).toContain('email');
      expect(intent.params).toEqual(['John', 'john@example.com']);
    });

    it('should create SELECT intent with builder', () => {
      const intent = WriteIntent.select('users', ['id', 'name']);
      expect(intent.sql).toBe('SELECT id, name FROM users');
    });

    it('should create SELECT * intent with builder', () => {
      const intent = WriteIntent.select('users');
      expect(intent.sql).toBe('SELECT * FROM users');
    });

    it('should create UPDATE intent with builder', () => {
      const intent = WriteIntent.update('users', { name: 'Jane' }, 'id = 1');
      expect(intent.sql).toContain('UPDATE users');
      expect(intent.sql).toContain('SET name = ?');
      expect(intent.sql).toContain('WHERE id = 1');
      expect(intent.params).toEqual(['Jane']);
    });

    it('should create DELETE intent with builder', () => {
      const intent = WriteIntent.delete_('users', 'id = 1');
      expect(intent.sql).toBe('DELETE FROM users WHERE id = 1');
    });
  });
});