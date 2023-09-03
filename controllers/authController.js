import { createUser, getUserByFilter } from "../models/User/UserModel.js"
import { decryptPassword, encryptPassword } from "../helpers/crypto.helper.js"
import { signToken } from "../helpers/jwt.helper.js"

export const registerUser = async (req, res, next) => {
  const { email, password: pass } = req.body
  try {
    const userExists = await getUserByFilter({ email })
    if (userExists?._id) {
      return res.json({
        status: "error",
        message: "An account with this email address already exists!",
      })
    }

    // encrypt password

    const encryptPass = encryptPassword(pass)

    // save user to db
    const newUser = await createUser({ ...req.body, password: encryptPass })

    if (!newUser?._id) {
      return res.json({ status: "error", message: "Unable to add user!" })
    }
    res
      .status(201)
      .json({ status: "success", message: "User created successfully!" })
  } catch (error) {
    next(error)
  }
}
export const loginUser = async (req, res, next) => {
  const { email, password: pass } = req.body
  try {
    const userExists = await getUserByFilter({ email })
    if (!userExists?._id) {
      return res.json({ status: "error", message: "User not found!" })
    }
    // decrypt & compare passwords and generate token for login
    const decryptedPass = decryptPassword(userExists.password)
    if (decryptedPass !== pass) {
      return res
        .status(401)
        .json({ status: "error", message: "Invalid password!" })
    }

    const userToken = signToken({ _id: userExists?._id })

    const { password, __v, createdAt, updatedAt, ...userData } = userExists._doc

    res
      .status(200)
      .json({ status: "success", user: { ...userData, token: userToken } })
  } catch (error) {
    next(error)
  }
}
