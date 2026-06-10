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
describe('ULID Creation (FR-FM-V2-51/52/53/54)', () => {
    describe('FR-FM-V2-51: Generate ULID for each user input artifact', () => {
        it('should generate ULID with 26 characters', () => {
            const ulid = (0, fm_cli_v2_1.generateULID)();
            assert.strictEqual(ulid.length, 26);
        });
        it('should use Crockford\'s Base32 encoding (0-9, A-Z excluding I,L,O,U)', () => {
            const ulid = (0, fm_cli_v2_1.generateULID)();
            const validChars = /^[0-9A-HJKMNP-TV-Z]+$/;
            assert.ok(validChars.test(ulid), `ULID ${ulid} contains invalid characters`);
        });
    });
    describe('FR-FM-V2-52: ULID must encode creation timestamp', () => {
        it('should have timestamp in first 10 characters', () => {
            const ulid = (0, fm_cli_v2_1.generateULID)();
            const timestamp = ulid.slice(0, 10);
            const timestampNum = parseInt(timestamp, 16);
            assert.ok(!isNaN(timestampNum));
        });
    });
    describe('FR-FM-V2-53: ULID must be collision-resistant', () => {
        it('should generate unique ULIDs', () => {
            const ulids = new Set();
            for (let i = 0; i < 1000; i++) {
                ulids.add((0, fm_cli_v2_1.generateULID)());
            }
            assert.strictEqual(ulids.size, 1000, 'Generated duplicate ULIDs');
        });
    });
    describe('FR-FM-V2-54: ULID must be URL-safe and case-insensitive', () => {
        it('should not contain special characters', () => {
            const ulid = (0, fm_cli_v2_1.generateULID)();
            const specialChars = /[^a-zA-Z0-9]/;
            assert.ok(!specialChars.test(ulid), `ULID ${ulid} contains special characters`);
        });
    });
});
