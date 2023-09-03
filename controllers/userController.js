import { deleteUserById, getUserById } from "../models/User/UserModel.js"

export const getUser = async (req, res, next) => {
  const { _id } = req.params
  try {
    const user = await getUserById(_id)
    if (!user?._id) {
      return res
        .status(401)
        .json({ status: "error", message: "User does not exist!" })
    }
    const { passowrd, __v, createdAt, updatedAt, ...userData } = user._doc

    res.status(200).json({ status: "success", user: userData })
  } catch (error) {
    next(error)
  }
}
export const deleteUser = async (req, res, next) => {
  const { _id } = req.params
  try {
    if (!_id) {
      return res.json({ status: "error", message: "Unable to find account!" })
    }
    const deleted = await deleteUserById(_id)
    if (!deleted?._id) {
      return res.json({ status: "error", message: "Unable to delete account!" })
    }
    res
      .status(200)
      .json({ status: "success", message: "Account deleted successfully!" })
  } catch (error) {
    next(error)
  }
}
