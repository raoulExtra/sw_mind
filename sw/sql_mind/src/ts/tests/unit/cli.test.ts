import { parseArgs } from '../../cli';

describe('CLI Arguments', () => {
  describe('REQ-DB-01: Database path configuration', () => {
    it('should parse --db argument', () => {
      const args = parseArgs(['--db', '/custom/path.db']);
      expect(args.db).toBe('/custom/path.db');
    });

    it('should parse -d argument', () => {
      const args = parseArgs(['-d', '/custom/path.db']);
      expect(args.db).toBe('/custom/path.db');
    });

    it('should return undefined when no db argument provided', () => {
      const args = parseArgs([]);
      expect(args.db).toBeUndefined();
    });

    it('should return undefined when --db has no value', () => {
      const args = parseArgs(['--db']);
      expect(args.db).toBeUndefined();
    });

    it('should return undefined when -d has no value', () => {
      const args = parseArgs(['-d']);
      expect(args.db).toBeUndefined();
    });

    it('should parse multiple arguments with db option', () => {
      const args = parseArgs(['--db', '/path.db', '--other', 'value']);
      expect(args.db).toBe('/path.db');
    });
  });
});