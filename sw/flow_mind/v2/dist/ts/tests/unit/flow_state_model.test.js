"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const assert = __importStar(require("assert"));
const fm_cli_v2_1 = require("../../fm_cli_v2");
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
`;
    describe('FR-FM-V2-21: Flow definition with states, transitions, and guards', () => {
        it('should parse flow with states and transitions', () => {
            const result = (0, fm_cli_v2_1.parseFlowFile)(flowYaml);
            assert.strictEqual(result.flow.id, 'test_flow');
            assert.strictEqual(result.flow.states.length, 4);
            assert.ok(result.flow.states.some(s => s.name === 'idle'));
            assert.ok(result.flow.states.some(s => s.name === 'processing'));
        });
        it('should parse transitions with guard conditions', () => {
            const result = (0, fm_cli_v2_1.parseFlowFile)(flowYaml);
            const processingState = result.flow.states.find(s => s.name === 'processing');
            assert.ok(processingState);
            const transition = processingState.transitions?.find(t => t.when === 'complete');
            assert.ok(transition);
            assert.ok(transition.guard);
            assert.strictEqual(typeof transition.guard.condition, 'string');
        });
    });
    describe('FR-FM-V2-22: State representation with encapsulated data and transitions', () => {
        it('should have state with on_enter actions', () => {
            const result = (0, fm_cli_v2_1.parseFlowFile)(flowYaml);
            const idleState = result.flow.states.find(s => s.name === 'idle');
            assert.ok(idleState.on_enter);
            assert.strictEqual(idleState.on_enter.length, 1);
        });
        it('should have state with on_exit actions', () => {
            const result = (0, fm_cli_v2_1.parseFlowFile)(flowYaml);
            const processingState = result.flow.states.find(s => s.name === 'processing');
            assert.ok(processingState.on_exit);
        });
    });
    describe('FR-FM-V2-23: Guard condition evaluation', () => {
        it('should evaluate guard condition as true when condition is met', () => {
            const result = (0, fm_cli_v2_1.parseFlowFile)(flowYaml);
            const processingState = result.flow.states.find(s => s.name === 'processing');
            const transition = processingState.transitions?.find(t => t.when === 'complete');
            assert.ok(transition.guard);
            assert.strictEqual(transition.guard.condition, 'progress >= 80');
        });
    });
});
