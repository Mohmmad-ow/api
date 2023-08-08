import jwt from "jsonwebtoken";
import dotenv from "dotenv"


dotenv.config()
export const verifyToken = async (req, res, next) => {

    const token = req.cookies.access_token;
    if (!token) {
        return res.status(401).json({message: "You're not authenticated!"})    
    } 
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({message: "Token is Invalid!"})
        req.user = user;
        next()
    })
}