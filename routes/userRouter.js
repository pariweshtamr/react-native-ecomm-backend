import express from "express"
import { deleteUser, getUser } from "../controllers/userController.js"
const router = express.Router()

router.get("/:_id", getUser)
router.delete("/:_id", deleteUser)

export default router
