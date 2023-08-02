import express from "express"
import cookieParser from "cookie-parser";
import { verifyToken } from "./util/verifyToken.js";
import userRouter from "./routes/user.js";
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())


app.use("/users", userRouter)

app.get("/protected", verifyToken, (req, res) => {
  res.send("You got it")
})

app.listen(3000,() => {
    console.log("running on port 3000")
    
})
