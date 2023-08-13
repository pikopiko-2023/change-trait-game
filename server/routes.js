import { Router } from 'express'
import fs from 'node:fs/promises'
import { readFile } from 'node:fs/promises'

const router = Router()
const dataPath = 'data.json'

async function readJsonFile(dataPath) {
  try {
    const data = await readFile(dataPath, 'utf8')
    const json = JSON.parse(data)

    // Map over the traits and format each one
    const collectionOfTraits = json.traits.map((trait) => {
      return `${trait.id}: ${trait.name} ${trait.strangeTrait}`
    })
    console.log(collectionOfTraits)
    return collectionOfTraits
  } catch (err) {
    console.error(`Error reading file from disk: ${err}`)
  }
}

readJsonFile(dataPath)

// A route to render the JSON data as plain text
router.get('/', async (req, res) => {
  const data = await readJsonFile(dataPath)
  if (data) {
    res.setHeader('Content-Type', 'text/plain')
    res.send(data.join('\n'))
    // res.send(JSON.stringify(data, null, 2))
  } else {
    res.status(500).send('Error reading data.')
  }
})

router.post('/actionThing', async (req, res) => {
  try {
    // Fetch form data from request body
    const formData = {
      id: Number(req.body.id),
      name: req.body.fname,
      strangeTrait: req.body.strait,
    }

    // Read the current contents of the JSON file
    const fileContents = await fs.readFile(dataPath, 'utf8')
    const currentData = JSON.parse(fileContents)

    // Replace the trait at the specified index
    currentData.traits[formData.id] = formData

    // Write the updated data back to the file
    await fs.writeFile(dataPath, JSON.stringify(currentData, null, 2), 'utf8')

    // Send response
    res.send('Data replaced successfully')
  } catch (error) {
    console.error('Error replacing data:', error)
    // res.status(500).send('Server error')
  }
})

export default router
