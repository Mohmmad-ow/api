import Blog from "../models/blog.js"
import Profile from "../models/profile.js"
import Tag from "../models/tag.js"
import { Op, fn, col,literal } from 'sequelize'

export const createBlog = async (req, res, next) => {
    if (!req.body) {
        res.status(400).json({message: "Blog info not inputted"})
    }
    try {
        console.log(req.body)
        req.body.ProfileId = req.user.profileId;

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

    const blog = await Blog.findOne({where: {id: id}, include: Profile});
    let message;
    blog ? message = null : message = "Blog not found with this id: " + id;
    return res.status(200).json({blog: blog, isSameUser: (req.user.isAdmin || req.params.id == req.user.profileId)});
   } catch (err) {
    next(err)
   }
}

export const updateBlog = async (req, res, next) => {
    if (!req.body) {
        return res.status(400).json({message: "No data sent!"});
    }
    try {
        
        if (!(req.user.isAdmin || req.user.profileId == req.params.id)) {
            await Blog.update(req.body, {where: {id: req.params.id}});
            console.log("Blog updated");
            return res.status(200).json({message: "Blog Updated"});
        } else {
            return res.status(403).json({message: "user isn't allowed to update this post"});
        }
    } catch(err) {
        next(err);
    }

}

export const deleteBlog = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!(req.user.profileId == id || req.user.isAdmin)) {
            return res.status(403).json({message: "you're not allowed to delete this post"})
        } else {
            let blog = await Blog.findOne({where: {id: id}}).then((result) => {
            return res.status(200).json({message: "Blog deleted", blog: result.imgUrl  })
            result.destroy()
            })
        }
        
    } catch(err) {
        next(err)
    }
}


// specific requests

export const findBlogsByProfile = async (req, res, next) => {
    const id = req.params.id;
    try {
        const blogs = await Blog.findAll({where: {ProfileId: id}});
        return res.status(200).json(blogs);
    } catch(err) {
        next(err);
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

// export const findBlogsBySearch = async (req, res, next) => {
//     const search = req.params.search
//     try {
//         const blogs = await Blog.findAll({where: {title: {[Op.like]: `%${search}%`}}})
//         return res.status(200).json(blogs)
//     } catch(err) {
//         next(err)
//     }

// }

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
export const findBlogsBySearch = async (req, res, next) => {
    const search = req.body
    const whereSearch = {}
    const whereSearchIncludeTags = {}
    console.log(search)
    if (search.name) {
        whereSearch.name = {[Op.like]: `%${search.name}%`}
    }
    if (search.date) {

        if (search.date.length == 2) {
            const startDate = new Date(search.date[0]);
            const endDate = new Date(search.date[1]);
            whereSearch.createdAt = {[Op.between]: [startDate, endDate]}
        } else if (search.date.length == 1) {
            const startDate = new Date(search.date[0]);
            const endDate = new Date(startDate.getTime() + 24 * 60 * 60 * 1000 );
            whereSearch.createdAt = {[Op.between]: [startDate, endDate]}
        }
    }
    if (search.tags.length > 0) {
        whereSearchIncludeTags.id = {[Op.in]: search.tags}
    }
    try {
        const blogs = await Blog.findAll({where: whereSearch, 
         include: whereSearchIncludeTags ? [{
            model: Tag,
            where: whereSearchIncludeTags
        }] : []
    });
        console.log(blogs)
        return res.status(200).json(blogs)
    } catch (err) {
        console.log(err)
        next(err)
    }
}


export const findBlogsByCategory = async (req, res, next) => {
    
            try {
                console.log(req.user)
                const blogs = await Blog.findAll({
                    include: [
                    {
                        model: Tag,
                        where: {id: {[Op.in]: [1, 2, 3]}},
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
            return next(err)
        }
}

