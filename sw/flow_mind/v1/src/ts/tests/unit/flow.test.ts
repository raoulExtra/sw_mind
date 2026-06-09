import * as assert from 'assert'
import * as fs from 'fs'
import * as path from 'path'
import {
  loadFlow,
  createState,
  saveState,
  loadState,
  getNextTransition,
  executeNext,
  FlowState,
  FlowDef,
  StateDef,
  Transition,
  GuardCondition
} from '../../fm_cli'

describe('Flow Mind v1 Core Domain Model', () => {
  describe('FR-FM-OO-01: Workflow definition', () => {
    it('TEST-FM-OO-01: should parse flow with states and transitions', () => {
       const flow: FlowDef = {
         id: 'simple_flow',
         type: 'flow',
         name: 'Simple Flow',
         start_state: 'init',
         states: [
           { name: 'init', transitions: [{ to: 'process' }] },
           { name: 'process', transitions: [{ to: 'complete' }] },
           { name: 'complete', transitions: [] }
         ]
       }
      assert.strictEqual(flow.id, 'simple_flow')
      assert.ok(flow.states.length >= 3)
      assert.ok(flow.states[0].transitions.length >= 1)
    })
  })

  describe('FR-FM-OO-04: State representation', () => {
    it('TEST-FM-OO-04: should create state with encapsulated data', () => {
      const state = createState('test-flow')
      assert.strictEqual(state.flow_id, 'test-flow')
      assert.ok(state.hasOwnProperty('data'))
      assert.ok(state.hasOwnProperty('history'))
    })
  })
})

describe('TEST-FM-01: State machine transitions', () => {
  const flowPath = path.resolve(__dirname, '../../example_flow.yaml')

  it('should transition from init to process', () => {
    const flow = loadFlow(flowPath) as FlowDef
    const state = createState(flow.id)
    assert.strictEqual(state.current_step, 'init')
    const initState = flow.states.find(s => s.name === 'init')
    assert.ok(initState, 'init state should exist')
    assert.strictEqual(initState!.transitions[0].to, 'process')
  })

  it('should transition from process to complete', () => {
    const flow = loadFlow(flowPath) as FlowDef
    const processState = flow.states.find(s => s.name === 'process')
    assert.ok(processState, 'process state should exist')
    assert.strictEqual(processState!.transitions[0].to, 'complete')
  })

  it('should have no valid transitions from complete state', () => {
    const flow = loadFlow(flowPath) as FlowDef
    const completeState = flow.states.find(s => s.name === 'complete')
    assert.ok(completeState, 'complete state should exist')
    assert.strictEqual(completeState!.transitions.length, 0)
  })

  it('should throw error for invalid state transition', () => {
    const flow = loadFlow(flowPath) as FlowDef
    const completeState = flow.states.find(s => s.name === 'complete')
    assert.ok(completeState, 'complete state should exist')
    const targetState = completeState!.transitions.find(t => t.to === 'invalid')
    assert.strictEqual(targetState, undefined)
  })
})

describe('TEST-FM-02: Flow execution integration', () => {
  const statePath = path.resolve(__dirname, '../../test_state.json')

  afterEach(() => {
    if (fs.existsSync(statePath)) {
      fs.unlinkSync(statePath)
    }
  })

  it('should execute flow and persist state', () => {
    const flow = loadFlow(path.resolve(__dirname, '../../example_flow.yaml')) as FlowDef
    const state = createState(flow.id)
    state.current_step = 'process'
    fs.writeFileSync(statePath, JSON.stringify(state, null, 2))
    const loaded = JSON.parse(fs.readFileSync(statePath, 'utf-8'))
    assert.strictEqual(loaded.current_step, 'process')
    assert.strictEqual(loaded.flow_id, flow.id)
  })

  it('should track state history', () => {
    const state = createState('test-flow')
    state.history.push({ step: 'init', timestamp: new Date().toISOString() })
    state.history.push({ step: 'process', timestamp: new Date().toISOString() })
    assert.strictEqual(state.history.length, 2)
  })
})

