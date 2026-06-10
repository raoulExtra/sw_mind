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
describe('Flow File Format Parsing (FR-FM-V2-01/02/03)', () => {
    const markdownFlow = `---
title: 'My Flow'
tags:
- my_flow
persona: developer
status: active
version: V00.01.00
updated: 2026-06-10
summary: 'A sample flow'
---
flow:
  id: my_flow
  name: My Flow
  start_state: init
  states:
    - name: init
      transitions:
        - to: complete
          when: start
`;
    const pureYamlFlow = `flow:
  id: pure_flow
  name: Pure YAML Flow
  start_state: idle
  states:
    - name: idle
      transitions:
        - to: done
          when: go
`;
    describe('FR-FM-V2-01: Parse YAML frontmatter from flow files', () => {
        it('should extract frontmatter between --- delimiters', () => {
            const result = (0, fm_cli_v2_1.parseFlowFile)(markdownFlow);
            assert.strictEqual(result.frontmatter.title, 'My Flow');
            assert.deepStrictEqual(result.frontmatter.tags, ['my_flow']);
            assert.strictEqual(result.frontmatter.persona, 'developer');
            assert.strictEqual(result.frontmatter.status, 'active');
        });
    });
    describe('FR-FM-V2-02: Parse flow definition from YAML content', () => {
        it('should parse flow definition from markdown with frontmatter', () => {
            const result = (0, fm_cli_v2_1.parseFlowFile)(markdownFlow);
            assert.strictEqual(result.flow.id, 'my_flow');
            assert.strictEqual(result.flow.name, 'My Flow');
            assert.strictEqual(result.flow.start_state, 'init');
            assert.strictEqual(result.flow.states.length, 1);
            assert.strictEqual(result.flow.states[0].name, 'init');
        });
        it('should parse flow definition from pure YAML', () => {
            const result = (0, fm_cli_v2_1.parseFlowFile)(pureYamlFlow);
            assert.strictEqual(result.flow.id, 'pure_flow');
            assert.strictEqual(result.flow.name, 'Pure YAML Flow');
            assert.strictEqual(result.flow.start_state, 'idle');
        });
    });
    describe('FR-FM-V2-03: Support both pure YAML and markdown formats', () => {
        it('should handle markdown format with frontmatter', () => {
            const result = (0, fm_cli_v2_1.parseFlowFile)(markdownFlow);
            assert.ok(result.frontmatter.title);
            assert.ok(result.flow);
        });
        it('should handle pure YAML without frontmatter', () => {
            const result = (0, fm_cli_v2_1.parseFlowFile)(pureYamlFlow);
            assert.deepStrictEqual(result.frontmatter, {});
            assert.ok(result.flow);
        });
    });
});
