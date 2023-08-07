import Blog from "../models/blog.js"


export const createBlog = async (req, res, next) => {
    if (!req.body) {
        res.status(400).json({message: "Blog info not inputted"})
    }
    try {
        const {name, blog} = req.body
        console.log(req.user.id)
        Blog.create({name: name, blog: blog, UserId: req.user.id})
        res.status(400).json({message: "blog created with the userId of " + req.user.id})
    } catch(err) {
        next(err)
    }


}