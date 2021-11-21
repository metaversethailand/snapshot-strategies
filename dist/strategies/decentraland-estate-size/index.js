"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.strategy = exports.version = exports.author = void 0;
const address_1 = require("@ethersproject/address");
const utils_1 = require("../../utils");
exports.author = '2fd';
exports.version = '0.1.0';
const DECENTRALAND_MARKETPLACE_SUBGRAPH_URL = {
    '1': 'https://api.thegraph.com/subgraphs/name/decentraland/marketplace',
    '3': 'https://api.thegraph.com/subgraphs/name/decentraland/marketplaceropsten'
};
async function strategy(space, network, provider, addresses, options, snapshot) {
    const multipler = options.multiplier || 1;
    const params = {
        nfts: {
            __args: {
                where: {
                    owner_in: addresses.map((address) => address.toLowerCase()),
                    category: 'estate',
                    searchEstateSize_gt: 0
                },
                first: 1000,
                skip: 0
            },
            owner: {
                id: true
            },
            searchEstateSize: true
        }
    };
    if (snapshot !== 'latest') {
        // @ts-ignore
        params.nfts.__args.block = { number: snapshot };
    }
    const score = {};
    let hasNext = true;
    while (hasNext) {
        const result = await (0, utils_1.subgraphRequest)(DECENTRALAND_MARKETPLACE_SUBGRAPH_URL[network], params);
        const nfts = result && result.nfts ? result.nfts : [];
        for (const estate of nfts) {
            const userAddress = (0, address_1.getAddress)(estate.owner.id);
            score[userAddress] =
                (score[userAddress] || 0) + estate.searchEstateSize * multipler;
        }
        params.nfts.__args.skip += params.nfts.__args.first;
        hasNext = nfts.length === params.nfts.__args.first;
    }
    return score;
}
exports.strategy = strategy;
