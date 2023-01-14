import * as dotenv from 'dotenv'
dotenv.config()
import fs from "fs"
import { DID } from "dids"
import { fromString } from "uint8arrays"
import { getResolver } from "key-did-resolver"
import { CeramicClient } from '@ceramicnetwork/http-client'
import { Ed25519Provider } from "key-did-provider-ed25519"
import { readEncodedComposite } from '@composedb/devtools-node'

if (!process.env.PRIVATE_KEY) throw new Error("ENVIROMENT VARIABLE PRIVATE KEY UNDEFINED")
// Create DID controller for ceramic client
const privateKey = fromString(
  process.env.PRIVATE_KEY,
  'base16'
)
const did = new DID({
  resolver: getResolver(),
  provider: new Ed25519Provider(privateKey),
})

await did.authenticate()
const ceramic = new CeramicClient(procces.env.NODE_URL)
ceramic.did = did

// Index the models into ceramic node
console.log("Indexing models...")
const mergedComposite = await readEncodedComposite(ceramic, './composites/merged-composite.json')
await mergedComposite.startIndexingOn(ceramic)
