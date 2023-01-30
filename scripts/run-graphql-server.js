import * as dotenv from 'dotenv'
dotenv.config()
import { serveEncodedDefinition } from '@composedb/devtools-node'
import createDID from '../utils/createDID.js';

if (!process.env.NODE_URL) throw new Error("ENVIROMENT VARIABLE NODE_URL UNDEFINED")

const did = createDID()

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
