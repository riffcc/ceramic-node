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
  'Site',
  `type Site
@createModel(accountRelation: LIST, description: "A Site")
@createIndex(fields: [{path: "name"}])
{
  name: String! @string(maxLength: 50)
  description: String @string(maxLength: 150)
  image: String @string(maxLength: 100)
  colors: Colors
  createdAt: DateTime!
  updatedAt: DateTime!
}

type Colors {
  background: String @string(maxLength: 10)
  background_lighten_1: String @string(maxLength: 10)
  background_lighten_2: String @string(maxLength: 10)
  background_darken_1: String @string(maxLength: 10)
  background_darken_2: String @string(maxLength: 10)
  primary: String @string(maxLength: 10)
  primary_lighten_1: String @string(maxLength: 10)
  primary_darken_1: String @string(maxLength: 10)
  secondary: String @string(maxLength: 10)
  secondary_lighten_1: String @string(maxLength: 10)
  secondary_darken_1: String @string(maxLength: 10)
  surface: String @string(maxLength: 10)
  error: String @string(maxLength: 10)
  info: String @string(maxLength: 10)
  success: String @string(maxLength: 10)
  warning: String @string(maxLength: 10)
}
`)
const siteComposite = await createComposite(ceramic, './schemas/Site.graphql')
const siteModelID = siteComposite.modelIDs[0]

await writeSchema(
  'EthAccount',
  `type Site
@loadModel(id: "${siteModelID}") {
  id: ID!
}

type Settings {
  cidAvatar: String @string(maxLength: 100)
  autoplay: Boolean!
}

type EthAccount
@createModel(accountRelation: LIST, description: "An Ethereum Account")
@createIndex(fields: [{path: "siteID"}])
@createIndex(fields: [{path: "address"}])
@createIndex(fields: [{path: "isAdmin"}])
@createIndex(fields: [{path: "isSuperAdmin"}])
{
  address: String! @string(maxLength: 66)
  siteID: StreamID! @documentReference(model: "Site")
  site: Site! @relationDocument(property: "siteID")
  isAdmin: Boolean!
  isSuperAdmin: Boolean!
  settings: Settings!
  createdAt: String! @string(maxLength: 100)
  updatedAt: String! @string(maxLength: 100)
}`)
const ethAccountComposite = await createComposite(ceramic, './schemas/EthAccount.graphql')
const ethAccountModelID = ethAccountComposite.modelIDs[1]

await writeSchema(
  'Category',
  `type Site
@loadModel(id: "${siteModelID}") {
  id: ID!
}

type Category
@createModel(accountRelation: LIST, description: "A category")
@createIndex(fields: [{path: "siteID"}])
@createIndex(fields: [{path: "name"}])
{
  siteID: StreamID! @documentReference(model: "Site")
  site: Site! @relationDocument(property: "siteID")
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
  name: String! @string(maxLength: 100)
}`)
const artistComposite = await createComposite(ceramic, './schemas/Artist.graphql')
const artistModelID = artistComposite.modelIDs[0]

await writeSchema(
  'Piece',
  `type Piece
@createModel(accountRelation: LIST, description: "Piece of content")
@createIndex(fields: [{path: "createdAt"}])
{
  name: String! @string(maxLength: 100)
  contentCid: String! @string(maxLength: 100)
  details: Details  
  createdAt: DateTime!
  updatedAt: DateTime!
}

type Details {
  thumbnailCid: String @string(maxLength: 100)
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

type Site @loadModel(id: "${siteModelID}") {
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
@createIndex(fields: [{path: "siteID"}])
@createIndex(fields: [{path: "categoryID"}])
@createIndex(fields: [{path: "ownerID"}])
@createIndex(fields: [{path: "approved"}])
@createIndex(fields: [{path: "rejected"}])
@createIndex(fields: [{path: "deleted"}])
{
  artistID: StreamID! @documentReference(model: "Artist")
  artist: Artist! @relationDocument(property: "artistID")
  siteID: StreamID! @documentReference(model: "Site")
  site: Site! @relationDocument(property: "siteID")
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
  'Like',
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

type Like
@createModel(accountRelation: LIST, description: "A like for a pin")
{
	pinID: StreamID! @documentReference(model: "Pin")
	pin: Pin! @relationDocument(property: "pinID")
	categoryID: StreamID! @documentReference(model: "Category")
	category: Category! @relationDocument(property: "categoryID")
  ownerID: StreamID! @documentReference(model: "EthAccount")
  owner: EthAccount! @relationDocument(property: "ownerID")
}`)
const pinLikeComposite = await createComposite(ceramic, './schemas/Like.graphql')
const pinLikeModelID = pinLikeComposite.modelIDs[3]

