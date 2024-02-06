import Profile from "../models/profile.js"
import Major from "../models/major.js";
import Degree from "../models/degree.js";
import Year from "../models/year.js";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import Blog from "../models/blog.js";
dotenv.config(); 

export const createProfile = async (req, res, next) => {
    if (!req.body) {
        res.status(400).json({message: "Profile info not inputted"})
    }
    try {
        req.body.UserId = req.user.id;
        const profile =  await Profile.create({...req.body})
        const token = jwt.sign({id: req.user.id,profileId: profile.id, isAdmin: req.user.isAdmin, isManger: req.user.isManger}, process.env.SECRET_KEY, {expiresIn: "1d"})
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

export const findProfileById = async (req, res, next) => {
    
    if (!(req.user.isAdmin || req.params.id == req.user.profileId)) {
        try {
            const profile = await Profile.findOne({where: {id: req.params.id}, include: 
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
                    },
                    {
                        model: Blog
                    }
                ]
            }
            )
            const blogs = await profile.getBlogs()
            
            res.status(200).json({profile,isOwner: false, blogs: blogs})
        } catch(err) {
            console.error(err)
            next(err)
        }
    } else {
        req.profileId = req.params.id
        res.redirect("/profiles/profile/v2/myprofile")
    }
}

export const findProfile = async (req, res, next) => {
   try {

    const profile = await Profile.findOne({where: {id: req.user.profileId}, include:
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
                model: Blog
            },
            {
                model: Year,
                attributes: ['name', 'id']
            }
        ]
    }
    )
    const blogs = await profile.getBlogs()
    profile.Blogs = blogs

    return res.status(200).json({profile, isOwner: true, Blogs: blogs})
   } catch (err) {
    next(err)
   }
}

export const updateProfile = async (req, res, next) => {
    if (!req.body) {
        return res.status(400).json({message: "No data sent!"})    
    }
    try {
       
        await Profile.update({...req.body}, {where: {userId: req.user.id}})
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