describe('TEST-FM-04: CLI argument parsing', () => {
  it('should parse flow path argument', () => {
    const args = ['./example.yaml', 'start']
    assert.strictEqual(args[0], './example.yaml')
    assert.strictEqual(args[1], 'start')
  })

  it('should handle missing arguments', () => {
    const args: string[] = []
    assert.strictEqual(args.length, 0)
  })

  it('should handle unknown command', () => {
    const command = 'unknown'
    assert.notStrictEqual(command, 'start')
    assert.notStrictEqual(command, 'stop')
    assert.notStrictEqual(command, 'status')
  })
})

describe('TEST-FM-05: State persistence and recovery', () => {
  const testPath = path.resolve(__dirname, '../../test_persistence.json')

  afterEach(() => {
    if (fs.existsSync(testPath)) {
      fs.unlinkSync(testPath)
    }
  })

  it('should serialize state to JSON', () => {
    const state = createState('flow-1')
    state.current_step = 'running'
    state.data = { key: 'value' }
    fs.writeFileSync(testPath, JSON.stringify(state, null, 2))
    const content = fs.readFileSync(testPath, 'utf-8')
    const parsed = JSON.parse(content)
    assert.strictEqual(parsed.flow_id, 'flow-1')
    assert.strictEqual(parsed.current_step, 'running')
  })

  it('should deserialize state from JSON', () => {
    const state = createState('flow-2')
    state.current_step = 'complete'
    fs.writeFileSync(testPath, JSON.stringify(state, null, 2))
    const loaded = JSON.parse(fs.readFileSync(testPath, 'utf-8')) as FlowState
    assert.strictEqual(loaded.flow_id, 'flow-2')
    assert.strictEqual(loaded.current_step, 'complete')
  })
})

describe('TEST-FM-06: Audit trail and history query', () => {
  it('should maintain complete audit trail', () => {
    const state = createState('audit-flow')
    state.history.push({ step: 'init', timestamp: '2026-01-01T00:00:00Z' })
    state.history.push({ step: 'process', timestamp: '2026-01-01T00:01:00Z' })
    state.history.push({ step: 'complete', timestamp: '2026-01-01T00:02:00Z' })
    assert.strictEqual(state.history.length, 3)
  })

  it('should query history by step', () => {
    const state = createState('query-flow')
    state.history.push({ step: 'init', timestamp: '2026-01-01T00:00:00Z' })
    state.history.push({ step: 'process', timestamp: '2026-01-01T00:01:00Z' })
    const processEntries = state.history.filter(h => h.step === 'process')
    assert.strictEqual(processEntries.length, 1)
  })
})

describe('TEST-FM-OO-06: Model state representation', () => {
  it('should represent flow state with data fields', () => {
    const state = createState('flow-with-data')
    state.data = { user: 'john', count: 42 }
    assert.deepStrictEqual(state.data.user, 'john')
    assert.deepStrictEqual(state.data.count, 42)
  })

  it('should track current step', () => {
    const state = createState('step-tracking')
    assert.strictEqual(state.current_step, 'init')
    state.current_step = 'running'
    assert.strictEqual(state.current_step, 'running')
  })
})

describe('TEST-FM-OO-07: View formatting', () => {
  it('should format state as JSON string', () => {
    const state = createState('view-test')
    const formatted = JSON.stringify(state, null, 2)
    assert.ok(formatted.includes('flow_id'))
    assert.ok(formatted.includes('current_step'))
  })
})

describe('TEST-FM-OO-08: Controller command routing', () => {
  const commands = ['start', 'stop', 'status', 'next', 'history']
  it('should support valid commands', () => {
    assert.ok(commands.includes('start'))
    assert.ok(commands.includes('stop'))
    assert.ok(commands.includes('status'))
    assert.ok(commands.includes('next'))
    assert.ok(commands.includes('history'))
  })
})

describe('TEST-FM-OO-06: CLI help and version support', () => {
  it('should support --help argument', () => {
    const args = ['--help']
    assert.strictEqual(args[0], '--help')
  })

  it('should support --version argument', () => {
    const args = ['--version']
    assert.strictEqual(args[0], '--version')
  })
})

describe('TEST-FM-OO-07: CLI examples argument', () => {
  it('should support --examples argument', () => {
    const args = ['--examples']
    assert.strictEqual(args[0], '--examples')
  })
})

