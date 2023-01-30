import { DID } from "dids"
import { fromString } from "uint8arrays"
import { getResolver } from "key-did-resolver"
import { Ed25519Provider } from "key-did-provider-ed25519"

export default async function createDID() {
  if (!process.env.PRIVATE_KEY) throw new Error("ENVIROMENT VAR PRIVATE_KEY UNDEFINED")

  const privateKey = fromString(
    process.env.PRIVATE_KEY,
    'base16'
  )
  const did = new DID({
    resolver: getResolver(),
    provider: new Ed25519Provider(privateKey),
  })

  await did.authenticate()
  return did

}