import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import { ErrorHandle } from "./middlewares/error.js"

//import routes
import authRoutes from './routes/authRoutes.js'
import msgRoutes from './routes/messageRoutes.js'
import contactRoutes from './routes/contactRoutes.js'

const app = express()

app.use(bodyParser.json({ limit: '50mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(cors())
app.use(cookieParser())

//binding the app root
app.use('/api/user', authRoutes)
//send message
app.use('/api/msg', msgRoutes)
//
app.use('/api/contact', contactRoutes)
//end app root building
// it's for errorHandeling
app.use(ErrorHandle);

export default app