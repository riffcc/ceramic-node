import * as dotenv from 'dotenv'
dotenv.config()
import { createInterface } from "readline";

import { DID } from "dids"
import { fromString } from "uint8arrays"
import { getResolver } from "key-did-resolver"
import { CeramicClient } from '@ceramicnetwork/http-client'
import { ComposeClient } from '@composedb/client'
import { Ed25519Provider } from "key-did-provider-ed25519"
import { definition } from "../composites/definitions.js"

if (!process.env.PRIVATE_KEY) throw new Error("ENVIROMENT VAR PRIVATE_KEY UNDEFINED")
if (!process.env.NODE_URL) throw new Error("ENVIROMENT VARIABLE NODE_URL UNDEFINED")
if (!process.env.ADMIN_ETH_ADDRESS) throw new Error("ENVIROMENT VAR ADMIN_ETH_ADDRESS UNDEFINED")

const privateKey = fromString(
  process.env.PRIVATE_KEY,
  'base16'
)
const did = new DID({
  resolver: getResolver(),
  provider: new Ed25519Provider(privateKey),
})

await did.authenticate()
const ceramic = new CeramicClient(process.env.NODE_URL)
ceramic.did = did

const compose = new ComposeClient({
  ceramic: ceramic,
  definition,
})

const CREATE_ETH_ACCOUNT = `
  mutation CreateEthAccount($input: CreateEthAccountInput!) {
    createEthAccount(input: $input) {
        document {
        id
        websiteID
        address
        ensName
      }
    }
  }
`
const CREATE_WEBSITE = `
  mutation CreateWebsite($input: CreateWebsiteInput!) {
      createWebsite(input: $input) {
				document {
					id
					websiteName
				}
    }
  }
`
const CREATE_ADMIN = `
  mutation CreateAdmin($input: CreateAdminInput!) {
    createAdmin(input: $input) {
      document {
        id
        adminID
        websiteID
      }
    }
  }
`

const readline = createInterface({
  input: process.stdin,
  output: process.stdout
});

const readLineAsync = msg => {
  return new Promise(resolve => {
    readline.question(msg, userRes => {
      resolve(userRes);
    });
  });
}
console.log("Create a new website...")

const websiteName = await readLineAsync("Name: ")
const description = await readLineAsync("Description: ")
const image = await readLineAsync("Image IPFS CID: ")
readline.close()
// Create websites
const { data: websiteData } = await compose.executeQuery(CREATE_WEBSITE, {
  input: {
    content: {
      websiteName: websiteName ?? 'Test Website',
      description,
      image,
      metadata: {
        createdAt: (new Date).toISOString(),
        updatedAt: (new Date).toISOString()
      }
    }
  }
})

const website = websiteData.createWebsite.document

// Create admin eth account

const { data: admintEthAccountData } = await compose.executeQuery(CREATE_ETH_ACCOUNT, {
  input: {
    content: {
      address: process.env.ADMIN_ETH_ADDRESS,
      websiteID: website.id,
      metadata: {
        createdAt: (new Date).toISOString(),
        updatedAt: (new Date).toISOString()
      }
    }
  }
})

const adminEthAccount = admintEthAccountData.createEthAccount.document

// Create admin for website
await compose.executeQuery(CREATE_ADMIN, {
  input: {
    content: {
      adminID: adminEthAccount.id,
      websiteID: adminEthAccount.websiteID,
      super: true,
      metadata: {
        createdAt: (new Date).toISOString(),
        updatedAt: (new Date).toISOString()
      }
    }
  }
})

console.log(`${website.websiteName} ID: ${website.id}`)



