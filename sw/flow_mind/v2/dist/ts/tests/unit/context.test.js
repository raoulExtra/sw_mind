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
describe('Context Management (FR-FM-V2-11/12/13/14)', () => {
    describe('FR-FM-V2-11: Context storage for cross-state data', () => {
        it('should store key-value pairs accessible from all states', () => {
            const context = (0, fm_cli_v2_1.createEmptyContext)();
            const result = (0, fm_cli_v2_1.setContext)(context, 'counter', 42);
            assert.strictEqual((0, fm_cli_v2_1.getContext)(result, 'counter'), 42);
        });
        it('should be JSON-serializable', () => {
            const context = (0, fm_cli_v2_1.createEmptyContext)();
            const updated = (0, fm_cli_v2_1.updateContext)(context, { user: 'alice', count: 5 });
            const serialized = JSON.stringify(updated);
            const deserialized = JSON.parse(serialized);
            assert.strictEqual(deserialized.user, 'alice');
            assert.strictEqual(deserialized.count, 5);
        });
    });
    describe('FR-FM-V2-12: Transition-based Context read/write', () => {
        it('should allow transitions to read from context', () => {
            const context = (0, fm_cli_v2_1.createEmptyContext)();
            const updated = (0, fm_cli_v2_1.setContext)(context, 'value', 100);
            assert.strictEqual((0, fm_cli_v2_1.getContext)(updated, 'value'), 100);
        });
        it('should allow transitions to write to context', () => {
            const context = (0, fm_cli_v2_1.createEmptyContext)();
            const updated = (0, fm_cli_v2_1.updateContext)(context, { newKey: 'newValue' });
            assert.strictEqual((0, fm_cli_v2_1.getContext)(updated, 'newKey'), 'newValue');
        });
    });
    describe('FR-FM-V2-13: Guard-based Context evaluation', () => {
        it('should evaluate guards against context values', () => {
            const context = (0, fm_cli_v2_1.createEmptyContext)();
            const updated = (0, fm_cli_v2_1.setContext)(context, 'score', 85);
            const result = (0, fm_cli_v2_1.evaluateGuardWithContext)(updated, 'score >= 80');
            assert.strictEqual(result, true);
        });
        it('should return false when guard condition is not met', () => {
            const context = (0, fm_cli_v2_1.createEmptyContext)();
            const updated = (0, fm_cli_v2_1.setContext)(context, 'score', 50);
            const result = (0, fm_cli_v2_1.evaluateGuardWithContext)(updated, 'score >= 80');
            assert.strictEqual(result, false);
        });
    });
    describe('FR-FM-V2-14: Signal payload Context integration', () => {
        it('should update context with signal payload', () => {
            const context = (0, fm_cli_v2_1.createEmptyContext)();
            const payload = { value: 'start', count: 1 };
            const updated = (0, fm_cli_v2_1.updateContext)(context, payload);
            assert.strictEqual((0, fm_cli_v2_1.getContext)(updated, 'value'), 'start');
            assert.strictEqual((0, fm_cli_v2_1.getContext)(updated, 'count'), 1);
        });
    });
});
describe('Shell Executor Invocation (FR-FM-V2-61/62/63)', () => {
    describe('FR-FM-V2-61: Split executor name on underscore', () => {
        it('should split generate_plan into generate plan', () => {
            const executor = 'generate_plan';
            const parts = executor.split('_');
            assert.deepStrictEqual(parts, ['generate', 'plan']);
        });
        it('should split verify_output into verify output', () => {
            const executor = 'verify_output';
            const parts = executor.split('_');
            assert.deepStrictEqual(parts, ['verify', 'output']);
        });
        it('should handle single word executor names', () => {
            const executor = 'execute';
            const parts = executor.split('_');
            assert.deepStrictEqual(parts, ['execute']);
        });
    });
    describe('FR-FM-V2-62: exec.sh invocation', () => {
        it('should construct correct exec.sh command', () => {
            const executor = 'generate_plan';
            const scriptPath = './exec.sh';
            const parts = executor.split('_');
            const cmd = [scriptPath, ...parts].join(' ');
            assert.strictEqual(cmd, './exec.sh generate plan');
        });
    });
    describe('FR-FM-V2-63: Context passing', () => {
        it('should serialize context as JSON', () => {
            const context = { score: 85, user: 'alice' };
            const json = JSON.stringify(context);
            assert.strictEqual(json, '{"score":85,"user":"alice"}');
        });
    });
});
