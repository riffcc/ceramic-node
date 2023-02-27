import * as dotenv from 'dotenv'
dotenv.config()
import {
  CREATE_ETH_ACCOUNT,
  CREATE_WEBSITE,
  CREATE_ADMIN,
  CREATE_CATEGORY,
  CREATE_SUBSCRIPTION,
  CREATE_PIECE,
  pieceCategories,
  CREATE_PIN
} from '../utils/constants.js'
import createComposeClient from '../utils/createComposeClient.js'

const compose = await createComposeClient()

console.log("Executing queries...")

// Create websites
const websiteInputs = [
  {
    input: {
      content: {
        websiteName: "Test Website",
        metadata: {
          createdAt: (new Date).toString(),
          updatedAt: (new Date).toString()
        }
      }
    }
  },
  {
    input: {
      content: {
        websiteName: "Music Website",
        description: 'A cool music website! Pin your albums',
        image: 'bafkreichsaolw7gsrugkx3dl5wr6pbhluuelxxeluj3itgn7kv3zwuhgma',
        metadata: {
          createdAt: (new Date).toString(),
          updatedAt: (new Date).toString()
        }
      }
    }
  },
  {
    input: {
      content: {
        websiteName: "Movies Website",
        description: 'A site where you can upload your movies pins',
        image: 'bafkreiawhwsswozngk7nqocqiblwrpgnuqgym7x26donl2bglzteebgit4',
        metadata: {
          createdAt: (new Date).toString(),
          updatedAt: (new Date).toString()
        }
      }
    }
  },
  {
    input: {
      content: {
        websiteName: "Games Website",
        description: 'Pin your favorites games!',
        image: 'bafkreiet2cpiqxbinh6ricekf2d42l7iy6txh5mj2gins4tvyuiexi4jza',
        metadata: {
          createdAt: (new Date).toString(),
          updatedAt: (new Date).toString()
        }
      }
    }
  },
  {
    input: {
      content: {
        websiteName: "Books Website",
        description: "A books site for you",
        image: "bafkreied5aa3fntdhyqfinx7nhcwhgbln5pxktpywn7omvhdc5ondhpoei1",
        metadata: {
          createdAt: (new Date).toString(),
          updatedAt: (new Date).toString()
        }
      }
    }
  }
]

const createWebsitePromises = websiteInputs.map((input) => compose.executeQuery(CREATE_WEBSITE, input))
const createWebsiteResults = await Promise.all(createWebsitePromises)
const websiteIDs = createWebsiteResults.map((result) => result.data.createWebsite.document.id)
await new Promise((resolve) => setTimeout(() => resolve(), 3000))

// Create users eth accounts
const ethAccountInputs = [
  {
    input: {
      content: {
        address: process.env.ADMIN_ETH_ADDRESS,
        websiteID: websiteIDs[0],
        metadata: {
          createdAt: (new Date).toString(),
          updatedAt: (new Date).toString()
        }
      }
    }
  },
  {
    input: {
      content: {
        address: "0x5e164849Ed48E8e1B592C2d332D069753A14b572",
        websiteID: websiteIDs[0],
        metadata: {
          createdAt: (new Date).toString(),
          updatedAt: (new Date).toString()
        }
      }
    }
  },
  {
    input: {
      content: {
        address: "0xBe0789733CbaDd3F91e7cf6630d6F3d7acDAC10a",
        websiteID: websiteIDs[1],
        metadata: {
          createdAt: (new Date).toString(),
          updatedAt: (new Date).toString()
        }
      }
    }
  },
  {
    input: {
      content: {
        address: "0xD0825C04a6FADf8Fba6e01E8bC5fdbe994a3f5a4",
        websiteID: websiteIDs[1],
        metadata: {
          createdAt: (new Date).toString(),
          updatedAt: (new Date).toString()
        }
      }
    }
  },
  {
    input: {
      content: {
        address: "0x93d88460fB663Bd50f4DC2493bBfe9598FFE293F",
        websiteID: websiteIDs[3],
        metadata: {
          createdAt: (new Date).toString(),
          updatedAt: (new Date).toString()
        }
      }
    }
  },
  {
    input: {
      content: {
        address: "0xdE382249DF07ebD6235966A0eB917B453bD043f1",
        websiteID: websiteIDs[4],
        metadata: {
          createdAt: (new Date).toString(),
          updatedAt: (new Date).toString()
        }
      }
    }
  }
]

