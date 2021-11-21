import { getDelegations } from './utils/delegation';
export declare function getScoresDirect(space: string, strategies: any[], network: string, provider: any, addresses: string[], snapshot?: number | string): Promise<any[]>;
export declare const multicall: typeof import("@snapshot-labs/snapshot.js/dist/utils").multicall, Multicaller: typeof import("@snapshot-labs/snapshot.js/dist/utils/multicaller").default, subgraphRequest: typeof import("@snapshot-labs/snapshot.js/dist/utils").subgraphRequest, ipfsGet: typeof import("@snapshot-labs/snapshot.js/dist/utils").ipfsGet, call: typeof import("@snapshot-labs/snapshot.js/dist/utils").call, getBlockNumber: typeof import("@snapshot-labs/snapshot.js/dist/utils/web3").getBlockNumber, getProvider: typeof import("@snapshot-labs/snapshot.js/dist/utils/provider").default;
declare const _default: {
    getScoresDirect: typeof getScoresDirect;
    multicall: typeof import("@snapshot-labs/snapshot.js/dist/utils").multicall;
    Multicaller: typeof import("@snapshot-labs/snapshot.js/dist/utils/multicaller").default;
    subgraphRequest: typeof import("@snapshot-labs/snapshot.js/dist/utils").subgraphRequest;
    ipfsGet: typeof import("@snapshot-labs/snapshot.js/dist/utils").ipfsGet;
    call: typeof import("@snapshot-labs/snapshot.js/dist/utils").call;
    getBlockNumber: typeof import("@snapshot-labs/snapshot.js/dist/utils/web3").getBlockNumber;
    getProvider: typeof import("@snapshot-labs/snapshot.js/dist/utils/provider").default;
    getDelegations: typeof getDelegations;
};
export default _default;
