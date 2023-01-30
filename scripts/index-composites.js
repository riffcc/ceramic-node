import { readEncodedComposite } from '@composedb/devtools-node'
import * as dotenv from 'dotenv'
import createCeramicClient from '../utils/createCeramicClient.js'
import createDID from '../utils/createDID.js'
dotenv.config()
const did = createDID()
const ceramic = createCeramicClient()
// Index the models into ceramic node
console.log("Indexing models...")
const mergedComposite = await readEncodedComposite(ceramic, './composites/merged-composite.json')
await mergedComposite.startIndexingOn(ceramic)
