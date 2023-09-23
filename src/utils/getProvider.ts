import { VITE_INFURA_API_KEY } from "@/const/constant";
import { getCurrentChain } from "@/store/atoms/currentChainAtom";
import { ethers } from "ethers";

export function getProvider() {
  const currentChain = getCurrentChain();
  return new ethers.providers.InfuraProvider(
    Number(currentChain.chainId),
    VITE_INFURA_API_KEY,
  );
}
