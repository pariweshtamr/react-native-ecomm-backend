import express from "express"
import {
  addToCart,
  decreaseCartItem,
  deleteCartItem,
  getCart,
} from "../controllers/cartController.js"
const router = express.Router()

router.post("/", addToCart)
router.get("/find/:_id", getCart)
router.delete("/:_id", deleteCartItem)
router.post("/qty", decreaseCartItem)

export default router
