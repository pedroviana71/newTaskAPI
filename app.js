require("dotenv").config()
const tasks = require("./routes/tasks")
const authRouter = require("./routes/auth")
const categoriesRouter = require("./routes/categories")
const auth = require("./middlewares/auth")

const connectDB = require("./db/connect")

const cors = require("cors")
const express = require("express")
const helmet = require("helmet")
const xss = require("xss-clean")
const rateLimiter = require("express-rate-limit")

const app = express()

app.set("trust proxy", 1)

app.use(cors())
app.use(helmet())
app.use(xss())
app.use(express.json())
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  })
)

app.get("/", (req, res) => {
  res.send("API is running")
})
app.use("/api/auth", authRouter)
app.use("/api/tasks", auth, tasks)
app.use("/api/user", auth, authRouter)
app.use("/api/category", auth, categoriesRouter)

app.use((req, res) => {
  res.status(404).send("404 Page Not Found")
})

port = process.env.PORT || 3005

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`)
    })
    console.log("Connected to database")
  } catch (error) {
    console.log(error)
  }
}

start()
