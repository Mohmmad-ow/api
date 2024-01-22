import express from "express"
import cookieParser from "cookie-parser";
import { verifyToken } from "./util/verifyToken.js";

// Routes
import userRouter from "./routes/user.js";
import blogRouter from "./routes/blog.js";
import yearRouter from "./routes/year.js";
import majorRouter from "./routes/major.js"
import degreeRouter from "./routes/degree.js"
import tagRouter from "./routes/tag.js"
import profileRouter from "./routes/profile.js"
import utilityRouter from "./routes/utility.js"
import CommentsRouter from "./routes/comment.js"

// homepage route
import { findBlogsByCategory } from "./controllers/blog.js";

// DB tables
import sequelize from "./models/connection.js";
import "./models/associations.js"
import cors from "cors"
const app = express();


const corsOptions = {
  origin: 'http://localhost:5173', // Replace with the origin you want to allow
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 204,
  credentials: true,
  allowedHeaders: 'Content-Type, Authorization, X-Requested-With, Origin, Accept'

};

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.get("/protected", (req, res) => {
  res.cookie("user", false, {httpOnly: true, sameSite: "none", secure: true, })
  res.send("You got it")
})

app.use("/users", userRouter)

app.use("/blogs", verifyToken, blogRouter)

app.use("/blogs", verifyToken, CommentsRouter)

app.use("/years", verifyToken, yearRouter)
app.use("/majors", verifyToken, majorRouter)
app.use("/degrees", verifyToken, degreeRouter)
app.use("/tags", verifyToken, tagRouter)
app.use("/profiles/", verifyToken, profileRouter)
app.use("/utility", verifyToken, utilityRouter)


app.get("/homepage", findBlogsByCategory)
  app.listen(3000,async () => {
    try {

      await sequelize.authenticate()  

      console.log("running on port 3000")
    } catch(err) {
      console.log(err)
    } 
      

})

