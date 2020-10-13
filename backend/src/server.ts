import express from 'express'
import routes from './routes'
import cors from 'cors'
import './database/connection'
const app = express()

app.use(express.json())
app.use(cors())
app.use(routes)

app.listen(3333)