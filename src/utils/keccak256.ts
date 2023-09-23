import { ethers } from "ethers";

export function keccak256(value: string): string {
  return ethers.utils.keccak256(ethers.utils.toUtf8Bytes(value));
}
