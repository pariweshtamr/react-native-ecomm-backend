import {
  createCart,
  delCartItem,
  getCartByFilter,
  updateCartByFilter,
} from "../models/Cart/CartModel.js"

export const addToCart = async (req, res, next) => {
  const { userId, cartItem, quantity } = req.body
  try {
    const cart = await getCartByFilter({ userId })
    if (!cart?._id) {
      const newCart = await createCart({
        userId,
        products: [{ cartItem, quantity }],
      })
      if (!newCart?._id) {
        return res.json({
          status: "error",
          message: "Unable to add product to cart!",
        })
      }
      return res
        .status(200)
        .json({ status: "success", message: "Product added to cart!" })
    }

    const existingProduct = cart.products.find(
      (product) => product.cartItem.toString() === cartItem
    )

    if (existingProduct) {
      existingProduct.quantity += 1
    } else {
      cart.products.push({ cartItem, quantity })
    }

    await cart.save()

    res.status(200).json("Product added to cart!")
  } catch (error) {
    next(error)
  }
}
export const getCart = async (req, res, next) => {
  const { _id } = req.params
  try {
    const cart = await getCartByFilter({ userId: _id }).populate(
      "products.cartItem",
      "_id title supplier price imageUrl"
    )
    if (!cart?._id) {
      return res
        .status(401)
        .json({ status: "error", message: "Cart not found!" })
    }
    res.status(200).json({ status: "success", cart })
  } catch (error) {
    next(error)
  }
}
export const deleteCartItem = async (req, res, next) => {
  const { _id } = req.params

  try {
    const updatedCart = await delCartItem(_id)
    if (!updatedCart) {
      return res
        .status(404)
        .json({ status: "error", message: "Cart item not found!" })
    }

    res.status(200).json({ status: "success", updatedCart })
  } catch (error) {
    next(error)
  }
}
export const decreaseCartItem = async (req, res, next) => {
  const { userId, cartItem } = req.body
  try {
    const cart = await getCartByFilter({ userId })
    if (!cart?._id) {
      return res
        .status(404)
        .json({ status: "error", message: "Cart not found!" })
    }
    const existingProduct = cart.products.find(
      (product) => product.cartItem.toString() === cartItem
    )

    if (!existingProduct) {
      return res
        .status(404)
        .json({ status: "error", message: "Product not found!" })
    }

    if (existingProduct.quantity === 1) {
      cart.products = cart.products.filter(
        (p) => p.cartItem.toString() !== cartItem
      )
    } else {
      existingProduct.quantity -= 1
    }

    await cart.save()

    if (existingProduct.quantity === 0) {
      await updateCartByFilter({ userId, cartItem })
    }
    res.status(200).json({ status: "success", message: "Cart updated!" })
  } catch (error) {
    next(error)
  }
}
