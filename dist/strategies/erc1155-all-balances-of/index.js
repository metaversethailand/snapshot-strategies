"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.strategy = exports.SUBGRAPH_URL = exports.version = exports.author = void 0;
const address_1 = require("@ethersproject/address");
const utils_1 = require("../../utils");
exports.author = 'fragosti';
exports.version = '0.1.0';
exports.SUBGRAPH_URL = {
    '1': 'https://api.thegraph.com/subgraphs/name/alexvorobiov/eip1155subgraph'
};
async function strategy(_space, network, _provider, addresses, options, snapshot) {
    const eip1155OwnersParams = {
        accounts: {
            __args: {
                where: {
                    id_in: addresses.map((a) => a.toLowerCase())
                }
            },
            id: true,
            balances: {
                value: true,
                token: {
                    registry: {
                        id: true
                    }
                }
            }
        }
    };
    if (snapshot !== 'latest') {
        // @ts-ignore
        eip1155OwnersParams.accounts.__args.block = { number: snapshot };
    }
    try {
        const result = await (0, utils_1.subgraphRequest)(exports.SUBGRAPH_URL[network], eip1155OwnersParams);
        return result.accounts.reduce((acc, val) => {
            const relevantTokenBalances = val.balances.filter((balance) => {
                const isRightAddress = balance.token.registry.id === options.address.toLowerCase();
                return isRightAddress;
            });
            acc[(0, address_1.getAddress)(val.id)] = relevantTokenBalances.reduce((acc, val) => acc + parseInt(val.value, 10), 0);
            return acc;
        }, {});
    }
    catch (err) {
        return {};
    }
}
exports.strategy = strategy;
