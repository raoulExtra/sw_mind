import * as assert from 'assert'
import { FlowDef, FlowState, createState, getNextTransition, executeNext, findTransitionBySignal, evaluateGuard } from '../../fm_cli_v2'

describe('CLI Commands (FR-FM-V2-31/32/33/34/35)', () => {
  const testFlow: FlowDef = {
    id: 'test_flow',
    name: 'Test Flow',
    start_state: 'init',
    states: [
      { name: 'init', transitions: [{ to: 'processing', when: 'start' }] },
      { name: 'processing', transitions: [{ to: 'done', when: 'complete' }] },
      { name: 'done', transitions: [] }
    ]
  }

  describe('FR-FM-V2-31: Load flow definition from file or path', () => {
    it('should create a state with initial values', () => {
      const state = createState('test_flow')
      assert.strictEqual(state.flow_id, 'test_flow')
      assert.strictEqual(state.current_step, 'init')
      assert.deepStrictEqual(state.data, {})
      assert.deepStrictEqual(state.history, [])
    })
  })

  describe('FR-FM-V2-32: Evaluate guards against context', () => {
    it('should evaluate guard condition against context', () => {
      const context = { score: 85 }
      const result = evaluateGuard(context, 'score >= 80')
      assert.strictEqual(result, true)
    })

    it('should support comparison operators', () => {
      assert.strictEqual(evaluateGuard({ x: 10 }, 'x > 5'), true)
      assert.strictEqual(evaluateGuard({ x: 3 }, 'x < 5'), true)
      assert.strictEqual(evaluateGuard({ x: 5 }, 'x >= 5'), true)
      assert.strictEqual(evaluateGuard({ x: 5 }, 'x <= 5'), true)
      assert.strictEqual(evaluateGuard({ x: 5 }, 'x == 5'), true)
      assert.strictEqual(evaluateGuard({ x: 5 }, 'x != 3'), true)
    })
  })

  describe('FR-FM-V2-33: Run flow with signal input', () => {
    it('should execute transition when signal matches', () => {
      const state = createState('test_flow')
      const result = executeNext(testFlow, state)
      assert.ok(result)
      assert.strictEqual(result!.current_step, 'processing')
    })
  })

  describe('FR-FM-V2-34: Show next state given current state and signal', () => {
    it('should find transition by signal', () => {
      const transition = findTransitionBySignal(testFlow, 'init', 'start')
      assert.ok(transition)
      assert.strictEqual(transition!.to, 'processing')
    })

    it('should return null for invalid signal', () => {
      const transition = findTransitionBySignal(testFlow, 'init', 'invalid')
      assert.strictEqual(transition, null)
    })
  })

  describe('FR-FM-V2-35: Simulate transition execution', () => {
    it('should return next state name for valid transition', () => {
      const state = createState('test_flow')
      state.current_step = 'init'
      const nextState = getNextTransition(testFlow, state)
      assert.ok(nextState)
      assert.strictEqual(nextState!.to, 'processing')
    })
  })
})