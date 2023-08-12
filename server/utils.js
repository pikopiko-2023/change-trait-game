import { readFile, writeFile } from 'node:fs/promises'

export async function readJsonFile(path) {
  try {
    const data = await readFile(path, 'utf8')
    const json = JSON.parse(data)
    return json
  } catch (err) {
    console.error(`Error reading file from disk: ${err}`)
  }
}

export async function writeJsonFile(path, data) {
  const newData = JSON.stringify(data, null, 2)
  await writeFile('server/data/data.json', newData).catch(console.log)
}
