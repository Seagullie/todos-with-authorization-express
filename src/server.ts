import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import tasksRouter from "./Router/TasksRouter"
import taskListsRouter from "./Router/TasksListsRouter"
import { connectDB } from "./Database/Setup"
import authRouter from "./Router/AuthRouter"

connectDB()

const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(cors())

// assign routes
app.use(tasksRouter)
app.use(taskListsRouter)
app.use(authRouter)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
