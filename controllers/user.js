import User from "../models/users.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config();



// Auth
export const register = async (req, res, next) => {
    if (req.body.length == 0) {
        return res.status(400).send({message: "Missing user information"})
    }
    try {
        const {username, password, email} = req.body;
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        console.log(req.body)
        await User.create({username: username, password: hash, email: email})
        return res.status(200).json({message: "User has been created successfully"})
    } catch (err) {
        next(err)
    }

}

export const login = async (req, res, next) => {
    console.log(req.body)
    if (req.body.length == 0) {
        return res.status(400).send({message: "Missing user information"})
    } 
    try {
        const user = await User.findOne({where: { email: req.body.email }})
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password)
        
        if (!isPasswordCorrect) {
            res.status(400).json({message: "Wrong password or email"})
        } 
        const token = jwt.sign({id: user.id, isAdmin: user.isAdmin}, process.env.SECRET_KEY, {expiresIn: "1d"})

        const {password, isAdmin, ...otherDetails} = user;
        res.cookie("access_token", token, {httpOnly: true}).status(200).json({details: {...otherDetails}, isAdmin})
    } catch (err) {
        console.log("error in query " + err)
        next(err)
    }
} 

export const logout = async (req, res, next) => {
    req.cookies.access_token = null
    res.status(200).json({message: "User logged out"})
    next()
}