await writeSchema(
  'Dislike',
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

type Dislike
@createModel(accountRelation: LIST, description: "A dislike for a pin")
{
	pinID: StreamID! @documentReference(model: "Pin")
	pin: Pin! @relationDocument(property: "pinID")
	categoryID: StreamID! @documentReference(model: "Category")
	category: Category! @relationDocument(property: "categoryID")
  ownerID: StreamID! @documentReference(model: "EthAccount")
  owner: EthAccount! @relationDocument(property: "ownerID")
}`)
const pinDislikeComposite = await createComposite(ceramic, './schemas/Dislike.graphql')
const pinDislikeModelID = pinDislikeComposite.modelIDs[3]

await writeSchema(
  'Featured',
  `type Site
@loadModel(id: "${siteModelID}")
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
@createIndex(fields: [{path: "siteID"}])
@createIndex(fields: [{path: "startAt"}])
@createIndex(fields: [{path: "endAt"}])
{
  siteID: StreamID! @documentReference(model: "Site")
  site: Site! @relationDocument(property: "siteID")
	pinID: StreamID! @documentReference(model: "Pin")
	pin: Pin! @relationDocument(property: "pinID")
  startAt: DateTime!
  endAt: DateTime!
}`)
const featuredComposite = await createComposite(ceramic, './schemas/Featured.graphql')
const featuredModelID = featuredComposite.modelIDs[2]

await writeSchema(
  'Subscription',
  `type Site
@loadModel(id: "${siteModelID}")
{
  id: ID!
}

type Subscription
@createModel(accountRelation: LIST, description: "Subcription Site")
@createIndex(fields: [{path: "siteID"}])
@createIndex(fields: [{path: "subscribedID"}])
@createIndex(fields: [{path: "inactive"}])
{
  siteID: StreamID @documentReference(model: "Site")
  site: Site @relationDocument(property: "siteID")
	subscribedID: StreamID @documentReference(model: "Site")
	subscribedSite: Site @relationDocument(property: "subscribedID")
	inactive: Boolean
  createdAt: DateTime
  updatedAt: DateTime
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

type Like
@loadModel(id: "${pinLikeModelID}")
{
  id: ID!
}

type Dislike
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
  likes: [Like] @relationFrom(model: "Like", property: "pinID")
  likesCount: Int! @relationCountFrom(model: "Like", property: "pinID")
  dislikes: [Dislike] @relationFrom(model: "Dislike", property: "pinID")
  dislikesCount: Int! @relationCountFrom(model: "Dislike", property: "pinID")
}

type Category
@loadModel(id: "${categoryModelID}")
{
  pins: [Pin] @relationFrom(model: "Pin", property: "categoryID")
  pinsCount: Int! @relationCountFrom(model: "Pin", property: "categoryID")
  likes: [Like] @relationFrom(model: "Like", property: "categoryID")
  likesCount: Int! @relationCountFrom(model: "Like", property: "categoryID")
  dislikes: [Dislike] @relationFrom(model: "Dislike", property: "categoryID")
  dislikesCount: Int! @relationCountFrom(model: "Dislike", property: "categoryID")
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
  likes: [Like] @relationFrom(model: "Like", property: "ownerID")
  likesCount: Int! @relationCountFrom(model: "Like", property: "ownerID")
  dislikes: [Dislike] @relationFrom(model: "Dislike", property: "ownerID")
  dislikesCount: Int! @relationCountFrom(model: "Dislike", property: "ownerID")
}

type Site
@loadModel(id: "${siteModelID}")
{
  categories: [Category] @relationFrom(model: "Category", property: "siteID")
  categoriesCount: Int! @relationCountFrom(model: "Category", property: "siteID")
  pins: [Pin] @relationFrom(model: "Pin", property: "siteID")
  pinsCount: Int! @relationCountFrom(model: "Pin", property: "siteID")
  featured: [Featured] @relationFrom(model: "Featured", property: "siteID")
  featuredCount: Int! @relationCountFrom(model: "Featured", property: "siteID")
  subscriptions: [Subscription] @relationFrom(model: "Subscription", property: "siteID")
  subscriptionsCount: Int! @relationCountFrom(model: "Subscription", property: "siteID")
  users: [EthAccount] @relationFrom(model: "EthAccount", property: "siteID")
  usersCount: Int! @relationCountFrom(model: "EthAccount", property: "siteID")
}`)
const finalComposite = await createComposite(ceramic, './schemas/FinalModel.graphql')
await new Promise((resolve) => setTimeout(() => resolve(), 3000))

const mergedComposite = Composite.from([
  siteComposite,
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