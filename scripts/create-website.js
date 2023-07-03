import * as dotenv from 'dotenv'
dotenv.config()
import { createInterface } from "readline";
import {
  CREATE_ETH_ACCOUNT,
  CREATE_WEBSITE,
  CREATE_ADMIN,
  CREATE_CATEGORY,
  pieceCategories
} from '../utils/constants.js'
import createComposeClient from '../utils/createComposeClient.js';

const compose = await createComposeClient()

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
const websiteName = await readLineAsync("Name (required): ")
const description = await readLineAsync("Description: ")
const image = await readLineAsync("Image IPFS CID: ")
readline.close()
// Create websites
compose
const { data: websiteData } = await compose.executeQuery(CREATE_WEBSITE, {
  input: {
    content: {
      websiteName: websiteName ?? 'Test Website',
      description,
      image,
      metadata: {
        createdAt: (new Date).toString(),
        updatedAt: (new Date).toString()
      }
    }
  }
})
console.log(websiteData);
const website = websiteData?.createWebsite?.document

// Create admin eth account

const { data: admintEthAccountData } = await compose.executeQuery(CREATE_ETH_ACCOUNT, {
  input: {
    content: {
      address: process.env.ADMIN_ETH_ADDRESS,
      websiteID: website.id,
      metadata: {
        createdAt: (new Date).toString(),
        updatedAt: (new Date).toString()
      },
      settings: {
        autoplay: true
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
        createdAt: (new Date).toString(),
        updatedAt: (new Date).toString()
      }
    }
  }
})

const promises = pieceCategories.map((category) => {
  return compose.executeQuery(CREATE_CATEGORY, {
    input: {
      content: {
        websiteID: adminEthAccount.websiteID,
        name: category
      }
    }
  })
})

await Promise.all(promises)

console.log(`${website.websiteName} SiteID: ${website.id}`)



