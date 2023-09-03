import Cart from "./CartSchema.js"

export const getCartByFilter = (filter) => {
  return Cart.findOne(filter)
}

export const createCart = (obj) => {
  return Cart(obj).save()
}

export const delCartItem = (_id) => {
  return Cart.findOneAndUpdate(
    { "products._id": _id },
    { $pull: { products: { _id } } },
    { new: true }
  )
}

export const updateCartByFilter = (obj) => {
  return Cart.updateOne(
    { userId: obj.userId },
    { $pull: { products: { cartItem: obj.cartItem } } },
    { new: true }
  )
}
