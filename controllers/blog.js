import Blog from "../models/blog.js"


export const createBlog = async (req, res, next) => {
    if (!req.body) {
        res.status(400).json({message: "Blog info not inputted"})
    }
    try {
        const {name, blog, image} = req.body
        console.log(req.user.id)
        console.log(req.body)
        Blog.create({name: name, blog: blog, UserId: req.user.id, imgUrl: image})
        res.status(400).json({message: "blog created with the userId of " + req.user.id})
    } catch(err) {
        next(err)
    }
}

export const findBlogs = async (req, res, next) => {
    try {
        console.log("Hi im here")
        const blogs = await Blog.findAll();
        return res.status(200).json(blogs);
    } catch(err) {
        
        next(err);
    }
}

// export const homeBlogs = async (req, res, next) => {
//     try {
//         const data = {
//             featured: null,
//             important_announcements: null,
//             yearBlogs: null,
//             majorBlogs: null
//         }

//     } catch (err) {

//     }
// }

export const findBlog = async (req, res, next) => {
   const id = req.params.id
   try {
    const blog = await Blog.findOne({where: {id: id}})
    let message;
    blog ? message = blog : message = "Blog not found with this id: " + id  
    return res.status(200).json(message)
   } catch (err) {
    next(err)
   }
}

export const updateBlog = async (req, res, next) => {
    if (!req.body) {
        return res.status(400).json({message: "No data sent!"})    
    }
    try {
        const {name, blog} = req.body;
        await Blog.update({name: name, blog: blog}, {where: {id: req.params.id}})
        console.log("Blog updated")
        res.status(200).json({message: "Blog Updated"})
    } catch(err) {
        next(err)
    }

}

export const deleteBlog = async (req, res, next) => {
    try {
        const id = req.params.id;
        await Blog.destroy({where: {id: id}})
        res.status(200).json({message: "Blog deleted"})
    } catch(err) {
        next(err)
    }
}