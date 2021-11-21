"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.strategy = exports.examples = exports.version = exports.author = void 0;
const bignumber_1 = require("@ethersproject/bignumber");
const units_1 = require("@ethersproject/units");
const utils_1 = require("../../utils");
const examples_json_1 = __importDefault(require("./examples.json"));
exports.author = 'biswap-dex';
exports.version = '0.0.1';
exports.examples = examples_json_1.default;
const abi = [
    'function balanceOf(address account) external view returns (uint256)'
];
const masterChefAbi = [
    'function userInfo(uint256, address) view returns (uint256 amount, uint256 rewardDebt)',
    'function totalSupply() view returns (uint256)',
    'function balanceOf(address _owner) view returns (uint256 balance)'
];
const smartChefAbi = [
    'function userInfo(address) view returns (uint256 amount, uint256 rewardDebt)'
];
const autoBswAbi = [
    'function userInfo(address) view returns (uint256 amount, uint256 rewardDebt)',
    'function getPricePerFullShare() view returns (uint256)'
];
const bn = (num) => {
    return bignumber_1.BigNumber.from(num.toString());
};
const addUserBalance = (userBalances, user, balance) => {
    if (userBalances[user]) {
        return (userBalances[user] = userBalances[user].add(balance));
    }
    else {
        return (userBalances[user] = balance);
    }
};
async function strategy(space, network, provider, addresses, options, snapshot) {
    const blockTag = typeof snapshot === 'number' ? snapshot : 'latest';
    /*
      Balance in BSW token
    */
    const multi = new utils_1.Multicaller(network, provider, abi, { blockTag });
    addresses.forEach((address) => multi.call(address, options.address, 'balanceOf', [address]));
    const resultToken = await multi.execute();
    /*
      Balance in MasterChef pool BSW - BSW
    */
    const multiMasterChef = new utils_1.Multicaller(network, provider, masterChefAbi, {
        blockTag
    });
    addresses.forEach((address) => multiMasterChef.call(address, options.masterChef, 'userInfo', [
        '0',
        address
    ]));
    const resultMasterChef = await multiMasterChef.execute();
    /*
      Balance in Launch pools
    */
    const multiSmartChef = new utils_1.Multicaller(network, provider, smartChefAbi, {
        blockTag
    });
    options.smartChef.forEach((smartChefAddress) => {
        addresses.forEach((address) => multiSmartChef.call(smartChefAddress + '-' + address, smartChefAddress, 'userInfo', [address]));
    });
    const resultSmartChef = await multiSmartChef.execute();
    /*
      Staked LPs in BSW farms
    */
    const multiBswLPs = new utils_1.Multicaller(network, provider, masterChefAbi, {
        blockTag
    });
    options.bswLPs.forEach((bswLpAddr) => {
        multiBswLPs.call('balanceOf', options.address, 'balanceOf', [
            bswLpAddr.address
        ]);
        multiBswLPs.call('totalSupply', bswLpAddr.address, 'totalSupply');
        addresses.forEach((address) => multiBswLPs.call(bswLpAddr.address + '-' + address, options.masterChef, 'userInfo', [bswLpAddr.pid, address]));
    });
    const resultBswLPs = await multiBswLPs.execute();
    /*
      Balance BSW in auto compound pool
    */
    const autoBswMulti = new utils_1.Multicaller(network, provider, autoBswAbi, {
        blockTag
    });
    autoBswMulti.call('priceShare', options.autoBsw, 'getPricePerFullShare');
    addresses.forEach((address) => {
        autoBswMulti.call(address, options.autoBsw, 'userInfo', [address]);
    });
    const resultAutoBsw = await autoBswMulti.execute();
    const userBalances = [];
    for (let i = 0; i < addresses.length - 1; i++) {
        userBalances[addresses[i]] = bn(0);
    }
    Object.fromEntries(Object.entries(resultMasterChef).map(([address, balance]) => {
        return addUserBalance(userBalances, address, balance[0]);
    }));
    Object.fromEntries(Object.entries(resultToken).map(([address, balance]) => {
        return addUserBalance(userBalances, address, balance);
    }));
    options.smartChef.forEach((smartChefAddr) => {
        addresses.forEach((userAddr) => {
            addUserBalance(userBalances, userAddr, resultSmartChef[smartChefAddr + '-' + userAddr][0]);
        });
    });
    options.bswLPs.forEach((bswLPAddr) => {
        addresses.forEach((userAddr) => {
            addUserBalance(userBalances, userAddr, bn(resultBswLPs[bswLPAddr.address + '-' + userAddr][0])
                .mul(bn(resultBswLPs.balanceOf))
                .div(bn(resultBswLPs.totalSupply)));
        });
    });
    addresses.forEach((userAddr) => {
        addUserBalance(userBalances, userAddr, resultAutoBsw[userAddr][0]
            .mul(resultAutoBsw.priceShare)
            .div(bn((0, units_1.parseUnits)('1', options.decimals))));
    });
    return Object.fromEntries(Object.entries(userBalances).map(([address, balance]) => [
        address,
        // @ts-ignore
        parseFloat((0, units_1.formatUnits)(balance, options.decimals))
    ]));
}
exports.strategy = strategy;
