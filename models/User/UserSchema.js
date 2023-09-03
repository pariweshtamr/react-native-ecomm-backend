import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    location: { type: String, default: "Sydney, Australia" },
  },
  { timestamps: true }
)

export default mongoose.model("User", UserSchema)
