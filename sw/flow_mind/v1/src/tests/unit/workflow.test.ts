import * as assert from 'assert'
import {loadWorkflow, createState, WorkflowDef, WorkflowState} from '../fm_cli'

describe('Flow Mind v1 Core Domain Model', () => {
  describe('FR-FM-OO-01: Workflow definition', () => {
    it('TEST-FM-OO-01: should parse workflow with states and transitions', () => {
      const workflow = loadWorkflow('./src/ts/example_workflow.json') as WorkflowDef
      assert.strictEqual(workflow.id, 'simple_workflow')
      assert.ok(workflow.states.length >= 3)
      assert.ok(workflow.transitions.length >= 2)
    })
  })

  describe('FR-FM-OO-04: State representation', () => {
    it('TEST-FM-OO-04: should create state with encapsulated data', () => {
      const state = createState('test-workflow')
      assert.strictEqual(state.workflow_id, 'test-workflow')
      assert.ok(state.hasOwnProperty('data'))
      assert.ok(state.hasOwnProperty('history'))
    })
  })
})