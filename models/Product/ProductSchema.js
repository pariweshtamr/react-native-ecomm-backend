import mongoose from "mongoose"

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    supplier: { type: String, required: true },
    imageUrl: { type: String, required: true },
    price: { type: Number, required: true },
    desc: { type: String, required: true },
    product_location: { type: String, required: true },
  },
  { timestamps: true }
)

export default mongoose.model("Product", ProductSchema)
