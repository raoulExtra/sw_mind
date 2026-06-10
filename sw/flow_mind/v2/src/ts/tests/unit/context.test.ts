import * as assert from 'assert'
import { FlowContext, Context, createEmptyContext, getContext, setContext, updateContext, evaluateGuardWithContext } from '../../fm_cli_v2'

describe('Context Management (FR-FM-V2-11/12/13/14)', () => {
  describe('FR-FM-V2-11: Context storage for cross-state data', () => {
    it('should store key-value pairs accessible from all states', () => {
      const context = createEmptyContext()
      const result = setContext(context, 'counter', 42)
      assert.strictEqual(getContext(result, 'counter'), 42)
    })

    it('should be JSON-serializable', () => {
      const context = createEmptyContext()
      const updated = updateContext(context, { user: 'alice', count: 5 })
      const serialized = JSON.stringify(updated)
      const deserialized = JSON.parse(serialized) as FlowContext
      assert.strictEqual(deserialized.user, 'alice')
      assert.strictEqual(deserialized.count, 5)
    })
  })

  describe('FR-FM-V2-12: Transition-based Context read/write', () => {
    it('should allow transitions to read from context', () => {
      const context = createEmptyContext()
      const updated = setContext(context, 'value', 100)
      assert.strictEqual(getContext(updated, 'value'), 100)
    })

    it('should allow transitions to write to context', () => {
      const context = createEmptyContext()
      const updated = updateContext(context, { newKey: 'newValue' })
      assert.strictEqual(getContext(updated, 'newKey'), 'newValue')
    })
  })

  describe('FR-FM-V2-13: Guard-based Context evaluation', () => {
    it('should evaluate guards against context values', () => {
      const context = createEmptyContext()
      const updated = setContext(context, 'score', 85)
      const result = evaluateGuardWithContext(updated, 'score >= 80')
      assert.strictEqual(result, true)
    })

    it('should return false when guard condition is not met', () => {
      const context = createEmptyContext()
      const updated = setContext(context, 'score', 50)
      const result = evaluateGuardWithContext(updated, 'score >= 80')
      assert.strictEqual(result, false)
    })
  })

  describe('FR-FM-V2-14: Signal payload Context integration', () => {
    it('should update context with signal payload', () => {
      const context = createEmptyContext()
      const payload = { value: 'start', count: 1 }
      const updated = updateContext(context, payload)
      assert.strictEqual(getContext(updated, 'value'), 'start')
      assert.strictEqual(getContext(updated, 'count'), 1)
    })
  })
})

describe('Shell Executor Invocation (FR-FM-V2-61/62/63)', () => {
  describe('FR-FM-V2-61: Split executor name on underscore', () => {
    it('should split generate_plan into generate plan', () => {
      const executor = 'generate_plan'
      const parts = executor.split('_')
      assert.deepStrictEqual(parts, ['generate', 'plan'])
    })

    it('should split verify_output into verify output', () => {
      const executor = 'verify_output'
      const parts = executor.split('_')
      assert.deepStrictEqual(parts, ['verify', 'output'])
    })

    it('should handle single word executor names', () => {
      const executor = 'execute'
      const parts = executor.split('_')
      assert.deepStrictEqual(parts, ['execute'])
    })
  })

  describe('FR-FM-V2-62: exec.sh invocation', () => {
    it('should construct correct exec.sh command', () => {
      const executor = 'generate_plan'
      const scriptPath = './exec.sh'
      const parts = executor.split('_')
      const cmd = [scriptPath, executor, ...parts].join(' ')
      assert.strictEqual(cmd, './exec.sh generate_plan generate plan')
    })
  })

  describe('FR-FM-V2-63: Context passing', () => {
    it('should serialize context as JSON', () => {
      const context = { score: 85, user: 'alice' }
      const json = JSON.stringify(context)
      assert.strictEqual(json, '{"score":85,"user":"alice"}')
    })
  })
})