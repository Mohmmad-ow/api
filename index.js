import express from "express"
import cookieParser from "cookie-parser";
import { verifyToken } from "./util/verifyToken.js";

// Routes
import userRouter from "./routes/user.js";
import blogRouter from "./routes/blog.js";
import yearRouter from "./routes/year.js";
import majorRouter from "./routes/major.js"
import degreeRouter from "./routes/degree.js"
// DB tables
import sequelize from "./models/connection.js";
import "./models/associations.js"
import cors from "cors"
const app = express();
app.use(cors({
  credentials: true,
  origin: "http://127.0.0.1:5173",
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.get("/protected", (req, res) => {
  res.cookie("user", false, {httpOnly: true, sameSite: "none", secure: true, })
  res.send("You got it")
})

app.use("/users", userRouter)
app.use("/blogs", verifyToken, blogRouter)
app.use("/years", verifyToken, yearRouter)
app.use("/majors", verifyToken, majorRouter)
app.use("/degrees", verifyToken, degreeRouter)
  app.listen(3000,async () => {
    try {

      await sequelize.authenticate()  

      console.log("running on port 3000")
    } catch(err) {
      console.log(err)
    } 
      

})

