import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import { router } from './routes/index.routes.js'
import { errores } from './middlewares/errores.js'
import path from 'path'
import { fileURLToPath } from 'url'

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: false }))

app.use('/', express.static(path.dirname(fileURLToPath(import.meta.url)) + '/public'))

app.get("/", (req, res, next) => {
    res.send("<h1>BIENVENIDO A MI API</h1>")
    next()
})

app.use(router)
app.use(errores)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
