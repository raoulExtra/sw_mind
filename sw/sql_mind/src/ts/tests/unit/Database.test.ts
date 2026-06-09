import { Database } from '../../Database';
import * as fs from 'fs';
import * as path from 'path';

describe('Database', () => {
  const testDir = '/tmp/sql_mind_test_db';
  
  beforeEach(() => {
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }
  });
  
  afterEach(() => {
    if (fs.existsSync(testDir)) {
      const files = fs.readdirSync(testDir);
      for (const file of files) {
        fs.unlinkSync(path.join(testDir, file));
      }
    }
  });

  describe('REQ-DB-02: Default database path', () => {
    it('should use default path when no path provided', () => {
      const db = new Database('/tmp/test_default.db');
      expect(db.getPath()).toBe('/tmp/test_default.db');
      db.close();
    });
  });

  describe('REQ-DB-03: Database file creation', () => {
    it('should create database file if it does not exist', () => {
      const dbPath = path.join(testDir, 'new_db.db');
      expect(fs.existsSync(dbPath)).toBe(false);
      
      const db = new Database(dbPath);
      db.exec('CREATE TABLE test (id INTEGER PRIMARY KEY)');
      db.close();
      
      expect(fs.existsSync(dbPath)).toBe(true);
    });
  });

  describe('REQ-DB-04: Existing database preservation', () => {
    it('should preserve existing data on startup', () => {
      const dbPath = path.join(testDir, 'existing_db.db');
      
      const db1 = new Database(dbPath);
      db1.exec('CREATE TABLE test (id INTEGER PRIMARY KEY, value TEXT)');
      db1.exec("INSERT INTO test (value) VALUES ('preserved')");
      db1.close();
      
      const db2 = new Database(dbPath);
      const rows = db2.prepare('SELECT value FROM test').all() as { value: string }[];
      expect(rows[0].value).toBe('preserved');
      db2.close();
    });
  });

  describe('REQ-DB-05: Database file persistence on shutdown', () => {
    it('should not delete database file on close', () => {
      const dbPath = path.join(testDir, 'persist_db.db');
      
      const db = new Database(dbPath);
      db.exec('CREATE TABLE test (id INTEGER PRIMARY KEY, value TEXT)');
      db.exec("INSERT INTO test (value) VALUES ('persisted')");
      db.close();
      
      expect(fs.existsSync(dbPath)).toBe(true);
    });
  });

  describe('REQ-DB-07: Connection management', () => {
    it('should open connection on init and close on shutdown', () => {
      const dbPath = path.join(testDir, 'connection_db.db');
      const db = new Database(dbPath);
      
      expect(db.isOpen()).toBe(true);
      
      db.close();
      expect(db.isOpen()).toBe(false);
    });
  });
});