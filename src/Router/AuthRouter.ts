import { Router } from "express"
import { AuthController } from "../Controllers/AuthController"

const authRouter = Router()

authRouter.post("/api/register", AuthController.register)
authRouter.post("/api/login", AuthController.login)

export default authRouter
