import jwt from "jsonwebtoken";
import dotenv from "dotenv"


dotenv.config()
export const verifyToken = async (req, res, next) => {

    const authHeader =  req.headers["authorization"];
    console.log(authHeader)
    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({message: "You're not authenticated!"})    
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({message: "Token is Invalid! " + err})
        req.user = user;
        next()
    })
}

