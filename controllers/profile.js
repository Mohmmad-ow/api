import Profile from "../models/profile.js"


export const createProfile = async (req, res, next) => {
    if (!req.body) {
        res.status(400).json({message: "Profile info not inputted"})
    }
    try {
        req.body.UserId = req.user.id;
        await Profile.create({...req.body})
       
        res.status(200).json({message: "Profile created with the userId of " + req.user.id});
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
    const profile = await Profile.findOne({where: {UserId: req.user.id}})
    const major = await profile.getMajor()
    const degree = await profile.getDegree()
    const year = await profile.getYear()
    let message;
    profile ? message = null : message = "Profile not found"   ;
    return res.status(200).json({message,profile, major, degree, year})
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