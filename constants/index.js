import dotenv from 'dotenv'
import path from "path"

dotenv.config({
    path: path.join(process.cwd(), '/config/.env')
})

export const PORT = process.env.PORT
export const HOSTNAME = process.env.HOSTNAME
export const CONNECTION_URL = process.env.CONNECTION_URL
export const DBNAME = process.env.DBNAME
export const SECRET = process.env.SECRET
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
export const JWT_EXPIRES = process.env.JWT_EXPIRES