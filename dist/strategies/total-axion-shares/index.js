"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.strategy = exports.version = exports.author = void 0;
const utils_1 = require("../../utils");
const bignumber_1 = require("@ethersproject/bignumber");
exports.author = 'Axion Foundation';
exports.version = '0.2.0';
const data_reader_address = '0x421456eFcEBf814975c8739CD613e5e7a954C474';
const data_reader_abi = [
    {
        name: 'getDaoShares',
        stateMutability: 'view',
        type: 'function',
        inputs: [
            {
                internalType: 'address',
                name: 'account',
                type: 'address'
            }
        ],
        outputs: [
            {
                internalType: 'uint256',
                name: 'daoShares',
                type: 'uint256'
            }
        ]
    }
];
async function strategy(space, network, provider, addresses, options, snapshot) {
    const blockTag = typeof snapshot === 'number' ? snapshot : 'latest';
    const totalShares = await (0, utils_1.multicall)(network, provider, data_reader_abi, addresses.map((addr) => [
        data_reader_address,
        'getDaoShares',
        [addr]
    ]), { blockTag });
    const shares_by_address = {};
    const _1e18 = bignumber_1.BigNumber.from('1000000000000000000');
    totalShares.forEach((v, i) => {
        const sharesBN = bignumber_1.BigNumber.from(v.toString());
        shares_by_address[addresses[i]] = sharesBN.div(_1e18).toNumber();
    });
    return shares_by_address;
}
exports.strategy = strategy;
