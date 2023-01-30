import { ComposeClient } from '@composedb/client'
import { definition } from "../composites/definitions.js"
import createDID from "./createDID.js"
import createCeramicClient from "./createCeramicClient.js"

export default async function createComposeClient() {
  const did = await createDID()
  const ceramic = createCeramicClient(did)

  return new ComposeClient({
    ceramic: ceramic,
    definition,
  })

}