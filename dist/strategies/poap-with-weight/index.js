"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.strategy = exports.examples = exports.version = exports.author = void 0;
const utils_1 = require("../../utils");
const examples_json_1 = __importDefault(require("./examples.json"));
exports.author = 'gawainb';
exports.version = '1.0.0';
exports.examples = examples_json_1.default;
const POAP_API_ENDPOINT_URL = {
    '1': 'https://api.thegraph.com/subgraphs/name/poap-xyz/poap',
    '100': 'https://api.thegraph.com/subgraphs/name/poap-xyz/poap-xdai'
};
const getTokenSupply = {
    tokens: {
        __args: {
            where: {
                id_in: undefined
            }
        },
        event: {
            tokenCount: true
        },
        id: true,
        owner: {
            id: true
        }
    }
};
async function strategy(space, network, provider, addresses, options, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
snapshot) {
    // Set TokenIds as arguments for GQL query
    getTokenSupply.tokens.__args.where.id_in = options.tokenIds.map((token) => token.id);
    const poapWeights = {};
    const supplyResponse = await (0, utils_1.subgraphRequest)(POAP_API_ENDPOINT_URL[network], getTokenSupply);
    if (supplyResponse && supplyResponse.tokens) {
        supplyResponse.tokens.forEach((token) => {
            if (!poapWeights[token.owner.id.toLowerCase()])
                poapWeights[token.owner.id.toLowerCase()] = 0;
            poapWeights[token.owner.id.toLowerCase()] +=
                options.tokenIds.find((a) => a.id === token.id).weight *
                    parseInt(token.event.tokenCount);
        });
    }
    return Object.fromEntries(addresses.map((address) => [
        address,
        poapWeights[address.toLowerCase()] || 0
    ]));
}
exports.strategy = strategy;
