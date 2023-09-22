import * as dotenv from 'dotenv'
dotenv.config()
import {
  createComposite,
  writeEncodedCompositeRuntime,
  writeEncodedComposite,
  writeGraphQLSchema
} from '@composedb/devtools-node'
import {
  createDID,
  createCeramicClient,
  writeSchema
} from '../utils/index.js'
import { Composite } from '@composedb/devtools'

const did = await createDID()
const ceramic = createCeramicClient(did)

console.log("Create schemas and composites...")

await writeSchema(
  'Website',
  `type Website
@createModel(accountRelation: LIST, description: "A Website")
@createIndex(fields: [{path: "name"}])
{
  name: String! @string(maxLength: 50)
  description: String @string(maxLength: 150)
  image: String @string(maxLength: 100)
  createdAt: DateTime!
  updatedAt: DateTime!
}`)
const websiteComposite = await createComposite(ceramic, './schemas/Website.graphql')
const websiteModelID = websiteComposite.modelIDs[0]

await writeSchema(
  'EthAccount',
  `type Website
@loadModel(id: "${websiteModelID}") {
  id: ID!
}

type EthAccount
@createModel(accountRelation: LIST, description: "An Ethereum Account")
@createIndex(fields: [{path: "address"}])
{
  address: String! @string(maxLength: 66)
  websiteID: StreamID! @documentReference(model: "Website")
  isAdmin: Boolean!
  isSuperAdmin: Boolean!
  settings: Settings!
  createdAt: String! @string(maxLength: 100)
  updatedAt: String! @string(maxLength: 100)
}

type Settings {
  autoplay: Boolean!
}`)
const ethAccountComposite = await createComposite(ceramic, './schemas/EthAccount.graphql')
const ethAccountModelID = ethAccountComposite.modelIDs[1]

await writeSchema(
  'Category',
  `type Website
@loadModel(id: "${websiteModelID}") {
  id: ID!
}

type Category
@createModel(accountRelation: LIST, description: "A category")
@createIndex(fields: [{path: "name"}])
{
  websiteID: StreamID! @documentReference(model: "Website")
  website: Website @relationDocument(property: "websiteID")
  name: String! @string(maxLength:100)
}`)
const categoryComposite = await createComposite(ceramic, './schemas/Category.graphql')
const categoryModelID = categoryComposite.modelIDs[1]

await writeSchema(
  'Artist',
  `type Artist
@createModel(accountRelation: LIST, description: "An Artist")
@createIndex(fields: [{path: "name"}])
{
  name: String @string(maxLength: 100)
}`)
const artistComposite = await createComposite(ceramic, './schemas/Artist.graphql')
const artistModelID = artistComposite.modelIDs[0]

await writeSchema(
  'Piece',
  `type Piece
@createModel(accountRelation: LIST, description: "Piece of content") {
  name: String @string(maxLength: 100)
  cid: String @string(maxLength: 100)
  details: Details  
  createdAt: DateTime!
  updatedAt: DateTime!
}

type Details {
  imageThumbnailCID: String @string(maxLength: 100)
  tags: String @string(maxLength: 100)
  musicBrainzID: String @string(maxLength: 100)
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
}`)
const pieceComposite = await createComposite(ceramic, './schemas/Piece.graphql')
const pieceModelID = pieceComposite.modelIDs[0]

await writeSchema(
  'Pin',
  `type Artist
@loadModel(id: "${artistModelID}") {
  id: ID!
}

type Website @loadModel(id: "${websiteModelID}") {
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

type Pin
@createModel(accountRelation: LIST, description: "A pin for a piece")
@createIndex(fields: [{path: "artistID"}])
@createIndex(fields: [{path: "websiteID"}])
@createIndex(fields: [{path: "categoryID"}])
@createIndex(fields: [{path: "ownerID"}])
{
  artistID: StreamID! @documentReference(model: "Artist")
  artist: Artist! @relationDocument(property: "artistID")
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
}`)
const pinComposite = await createComposite(ceramic, './schemas/Pin.graphql')
const pinModelID = pinComposite.modelIDs[5]

