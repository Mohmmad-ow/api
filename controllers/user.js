import User from "../models/users.js"
import Profile from "../models/profile.js"
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
        
        const userData = req.body;
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)
        userData.password = hash
        console.log(req.body)
        await User.create(userData)
        return res.status(200).json({message: "User has been created successfully"})
    } catch (err) {
        next(err)
    }

}

export const login = async (req, res, next) => {
    console.log("here")
    console.log(req.body)
    if (req.body.length == 0) {
        return res.status(400).send({message: "Missing user information"});
    } 
    try {
        const user = await User.findOne({where: { email: req.body.email },include: [
            {
                model: Profile
            }
        ]})
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password)
        
        if (!isPasswordCorrect) {
           return res.status(400).json({message: "Wrong password or email"})
        } 
        const token = jwt.sign({id: user.id, profileId: user.Profile ? user.Profile.id : null , isAdmin: user.isAdmin, isManger: user.isManger, }, process.env.SECRET_KEY, {expiresIn: "1d"})
        console.log(process.env.SECRET_KEY)
        const {password, isAdmin, ...otherDetails} = user;
       return res.status(200).json({isAdmin: isAdmin, token})
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


export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.findAll();
        res.status(200).json({users: users});
    } catch(err) {
        console.error(err)
        res.status(400).json({message: err})
    }
}


export const findClientUser = async (req, res, next) => {
    const userId = req.user.id;
    try {
        const user = await User.findByPk(userId,
             {
                include: [
                            {
                                model: Profile,
                                required: false
                            }
                        ]
            })
        res.status(200).json({user: user});
    } catch (err) {
        return next(err)
    }
}