const createEthAccountPromises = ethAccountInputs.map((input) => compose.executeQuery(CREATE_ETH_ACCOUNT, input))
const createEthAccountResults = await Promise.all(createEthAccountPromises)
await new Promise((resolve) => setTimeout(() => resolve(), 3000))

const ethAccountIDs = createEthAccountResults.map((result) => result.data.createEthAccount.document.id)

// Create categories
const createCategoryPromises = pieceCategories.map((category) => {
  return compose.executeQuery(CREATE_CATEGORY, {
    input: {
      content: {
        websiteID: websiteIDs[0],
        name: category
      }
    }
  })
})
const createCateoryResults = await Promise.all(createCategoryPromises)
await new Promise((resolve) => setTimeout(() => resolve(), 3000))

const categoryIDs = createCateoryResults.map((result) => result.data.createCategory.document.id)


// Create admin for Test Website
await compose.executeQuery(CREATE_ADMIN, {
  input: {
    content: {
      adminID: ethAccountIDs[0],
      websiteID: websiteIDs[0],
      super: true,
      metadata: {
        createdAt: (new Date).toString(),
        updatedAt: (new Date).toString()
      }
    }
  }
})

// Create pieces
const pieceInputs = [
  {
    input: {
      content: {
        name: "Eagle",
        CID: "bafkreifwanxptzn7jct56yl7q3h633ymn7bb2bjut6sxyulnas3skyg47e",
        metadata: {
          createdAt: (new Date).toString(),
          updatedAt: (new Date).toString()
        }
      }
    }
  },
  {
    input: {
      content: {
        name: "ryan cat meme",
        CID: "bafkreiaakxh74mhjx2bflfv34rcpo27ynqbny3pg5nzrg6wjkw7qti2bmq",
        metadata: {
          createdAt: (new Date).toString(),
          updatedAt: (new Date).toString()
        }
      }
    }
  },
  {
    input: {
      content: {
        name: "one doge coin",
        CID: "bafkreiemaqbrgqoj5gc3dkellc7gokyctm57dje36eogwgfgkjwncszaiy",
        metadata: {
          createdAt: (new Date).toString(),
          updatedAt: (new Date).toString()
        }
      }
    }
  },
  {
    input: {
      content: {
        name: "The Dark Side Of The Moon - Pink Floyd",
        CID: "bafkreidybluf5b6o4mb345lnpgrpa5g3e2ztbndou4lj7y3crts4yqy53u",
        metadata: {
          createdAt: (new Date).toString(),
          updatedAt: (new Date).toString()
        }
      }
    }
  },
  {
    input: {
      content: {
        name: "The King Of Limbs - Radiohead",
        CID: "bafkreibgighuh2i2ndn4vk4iustoveexry2nshjekgnebhfxvgkptu4yw4",
        metadata: {
          createdAt: (new Date).toString(),
          updatedAt: (new Date).toString()
        }
      }
    }
  },
  {
    input: {
      content: {
        name: "Avatar (2009)",
        CID: "bafkreiff5rexqbzrcr4dmwh5vkbhpidkuauxwlqjvs4d4f3h62tplqqefu",
        metadata: {
          createdAt: (new Date).toString(),
          updatedAt: (new Date).toString()
        }
      }
    }
  },
  {
    input: {
      content: {
        name: "The Terminator (1984)",
        CID: "bafkreie5vk3pum2xseuvfzszjalzn54vxprhq4ftkvdpirllf4zvyc7uza",
        metadata: {
          createdAt: (new Date).toString(),
          updatedAt: (new Date).toString()
        }
      }
    }
  },
  {
    input: {
      content: {
        name: "Watch Dogs",
        CID: "bafkreibqq557b4syrfvl62vzx6e7rcjn62eq43azcqyvy6qps2yro2of3e",
        metadata: {
          createdAt: (new Date).toString(),
          updatedAt: (new Date).toString()
        }
      }
    }
  },
  {
    input: {
      content: {
        name: "The Elder Scrolls V",
        CID: "bafkreib4wztoh7zwspcf7pe73saus7cb4tldibxamafpzzz5fgeojaj7ky",
        metadata: {
          createdAt: (new Date).toString(),
          updatedAt: (new Date).toString()
        }
      }
    }
  },
  {
    input: {
      content: {
        name: "Harry Potter and The Philosopher's Stone",
        CID: "bafkreifhgqq24zmjg3rvx3nsrrkcxj6wjysupjn7hmii4bv5g365rrbh6u",
        metadata: {
          createdAt: (new Date).toString(),
          updatedAt: (new Date).toString()
        }
      }
    }
  },
  {
    input: {
      content: {
        name: "The Diary of Anne Frank",
        CID: "bafkreiblehldyvprjvxncwj4guvk2iq2f7wuiutwu6bh7mumiyv7aef25e",
        metadata: {
          createdAt: (new Date).toString(),
          updatedAt: (new Date).toString()
        }
      }
    }
  }
]

