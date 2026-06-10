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
describe('CLI Commands (FR-FM-V2-31/32/33/34/35)', () => {
    const testFlow = {
        id: 'test_flow',
        name: 'Test Flow',
        start_state: 'init',
        states: [
            { name: 'init', transitions: [{ to: 'processing', when: 'start' }] },
            { name: 'processing', transitions: [{ to: 'done', when: 'complete' }] },
            { name: 'done', transitions: [] }
        ]
    };
    describe('FR-FM-V2-31: Load flow definition from file or path', () => {
        it('should create a state with initial values', () => {
            const state = (0, fm_cli_v2_1.createState)('test_flow');
            assert.strictEqual(state.flow_id, 'test_flow');
            assert.strictEqual(state.current_step, 'init');
            assert.deepStrictEqual(state.data, {});
            assert.deepStrictEqual(state.history, []);
        });
    });
    describe('FR-FM-V2-32: Evaluate guards against context', () => {
        it('should evaluate guard condition against context', () => {
            const context = { score: 85 };
            const result = (0, fm_cli_v2_1.evaluateGuard)(context, 'score >= 80');
            assert.strictEqual(result, true);
        });
        it('should support comparison operators', () => {
            assert.strictEqual((0, fm_cli_v2_1.evaluateGuard)({ x: 10 }, 'x > 5'), true);
            assert.strictEqual((0, fm_cli_v2_1.evaluateGuard)({ x: 3 }, 'x < 5'), true);
            assert.strictEqual((0, fm_cli_v2_1.evaluateGuard)({ x: 5 }, 'x >= 5'), true);
            assert.strictEqual((0, fm_cli_v2_1.evaluateGuard)({ x: 5 }, 'x <= 5'), true);
            assert.strictEqual((0, fm_cli_v2_1.evaluateGuard)({ x: 5 }, 'x == 5'), true);
            assert.strictEqual((0, fm_cli_v2_1.evaluateGuard)({ x: 5 }, 'x != 3'), true);
        });
    });
    describe('FR-FM-V2-33: Run flow with signal input', () => {
        it('should execute transition when signal matches', () => {
            const state = (0, fm_cli_v2_1.createState)('test_flow');
            const result = (0, fm_cli_v2_1.executeNext)(testFlow, state);
            assert.ok(result);
            assert.strictEqual(result.current_step, 'processing');
        });
    });
    describe('FR-FM-V2-34: Show next state given current state and signal', () => {
        it('should find transition by signal', () => {
            const transition = (0, fm_cli_v2_1.findTransitionBySignal)(testFlow, 'init', 'start');
            assert.ok(transition);
            assert.strictEqual(transition.to, 'processing');
        });
        it('should return null for invalid signal', () => {
            const transition = (0, fm_cli_v2_1.findTransitionBySignal)(testFlow, 'init', 'invalid');
            assert.strictEqual(transition, null);
        });
    });
    describe('FR-FM-V2-35: Simulate transition execution', () => {
        it('should return next state name for valid transition', () => {
            const state = (0, fm_cli_v2_1.createState)('test_flow');
            state.current_step = 'init';
            const nextState = (0, fm_cli_v2_1.getNextTransition)(testFlow, state);
            assert.ok(nextState);
            assert.strictEqual(nextState.to, 'processing');
        });
    });
});
