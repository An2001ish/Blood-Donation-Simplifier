// const express = require("express")
// const dotenv = require("dotenv")
// const colors = require("colors")
// const morgan = require("morgan")
// const cors = require("cors")
// const connectDB = require("./config/db")
// const authMiddleware = require("./middlewares/authMiddleware")

// dotenv.config()

// //mongodb connection
// connectDB()

// const app = express()

// app.use(express.json())
// app.use(cors({}))
// app.use(morgan("dev"))

// // Define auth routes before applying global middleware
// app.use("/api/v1/auth", require("./routes/authRoutes"))

// // Apply authMiddleware to all routes under /api/v1 except /api/v1/auth
// app.use("/api/v1", (req, res, next) => {
//   if (req.path.startsWith("/auth")) {
//     return next()
//   }
//   authMiddleware(req, res, next)
// })

// app.use("/api/v1/test", require("./routes/testRoutes"))
// app.use("/api/v1/inventory", require("./routes/inventoryRoutes"))
// app.use("/api/v1/bloodrequest", require("./routes/bloodRequestRoutes"))
// app.use("/api/v1/admin", require("./routes/adminRoutes"))

// const PORT = process.env.PORT || 4000

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// })

const express = require("express")
const dotenv = require("dotenv")
const colors = require("colors")
const morgan = require("morgan")
const cors = require("cors")
const connectDB = require("./config/db")
const authMiddleware = require("./middlewares/authMiddleware")

dotenv.config()

//mongodb connection
connectDB()

const app = express()

app.use(express.json())
app.use(cors({}))
app.use(morgan("dev"))

// Define auth routes before applying global middleware
app.use("/api/v1/auth", require("./routes/authRoutes"))

// Apply authMiddleware to all routes under /api/v1 except /api/v1/auth
app.use("/api/v1", (req, res, next) => {
  if (req.path.startsWith("/auth")) {
    return next()
  }
  authMiddleware(req, res,next);
})

app.use("/api/v1/inventory", require("./routes/inventoryRoutes"))
app.use("/api/v1/bloodrequest", require("./routes/bloodRequestRoutes"))
app.use("/api/v1/admin", require("./routes/adminRoutes"))

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

