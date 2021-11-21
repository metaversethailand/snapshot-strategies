"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.strategy = exports.version = exports.author = void 0;
const units_1 = require("@ethersproject/units");
const utils_1 = require("../../utils");
exports.author = 'codingsh';
exports.version = '0.1.0';
const abi = [
    {
        constant: true,
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address'
            }
        ],
        name: 'balanceOf',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'totalSupply',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: true,
        inputs: [
            {
                internalType: 'address',
                name: 'addr',
                type: 'address'
            }
        ],
        name: 'totalStakedFor',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    }
];
async function strategy(space, network, provider, addresses, options, snapshot) {
    const blockTag = typeof snapshot === 'number' ? snapshot : 'latest';
    const multi = new utils_1.Multicaller(network, provider, abi, { blockTag });
    multi.call('uniswapBalance', options.token, 'balanceOf', [options.uniswap]);
    multi.call('uniswapTotalSupply', options.uniswap, 'totalSupply');
    addresses.forEach((address) => {
        multi.call(`scores.${address}.totalStaked`, options.sharePool, 'totalStakedFor', [address]);
        multi.call(`scores.${address}.uniswap`, options.uniswap, 'balanceOf', [
            address
        ]);
        multi.call(`scores.${address}.balance`, options.token, 'balanceOf', [
            address
        ]);
    });
    const result = await multi.execute();
    const rebasedPerLP = result.uniswapBalance;
    return Object.fromEntries(Array(addresses.length)
        .fill('')
        .map((_, i) => {
        const lpBalances = result.scores[addresses[i]].uniswap;
        const stakedLpBalances = result.scores[addresses[i]].totalStaked;
        const tokenBalances = result.scores[addresses[i]].balance;
        const lpBalance = lpBalances.add(stakedLpBalances);
        const rebasedLpBalance = lpBalance
            .add(tokenBalances)
            .mul(rebasedPerLP)
            .div((0, units_1.parseUnits)('1', 18));
        return [
            addresses[i],
            parseFloat((0, units_1.formatUnits)(rebasedLpBalance, options.decimals))
        ];
    }));
}
exports.strategy = strategy;
