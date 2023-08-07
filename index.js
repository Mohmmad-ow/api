import express from "express"
import cookieParser from "cookie-parser";
import { verifyToken } from "./util/verifyToken.js";


// Routes
import userRouter from "./routes/user.js";
import blogRouter from "./routes/blog.js"
// DB tables
import sequelize from "./models/connection.js";
import "./models/associations.js"
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())


app.get("/protected", verifyToken, (req, res) => {
  res.send("You got it")
})

app.use("/users", userRouter)
app.use("/blogs", verifyToken, blogRouter)

  app.listen(3000,async () => {
    try {

      await sequelize.authenticate()  
      console.log("running on port 3000")
    } catch(err) {
      console.log(err)
    } 
      

})

