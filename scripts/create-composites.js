import * as dotenv from 'dotenv'
dotenv.config()
import fs from "fs"
import { createComposite, writeEncodedCompositeRuntime, writeEncodedComposite, writeGraphQLSchema } from '@composedb/devtools-node'
import createDID from '../utils/createDID.js'
import createCeramicClient from '../utils/createCeramicClient.js'

if (!process.env.ADMIN_ETH_ADDRESS) throw new Error("ENVIROMENT VAR ADMIN_ETH_ADDRESS UNDEFINED")
const did = await createDID()
const ceramic = createCeramicClient(did)

console.log("Create schemas and composites...")

// Create Website graphql schema
fs.writeFile('./schemas/Website.graphql', `type Website @createModel(accountRelation: LIST, description: "A Website") {
  websiteName: String! @string(maxLength: 50)
  description: String @string(maxLength: 150)
  image: String @string(maxLength: 100)
  metadata: Metadata!
}

type Metadata {
  createdAt: String! @string(maxLength: 100)
  updatedAt: String! @string(maxLength: 100)
}
`, function (err) {
  if (err) return console.log(err);
  console.log('Website schema created!');
})
await new Promise((resolve) => setTimeout(() => resolve(), 3000))
const websiteComposite = await createComposite(ceramic, './schemas/Website.graphql')
const websiteModelID = websiteComposite.modelIDs[0]

// Create EthAccount graphql schema
fs.writeFile('./schemas/EthAccount.graphql', `type Website @loadModel(id: "${websiteModelID}") {
  id: ID!
}

type EthAccount @createModel(accountRelation: LIST, description: "An Ethereum Account") {
  address: String! @string(maxLength: 66)
  ensName: String @string(maxLength: 100)
  websiteID: StreamID! @documentReference(model: "Website")
  metadata: Metadata!
}

type Metadata {
  createdAt: String! @string(maxLength: 100)
  updatedAt: String! @string(maxLength: 100)
}
`, function (err) {
  if (err) return console.log(err);
  console.log('EthAccount schema created!');
})
await new Promise((resolve) => setTimeout(() => resolve(), 3000))
const ethAccountComposite = await createComposite(ceramic, './schemas/EthAccount.graphql')
const ethAccountModelID = ethAccountComposite.modelIDs[1]

// Create Category graphql schema
fs.writeFile('./schemas/Category.graphql', `type Website @loadModel(id: "${websiteModelID}") {
  id: ID!
}

type Category @createModel(accountRelation: LIST, description: "A category") {
  websiteID: StreamID! @documentReference(model: "Website")
  website: Website @relationDocument(property: "websiteID")
  name: String! @string(maxLength:100)
}
`, function (err) {
  if (err) return console.log(err);
  console.log('Category schema created!');
})
await new Promise((resolve) => setTimeout(() => resolve(), 3000))
const categoryComposite = await createComposite(ceramic, './schemas/Category.graphql')
const categoryModelID = categoryComposite.modelIDs[1]

// Create Piece graphql schema
fs.writeFile('./schemas/Piece.graphql', `type Piece @createModel(accountRelation: LIST, description: "Piece of content") {
  name: String @string(maxLength: 100)
  CID: String @string(maxLength: 100)
  details: Details
  metadata: Metadata!
}

type Metadata {
  createdAt: String! @string(maxLength: 100)
  updatedAt: String! @string(maxLength: 100)
}

type Details {
  imageThumbnailCID: String @string(maxLength: 100)
  tags: String @string(maxLength: 100)
  musicBrainzID: String @string(maxLength: 100)
  artistNames: String @string(maxLength: 100)
  albumTitle: String @string(maxLength: 100)
  initialReleaseYear: String @string(maxLength: 100)
  releaseType: String @string(maxLength: 100)
  format: String @string(maxLength: 100)
  bitrate: String @string(maxLength: 100)
  media: String @string(maxLength: 100)
  releaseDescription: String @string(maxLength: 100)
  poster: String @string(maxLength: 100)
  TMDBID: String @string(maxLength: 100)
  IMDBID: String @string(maxLength: 100)
  type: String @string(maxLength: 100)
}
`, function (err) {
  if (err) return console.log(err);
  console.log('Piece schema created!');
})
await new Promise((resolve) => setTimeout(() => resolve(), 3000))
const pieceComposite = await createComposite(ceramic, './schemas/Piece.graphql')
const pieceModelID = pieceComposite.modelIDs[0]

