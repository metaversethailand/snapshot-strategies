"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.strategy = exports.version = exports.author = void 0;
const utils_1 = require("../../utils");
const erc20_balance_of_1 = require("../erc20-balance-of");
exports.author = 'onigiri-x';
exports.version = '0.1.0';
const QUICKSWAP_SUBGRAPH = 'https://api.thegraph.com/subgraphs/name/sameepsi/quickswap05';
async function strategy(space, network, provider, addresses, options, snapshot) {
    // Set up the GraphQL parameters and necessary variables
    const holderParams = {
        pair: {
            __args: {
                id: options.address
            },
            reserve0: true,
            totalSupply: true
        }
    };
    // Query subgraph for the holders and the stakers based on input addresses
    const monaReserve = await (0, utils_1.subgraphRequest)(QUICKSWAP_SUBGRAPH, holderParams);
    const erc20Balances = await (0, erc20_balance_of_1.strategy)(space, network, provider, addresses, options, snapshot);
    const totalLPSupply = monaReserve.pair.totalSupply < 0
        ? monaReserve.pair.totalSupply * -1
        : monaReserve.pair.totalSupply;
    return Object.fromEntries(addresses.map((address) => [
        address,
        (erc20Balances[address] * monaReserve.pair.reserve0) / totalLPSupply
    ]));
}
exports.strategy = strategy;
