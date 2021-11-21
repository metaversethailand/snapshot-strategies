"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.strategy = exports.version = exports.author = void 0;
const cross_fetch_1 = __importDefault(require("cross-fetch"));
const units_1 = require("@ethersproject/units");
exports.author = 'ganzai-san';
exports.version = '0.1.0';
async function strategy(space, network, provider, addresses, options, snapshot) {
    let api_url = options.api + '/' + options.strategy;
    api_url += '?network=' + network;
    api_url += '&snapshot=' + snapshot;
    api_url += '&addresses=' + addresses.join(',');
    const response = await (0, cross_fetch_1.default)(api_url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    return Object.fromEntries(data.score.map((value) => [
        value.address,
        parseFloat((0, units_1.formatUnits)(value.score.toString(), options.decimals))
    ]));
}
exports.strategy = strategy;