// Create Pin graphql schema
fs.writeFile('./schemas/Pin.graphql', `type Website @loadModel(id: "${websiteModelID}") {
  id: ID!
}

type EthAccount @loadModel(id: "${ethAccountModelID}") {
  id: ID!
}

type Piece @loadModel(id: "${pieceModelID}") {
  id: ID!
}

type Category @loadModel(id: "${categoryModelID}") {
  id: ID!
}

type Pin @createModel(accountRelation: LIST, description: "A pin for a piece") {
  websiteID: StreamID! @documentReference(model: "Website")
  website: Website! @relationDocument(property: "websiteID")
  ownerID: StreamID! @documentReference(model: "EthAccount")
  owner: EthAccount @relationDocument(property: "ownerID")
	pieceID: StreamID! @documentReference(model: "Piece")
	piece: Piece! @relationDocument(property: "pieceID")
	categoryID: StreamID! @documentReference(model: "Category")
	category: Category! @relationDocument(property: "categoryID")
  approved: Boolean
  rejected: Boolean
  rejectionReason: String @string(maxLength: 150)
  deleted: Boolean
}
`, function (err) {
  if (err) return console.log(err);
  console.log('Pin schema created!');
})
await new Promise((resolve) => setTimeout(() => resolve(), 3000))
const pinComposite = await createComposite(ceramic, './schemas/Pin.graphql')
const pinModelID = pinComposite.modelIDs[4]

// Create PinLike graphql schema
fs.writeFile('./schemas/PinLike.graphql', `type Pin @loadModel(id: "${pinModelID}") {
  id: ID!
}

type EthAccount @loadModel(id: "${ethAccountModelID}") {
  id: ID!
}

type Category @loadModel(id: "${categoryModelID}") {
  id: ID!
}

type PinLike @createModel(accountRelation: LIST, description: "A like for a pin") {
	pinID: StreamID! @documentReference(model: "Pin")
	pin: Pin! @relationDocument(property: "pinID")
	categoryID: StreamID! @documentReference(model: "Category")
	category: Category! @relationDocument(property: "categoryID")
  ownerID: StreamID! @documentReference(model: "EthAccount")
  owner: EthAccount! @relationDocument(property: "ownerID")
}
`, function (err) {
  if (err) return console.log(err);
  console.log('PinLike schema created!');
})
await new Promise((resolve) => setTimeout(() => resolve(), 3000))
const pinLikeComposite = await createComposite(ceramic, './schemas/PinLike.graphql')
const pinLikeModelID = pinLikeComposite.modelIDs[3]

// Create PinDislike graphql schema
fs.writeFile('./schemas/PinDislike.graphql', `type Pin @loadModel(id: "${pinModelID}") {
  id: ID!
}

type EthAccount @loadModel(id: "${ethAccountModelID}") {
  id: ID!
}

type Category @loadModel(id: "${categoryModelID}") {
  id: ID!
}

type PinDislike @createModel(accountRelation: LIST, description: "A like for a pin") {
	pinID: StreamID! @documentReference(model: "Pin")
	pin: Pin! @relationDocument(property: "pinID")
	categoryID: StreamID! @documentReference(model: "Category")
	category: Category! @relationDocument(property: "categoryID")
  ownerID: StreamID! @documentReference(model: "EthAccount")
  owner: EthAccount! @relationDocument(property: "ownerID")
}
`, function (err) {
  if (err) return console.log(err);
  console.log('PinDislike schema created!');
})
await new Promise((resolve) => setTimeout(() => resolve(), 3000))
const pinDislikeComposite = await createComposite(ceramic, './schemas/PinDislike.graphql')
const pinDislikeModelID = pinDislikeComposite.modelIDs[3]

