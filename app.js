require("dotenv").config()
const connectDB = require("./db/connect")
const tasks = require("./routes/tasks")
const authRouter = require("./routes/auth")
const express = require("express")
const app = express()
var cors = require("cors")
const auth = require("./middlewares/auth")

app.use(cors())

app.use(express.json())
app.get("/", (req, res) => {
  res.send("API is running")
})
app.use("/api/auth", authRouter)
app.use("/api/tasks", auth, tasks)
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
