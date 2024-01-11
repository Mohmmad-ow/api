import Tags from "../models/tag.js"
import Profile from "../models/profile.js"
import { Op } from "sequelize"
import Blog from "../models/blog.js"

export const createTag = async (req, res, next) => {
    if (!req.body) {
        res.status(400).json({message: "Tag info not inputted"})
    }
    try {
        const name = req.body.tag
        Tags.create({name: name, UserId: req.user.id})
        res.status(200).json({message: "Tag created with the userId of " + req.user.id})
    } catch(err) {
        next(err)
    }
}

export const findTags = async (req, res, next) => {
    try {
        const tags = await Tags.findAll();
        return res.status(200).json(tags);
    } catch(err) {
        
        next(err);
    }
}

export const findTag = async (req, res, next) => {
   const id = req.params.id
   try {
    const tag = await Tags.findOne({where: {id: id}})
    let message;
    tag ? message = tag : message = "Degree not found with this id: " + id  
    return res.status(200).json(message)
   } catch (err) {
    next(err)
   }
}

export const updateTag = async (req, res, next) => {
    if (!req.body) {
        return res.status(400).json({message: "No data sent!"})    
    }
    try {
        const name = req.body.tag
        await Tags.update({name: name}, {where: {id: req.params.id}})
        console.log("Tag updated")
        res.status(200).json({message: "Tag Updated"})
    } catch(err) {
        next(err)
    }

}

export const deleteTag = async (req, res, next) => {
    try {
        const id = req.params.id;
        await Tags.destroy({where: {id: id}})
        res.status(200).json({message: "Tag deleted"})
    } catch(err) {
        next(err)
    }
}

// specific queries


export const findHomePageBlogsByTags = async (req, res, next) => {

    try {
        const major = await Profile.findOne({where: {userId: req.user.id}, include: 'Major'})
        console.log(major)
        const tags = await Tags.findAll({where: {
            name: {[Op.in]: ['announcement', 'Featured']}
        }, include: {
            model: Blog,
            limit: 3
        }})
        res.status(200).json(tags)
    } catch(err) {
        next(err)
    }

}