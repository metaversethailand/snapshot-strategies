"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.strategy = exports.version = exports.author = void 0;
const delegation_1 = require("../../utils/delegation");
const utils_1 = require("../../utils");
exports.author = 'bonustrack';
exports.version = '0.1.0';
async function strategy(space, network, provider, addresses, options, snapshot) {
    const delegations = await (0, delegation_1.getDelegations)(space, network, addresses, snapshot);
    if (Object.keys(delegations).length === 0)
        return {};
    const scores = (await (0, utils_1.getScoresDirect)(space, options.strategies, network, provider, Object.values(delegations).reduce((a, b) => a.concat(b)), snapshot)).filter((score) => Object.keys(score).length !== 0);
    return Object.fromEntries(addresses.map((address) => {
        const addressScore = delegations[address]
            ? delegations[address].reduce((a, b) => a + scores.reduce((x, y) => (y[b] ? x + y[b] : x), 0), 0)
            : 0;
        return [address, addressScore];
    }));
}
exports.strategy = strategy;
