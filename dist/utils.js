"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProvider = exports.getBlockNumber = exports.call = exports.ipfsGet = exports.subgraphRequest = exports.Multicaller = exports.multicall = exports.getScoresDirect = void 0;
const strategies_1 = __importDefault(require("./strategies"));
const snapshot_js_1 = __importDefault(require("@snapshot-labs/snapshot.js"));
const delegation_1 = require("./utils/delegation");
async function getScoresDirect(space, strategies, network, provider, addresses, snapshot = 'latest') {
    try {
        return await Promise.all(strategies.map((strategy) => (snapshot !== 'latest' && strategy.params?.start > snapshot) ||
            (strategy.params?.end &&
                (snapshot === 'latest' || snapshot > strategy.params?.end)) ||
            addresses.length === 0
            ? {}
            : strategies_1.default[strategy.name].strategy(space, network, provider, addresses, strategy.params, snapshot)));
    }
    catch (e) {
        return Promise.reject(e);
    }
}
exports.getScoresDirect = getScoresDirect;
_a = snapshot_js_1.default.utils, exports.multicall = _a.multicall, exports.Multicaller = _a.Multicaller, exports.subgraphRequest = _a.subgraphRequest, exports.ipfsGet = _a.ipfsGet, exports.call = _a.call, exports.getBlockNumber = _a.getBlockNumber, exports.getProvider = _a.getProvider;
exports.default = {
    getScoresDirect,
    multicall: exports.multicall,
    Multicaller: exports.Multicaller,
    subgraphRequest: exports.subgraphRequest,
    ipfsGet: exports.ipfsGet,
    call: exports.call,
    getBlockNumber: exports.getBlockNumber,
    getProvider: exports.getProvider,
    getDelegations: delegation_1.getDelegations
};
