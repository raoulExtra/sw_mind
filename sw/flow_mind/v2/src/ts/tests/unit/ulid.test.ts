import * as assert from 'assert'
import { generateULID } from '../../fm_cli_v2'

describe('ULID Creation (FR-FM-V2-51/52/53/54)', () => {
  describe('FR-FM-V2-51: Generate ULID for each user input artifact', () => {
    it('should generate ULID with 26 characters', () => {
      const ulid = generateULID()
      assert.strictEqual(ulid.length, 26)
    })

    it('should use Crockford\'s Base32 encoding (0-9, A-Z excluding I,L,O,U)', () => {
      const ulid = generateULID()
      const validChars = /^[0-9A-HJKMNP-TV-Z]+$/
      assert.ok(validChars.test(ulid), `ULID ${ulid} contains invalid characters`)
    })
  })

  describe('FR-FM-V2-52: ULID must encode creation timestamp', () => {
    it('should have timestamp in first 10 characters', () => {
      const ulid = generateULID()
      const timestamp = ulid.slice(0, 10)
      const timestampNum = parseInt(timestamp, 16)
      assert.ok(!isNaN(timestampNum))
    })
  })

  describe('FR-FM-V2-53: ULID must be collision-resistant', () => {
    it('should generate unique ULIDs', () => {
      const ulids = new Set<string>()
      for (let i = 0; i < 1000; i++) {
        ulids.add(generateULID())
      }
      assert.strictEqual(ulids.size, 1000, 'Generated duplicate ULIDs')
    })
  })

  describe('FR-FM-V2-54: ULID must be URL-safe and case-insensitive', () => {
    it('should not contain special characters', () => {
      const ulid = generateULID()
      const specialChars = /[^a-zA-Z0-9]/
      assert.ok(!specialChars.test(ulid), `ULID ${ulid} contains special characters`)
    })
  })
})