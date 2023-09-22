import { writeFile } from "fs/promises"

export default async function writeSchema(name, content) {
  await writeFile(`./schemas/${name}.graphql`, content, { encoding: 'utf-8'})
  console.log(`${name} schema created!`)
}