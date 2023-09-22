import * as dotenv from 'dotenv'
dotenv.config()
import { serveEncodedDefinition } from '@composedb/devtools-node'
import {createDID} from '../utils/index.js';

if (!process.env.NODE_URL) throw new Error("ENVIROMENT VARIABLE NODE_URL UNDEFINED")

const port = 5001

const did = await createDID()

const server = await serveEncodedDefinition({
  ceramicURL: process.env.NODE_URL,
  graphiql: true,
  path: './composites/merged-composite.json',
  port,
  did
})

console.log(`Server started on ${port}`)

process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Server stopped')
  })
})
