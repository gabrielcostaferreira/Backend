import express from 'express'
import cors from 'cors'
const app = express()
app.use(express.json())
app.use(cors())
import usuarioController from './controllers/usuarioController.js'
import postController from './controllers/postController.js'
usuarioController(app)
postController(app)
export default app
