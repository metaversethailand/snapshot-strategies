"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.strategy = exports.version = exports.author = void 0;
const address_1 = require("@ethersproject/address");
const units_1 = require("@ethersproject/units");
const utils_1 = require("../../utils");
exports.author = 'vladan';
exports.version = '1.0.0';
const THALES_SUBGRAPH_URL = 'https://api.thegraph.com/subgraphs/name/thales-markets/thales-options';
async function strategy(_space, _network, _provider, addresses, options, snapshot) {
    const params = {
        stakers: {
            __args: {
                first: 1000,
                orderBy: 'totalStakedAmount',
                orderDirection: 'desc',
                where: {
                    totalStakedAmount_gt: 0,
                    id_in: addresses.map((addr) => addr.toLowerCase())
                }
            },
            id: true,
            timestamp: true,
            totalStakedAmount: true
        }
    };
    if (snapshot !== 'latest') {
        // @ts-ignore
        params.stakers.__args.block = { number: snapshot };
    }
    const score = {};
    const result = await (0, utils_1.subgraphRequest)(THALES_SUBGRAPH_URL, params);
    if (result && result.stakers) {
        result.stakers.forEach((staker) => {
            score[(0, address_1.getAddress)(staker.id)] = parseFloat((0, units_1.formatUnits)(staker.totalStakedAmount, options.decimals));
        });
    }
    return score || {};
}
exports.strategy = strategy;
