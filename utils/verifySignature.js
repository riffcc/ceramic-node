import { ethers } from "ethers";


export default function verifySignature(message, signature, signerAddress) {
  const recoveredAddress = ethers.utils.verifyMessage(message, signature);
  return recoveredAddress.toLowerCase() === signerAddress.toLowerCase();
}
