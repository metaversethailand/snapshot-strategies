"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const nounsPower = __importStar(require("./nouns-rfp-power"));
const erc20Votes = __importStar(require("./erc20-votes"));
const antiWhale = __importStar(require("./anti-whale"));
const balancer = __importStar(require("./balancer"));
const balancerErc20InternalBalanceOf = __importStar(require("./balancer-erc20-internal-balance-of"));
const sunder = __importStar(require("./sunder"));
const balancerSmartPool = __importStar(require("./balancer-smart-pool"));
const contractCall = __importStar(require("./contract-call"));
const dextfVaults = __importStar(require("./dextf-staked-in-vaults"));
const dfynFarms = __importStar(require("./dfyn-staked-in-farms"));
const dfynVaults = __importStar(require("./dfyn-staked-in-vaults"));
const vDfynVault = __importStar(require("./balance-in-vdfyn-vault"));
const ensDomainsOwned = __importStar(require("./ens-domains-owned"));
const ensReverseRecord = __importStar(require("./ens-reverse-record"));
const governorDelegator = __importStar(require("./governor-delegator"));
const erc20BalanceOf = __importStar(require("./erc20-balance-of"));
const erc20BalanceOfCoeff = __importStar(require("./erc20-balance-of-coeff"));
const erc20BalanceOfFixedTotal = __importStar(require("./erc20-balance-of-fixed-total"));
const erc20BalanceOfCv = __importStar(require("./erc20-balance-of-cv"));
const erc20WithBalance = __importStar(require("./erc20-with-balance"));
const erc20BalanceOfDelegation = __importStar(require("./erc20-balance-of-delegation"));
const erc20BalanceOfQuadraticDelegation = __importStar(require("./erc20-balance-of-quadratic-delegation"));
const erc20BalanceOfWeighted = __importStar(require("./erc20-balance-of-weighted"));
const erc20Price = __importStar(require("./erc20-price"));
const balanceOfWithMin = __importStar(require("./balance-of-with-min"));
const balanceOfWithThresholds = __importStar(require("./balance-of-with-thresholds"));
const ethBalance = __importStar(require("./eth-balance"));
const ethWithBalance = __importStar(require("./eth-with-balance"));
const ethWalletAge = __importStar(require("./eth-wallet-age"));
const multichain = __importStar(require("./multichain"));
const makerDsChief = __importStar(require("./maker-ds-chief"));
const uni = __importStar(require("./uni"));
const yearnVault = __importStar(require("./yearn-vault"));
const fraxFinance = __importStar(require("./frax-finance"));
const moloch = __importStar(require("./moloch"));
const uniswap = __importStar(require("./uniswap"));
const faralandStaking = __importStar(require("./faraland-staking"));
const flashstake = __importStar(require("./flashstake"));
const pancake = __importStar(require("./pancake"));
const synthetix = __importStar(require("./synthetix"));
const synthetixQuadratic = __importStar(require("./synthetix-quadratic"));
const synthetixNonQuadratic = __importStar(require("./synthetix-non-quadratic"));
const ctoken = __importStar(require("./ctoken"));
const cream = __importStar(require("./cream"));
const esd = __importStar(require("./esd"));
const esdDelegation = __importStar(require("./esd-delegation"));
const stakedUniswap = __importStar(require("./staked-uniswap"));
const piedao = __importStar(require("./piedao"));
const ethReceived = __importStar(require("./eth-received"));
const erc20Received = __importStar(require("./erc20-received"));
const ethPhilanthropy = __importStar(require("./eth-philanthropy"));
const xDaiEasyStaking = __importStar(require("./xdai-easy-staking"));
const xDaiPOSDAOStaking = __importStar(require("./xdai-posdao-staking"));
const xDaiStakeHolders = __importStar(require("./xdai-stake-holders"));
const xDaiStakeDelegation = __importStar(require("./xdai-stake-delegation"));
const defidollar = __importStar(require("./defidollar"));
const aavegotchi = __importStar(require("./aavegotchi"));
const aavegotchiAgip = __importStar(require("./aavegotchi-agip"));
const mithcash = __importStar(require("./mithcash"));
const dittomoney = __importStar(require("./dittomoney"));
const balancerUnipool = __importStar(require("./balancer-unipool"));
const sushiswap = __importStar(require("./sushiswap"));
const masterchef = __importStar(require("./masterchef"));
const stablexswap = __importStar(require("./stablexswap"));
const stakedKeep = __importStar(require("./staked-keep"));
const typhoon = __importStar(require("./typhoon"));
const delegation = __importStar(require("./delegation"));
const ticket = __importStar(require("./ticket"));
const work = __importStar(require("./work"));
const ticketValidity = __importStar(require("./ticket-validity"));
const opium = __importStar(require("./opium"));
const ocean = __importStar(require("./ocean-marketplace"));
const theGraphBalance = __importStar(require("./the-graph-balance"));
const theGraphDelegation = __importStar(require("./the-graph-delegation"));
const theGraphIndexing = __importStar(require("./the-graph-indexing"));
const whitelist = __importStar(require("./whitelist"));
const tokenlon = __importStar(require("./tokenlon"));
const rebased = __importStar(require("./rebased"));
const pobHash = __importStar(require("./pob-hash"));
const totalAxionShares = __importStar(require("./total-axion-shares"));
const erc1155BalanceOf = __importStar(require("./erc1155-balance-of"));
const erc1155BalanceOfCv = __importStar(require("./erc1155-balance-of-cv"));
const compLikeVotes = __importStar(require("./comp-like-votes"));
const governorAlpha = __importStar(require("./governor-alpha"));
const pagination = __importStar(require("./pagination"));
const rulerStakedToken = __importStar(require("./ruler-staked-token"));
const rulerStakedLP = __importStar(require("./ruler-staked-lp"));
const xcover = __importStar(require("./xcover"));
const niuStaked = __importStar(require("./niu-staked"));
const mushrooms = __importStar(require("./mushrooms"));
const curioCardsErc20Weighted = __importStar(require("./curio-cards-erc20-weighted"));
const saffronFinance = __importStar(require("./saffron-finance"));
const saffronFinanceV2 = __importStar(require("./saffron-finance-v2"));
const renNodes = __importStar(require("./ren-nodes"));
const multisigOwners = __importStar(require("./multisig-owners"));
const trancheStaking = __importStar(require("./tranche-staking"));
const pepemon = __importStar(require("./pepemon"));
const erc1155AllBalancesOf = __importStar(require("./erc1155-all-balances-of"));
const trancheStakingLP = __importStar(require("./tranche-staking-lp"));
const masterchefPoolBalance = __importStar(require("./masterchef-pool-balance"));
const masterchefPoolBalancePrice = __importStar(require("./masterchef-pool-balance-price"));
const avnBalanceOfStaked = __importStar(require("./avn-balance-of-staked"));
const badgeth = __importStar(require("./badgeth"));
const api = __importStar(require("./api"));
const xseen = __importStar(require("./xseen"));
const molochAll = __importStar(require("./moloch-all"));
const molochLoot = __importStar(require("./moloch-loot"));
const erc721Enumerable = __importStar(require("./erc721-enumerable"));
const erc721WithMultiplier = __importStar(require("./erc721-with-multiplier"));
const erc721WithTokenId = __importStar(require("./erc721-with-tokenid"));
const hoprUniLpFarm = __importStar(require("./hopr-uni-lp-farm"));
const erc721 = __importStar(require("./erc721"));
const erc721MultiRegistry = __importStar(require("./erc721-multi-registry"));
const apescape = __importStar(require("./apescape"));
const liftkitchen = __importStar(require("./liftkitchen"));
const coordinape = __importStar(require("./coordinape"));
const decentralandEstateSize = __importStar(require("./decentraland-estate-size"));
const iotexBalance = __importStar(require("./iotex-balance"));
const iotexStakedBalance = __importStar(require("./iotex-staked-balance"));
const xrc20BalanceOf = __importStar(require("./xrc20-balance-of"));
const brightid = __importStar(require("./brightid"));
const inverseXINV = __importStar(require("./inverse-xinv"));
const modefi = __importStar(require("./modefi"));
const modefiStaking = __importStar(require("./modefi-staking"));
const spookyswap = __importStar(require("./spookyswap"));
const rnbwBalance = __importStar(require("./rnbw-balance"));
const celerSgnDelegation = __importStar(require("./celer-sgn-delegation"));
const balancerDelegation = __importStar(require("./balancer-delegation"));
const infinityProtocolPools = __importStar(require("./infinityprotocol-liquidity-pools"));
const aaveGovernancePower = __importStar(require("./aave-governance-power"));
const cake = __importStar(require("./cake"));
const aks = __importStar(require("./aks"));
const planetFinance = __importStar(require("./planet-finance"));
const impossibleFinance = __importStar(require("./impossible-finance"));
const ogn = __importStar(require("./ogn"));
const zrxVotingPower = __importStar(require("./zrx-voting-power"));
const tombFinance = __importStar(require("./tomb-finance"));
const trancheStakingSLICE = __importStar(require("./tranche-staking-slice"));
const unipoolSameToken = __importStar(require("./unipool-same-token"));
const unipoolUniv2Lp = __importStar(require("./unipool-univ2-lp"));
const poapWithWeight = __importStar(require("./poap-with-weight"));
const uniswapV3 = __importStar(require("./uniswap-v3"));
const uniswapV3Staking = __importStar(require("./uniswap-v3-staking"));
const l2Deversifi = __importStar(require("./l2-deversifi"));
const vestedDeversifi = __importStar(require("./vested-deversifi"));
const biswap = __importStar(require("./biswap"));
const honeyswap = __importStar(require("./honeyswap"));
const eglVote = __importStar(require("./egl-vote"));
const mcnFarm = __importStar(require("./mcn-farm"));
const snowswap = __importStar(require("./snowswap"));
const meebitsdao = __importStar(require("./meebitsdao"));
const holdsTokens = __importStar(require("./holds-tokens"));
const crucibleERC20BalanceOf = __importStar(require("./crucible-erc20-balance-of"));
const hasrock = __importStar(require("./has-rock"));
const flexaCapacityStaking = __importStar(require("./flexa-capacity-staking"));
const sunriseGamingUniv2Lp = __importStar(require("./sunrisegaming-univ2-lp"));
const sunriseGamingStaking = __importStar(require("./sunrisegaming-staking"));
const singleStakingPoolsBalanceOf = __importStar(require("./single-staking-pools-balanceof"));
const occStakeOf = __importStar(require("./occ-stake-of"));
const hoprStaking = __importStar(require("./hopr-staking"));
const hoprBridgedBalance = __importStar(require("./hopr-bridged-balance"));
const lootCharacterGuilds = __importStar(require("./loot-character-guilds"));
const swapr = __importStar(require("./swapr"));
const cyberkongz = __importStar(require("./cyberkongz"));
const compLikeVotesInclusive = __importStar(require("./comp-like-votes-inclusive"));
const mstable = __importStar(require("./mstable"));
const hashesVoting = __importStar(require("./hashes-voting"));
const podLeader = __importStar(require("./pod-leader"));
const aavegotchiWagmiGuild = __importStar(require("./aavegotchi-wagmi-guild"));
const polisBalance = __importStar(require("./polis-balance"));
const techQuadraticRankedChoice = __importStar(require("./tech-quadratic-ranked-choice"));
const mutantCatsStakersAndHolders = __importStar(require("./mutant-cats-stakers-and-holders"));
const vaultTokenLpBalance = __importStar(require("./vault-token-lp-balance"));
const singleStakingVaultBalanceOf = __importStar(require("./single-staking-vault-balanceof"));
const svsStaking = __importStar(require("./svs-staking"));
const mcbBalanceFromGraph = __importStar(require("./mcb-balance-from-graph"));
const colonyReputation = __importStar(require("./colony-reputation"));
const radicleCommunityTokens = __importStar(require("./radicle-community-tokens"));
const digitalaxMonaQuickswap = __importStar(require("./digitalax-mona-quickswap"));
const digitalaxGenesisContribution = __importStar(require("./digitalax-genesis-contribution"));
const digitalaxLPStakers = __importStar(require("./digitalax-lp-stakers"));
const galaxyNftWithScore = __importStar(require("./galaxy-nft-with-score"));
const vesper = __importStar(require("./vesper"));
const thales = __importStar(require("./thales"));
const bscMvb = __importStar(require("./bsc-mvb"));
const coinswap = __importStar(require("./coinswap"));
const strategies = {
    'nouns-rfp-power': nounsPower,
    coordinape,
    'anti-whale': antiWhale,
    balancer,
    sunder,
    'balancer-smart-pool': balancerSmartPool,
    'balancer-erc20-internal-balance-of': balancerErc20InternalBalanceOf,
    'balance-in-vdfyn-vault': vDfynVault,
    'erc20-received': erc20Received,
    'contract-call': contractCall,
    'dextf-staked-in-vaults': dextfVaults,
    'dfyn-staked-in-farms': dfynFarms,
    'dfyn-staked-in-vaults': dfynVaults,
    'eth-received': ethReceived,
    'eth-philanthropy': ethPhilanthropy,
    'ens-domains-owned': ensDomainsOwned,
    'ens-reverse-record': ensReverseRecord,
    'governor-delegator': governorDelegator,
    'erc20-balance-of': erc20BalanceOf,
    'erc20-votes': erc20Votes,
    'erc20-balance-of-fixed-total': erc20BalanceOfFixedTotal,
    'erc20-balance-of-cv': erc20BalanceOfCv,
    'erc20-balance-of-coeff': erc20BalanceOfCoeff,
    'erc20-with-balance': erc20WithBalance,
    'erc20-balance-of-delegation': erc20BalanceOfDelegation,
    'erc20-balance-of-quadratic-delegation': erc20BalanceOfQuadraticDelegation,
    'erc20-balance-of-weighted': erc20BalanceOfWeighted,
    'erc20-price': erc20Price,
    'balance-of-with-min': balanceOfWithMin,
    'balance-of-with-thresholds': balanceOfWithThresholds,
    'eth-balance': ethBalance,
    'eth-with-balance': ethWithBalance,
    'eth-wallet-age': ethWalletAge,
    'maker-ds-chief': makerDsChief,
    erc721,
    'erc721-enumerable': erc721Enumerable,
    'erc721-with-multiplier': erc721WithMultiplier,
    'erc721-with-tokenid': erc721WithTokenId,
    'erc721-multi-registry': erc721MultiRegistry,
    'erc1155-balance-of': erc1155BalanceOf,
    'erc1155-balance-of-cv': erc1155BalanceOfCv,
    multichain,
    uni,
    'frax-finance': fraxFinance,
    'yearn-vault': yearnVault,
    moloch,
    masterchef,
    sushiswap,
    uniswap,
    'faraland-staking': faralandStaking,
    flashstake,
    pancake,
    synthetix,
    'synthetix-quadratic': synthetixQuadratic,
    'synthetix-non-quadratic': synthetixNonQuadratic,
    ctoken,
    cream,
    'staked-uniswap': stakedUniswap,
    esd,
    'esd-delegation': esdDelegation,
    piedao,
    'xdai-easy-staking': xDaiEasyStaking,
    'xdai-posdao-staking': xDaiPOSDAOStaking,
    'xdai-stake-holders': xDaiStakeHolders,
    'xdai-stake-delegation': xDaiStakeDelegation,
    defidollar,
    aavegotchi,
    'aavegotchi-agip': aavegotchiAgip,
    mithcash,
    stablexswap,
    dittomoney,
    'staked-keep': stakedKeep,
    'balancer-unipool': balancerUnipool,
    typhoon,
    delegation,
    ticket,
    work,
    'ticket-validity': ticketValidity,
    opium,
    'ocean-marketplace': ocean,
    'the-graph-balance': theGraphBalance,
    'the-graph-delegation': theGraphDelegation,
    'the-graph-indexing': theGraphIndexing,
    whitelist,
    tokenlon,
    rebased,
    'pob-hash': pobHash,
    'total-axion-shares': totalAxionShares,
    'comp-like-votes': compLikeVotes,
    'governor-alpha': governorAlpha,
    pagination,
    'ruler-staked-token': rulerStakedToken,
    'ruler-staked-lp': rulerStakedLP,
    xcover,
    'niu-staked': niuStaked,
    mushrooms: mushrooms,
    'curio-cards-erc20-weighted': curioCardsErc20Weighted,
    'ren-nodes': renNodes,
    'multisig-owners': multisigOwners,
    'tranche-staking': trancheStaking,
    pepemon,
    'erc1155-all-balances-of': erc1155AllBalancesOf,
    'saffron-finance': saffronFinance,
    'saffron-finance-v2': saffronFinanceV2,
    'tranche-staking-lp': trancheStakingLP,
    'masterchef-pool-balance': masterchefPoolBalance,
    'masterchef-pool-balance-price': masterchefPoolBalancePrice,
    'avn-balance-of-staked': avnBalanceOfStaked,
    api,
    xseen,
    'moloch-all': molochAll,
    'moloch-loot': molochLoot,
    'hopr-uni-lp-farm': hoprUniLpFarm,
    apescape,
    liftkitchen,
    'decentraland-estate-size': decentralandEstateSize,
    brightid,
    'inverse-xinv': inverseXINV,
    modefi,
    'modefi-staking': modefiStaking,
    'iotex-balance': iotexBalance,
    'iotex-staked-balance': iotexStakedBalance,
    'xrc20-balance-of': xrc20BalanceOf,
    spookyswap,
    'rnbw-balance': rnbwBalance,
    'celer-sgn-delegation': celerSgnDelegation,
    'balancer-delegation': balancerDelegation,
    'infinityprotocol-liquidity-pools': infinityProtocolPools,
    'aave-governance-power': aaveGovernancePower,
    cake,
    aks,
    'planet-finance': planetFinance,
    ogn,
    'impossible-finance': impossibleFinance,
    badgeth,
    'zrx-voting-power': zrxVotingPower,
    'tomb-finance': tombFinance,
    'tranche-staking-slice': trancheStakingSLICE,
    'unipool-same-token': unipoolSameToken,
    'unipool-univ2-lp': unipoolUniv2Lp,
    'poap-with-weight': poapWithWeight,
    'uniswap-v3': uniswapV3,
    'uniswap-v3-staking': uniswapV3Staking,
    'l2-deversifi': l2Deversifi,
    'vested-deversifi': vestedDeversifi,
    biswap,
    honeyswap,
    'egl-vote': eglVote,
    'mcn-farm': mcnFarm,
    snowswap,
    meebitsdao,
    'crucible-erc20-balance-of': crucibleERC20BalanceOf,
    'has-rock': hasrock,
    'flexa-capacity-staking': flexaCapacityStaking,
    'sunrisegaming-univ2-lp': sunriseGamingUniv2Lp,
    'sunrisegaming-staking': sunriseGamingStaking,
    'single-staking-pools-balanceof': singleStakingPoolsBalanceOf,
    'hopr-staking': hoprStaking,
    'hopr-bridged-balance': hoprBridgedBalance,
    'occ-stake-of': occStakeOf,
    swapr,
    'holds-tokens': holdsTokens,
    'loot-character-guilds': lootCharacterGuilds,
    cyberkongz: cyberkongz,
    'comp-like-votes-inclusive': compLikeVotesInclusive,
    mstable,
    'hashes-voting': hashesVoting,
    'pod-leader': podLeader,
    'aavegotchi-wagmi-guild': aavegotchiWagmiGuild,
    'polis-balance': polisBalance,
    'vault-token-lp-balance': vaultTokenLpBalance,
    'single-staking-vault-balanceof': singleStakingVaultBalanceOf,
    'mutant-cats-stakers-and-holders': mutantCatsStakersAndHolders,
    'svs-staking': svsStaking,
    'mcb-balance-from-graph': mcbBalanceFromGraph,
    'radicle-community-tokens': radicleCommunityTokens,
    'digitalax-mona-quickswap': digitalaxMonaQuickswap,
    'digitalax-genesis-contribution': digitalaxGenesisContribution,
    'digitalax-lp-stakers': digitalaxLPStakers,
    'colony-reputation': colonyReputation,
    'galaxy-nft-with-score': galaxyNftWithScore,
    vesper,
    thales,
    'tech-quadratic-ranked-choice': techQuadraticRankedChoice,
    'bsc-mvb': bscMvb,
    coinswap
};
Object.keys(strategies).forEach(function (strategyName) {
    let examples = null;
    let about = '';
    try {
        examples = JSON.parse((0, fs_1.readFileSync)(path_1.default.join(__dirname, strategyName, 'examples.json'), 'utf8'));
    }
    catch (error) {
        examples = null;
    }
    try {
        about = (0, fs_1.readFileSync)(path_1.default.join(__dirname, strategyName, 'README.md'), 'utf8');
    }
    catch (error) {
        about = '';
    }
    strategies[strategyName].examples = examples;
    strategies[strategyName].about = about;
});
exports.default = strategies;
