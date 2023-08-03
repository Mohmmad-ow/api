import express from "express"
import cookieParser from "cookie-parser";
import { verifyToken } from "./util/verifyToken.js";
import userRouter from "./routes/user.js";
// DB tables
import sequelize from "./models/index.js";
import User from "./models/users.js";
import Major from "./models/major.js";
import Degree from "./models/degree.js";
import Year from "./models/year.js";
import Blog from "./models/blog.js";
import "./models/associations.js"

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.get("/protected", verifyToken, (req, res) => {
  res.send("You got it")
})

app.use("/users", userRouter)
sequelize.sync().then(() => {
  app.listen(3000,() => {
      console.log("running on port 3000")
      
  })

})

