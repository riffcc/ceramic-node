import * as dotenv from 'dotenv'
dotenv.config()
import { createInterface } from "readline";
import {
  CREATE_ETH_ACCOUNT,
  CREATE_SITE,
  CREATE_CATEGORY,
  pieceCategories,
  defaultThemeColors
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

console.log("Create a new site...")
const name = await readLineAsync("Name (required): ")
const description = await readLineAsync("Description: ")
const image = await readLineAsync("Image IPFS CID: ")
readline.close()
// Create sites



const createSiteMutationInput = {
  input: {
    content: {
      name: name ?? 'Test Site',
      description,
      image,
      featuredCategories: [],
      colors: defaultThemeColors,
      createdAt: (new Date).toISOString(),
      updatedAt: (new Date).toISOString()
    }
  }
}
const createSiteResult = await compose.executeQuery(CREATE_SITE, createSiteMutationInput)

if (!createSiteResult.data?.createSite) {
  throw new Error(JSON.stringify(createSiteResult.errors))
}
const site = createSiteResult.data.createSite.document

// Create admin eth account
await compose.executeQuery(CREATE_ETH_ACCOUNT, {
  input: {
    content: {
      address: process.env.ADMIN_ETH_ADDRESS,
      siteID: site.id,
      isAdmin: true,
      isSuperAdmin: true,
      createdAt: (new Date).toISOString(),
      updatedAt: (new Date).toISOString(),
      settings: {
        autoplay: true,
        cidAvatar: "bafkreiabq32njxa4t7e73losqj2s4cswwk4f67psbcf2gx7q62xuobntc4"
      }
    }
  }
})

const promises = pieceCategories.map((category) => {
  return compose.executeQuery(CREATE_CATEGORY, {
    input: {
      content: {
        siteID: site.id,
        name: category
      }
    }
  })
})

await Promise.all(promises)

console.log(`Your site has been created successfully!\nname: ${site.name}\nsite_id: ${site.id}`)