await writeSchema(
  'PinLike',
  `type Pin
@loadModel(id: "${pinModelID}") {
  id: ID!
}

type EthAccount
@loadModel(id: "${ethAccountModelID}") {
  id: ID!
}

type Category
@loadModel(id: "${categoryModelID}") {
  id: ID!
}

type PinLike
@createModel(accountRelation: LIST, description: "A like for a pin")
{
	pinID: StreamID! @documentReference(model: "Pin")
	pin: Pin! @relationDocument(property: "pinID")
	categoryID: StreamID! @documentReference(model: "Category")
	category: Category! @relationDocument(property: "categoryID")
  ownerID: StreamID! @documentReference(model: "EthAccount")
  owner: EthAccount! @relationDocument(property: "ownerID")
}`)
const pinLikeComposite = await createComposite(ceramic, './schemas/PinLike.graphql')
const pinLikeModelID = pinLikeComposite.modelIDs[3]

await writeSchema(
  'PinDislike',
  `type Pin
@loadModel(id: "${pinModelID}")
{
  id: ID!
}

type EthAccount
@loadModel(id: "${ethAccountModelID}")
{
  id: ID!
}

type Category
@loadModel(id: "${categoryModelID}")
{
  id: ID!
}

type PinDislike
@createModel(accountRelation: LIST, description: "A like for a pin")
{
	pinID: StreamID! @documentReference(model: "Pin")
	pin: Pin! @relationDocument(property: "pinID")
	categoryID: StreamID! @documentReference(model: "Category")
	category: Category! @relationDocument(property: "categoryID")
  ownerID: StreamID! @documentReference(model: "EthAccount")
  owner: EthAccount! @relationDocument(property: "ownerID")
}`)
const pinDislikeComposite = await createComposite(ceramic, './schemas/PinDislike.graphql')
const pinDislikeModelID = pinDislikeComposite.modelIDs[3]

await writeSchema(
  'Featured',
  `type Website
@loadModel(id: "${websiteModelID}")
{
  id: ID!
}

type Pin
@loadModel(id: "${pinModelID}")
{
  id: ID!
}

type Featured
@createModel(accountRelation: LIST, description: "A featured content")
{
  websiteID: StreamID! @documentReference(model: "Website")
  website: Website! @relationDocument(property: "websiteID")
	pinID: StreamID! @documentReference(model: "Pin")
	pin: Pin! @relationDocument(property: "pinID")
  startAt: DateTime!
  endAt: DateTime!
}`)
const featuredComposite = await createComposite(ceramic, './schemas/Featured.graphql')
const featuredModelID = featuredComposite.modelIDs[2]

await writeSchema(
  'Subscription',
  `type Website
@loadModel(id: "${websiteModelID}")
{
  id: ID!
}

type Subscription
@createModel(accountRelation: LIST, description: "Subcription Website")
{
  websiteID: StreamID! @documentReference(model: "Website")
  website: Website! @relationDocument(property: "websiteID")
	subscribedID: StreamID! @documentReference(model: "Website")
	subscribedWebsite: Website! @relationDocument(property: "subscribedID")
	inactive: Boolean
  createdAt: DateTime!
  updatedAt: DateTime!
}`)
const subscriptionComposite = await createComposite(ceramic, './schemas/Subscription.graphql')
const subscriptionModelID = subscriptionComposite.modelIDs[1]

