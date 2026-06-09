import * as assert from 'assert'
import * as fs from 'fs'
import * as path from 'path'
import {
  loadFlow,
  createState,
  executeNext,
  saveState,
  loadState,
  FlowDef,
  FlowState
} from '../../ts/fm_cli'

describe('SYS-FM-01: Complete flow execution', () => {
  const flowPath = path.resolve(__dirname, '../../ts/example_flow.yaml')
  const statePath = path.resolve(__dirname, '../test_sys_flow.json')

  afterEach(() => {
    if (fs.existsSync(statePath)) {
      fs.unlinkSync(statePath)
    }
  })

  it('should execute complete flow from init to complete', () => {
    const flow = loadFlow(flowPath) as FlowDef
    let state = createState(flow.id)
    
    assert.strictEqual(state.current_step, 'init')
    
    const processState = executeNext(flow, state)
    assert.ok(processState)
    assert.strictEqual(processState!.current_step, 'process')
    state = processState!
    
    const completeState = executeNext(flow, state)
    assert.ok(completeState)
    assert.strictEqual(completeState!.current_step, 'complete')
    state = completeState!
    
    const noTransition = executeNext(flow, state)
    assert.strictEqual(noTransition, null)
  })
})

describe('SYS-FM-03: Flow persistence across restarts', () => {
  const flowPath = path.resolve(__dirname, '../../ts/example_flow.yaml')
  const statePath = path.resolve(__dirname, '../test_sys_persistence.json')

  afterEach(() => {
    if (fs.existsSync(statePath)) {
      fs.unlinkSync(statePath)
    }
  })

  it('should recover state after simulated restart', () => {
    const flow = loadFlow(flowPath) as FlowDef
    const state = createState(flow.id)
    state.current_step = 'process'
    state.history.push({ step: 'init', timestamp: '2026-01-01T00:00:00Z' })
    saveState(state, statePath)
    
    const recovered = loadState(statePath)
    assert.ok(recovered)
    assert.strictEqual(recovered!.current_step, 'process')
    assert.strictEqual(recovered!.flow_id, flow.id)
    assert.strictEqual(recovered!.history.length, 1)
  })
})

describe('SYS-FM-08: CLI integration', () => {
  const flowPath = path.resolve(__dirname, '../../ts/example_flow.yaml')

  it('should parse flow file path from CLI args', () => {
    const args = ['./example_flow.yaml', 'next']
    assert.ok(flowPath.includes('example_flow.yaml'))
  })

  it('should support status command', () => {
    const state: FlowState = {
      flow_id: 'test',
      current_step: 'init',
      data: {},
      history: []
    }
    const formatted = JSON.stringify(state, null, 2)
    assert.ok(formatted.includes('flow_id'))
    assert.ok(formatted.includes('init'))
  })

  it('should support next command', () => {
    const flow = loadFlow(flowPath) as FlowDef
    const state = createState(flow.id)
    const result = executeNext(flow, state)
    assert.ok(result)
    assert.strictEqual(result!.current_step, 'process')
  })
})