import { ethers, type BigNumberish } from "ethers";
import {
  Hexlink__factory,
  Account__factory,
  INameService__factory,
} from "@hexlink/contracts";
import { EntryPoint__factory } from "@account-abstraction/contracts";
import {
  ACCOUNT_FACTORY,
  ACCOUNT_FACTORY_DEV,
  VITE_DAUTH_VALIDATOR,
  HEXLINK_VALIDATOR,
  HEXLINK_VALIDATOR_DEV,
  VITE_USE_FUNCTIONS_EMULATOR,
} from "@/const/constant";
import { getProvider } from "@/utils/getProvider";
import { keccak256 } from "@/utils/keccak256";

export const getHexlinkContract = () => {
  const provider = getProvider();
  const hexlinkAddr =
    VITE_USE_FUNCTIONS_EMULATOR === "true"
      ? ACCOUNT_FACTORY_DEV
      : ACCOUNT_FACTORY;
  return Hexlink__factory.connect(hexlinkAddr, provider);
};

export async function isContract(address: string): Promise<boolean> {
  try {
    const code = await getProvider().getCode(address);
    if (code !== "0x") return true;
  } catch (error) {}
  return false;
}

export async function getAccountAddress(name: string) {
  const hexlink = getHexlinkContract();
  return await hexlink.getOwnedAccount(keccak256(name));
}

export async function getNonce(entryPoint: string, account: string) {
  const ep = EntryPoint__factory.connect(entryPoint, getProvider());
  return await ep.getNonce(account, 0);
}

export function buildAccountExecData(
  target: string,
  value?: BigNumberish,
  data?: string | [],
) {
  const iface = new ethers.utils.Interface(Account__factory.abi);
  return iface.encodeFunctionData("execute", [target, value ?? 0, data ?? ""]);
}

export async function getAuthFactors(
  name: string,
): Promise<{ first: string; second: string | null }> {
  const hexlink = getHexlinkContract();
  const accountAddr = await getAccountAddress(name);
  if (await isContract(accountAddr)) {
    const account: ethers.Contract = Account__factory.connect(
      accountAddr,
      getProvider(),
    );
    const version = await getAccountVersionImpl(hexlink, account);
    return {
      first: await account.getNameOwner(),
      second: version === 0 ? null : await account.getSecondFactor(),
    };
  } else {
    const ns = INameService__factory.connect(
      await hexlink.getNameService(),
      getProvider(),
    );
    return {
      first: await ns.defaultOwner(),
      second: null,
    };
  }
}

export async function getAccountVersion(name: string) {
  const hexlink = getHexlinkContract();
  const accountAddr = await getAccountAddress(name);
  const account = Account__factory.connect(accountAddr, getProvider());
  if (await isContract(accountAddr)) {
    return await getAccountVersionImpl(hexlink, account);
  } else {
    const version = await hexlink.getLatestVersion();
    return version.toNumber();
  }
}

export async function isAccountLatest(name: string) {
  const hexlink = getHexlinkContract();
  const accountAddr = await getAccountAddress(name);
  const account = Account__factory.connect(accountAddr, getProvider());
  if (await isContract(accountAddr)) {
    return (
      (await getAccountVersionImpl(hexlink, account)) ===
      (await hexlink.getLatestVersion()).toNumber()
    );
  } else {
    return true;
  }
}

async function getAccountVersionImpl(
  hexlink: ethers.Contract,
  account: ethers.Contract,
): Promise<number> {
  let version: number = 0;
  try {
    const v = await account.version();
    const latestVersion = await hexlink.getLatestVersion();
    if (v.gt(latestVersion)) {
      throw new Error("Invalid version");
    }
    version = v.toNumber();
  } catch (err) {
    // contract doesn't support version
    console.log(err);
  }
  return version;
}

export function isDAuthValidator(address: string): boolean {
  const validator = VITE_DAUTH_VALIDATOR;
  return validator.toLowerCase() === address.toLowerCase();
}

export function getHexlinkValdiator() {
  return VITE_USE_FUNCTIONS_EMULATOR === "true"
    ? HEXLINK_VALIDATOR_DEV
    : HEXLINK_VALIDATOR;
}

export function isHexlinkValidator(address: string): boolean {
  const validator = getHexlinkValdiator();
  return validator.toLowerCase() === address.toLowerCase();
}
