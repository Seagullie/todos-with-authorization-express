import bcrypt from "bcryptjs"
import { SECRET_KEY } from "../Constants/Keys"
import jwt from "jsonwebtoken"
import User from "../Models/User"

import { Request, Response } from "express"

interface LoginRequest extends Request {
  body: {
    email: string
    password: string
  }
}

const generateToken = (user) =>
  jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    SECRET_KEY,
    {
      expiresIn: "1d",
    }
  )

export class AuthController {
  static async register(req: Request, res: Response): Promise<any> {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      const user = new User({
        ...req.body,
        password: hashedPassword,
      })
      await user.save()
      res.json({
        token: generateToken(user),
      })
    } catch (err) {
      res.status(400).json({
        error: "User already exists",
      })
    }
  }

  static async login(req: LoginRequest, res: Response): Promise<any> {
    try {
      const user = await User.findOne({ email: req.body.email })
      if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
        return res.status(400).json({ error: "Invalid credentials" })
      }

      res.json({ token: generateToken(user) })
    } catch (err) {
      res.status(500).json({ error: "Login failed" })
    }
  }
}
