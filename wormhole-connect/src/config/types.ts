import {
  ChainConfig as BaseChainConfig,
  ChainName,
  TokenId,
  ChainResourceMap,
  Context,
} from '@wormhole-foundation/wormhole-connect-sdk';
import { ExtendedTheme } from 'theme';

export enum Icon {
  'AVAX' = 1,
  'BNB',
  'BSC',
  'CELO',
  'ETH',
  'FANTOM',
  'POLYGON',
  'SOLANA',
  'USDC',
  'GLMR',
  'DAI',
  'USDT',
  'BUSD',
  'WBTC',
  'SUI',
  'APT',
  'SEI',
  'BASE',
  'OSMO',
  'BONK',
  'TBTC',
  'WSTETH',
  'ARBITRUM',
  'OPTIMISM',
}

export enum Route {
  Bridge = 'bridge',
  Relay = 'relay',
  // Hashflow = 'hashflow',
  CosmosGateway = 'cosmosGateway',
  CCTPManual = 'cctpManual',
  CCTPRelay = 'cctpRelay',
}

export type SupportedRoutes = keyof typeof Route;

// TODO: preference is fromChain/toChain, but want to keep backwards compatibility
export interface BridgeDefaults {
  fromNetwork?: ChainName;
  toNetwork?: ChainName;
  token?: string;
  requiredNetwork?: ChainName;
}

export interface WormholeConnectConfig {
  env?: 'mainnet' | 'testnet' | 'devnet';
  rpcs?: ChainResourceMap;
  rest?: ChainResourceMap;
  networks?: ChainName[];
  tokens?: string[];
  mode?: 'dark' | 'light';
  customTheme?: ExtendedTheme;
  cta?: {
    text: string;
    link: string;
  };
  bridgeDefaults?: BridgeDefaults;
  routes?: string[];
  pageHeader?: string;
}

type DecimalsMap = Partial<Record<Context, number>> & {
  default: number;
};

export type TokenConfig = {
  key: string;
  symbol: string;
  nativeChain: ChainName;
  icon: Icon;
  tokenId?: TokenId; // if no token id, it is the native token
  coinGeckoId: string;
  color: string;
  decimals: DecimalsMap;
  wrappedAsset?: string;
  displayName?: string;
};

export type TokensConfig = { [key: string]: TokenConfig };

export interface ChainConfig extends BaseChainConfig {
  displayName: string;
  explorerUrl: string;
  explorerName: string;
  gasToken: string;
  chainId: number | string;
  icon: Icon;
  maxBlockSearch: number;
  automaticRelayer?: boolean;
}

export type ChainsConfig = {
  [chain in ChainName]?: ChainConfig;
};

export type GasEstimatesByOperation = {
  sendToken?: number;
  sendNative?: number;
  claim?: number;
};

export type GasEstimateOptions = keyof GasEstimatesByOperation;

export type GasEstimates = {
  [chain in ChainName]?: {
    [route in Route]?: GasEstimatesByOperation;
  };
};

export type RpcMapping = { [chain in ChainName]?: string };

export type NetworkData = {
  chains: ChainsConfig;
  tokens: TokensConfig;
  gasEstimates: GasEstimates;
  rpcs: RpcMapping;
  rest: RpcMapping;
};
