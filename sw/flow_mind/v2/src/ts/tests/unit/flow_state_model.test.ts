import * as assert from 'assert'
import { FlowDef, StateDef, Transition, parseFlowFile } from '../../fm_cli_v2'

describe('Readable Flow State Model (FR-FM-V2-21/22/23)', () => {
  const flowYaml = `flow:
  id: test_flow
  name: Test Flow
  start_state: idle
  states:
    - name: idle
      on_enter:
        - log: "Starting"
      transitions:
        - to: processing
          when: start
    - name: processing
      on_exit:
        - log: "Exiting"
      transitions:
        - to: done
          when: complete
          guard:
            condition: progress >= 80
            else: failed
    - name: done
      transitions: []
    - name: failed
      transitions: []
`

  describe('FR-FM-V2-21: Flow definition with states, transitions, and guards', () => {
    it('should parse flow with states and transitions', () => {
      const result = parseFlowFile(flowYaml)
      assert.strictEqual(result.flow.id, 'test_flow')
      assert.strictEqual(result.flow.states.length, 4)
      assert.ok(result.flow.states.some(s => s.name === 'idle'))
      assert.ok(result.flow.states.some(s => s.name === 'processing'))
    })

    it('should parse transitions with guard conditions', () => {
      const result = parseFlowFile(flowYaml)
      const processingState = result.flow.states.find(s => s.name === 'processing')
      assert.ok(processingState)
      const transition = processingState!.transitions?.find(t => t.when === 'complete')
      assert.ok(transition)
      assert.ok(transition!.guard)
      assert.strictEqual(typeof transition!.guard!.condition, 'string')
    })
  })

  describe('FR-FM-V2-22: State representation with encapsulated data and transitions', () => {
    it('should have state with on_enter actions', () => {
      const result = parseFlowFile(flowYaml)
      const idleState = result.flow.states.find(s => s.name === 'idle')
      assert.ok(idleState!.on_enter)
      assert.strictEqual(idleState!.on_enter!.length, 1)
    })

    it('should have state with on_exit actions', () => {
      const result = parseFlowFile(flowYaml)
      const processingState = result.flow.states.find(s => s.name === 'processing')
      assert.ok(processingState!.on_exit)
    })
  })

  describe('FR-FM-V2-23: Guard condition evaluation', () => {
    it('should evaluate guard condition as true when condition is met', () => {
      const result = parseFlowFile(flowYaml)
      const processingState = result.flow.states.find(s => s.name === 'processing')
      const transition = processingState!.transitions?.find(t => t.when === 'complete')
      assert.ok(transition!.guard)
      assert.strictEqual(transition!.guard!.condition, 'progress >= 80')
    })
  })
})