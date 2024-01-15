import Blog from "../models/blog.js"
import Profile from "../models/profile.js"
import Tag from "../models/tag.js"
import { Op } from 'sequelize'

export const createBlog = async (req, res, next) => {
    if (!req.body) {
        res.status(400).json({message: "Blog info not inputted"})
    }
    try {
        console.log(req.body)
        const profile = await Profile.findOne({where: {UserId: req.user.id}})
        console.log(profile)
        req.body.ProfileId = profile.id;

        Blog.create(req.body)
        res.status(200).json({message: "blog created with the userId of " + req.user.id})
    } catch(err) {
        next(err)
    }
}

export const findBlogs = async (req, res, next) => {
    try {
        console.log(req.header)
        const blogs = await Blog.findAll();
        return res.status(200).json(blogs);
    } catch(err) {
        
        next(err);
    }
}


export const findBlog = async (req, res, next) => {
   const id = req.params.id
   try {

    const blog = await Blog.findOne({where: {id: id}, include: Profile})
    if (blog.ProfileId == req.profile.id)
    {
    
    }
    let message;
    blog ? message = null : message = "Blog not found with this id: " + id;
    return res.status(200).json(blog);
   } catch (err) {
    next(err)
   }
}

export const updateBlog = async (req, res, next) => {
    if (!req.body) {
        return res.status(400).json({message: "No data sent!"})    
    }
    try {
        console.log(req.body)
        
        await Blog.update(req.body, {where: {id: req.params.id}})
        console.log("Blog updated")
        res.status(200).json({message: "Blog Updated"})
    } catch(err) {
        next(err)
    }

}

export const deleteBlog = async (req, res, next) => {
    try {
        const id = req.params.id;
        let blog = await Blog.findOne({where: {id: id}}).then((result) => {
            res.status(200).json({message: "Blog deleted", blog: result.imgUrl  })

            result.destroy()
        })
        
    } catch(err) {
        next(err)
    }
}


// specific requests

export const findBlogsByProfile = async (req, res, next) => {
    const id = req.params.id
    try {
        const blogs = await Blog.findAll({where: {ProfileId: id}})
        return res.status(200).json(blogs)
    } catch(err) {
        next(err)
    }

}

export const findBlogsByUser = async (req, res, next) => {
    try {
        const blogs = await Blog.findAll({where: {UserId: req.user.id}})
        return res.status(200).json(blogs)
    } catch(err) {
        next(err)
    }
}

export const findBlogsByTag = async (req, res, next) => {
    const tag = req.params.tag
    try {
        const blogs = await Blog.findAll({where: {tag: tag}})
        return res.status(200).json(blogs)
    } catch(err) {
        next(err)
    }
}

export const findBlogsBySearch = async (req, res, next) => {
    const search = req.params.search
    try {
        const blogs = await Blog.findAll({where: {title: {[Op.like]: `%${search}%`}}})
        return res.status(200).json(blogs)
    } catch(err) {
        next(err)
    }

}

export const findBlogsByDate = async (req, res, next) => {
    const date = req.params.date
    try {
        const blogs = await Blog.findAll({where: {date: date}})
        return res.status(200).json(blogs)
    } catch(err) {
        next(err)
    }
}

export const findBlogsBetweenDates  = async (req, res, next) => {
    const startDate = req.params.startDate
    const endDate = req.params.endDate
    try {
        const blogs = await Blog.findAll({where: {date: {[Op.between]: [startDate, endDate]}}})
        return res.status(200).json(blogs)
    } catch(err) {
        next(err)
    }

}

export const findBlogsByCategory = async (req, res, next) => {
    try {
        const blogs = await Blog.findAll({
            include: [
                {
                    model: Tag,
                    where: {name: {[Op.in]: ['announcement', 'Featured', 'Software']}},
                    attributes: ['name']
                },
                {
                    model: Profile,
                    attributes: ['full_name']
                }
            ],
        })

        return res.status(200).json(blogs)
    } catch(err) {
        next(err)
    }

}