await writeSchema(
  'FinalModel',
  `type Piece
@loadModel(id: "${pieceModelID}")
{
  id: ID!
}

type PinLike
@loadModel(id: "${pinLikeModelID}")
{
  id: ID!
}

type PinDislike
@loadModel(id: "${pinDislikeModelID}")
{
  id: ID!
}

type Artist
@loadModel(id: "${artistModelID}")
{
  pins: [Pin] @relationFrom(model: "Pin", property: "artistID")
  pinsCount: Int! @relationCountFrom(model: "Pin", property: "artistID")
}

type Pin
@loadModel(id: "${pinModelID}")
{
  likes: [PinLike] @relationFrom(model: "PinLike", property: "pinID")
  likesCount: Int! @relationCountFrom(model: "PinLike", property: "pinID")
  dislikes: [PinDislike] @relationFrom(model: "PinDislike", property: "pinID")
  dislikesCount: Int! @relationCountFrom(model: "PinDislike", property: "pinID")
}

type Category
@loadModel(id: "${categoryModelID}")
{
  pins: [Pin] @relationFrom(model: "Pin", property: "categoryID")
  pinsCount: Int! @relationCountFrom(model: "Pin", property: "categoryID")
  likes: [PinLike] @relationFrom(model: "PinLike", property: "categoryID")
  likesCount: Int! @relationCountFrom(model: "PinLike", property: "categoryID")
  dislikes: [PinDislike] @relationFrom(model: "PinDislike", property: "categoryID")
  dislikesCount: Int! @relationCountFrom(model: "PinDislike", property: "categoryID")
}

type Subscription
@loadModel(id: "${subscriptionModelID}")
{
  id: ID!
}

type Featured
@loadModel(id: "${featuredModelID}")
{
  id: ID!
}

type EthAccount
@loadModel(id: "${ethAccountModelID}")
{
  pins: [Pin] @relationFrom(model: "Pin", property: "ownerID")
  pinsCount: Int! @relationCountFrom(model: "Pin", property: "ownerID")
  pinLikes: [PinLike] @relationFrom(model: "PinLike", property: "ownerID")
  pinLikesCount: Int! @relationCountFrom(model: "PinLike", property: "ownerID")
  pinDislikes: [PinDislike] @relationFrom(model: "PinDislike", property: "ownerID")
  pinDislikesCount: Int! @relationCountFrom(model: "PinDislike", property: "ownerID")
}

type Website
@loadModel(id: "${websiteModelID}")
{
  categories: [Category] @relationFrom(model: "Category", property: "websiteID")
  categoriesCount: Int! @relationCountFrom(model: "Category", property: "websiteID")
  pins: [Pin] @relationFrom(model: "Pin", property: "websiteID")
  pinsCount: Int! @relationCountFrom(model: "Pin", property: "websiteID")
  featured: [Featured] @relationFrom(model: "Featured", property: "websiteID")
  featuredCount: Int! @relationCountFrom(model: "Featured", property: "websiteID")
  subscriptions: [Subscription] @relationFrom(model: "Subscription", property: "websiteID")
  subscriptionsCount: Int! @relationCountFrom(model: "Subscription", property: "websiteID")
  users: [EthAccount] @relationFrom(model: "EthAccount", property: "websiteID")
  usersCount: Int! @relationCountFrom(model: "EthAccount", property: "websiteID")
}`)
const finalComposite = await createComposite(ceramic, './schemas/FinalModel.graphql')
await new Promise((resolve) => setTimeout(() => resolve(), 3000))

const mergedComposite = Composite.from([
  websiteComposite,
  ethAccountComposite,
  categoryComposite,
  artistComposite,
  pieceComposite,
  pinComposite,
  pinLikeComposite,
  pinDislikeComposite,
  featuredComposite,
  subscriptionComposite,
  finalComposite
])

console.log("Writing composedb files...")
await writeEncodedComposite(mergedComposite, './composites/merged-composite.json')
await new Promise((resolve) => setTimeout(() => resolve(), 3000))

await writeEncodedCompositeRuntime(
  ceramic,
  './composites/merged-composite.json',
  './composites/definitions.js'
)

await writeGraphQLSchema(mergedComposite.toRuntime(), './composites/Composite.graphql')
console.log('Done!')