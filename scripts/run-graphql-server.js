import * as dotenv from 'dotenv'
dotenv.config()
import { DID } from 'dids'
import { getResolver } from 'key-did-resolver';
import { fromString } from 'uint8arrays/from-string'
import { Ed25519Provider } from 'key-did-provider-ed25519'
import { serveEncodedDefinition } from '@composedb/devtools-node'

if (!process.env.PRIVATE_KEY) throw new Error("ENVIROMENT VAR PRIVATE_KEY UNDEFINED")
if (!process.env.NODE_URL) throw new Error("ENVIROMENT VARIABLE NODE_URL UNDEFINED")

const privateKey = fromString(
  process.env.PRIVATE_KEY,
  'base16'
)
const did = new DID({
  resolver: getResolver(),
  provider: new Ed25519Provider(privateKey),
})

await did.authenticate()

const server = await serveEncodedDefinition({
  ceramicURL: process.env.NODE_URL,
  graphiql: true,
  path: new URL('../composites/merged-composite.json', import.meta.url),
  port: 5001,
  did
})

console.log(`Server started on ${server.url}`)

process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Server stopped')
  })
})
