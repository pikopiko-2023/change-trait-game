// Built-in Node Modules
import * as Path from 'node:path'

// Third-party Modules
import express from 'express'

// Local Files/Modules
import router from './routes.js'
// import { readJsonFile } from './utils.js'

const server = express()

// Server configuration
const publicFolder = Path.resolve('public')
server.use(express.static(publicFolder))
server.use(express.urlencoded({ extended: false }))

// Your routes/router(s) should go here

server.use('/', router)

server.use('/data/', router)

// server.use(router) // a middleware 'function call' to call a function, in this case router (found on routes.js)

export default server
