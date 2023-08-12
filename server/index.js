import server from './server.js'

// const port = 3000
const port = process.env.PORT || 3000
const url = `http://localhost:${port}`

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
  console.log(`Visit here: ${url}`)
})
