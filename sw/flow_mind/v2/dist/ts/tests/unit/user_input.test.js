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
describe('User Input Handling (FR-FM-V2-41/42/43/44)', () => {
    describe('FR-FM-V2-41: ULID generator for unique identifiers', () => {
        it('should generate a 26-character ULID', () => {
            const ulid = (0, fm_cli_v2_1.generateULID)();
            assert.strictEqual(ulid.length, 26);
        });
    });
    describe('FR-FM-V2-42: SQLite client for write_intent_queue', () => {
        it('should create WriteIntentQueue', () => {
            const queue = new fm_cli_v2_1.WriteIntentQueue(null);
            assert.ok(queue);
        });
    });
    describe('FR-FM-V2-43: Domain table for user inputs', () => {
        it('should create UserInputTable', () => {
            const table = new fm_cli_v2_1.UserInputTable(null);
            assert.ok(table);
        });
    });
    describe('FR-FM-V2-44: Commit-agent handler for user_input intents', () => {
        it('should create CommitExecutor', () => {
            const agent = new fm_cli_v2_1.CommitExecutor(null);
            assert.ok(agent);
        });
    });
});
