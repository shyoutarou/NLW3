import express from 'express'
import routes from './routes'
import cors from 'cors'
import path from 'path'
import errorHandler from './errors/handle'
import 'express-async-errors'
import './database/connection'
const app = express()

app.use(express.json())
app.use(cors())
app.use(routes)
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))
app.use(errorHandler)

app.listen(3333)