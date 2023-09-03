import jwt from "jsonwebtoken"

export const signToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" })
  return token
}