const createPiecePromises = pieceInputs.map((input) => compose.executeQuery(CREATE_PIECE, input))
const piecesResult = await Promise.all(createPiecePromises)
await new Promise((resolve) => setTimeout(() => resolve(), 3000))

// Create pins
const pinInputs = [
  {
    input: {
      content: {
        ownerID: ethAccountIDs[1],
        websiteID: websiteIDs[0],
        categoryID: categoryIDs[7],
        approved: true,
      }
    }
  },
  {
    input: {
      content: {
        ownerID: ethAccountIDs[1],
        websiteID: websiteIDs[0],
        categoryID: categoryIDs[7],
        approved: false,
      }
    }
  },
  {
    input: {
      content: {
        ownerID: ethAccountIDs[1],
        websiteID: websiteIDs[0],
        categoryID: categoryIDs[7],
        approved: false,
      }
    }
  },
  {
    input: {
      content: {
        ownerID: ethAccountIDs[2],
        websiteID: websiteIDs[1],
        categoryID: categoryIDs[5],
        approved: true,
      }
    }
  },
  {
    input: {
      content: {
        ownerID: ethAccountIDs[2],
        websiteID: websiteIDs[1],
        categoryID: categoryIDs[5],
        approved: true,
      }
    }
  },
  {
    input: {
      content: {
        ownerID: ethAccountIDs[3],
        websiteID: websiteIDs[1],
        categoryID: categoryIDs[1],
        approved: true,
      }
    }
  },
  {
    input: {
      content: {
        ownerID: ethAccountIDs[3],
        websiteID: websiteIDs[1],
        categoryID: categoryIDs[1],
        approved: true,
      }
    }
  },
  {
    input: {
      content: {
        ownerID: ethAccountIDs[4],
        websiteID: websiteIDs[3],
        categoryID: categoryIDs[3],
        approved: true,
      }
    }
  },
  {
    input: {
      content: {
        ownerID: ethAccountIDs[4],
        websiteID: websiteIDs[3],
        categoryID: categoryIDs[3],
        approved: true,
      }
    }
  },
  {
    input: {
      content: {
        ownerID: ethAccountIDs[5],
        websiteID: websiteIDs[4],
        categoryID: categoryIDs[4],
        approved: true,
      }
    }
  },
  {
    input: {
      content: {
        ownerID: ethAccountIDs[5],
        websiteID: websiteIDs[4],
        categoryID: categoryIDs[4],
        approved: true,
      }
    }
  }
]
const createPinPromise = piecesResult.map((result, i) => compose.executeQuery(CREATE_PIN, {
  input: {
    content: {
      ...pinInputs[i].input.content,
      pieceID: result.data.createPiece.document.id
    }
  }
}))
await Promise.all(createPinPromise)
await new Promise((resolve) => setTimeout(() => resolve(), 3000))


// Create subscriptions
await compose.executeQuery(CREATE_SUBSCRIPTION, {
  input: {
    content: {
      websiteID: websiteIDs[0],
      subscribedID: websiteIDs[1],
      metadata: {
        createdAt: (new Date).toString(),
        updatedAt: (new Date).toString()
      }
    }
  }
})

await compose.executeQuery(CREATE_SUBSCRIPTION, {
  input: {
    content: {
      websiteID: websiteIDs[0],
      subscribedID: websiteIDs[2],
      metadata: {
        createdAt: (new Date).toString(),
        updatedAt: (new Date).toString()
      }
    }
  }
})


console.log(`Site ID: ${websiteIDs[0]}`)



