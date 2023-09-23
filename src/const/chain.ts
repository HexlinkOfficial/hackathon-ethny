export interface Chain {
  name: string;
  chainId: string;
  rpcUrls: string[];
  fullName: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  blockExplorerUrls: string[];
  logoUrl: string;
}

export const SEPOLIA: Chain = {
  chainId: "11155111",
  rpcUrls: ["https://sepolia.infura.io/v3/"],
  name: "sepolia",
  fullName: "Sepolia Test Network",
  nativeCurrency: {
    name: "Sepolia Ethereum",
    symbol: "sETH",
    decimals: 18,
  },
  blockExplorerUrls: ["https://sepolia.etherscan.io"],
  logoUrl: "https://i.postimg.cc/qqFqP08S/ethPNG.png",
};

export const GOERLI: Chain = {
  chainId: "5",
  name: "goerli",
  fullName: "Goerli Test Network",
  rpcUrls: ["https://goerli.infura.io/v3/"],
  nativeCurrency: {
    name: "Goerli Ethereum",
    symbol: "gETH",
    decimals: 18,
  },
  blockExplorerUrls: ["https://goerli.etherscan.io"],
  logoUrl: "https://i.postimg.cc/qqFqP08S/ethPNG.png",
};

export const POLYGON: Chain = {
  chainId: "137",
  rpcUrls: ["https://polygon-mainnet.infura.io/v3/"],
  name: "polygon",
  fullName: "Polygon Network",
  nativeCurrency: {
    name: "MATIC",
    symbol: "MATIC",
    decimals: 18,
  },
  blockExplorerUrls: ["https://polygonscan.com"],
  logoUrl:
    "https://token.metaswap.codefi.network/assets/networkLogos/polygon.svg",
};

export const MUMBAI: Chain = {
  chainId: "80001",
  rpcUrls: ["https://polygon-mumbai.infura.io/v3/"],
  name: "mumbai",
  fullName: "Polygon Test Network",
  nativeCurrency: {
    name: "MATIC",
    symbol: "MATIC",
    decimals: 18,
  },
  blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
  logoUrl:
    "https://token.metaswap.codefi.network/assets/networkLogos/polygon.svg",
};

export const GALILEO: Chain = {
  chainId: "3334",
  rpcUrls: ["https://galileo.web3q.io:8545"],
  name: "galileo",
  fullName: "Web3Q Galileo Test Network",
  nativeCurrency: {
    name: "W3Q",
    symbol: "W3Q",
    decimals: 18,
  },
  blockExplorerUrls: ["https://explorer.galileo.web3q.io/"],
  logoUrl: "",
};

export const ARBITRUM_TESTNET: Chain = {
  chainId: "421613",
  rpcUrls: ["https://endpoints.omniatech.io/v1/arbitrum/goerli/public"],
  name: "arbitrum_testnet",
  fullName: "Arbitrum Test Network",
  nativeCurrency: {
    name: "Arbitrum Ethereum",
    symbol: "aETH",
    decimals: 18,
  },
  blockExplorerUrls: ["https://goerli-rollup-explorer.arbitrum.io"],
  logoUrl: "https://i.postimg.cc/020dzv9j/nova.png",
};

export const ARBITRUM_NOVA: Chain = {
  chainId: "42170",
  rpcUrls: ["https://nova.arbitrum.io/rpc"],
  name: "arbitrum_nova",
  fullName: "Arbitrum Nova",
  nativeCurrency: {
    name: "Ethereum",
    symbol: "ETH",
    decimals: 18,
  },
  blockExplorerUrls: ["https://nova-explorer.arbitrum.io/"],
  logoUrl: "https://i.postimg.cc/020dzv9j/nova.png",
};

export const ARBITRUM: Chain = {
  chainId: "42161",
  rpcUrls: ["https://arb1.arbitrum.io/rpc"],
  name: "arbitrum",
  fullName: "Arbitrum One",
  nativeCurrency: {
    name: "Arbitrum Ethereum",
    symbol: "AETH",
    decimals: 18,
  },
  blockExplorerUrls: ["https://explorer.arbitrum.io/"],
  logoUrl: "https://i.postimg.cc/mkJcpr2T/arbilogo.png",
};

export const OK_TESTNET: Chain = {
  chainId: "65",
  rpcUrls: ["https://exchaintestrpc.okex.org"],
  name: "OKT",
  fullName: "OKT",
  nativeCurrency: {
    name: "OKT",
    symbol: "OKT",
    decimals: 18,
  },
  blockExplorerUrls: ["https://www.oklink.com/okc-test"],
  logoUrl: "https://static.oklink.com/cdn/assets/imgs/221/C267A35E6CF3829C.png",
};

export const NAUTILUS_TESTNET: Chain = {
  chainId: "88002",
  rpcUrls: ["https://api.proteus.nautchain.xyz/solana"],
  name: "Nautilus",
  fullName: "Nautilus",
  nativeCurrency: {
    name: "ZBC",
    symbol: "ZBC",
    decimals: 18,
  },
  blockExplorerUrls: ["https://proteus.nautscan.com/"],
  logoUrl: "https://static.okx.com/cdn/oksupport/asset/currency/icon/zbc.png",
};