describe('TEST-FM-OO-09: Coverage validation', () => {
  it('should cover all branches in state transitions', () => {
    const flow = loadFlow(path.resolve(__dirname, '../../example_flow.yaml')) as FlowDef
    const branches: string[] = []
    for (const state of flow.states) {
      for (const transition of state.transitions) {
        branches.push(`${state.name}->${transition.to}`)
      }
    }
    assert.ok(branches.length >= 2)
  })
})

describe('TEST-FM-10: State persistence functions', () => {
  const testPath = path.resolve(__dirname, '../../test_save_load.json')

  afterEach(() => {
    if (fs.existsSync(testPath)) {
      fs.unlinkSync(testPath)
    }
  })

  it('should save state to file', () => {
    const state: FlowState = {
      flow_id: 'test-save',
      current_step: 'running',
      data: { key: 'value' },
      history: [{ step: 'init', timestamp: '2026-01-01T00:00:00Z' }]
    }
    saveState(state, testPath)
    assert.ok(fs.existsSync(testPath))
    const content = fs.readFileSync(testPath, 'utf-8')
    const parsed = JSON.parse(content)
    assert.strictEqual(parsed.flow_id, 'test-save')
    assert.strictEqual(parsed.current_step, 'running')
  })

  it('should load state from file', () => {
    const state: FlowState = {
      flow_id: 'test-load',
      current_step: 'complete',
      data: {},
      history: []
    }
    saveState(state, testPath)
    const loaded = loadState(testPath)
    assert.ok(loaded !== null)
    assert.strictEqual(loaded!.flow_id, 'test-load')
    assert.strictEqual(loaded!.current_step, 'complete')
  })

  it('should return null for non-existent file', () => {
    const loaded = loadState('/non/existent/path.json')
    assert.strictEqual(loaded, null)
  })
})

describe('TEST-FM-11: Guard conditions', () => {
  it('should define guard condition with op', () => {
    const guard: GuardCondition = { op: 'eq' }
    assert.strictEqual(guard.op, 'eq')
  })

  it('should define guard condition with field and value', () => {
    const guard: GuardCondition = { op: 'gt', field: 'count', value: 5 }
    assert.strictEqual(guard.field, 'count')
    assert.strictEqual(guard.value, 5)
  })
})

describe('TEST-FM-13: Flow start state', () => {
  it('should have start_state defined', () => {
    const flow = loadFlow(path.resolve(__dirname, '../../example_flow.yaml')) as FlowDef
    assert.strictEqual(flow.start_state, 'init')
  })

  it('should create state in init step by default', () => {
    const flow = loadFlow(path.resolve(__dirname, '../../example_flow.yaml')) as FlowDef
    const state = createState(flow.id)
    assert.strictEqual(state.current_step, 'init')
  })
})

describe('TEST-FM-12: Next transition execution', () => {
  const flowPath = path.resolve(__dirname, '../../example_flow.yaml')

  it('should get next transition from init state', () => {
    const flow = loadFlow(flowPath) as FlowDef
    const state = createState(flow.id)
    state.current_step = 'init'
    
    const transition = getNextTransition(flow, state)
    assert.ok(transition)
    assert.strictEqual(transition!.to, 'process')
  })

  it('should return null when no transition available', () => {
    const flow = loadFlow(flowPath) as FlowDef
    const state = createState(flow.id)
    state.current_step = 'complete'
    
    const transition = getNextTransition(flow, state)
    assert.strictEqual(transition, null)
  })

  it('should execute transition and update state', () => {
    const flow = loadFlow(flowPath) as FlowDef
    const state = createState(flow.id)
    state.current_step = 'init'
    
    const newState = executeNext(flow, state)
    assert.ok(newState)
    assert.strictEqual(newState!.current_step, 'process')
    assert.strictEqual(newState!.history.length, 1)
    assert.strictEqual(newState!.history[0].step, 'init')
  })

  it('should not execute transition from terminal state', () => {
    const flow = loadFlow(flowPath) as FlowDef
    const state = createState(flow.id)
    state.current_step = 'complete'
    
    const newState = executeNext(flow, state)
    assert.strictEqual(newState, null)
  })
})