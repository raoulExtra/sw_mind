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
exports.EXAMPLES = exports.VERSION = void 0;
exports.loadFlow = loadFlow;
exports.createState = createState;
exports.saveState = saveState;
exports.loadState = loadState;
exports.getNextTransition = getNextTransition;
exports.executeNext = executeNext;
exports.printHelp = printHelp;
exports.printVersion = printVersion;
exports.printExamples = printExamples;
exports.formatOutput = formatOutput;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const yaml = __importStar(require("js-yaml"));
function loadFlow(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const parsed = yaml.load(content);
    const flow = parsed.flow || parsed;
    return normalizeFlow(flow);
}
function normalizeAction(action) {
    if (typeof action === 'string') {
        return { log: action };
    }
    return action;
}
function normalizeGuard(guard) {
    if (!guard)
        return undefined;
    if (typeof guard === 'object' && guard.condition) {
        return guard;
    }
    return undefined;
}
function normalizeFlow(flow) {
    if (!flow.states)
        return flow;
    flow.states = flow.states.map((state) => {
        if (state.on_enter && typeof state.on_enter[0] === 'string') {
            state.on_enter = state.on_enter.map(normalizeAction);
        }
        if (state.on_exit && typeof state.on_exit[0] === 'string') {
            state.on_exit = state.on_exit.map(normalizeAction);
        }
        if (state.transitions) {
            state.transitions = state.transitions.map((t) => {
                if (t.guard && Array.isArray(t.guard)) {
                    t.guard = normalizeGuard(t.guard[0]);
                }
                if (t.actions) {
                    t.actions = t.actions.map(normalizeAction);
                }
                return t;
            });
        }
        return state;
    });
    return flow;
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
exports.VERSION = '1.0.0';
exports.EXAMPLES = `
Usage Examples:
  fm_cli --file flow.yaml --help        Show this help
  fm_cli --file flow.yaml --version     Show version
  fm_cli --file flow.yaml start         Start flow execution
  fm_cli --file flow.yaml status        Show current state
  fm_cli --file flow.yaml next          Execute next transition
  fm_cli --file flow.yaml --output json Show state as JSON
`;
function printHelp() {
    console.log(`Flow Mind v1 CLI - Flow Engine
Usage: fm_cli [options]

Options:
  --help          Show help information
  --version       Show version information
  --examples      Show usage examples
  --output <fmt>  Output format (text, json, yaml)
  --file <path>   Flow definition file path

Commands:
  start           Start a new flow execution
  status          Show current state
  next            Execute next transition
  history         Show execution history
`);
    process.exit(0);
}
function printVersion() {
    console.log(`flow-mind-v1 ${exports.VERSION}`);
    process.exit(0);
}
function printExamples() {
    console.log(exports.EXAMPLES);
    process.exit(0);
}
function formatOutput(state, format) {
    switch (format) {
        case 'json':
            return JSON.stringify(state, null, 2);
        case 'yaml':
            return yaml.dump(state);
        default:
            return `Flow: ${state.flow_id}
Step: ${state.current_step}
History: ${state.history.length} steps`;
    }
}
function main() {
    const args = process.argv.slice(2);
    if (args.includes('--help')) {
        printHelp();
    }
    if (args.includes('--version')) {
        printVersion();
    }
    if (args.includes('--examples')) {
        printExamples();
    }
    if (args.length < 2) {
        console.log('Usage: fm_cli <flow.yaml> <command> [args]');
        process.exit(1);
    }
    const fileIndex = args.indexOf('--file');
    let flowPath;
    let command;
    if (fileIndex >= 0 && args[fileIndex + 1]) {
        flowPath = path.resolve(process.cwd(), args[fileIndex + 1]);
        command = args.find((_, i) => i > fileIndex + 1 && !args[i].startsWith('-')) || '';
    }
    else {
        flowPath = path.resolve(process.cwd(), 'sw/flow_mind/res/v1', args[0]);
        command = args[1];
    }
    const outputIndex = args.indexOf('--output');
    let outputFormat = 'text';
    if (outputIndex >= 0 && args[outputIndex + 1]) {
        outputFormat = args[outputIndex + 1];
    }
    const statePath = 'state.json';
    const flow = loadFlow(flowPath);
    let state;
    if (fs.existsSync(statePath)) {
        state = JSON.parse(fs.readFileSync(statePath, 'utf-8'));
    }
    else {
        state = createState(flow.id);
        saveState(state, statePath);
    }
    console.log(`Flow: ${flow.name}`);
    console.log(`Current step: ${state.current_step}`);
    switch (command) {
        case 'status':
            console.log(formatOutput(state, outputFormat));
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
