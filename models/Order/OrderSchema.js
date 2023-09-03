import mongoose from "mongoose"

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    customerId: { type: String, required: true },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    quantity: { type: Number, required: true },
    subtotal: { type: Number, required: true },
    total: { type: Number, required: true },
    delivery_Status: { type: String, default: "pending" },
    payment_Status: { type: String, default: "pending" },
  },
  { timestamps: true }
)

export default mongoose.model("Order", OrderSchema)
