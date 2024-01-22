import Comment from "../models/comments.js";
import Profile from "../models/profile.js";

export const createComment = async (req, res) => {
    try {
        console.log(req.user)
        req.body.ProfileId = req.user.profileId;
        const comment = await Comment.create(req.body);
        res.status(200).json(comment);
    } catch( err) {
        next(err);
        console.log(err);
    }
}

export const getComments = async (req, res) => {
    try  {
        const comments = await Comment.findAll();
        res.status(200).json(comments);
    } catch (err) {
        console.log(err);
        next(err);
    }
}


export const getBlogsComments = async(req, res, next) => {
    
    try {
        const comment = await Comment.findAll({where: {BlogId: req.params.id}, include: Profile});
        console.log(comment);
        res.status(200).json(comment);
    } catch(err) {
        console.log(err);
        next(err);
    }
}

export const updateComment = async (req, res) => {
    try {
        const comment = await Comment.update(req.body, {where: {id: req.params.id}});
        res.status(200).json(comment);
    } catch(err) {
        next(err);
        console.log(err);
    }

}

export const deleteComment = async (req, res) => {
    const id = req.params.id;
    try {
        Comment.destroy({where: {id: id}});
    } catch( err) {
        next(err);
        console.log(err);
    }
}

