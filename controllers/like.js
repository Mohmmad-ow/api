import Like from "../models/like.js"

export const createLike = async (req, res, next) => {
    try {
        console.log("req.user:",req.user,"\nBlog id:"  ,req.params.id)
        const existingLike = await Like.findOne({where: {BlogId: req.params.id, ProfileId: req.user.profileId}})
        console.log(existingLike)
        let event = "";
        if (existingLike) {
            // Like exists, so remove it
            event = "Destroy"
            await existingLike.destroy();
        } else {
            event = "Create"
            // Like doesn't exist, so create it
            await Like.create({ BlogId: req.params.id, ProfileId: req.user.profileId });
        }
        const likeCount = await Like.count({ where: { BlogId: req.params.id } });
        res.status(200).json({likeCount, liked: existingLike == null ? false : true, event})
    } catch(err) {
        next(err)
    }
}


export const findLike = async (req, res, next) => {
    console.log("this is the BlogId: " + req.params.id,
    "\nthis is the profileId: "+req.user.profileId )
    try {
     const existingLike = await Like.findOne({where: {BlogId: req.params.id, ProfileId: req.user.profileId}})

     if (existingLike) {
         return res.status(200).json({liked: true})
     }
         return res.status(200).json({liked: false})
    } catch (err) {
     next(err)
    }
 }
 

// export const findLikes = async (req, res, next) => {
//     try {
//         const degrees = await Degree.findAll();
//         return res.status(200).json(degrees);
//     } catch(err) {
        
//         next(err);
//     }
// }

// export const updateLike = async (req, res, next) => {
//     if (!req.body) {
//         return res.status(400).json({message: "No data sent!"})    
//     }
//     try {
//         const name = req.body.degree
//         await Degree.update({name: name}, {where: {id: req.params.id}})
//         console.log("Degree updated")
//         res.status(200).json({message: "Degree Updated"})
//     } catch(err) {
//         next(err)
//     }

// }

// export const deleteLike = async (req, res, next) => {
//     try {
//         const id = req.params.id;
//         await Degree.destroy({where: {id: id}})
//         res.status(200).json({message: "Degree deleted"})
//     } catch(err) {
//         next(err)
//     }
// }