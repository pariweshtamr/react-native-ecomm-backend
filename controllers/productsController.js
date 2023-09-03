import {
  addProduct,
  fetchAllProducts,
  getProductById,
  getSearchedProduct,
} from "../models/Product/ProductModel.js"

export const createProduct = async (req, res, next) => {
  try {
    const newProduct = await addProduct(req.body)
    if (!newProduct?._id) {
      return res
        .status(500)
        .json({ status: "error", message: "Failed to add product!" })
    }
    res
      .status(200)
      .json({ status: "success", message: "Product added successfully!" })
  } catch (error) {
    next(error)
  }
}

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await fetchAllProducts()
    res.status(200).json({ status: "success", products })
  } catch (error) {
    next(error)
  }
}

export const getProduct = async (req, res, next) => {
  const { id } = req.params
  try {
    const product = await getProductById(id)
    if (!product?._id) {
      return res.json({ status: "error", message: "Product not found!" })
    }
    res.json({ status: "success", product })
  } catch (error) {
    next(error)
  }
}

export const searchProduct = async (req, res, next) => {
  const { key } = req.params
  try {
    const result = await getSearchedProduct(key)
    res.status(200).json({ status: "success", result })
  } catch (error) {
    next(error)
  }
}