// Create Featured graphql schema
fs.writeFile('./schemas/Featured.graphql', `type Website @loadModel(id: "${websiteModelID}") {
  id: ID!
}

type Pin @loadModel(id: "${pinModelID}") {
  id: ID!
}

type Featured @createModel(accountRelation: LIST, description: "A featured content") {
  websiteID: StreamID! @documentReference(model: "Website")
  website: Website! @relationDocument(property: "websiteID")
	pinID: StreamID! @documentReference(model: "Pin")
	pin: Pin! @relationDocument(property: "pinID")
  startAt: String! @string(maxLength:100)
  endAt: String! @string(maxLength:100)
}
`, function (err) {
  if (err) return console.log(err);
  console.log('Featured schema created!');
})
await new Promise((resolve) => setTimeout(() => resolve(), 3000))
const featuredComposite = await createComposite(ceramic, './schemas/Featured.graphql')
const featuredModelID = featuredComposite.modelIDs[2]

// Create Admin graphql schema
fs.writeFile('./schemas/Admin.graphql', `type Website @loadModel(id: "${websiteModelID}") {
  id: ID!
}

type EthAccount @loadModel(id: "${ethAccountModelID}") {
  id: ID!
}

type Admin @createModel(accountRelation: LIST, description: "Admin Website") {
  websiteID: StreamID! @documentReference(model: "Website")
  website: Website! @relationDocument(property: "websiteID")
	adminID: StreamID! @documentReference(model: "EthAccount")
	admin: EthAccount! @relationDocument(property: "adminID")
  super: Boolean!
  inactive: Boolean
  metadata: Metadata!
}

type Metadata {
  createdAt: String! @string(maxLength:100)
  updatedAt: String! @string(maxLength:100)
}
`, function (err) {
  if (err) return console.log(err);
  console.log('Admin schema created!');
})
await new Promise((resolve) => setTimeout(() => resolve(), 3000))
const adminComposite = await createComposite(ceramic, './schemas/Admin.graphql')
const adminModelID = adminComposite.modelIDs[2]

// Create Subscription graphql schema
fs.writeFile('./schemas/Subscription.graphql', `type Website @loadModel(id: "${websiteModelID}") {
  id: ID!
}

type Subscription @createModel(accountRelation: LIST, description: "Subcription Website") {
  websiteID: StreamID! @documentReference(model: "Website")
  website: Website! @relationDocument(property: "websiteID")
	subscribedID: StreamID! @documentReference(model: "Website")
	subscribedWebsite: Website! @relationDocument(property: "subscribedID")
	inactive: Boolean
  metadata: Metadata!
}

type Metadata {
  createdAt: String! @string(maxLength:100)
  updatedAt: String! @string(maxLength:100)
}
`, function (err) {
  if (err) return console.log(err);
  console.log('Subscription schema created!');
})
await new Promise((resolve) => setTimeout(() => resolve(), 3000))
const subscriptionComposite = await createComposite(ceramic, './schemas/Subscription.graphql')
const subscriptionModelID = subscriptionComposite.modelIDs[1]

