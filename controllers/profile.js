import Profile from "../models/profile.js"
import Major from "../models/major.js";
import Degree from "../models/degree.js";
import Year from "../models/year.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config(); 

export const createProfile = async (req, res, next) => {
    if (!req.body) {
        res.status(400).json({message: "Profile info not inputted"})
    }
    try {
        req.body.UserId = req.user.id;
        const profile =  await Profile.create({...req.body})
        const token = jwt.sign({id: req.user.id,profileId: profile.id, isAdmin: req.user.isAdmin, isManger: req.user.isManger}, process.env.SECRET_KEY, {expiresIn: "1d"})
        console.log(profile)
        res.status(200).json({message: "Profile created with the userId of " + req.user.id, token});
    } catch(err) {
        next(err)
    }
}

export const findProfiles = async (req, res, next) => {
    try {
        const Profile = await Profile.findAll();
        return res.status(200).json(Profile);
    } catch(err) {
        
        next(err);
    }
}

export const findProfile = async (req, res, next) => {
   try {
    const profile = await Profile.findOne({where: {UserId: req.user.id}, include: 
        [
            {
                model: Major,
                attributes: ['name', 'id']
            },
            {
                model: Degree,
                attributes: ['name', 'id']
            },
            {
                model: Year,
                attributes: ['name', 'id']
            }
        ]
    }
    )
    
    return res.status(200).json(profile)
   } catch (err) {
    next(err)
   }
}

export const updateProfile = async (req, res, next) => {
    if (!req.body) {
        return res.status(400).json({message: "No data sent!"})    
    }
    try {
        console.log(req.body)
        await Profile.update({...req.body}, {where: {userId: req.user.id}})
        console.log("Tag updated")
        res.status(200).json({message: "Profile Updated"})
    } catch(err) {
        next(err)
    }

}

export const deleteProfile = async (req, res, next) => {
    try {
        const id = req.params.id;
        await Profile.destroy({where: {id: id}})
        res.status(200).json({message: "Profile deleted"})
    } catch(err) {
        next(err)
    }
}