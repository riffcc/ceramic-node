import * as dotenv from 'dotenv'
dotenv.config()
import { createInterface } from "readline";
import {
  CREATE_ETH_ACCOUNT,
  CREATE_WEBSITE,
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
const name = await readLineAsync("Name (required): ")
const description = await readLineAsync("Description: ")
const image = await readLineAsync("Image IPFS CID: ")
readline.close()
// Create websites

const { data: websiteData } = await compose.executeQuery(CREATE_WEBSITE, {
  input: {
    content: {
      name: name ?? 'Test Website',
      description,
      image,
      createdAt: (new Date).toISOString(),
      updatedAt: (new Date).toISOString()
    }
  }
})

const website = websiteData?.createWebsite?.document

// Create admin eth account

await compose.executeQuery(CREATE_ETH_ACCOUNT, {
  input: {
    content: {
      address: process.env.ADMIN_ETH_ADDRESS,
      websiteID: website.id,
      isAdmin: true,
      isSuperAdmin: true,
      createdAt: (new Date).toISOString(),
      updatedAt: (new Date).toISOString(),
      settings: {
        autoplay: true
      }
    }
  }
})

const promises = pieceCategories.map((category) => {
  return compose.executeQuery(CREATE_CATEGORY, {
    input: {
      content: {
        websiteID: website.id,
        name: category
      }
    }
  })
})

await Promise.all(promises)

console.log(`Your site has been created successfully!\nname: ${website.name}\nsite_id: ${website.id}`)



