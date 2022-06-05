require("dotenv").config();
const connectDB = require("./db/connect");
const tasks = require("./routes/index");
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use("/api/tasks", tasks);
app.use("/", (req, res) => {
  res.send("Hello World");
});

port = 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
    console.log("Connected to database");
  } catch (error) {
    console.log(error);
  }
};

start();
