import { CeramicClient } from '@ceramicnetwork/http-client'

export default function createCeramicClient(did) {
  if (!process.env.NODE_URL) throw new Error("ENVIROMENT VARIABLE NODE_URL UNDEFINED")

  const ceramic = new CeramicClient(process.env.NODE_URL)

  if (did) {
    ceramic.did = did
  }

  return ceramic
}