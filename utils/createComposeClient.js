import { ComposeClient } from '@composedb/client'
import createDID from "./createDID.js"
import createCeramicClient from "./createCeramicClient.js"

export default async function createComposeClient() {
  try {
    const { definition } = await import("../composites/definitions.js")
    const did = await createDID()
    const ceramic = createCeramicClient(did)

    return new ComposeClient({
      ceramic: ceramic,
      definition,
    })
  } catch (error) {
    console.log('error on createComposeClient')
  }
}