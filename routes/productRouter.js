import express from "express"
import {
  createProduct,
  getAllProducts,
  getProduct,
  searchProduct,
} from "../controllers/productsController.js"

const router = express.Router()

router.get("/", getAllProducts)
router.get("/:id", getProduct)
router.get("/search/:key", searchProduct)
router.post("/", createProduct)

export default router
