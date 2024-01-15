import Years from "../models/year.js"
import Degree from "../models/degree.js"
import Major from "../models/major.js"
import User from "../models/users.js"
import Profile from "../models/profile.js"
export const isAdmin = async(req, res, next) => {
    if (req.user.isAdmin) {
        next()
    } else {
        res.status(403).json({message: "You aren't a admin, you can't access this page", isAllowed: false})
    }
}
export const isManger = async (req, res, next) => {
    if (req.user.isManger) {
        next()
    } else {
        res.status(403).json({message: "You aren't a Manger, you can't access this page", isAllowed: false})
    }
}

// export const userIsOwner = async (req, res, next) => {
//     if (req.body.id)
// }

export const profileBelongsToUser = async (req, res, next) => {
    
    try {
        const profile = Profile.findOne({where: {UserId: req.user.id}});
        if (profile) {
            req.profile = profile;
            next();
        } else {
            req.profile = null;
            next()
        }
    } catch(err) {
        res.status(400).json({message: "User not found"});
    }

}

export const findProfileSettings = async (req, res, next) => {
    let years, degrees, majors
    try {
         years = await Years.findAll();
         degrees = await Degree.findAll();
         majors = await Major.findAll();
         res.status(200).json({years, degrees, majors })
        
    } catch(err) {
        next(err);
    } 
}