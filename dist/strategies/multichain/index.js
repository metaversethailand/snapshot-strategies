"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.strategy = exports.version = exports.author = void 0;
const utils_1 = require("../../utils");
const utils_2 = require("../../utils");
const __1 = __importDefault(require(".."));
exports.author = 'kesar';
exports.version = '1.0.2';
const defaultGraphs = {
    '56': 'https://api.thegraph.com/subgraphs/name/apyvision/block-info',
    '137': 'https://api.thegraph.com/subgraphs/name/sameepsi/maticblocks',
    '42161': 'https://api.thegraph.com/subgraphs/name/ianlapham/arbitrum-one-blocks'
};
async function getChainBlockNumber(timestamp, graphURL) {
    const query = {
        blocks: {
            __args: {
                first: 1,
                orderBy: 'number',
                orderDirection: 'desc',
                where: {
                    timestamp_lte: timestamp
                }
            },
            number: true,
            timestamp: true
        }
    };
    const data = await (0, utils_1.subgraphRequest)(graphURL, query);
    return Number(data.blocks[0].number);
}
async function getChainBlocks(snapshot, provider, options, network) {
    const blockTag = typeof snapshot === 'number' ? snapshot : 'latest';
    const block = await provider.getBlock(blockTag);
    const chainBlocks = {};
    for (const strategy of options.strategies) {
        if (chainBlocks[strategy.network]) {
            continue;
        }
        if (blockTag === 'latest' || strategy.network === network) {
            chainBlocks[strategy.network] = blockTag;
        }
        else {
            const graph = options.graphs?.[strategy.network] || defaultGraphs[strategy.network];
            chainBlocks[strategy.network] = await getChainBlockNumber(block.timestamp, graph);
        }
    }
    return chainBlocks;
}
async function strategy(space, network, provider, addresses, options, snapshot) {
    const promises = [];
    const chainBlocks = await getChainBlocks(snapshot, provider, options, network);
    for (const strategy of options.strategies) {
        // If snapshot is taken before a network is activated then ignore its strategies
        if (options.startBlocks &&
            chainBlocks[strategy.network] < options.startBlocks[strategy.network]) {
            continue;
        }
        promises.push(__1.default[strategy.name].strategy(space, strategy.network, (0, utils_2.getProvider)(strategy.network), addresses, strategy.params, chainBlocks[strategy.network]));
    }
    const results = await Promise.all(promises);
    return results.reduce((finalResults, strategyResult) => {
        for (const [address, value] of Object.entries(strategyResult)) {
            if (!finalResults[address]) {
                finalResults[address] = 0;
            }
            finalResults[address] += value;
        }
        return finalResults;
    }, {});
}
exports.strategy = strategy;
