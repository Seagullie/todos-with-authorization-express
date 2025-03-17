import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  password: String,
  role: {
    type: String,
    enum: ["admin", "viewer"],
    default: "admin",
  },
})
const User = mongoose.model("User", UserSchema)

export default User
