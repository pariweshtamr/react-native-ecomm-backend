import Product from "./ProductSchema.js"
export const addProduct = (obj) => {
  return Product(obj).save()
}

export const fetchAllProducts = () => {
  return Product.find({}).sort({ createdAt: -1 })
}

export const getProductById = (id) => {
  return Product.findById(id)
}

export const getSearchedProduct = (query) => {
  return Product.aggregate([
    {
      $search: {
        index: "furniture",
        text: {
          query: query,
          path: {
            wildcard: "*",
          },
        },
      },
    },
  ])
}
