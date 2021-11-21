"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.strategy = exports.version = exports.author = void 0;
const units_1 = require("@ethersproject/units");
const utils_1 = require("../../utils");
exports.author = '0xKiwi';
exports.version = '0.1.0';
const xINV = '0x65b35d6Eb7006e0e607BC54EB2dFD459923476fE';
const ONE_E18 = (0, units_1.parseUnits)('1', 18);
const abi = [
    'function balanceOf(address account) external view returns (uint256)',
    'function exchangeRateStored() external view returns (uint256)'
];
async function strategy(space, network, provider, addresses, options, snapshot) {
    const blockTag = typeof snapshot === 'number' ? snapshot : 'latest';
    const exchangeRateResp = await (0, utils_1.multicall)(network, provider, abi, [[xINV, 'exchangeRateStored', []]], { blockTag });
    const exchangeRate = exchangeRateResp[0][0];
    const balanceResp = await (0, utils_1.multicall)(network, provider, abi, addresses.map((address) => [xINV, 'balanceOf', [address]]), { blockTag });
    return Object.fromEntries(balanceResp.map((value, i) => [
        addresses[i],
        parseFloat((0, units_1.formatUnits)(value[0].mul(exchangeRate).div(ONE_E18).toString(), options.decimals))
    ]));
}
exports.strategy = strategy;
