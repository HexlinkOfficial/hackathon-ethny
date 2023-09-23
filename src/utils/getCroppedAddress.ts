export function getCroppedAddress(address: string) {
  return address.substring(0, 6) + "..." + address.slice(-5);
}