// Create FinalModel graphql schema
fs.writeFile('./schemas/FinalModel.graphql', `type Admin @loadModel(id: "${adminModelID}") {
  id: ID!
}

type Piece @loadModel(id: "${pieceModelID}") {
  id: ID!
}

type PinLike @loadModel(id: "${pinLikeModelID}") {
  id: ID!
}

type PinDislike @loadModel(id: "${pinDislikeModelID}") {
  id: ID!
}

type Pin @loadModel(id: "${pinModelID}") {
  likes: [PinLike] @relationFrom(model: "PinLike", property: "pinID")
  likesCount: Int! @relationCountFrom(model: "PinLike", property: "pinID")
  dislikes: [PinDislike] @relationFrom(model: "PinDislike", property: "pinID")
  dislikesCount: Int! @relationCountFrom(model: "PinDislike", property: "pinID")
}

type Category @loadModel(id: "${categoryModelID}") {
  pins: [Piece] @relationFrom(model: "Pin", property: "categoryID")
  pinsCount: Int! @relationCountFrom(model: "Pin", property: "categoryID")
  likes: [PinLike] @relationFrom(model: "PinLike", property: "categoryID")
  likesCount: Int! @relationCountFrom(model: "PinLike", property: "categoryID")
  dislikes: [PinDislike] @relationFrom(model: "PinDislike", property: "categoryID")
  dislikesCount: Int! @relationCountFrom(model: "PinDislike", property: "categoryID")
}

type Subscription @loadModel(id: "${subscriptionModelID}") {
  id: ID!
}

type Featured @loadModel(id: "${featuredModelID}") {
  id: ID!
}

type EthAccount @loadModel(id: "${ethAccountModelID}") {
  pins: [Pin] @relationFrom(model: "Pin", property: "ownerID")
  pinsCount: Int! @relationCountFrom(model: "Pin", property: "ownerID")
  managedWebsites: [Admin] @relationFrom(model: "Admin", property: "adminID")
  managedWebsitesCount: Int! @relationCountFrom(model: "Admin", property: "adminID")
  pinLikes: [PinLike] @relationFrom(model: "PinLike", property: "ownerID")
  pinLikesCount: Int! @relationCountFrom(model: "PinLike", property: "ownerID")
  pinDislikes: [PinDislike] @relationFrom(model: "PinDislike", property: "ownerID")
  pinDislikesCount: Int! @relationCountFrom(model: "PinDislike", property: "ownerID")
}

type Website @loadModel(id: "${websiteModelID}") {
  categories: [Category] @relationFrom(model: "Category", property: "websiteID")
  categoriesCount: Int! @relationCountFrom(model: "Category", property: "websiteID")
  pins: [Pin] @relationFrom(model: "Pin", property: "websiteID")
  pinsCount: Int! @relationCountFrom(model: "Pin", property: "websiteID")
  featured: [Featured] @relationFrom(model: "Featured", property: "websiteID")
  featuredCount: Int! @relationCountFrom(model: "Featured", property: "websiteID")
  subscriptions: [Subscription] @relationFrom(model: "Subscription", property: "websiteID")
  subscriptionsCount: Int! @relationCountFrom(model: "Subscription", property: "websiteID")
  admins: [Admin] @relationFrom(model: "Admin", property: "websiteID")
  adminsCount: Int! @relationCountFrom(model: "Admin", property: "websiteID")
  users: [EthAccount] @relationFrom(model: "EthAccount", property: "websiteID")
  usersCount: Int! @relationCountFrom(model: "EthAccount", property: "websiteID")
}
`, function (err) {
  if (err) return console.log(err);
  console.log('FinalModel schema created!');
})
await new Promise((resolve) => setTimeout(() => resolve(), 3000))
const mergedComposite = await createComposite(ceramic, './schemas/FinalModel.graphql')

// Index the models into ceramic node
console.log("Indexing models...")
await mergedComposite.startIndexingOn(ceramic)

console.log("Writing composedb files...")
// Write encoded composite json file, definitions and composite granephql schema
await writeEncodedComposite(mergedComposite, './composites/merged-composite.json')
await new Promise((resolve) => setTimeout(() => resolve(), 3000))

await writeEncodedCompositeRuntime(
  ceramic,
  './composites/merged-composite.json',
  './composites/definitions.ts'
)
await writeEncodedCompositeRuntime(
  ceramic,
  './composites/merged-composite.json',
  './composites/definitions.js'
)
await writeGraphQLSchema(mergedComposite.toRuntime(), './composites/Composite.graphql')
