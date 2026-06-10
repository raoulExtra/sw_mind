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
exports.CommitExecutor = exports.UserInputTable = exports.WriteIntentQueue = void 0;
exports.createEmptyContext = createEmptyContext;
exports.getContext = getContext;
exports.setContext = setContext;
exports.updateContext = updateContext;
exports.createState = createState;
exports.saveState = saveState;
exports.loadState = loadState;
exports.getNextTransition = getNextTransition;
exports.executeNext = executeNext;
exports.evaluateGuardWithContext = evaluateGuardWithContext;
exports.evaluateGuard = evaluateGuard;
exports.findTransitionBySignal = findTransitionBySignal;
exports.generateULID = generateULID;
exports.loadFlow = loadFlow;
exports.parseFlowFile = parseFlowFile;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const yaml = __importStar(require("js-yaml"));
function createEmptyContext() {
    return {};
}
function getContext(context, key) {
    return context[key];
}
function setContext(context, key, value) {
    return { ...context, [key]: value };
}
function updateContext(context, updates) {
    return { ...context, ...updates };
}
function createState(flowId) {
    return {
        flow_id: flowId,
        current_step: 'init',
        data: {},
        history: []
    };
}
function saveState(state, filePath) {
    fs.writeFileSync(filePath, JSON.stringify(state, null, 2));
}
function loadState(filePath) {
    if (!fs.existsSync(filePath))
        return null;
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}
function getNextTransition(flow, state) {
    const currentStateDef = flow.states.find(s => s.name === state.current_step);
    if (!currentStateDef || !currentStateDef.transitions || currentStateDef.transitions.length === 0) {
        return null;
    }
    return currentStateDef.transitions[0];
}
function executeNext(flow, state) {
    const transition = getNextTransition(flow, state);
    if (!transition) {
        return null;
    }
    const newState = {
        ...state,
        current_step: transition.to,
        history: [...state.history, { step: state.current_step, timestamp: new Date().toISOString() }]
    };
    return newState;
}
function evaluateGuardWithContext(context, condition) {
    const match = condition.match(/^(\w+)\s*(>=|<=|!=|==|>|<)\s*(.+)$/);
    if (!match)
        return false;
    const [, field, op, valueStr] = match;
    const fieldValue = context[field];
    let expectedValue = valueStr.trim();
    if (expectedValue.startsWith("'") || expectedValue.startsWith('"')) {
        expectedValue = expectedValue.slice(1, -1);
    }
    else if (!isNaN(Number(expectedValue))) {
        expectedValue = Number(expectedValue);
    }
    switch (op) {
        case '==': return fieldValue == expectedValue;
        case '!=': return fieldValue != expectedValue;
        case '>': return fieldValue > expectedValue;
        case '<': return fieldValue < expectedValue;
        case '>=': return fieldValue >= expectedValue;
        case '<=': return fieldValue <= expectedValue;
        default: return false;
    }
}
function evaluateGuard(context, condition) {
    return evaluateGuardWithContext(context, condition);
}
function findTransitionBySignal(flow, stateName, signal) {
    const state = flow.states.find(s => s.name === stateName);
    if (!state || !state.transitions)
        return null;
    return state.transitions.find(t => t.when === signal) || null;
}
const crockfordBase32 = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
function generateULID() {
    const now = Date.now();
    const timestamp = now.toString(16).toUpperCase().slice(-10);
    const randomness = Array.from({ length: 16 }, () => crockfordBase32[Math.floor(Math.random() * 32)]).join('');
    return timestamp + randomness;
}
class WriteIntentQueue {
    constructor(db) { this.db = db; }
    enqueue(intent) { return intent; }
}
exports.WriteIntentQueue = WriteIntentQueue;
class UserInputTable {
    constructor(db) { this.db = db; }
    create() { }
    insert(input) { return input; }
}
exports.UserInputTable = UserInputTable;
class CommitExecutor {
    constructor(db) { this.db = db; }
    process() { return true; }
}
exports.CommitExecutor = CommitExecutor;
function loadFlow(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    return parseFlowFile(content);
}
function parseFlowFile(content) {
    const lines = content.split('\n');
    const frontmatterEnd = lines.indexOf('---', 1);
    if (frontmatterEnd > 0 && lines[0] === '---') {
        const frontmatterYaml = lines.slice(1, frontmatterEnd).join('\n');
        const frontmatter = yaml.load(frontmatterYaml);
        const remainingContent = lines.slice(frontmatterEnd + 1).join('\n');
        const flowMatch = remainingContent.match(/flow:\s*\n([\s\S]*?)(?:\s*$|\`\`\`)/);
        if (flowMatch) {
            const flowYaml = 'flow:\n' + flowMatch[1];
            const parsed = yaml.load(flowYaml);
            return { frontmatter, flow: parsed.flow };
        }
        const parsed = yaml.load(remainingContent);
        return { frontmatter, flow: parsed.flow || parsed };
    }
    const parsed = yaml.load(content);
    return { frontmatter: {}, flow: parsed.flow || parsed };
}
function main() {
    const args = process.argv.slice(2);
    if (args.length < 2) {
        console.log('Usage: fm_cli_v2 <flow.md> <command> [args]');
        process.exit(1);
    }
    const flowPath = path.resolve(process.cwd(), 'sw/flow_mind/res/v2', args[0]);
    const command = args[1];
    const statePath = 'state.json';
    const { frontmatter, flow } = loadFlow(flowPath);
    console.log(`Title: ${frontmatter.title || flow.name}`);
    console.log(`Status: ${frontmatter.status || 'active'}`);
    console.log(`Flow: ${flow.name}`);
    let state;
    if (fs.existsSync(statePath)) {
        state = JSON.parse(fs.readFileSync(statePath, 'utf-8'));
    }
    else {
        state = createState(flow.id);
        saveState(state, statePath);
    }
    console.log(`Current step: ${state.current_step}`);
    switch (command) {
        case 'status':
            console.log(JSON.stringify(state, null, 2));
            break;
        case 'next':
            const newState = executeNext(flow, state);
            if (newState) {
                console.log(`Moving from ${state.current_step} to ${newState.current_step}`);
                state = newState;
                saveState(state, statePath);
            }
            else {
                console.log(`No valid transition from ${state.current_step}`);
            }
            break;
        default:
            console.log(`Unknown command: ${command}`);
    }
}
if (require.main === module) {
    main();
}
