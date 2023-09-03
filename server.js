import dotenv from "dotenv"
dotenv.config()
import express from "express"
import mongoClient from "./dbConnect.js"
import cors from "cors"

const app = express()
const PORT = process.env.PORT || 8000

// Connect Database
mongoClient()

app.get("/", (req, res) => {
  res.json({
    message: "You have reached ecomm app api!",
  })
})

// Middlewares
app.use(cors())
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ limit: "10mb", extended: true }))

// Routes
import productRouter from "./routes/productRouter.js"
import userRouter from "./routes/userRouter.js"
import cartRouter from "./routes/cartRouter.js"
import orderRouter from "./routes/orderRouter.js"
import authRouter from "./routes/authRouter.js"
app.use("/api/products", productRouter)
app.use("/api/users", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/orders", orderRouter)
app.use("/api/auth", authRouter)

// Error handling
app.use((error, req, res, next) => {
  const errorStatus = error.status || 500
  const errorMsg = error.message || "Something went wrong!"

  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMsg,
    stack: error.stack,
  })
})
app.listen(PORT, (error) => {
  if (error) {
    return console.log(error)
  }
  console.log(`Server is running at port ${PORT}`)
})
