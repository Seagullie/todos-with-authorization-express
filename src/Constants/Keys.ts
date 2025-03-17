import dotenv from "dotenv"

dotenv.config()

export const PORT = process.env.PORT || 3000
export const DATABASE_URL = process.env.DATABASE_URL || "mongodb://localhost:27017/defaultdb"
export const SECRET_KEY = process.env.SECRET_KEY || "defaultsecretkey"
