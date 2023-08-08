import Major from "../models/major.js"


export const createMajor = async (req, res, next) => {
    if (!req.body) {
        res.status(400).json({message: "Major info not inputted"})
    }
    try {
        const name = req.body.name
        Major.create({name: name, UserId: req.user.id})
        res.status(400).json({message: "Major created with the userId of " + req.user.id})
    } catch(err) {
        next(err)
    }
}

export const findMajors = async (req, res, next) => {
    try {
        const Majors = await Major.findAll();
        return res.status(200).json(Majors);
    } catch(err) {
        
        next(err);
    }
}

export const findMajor = async (req, res, next) => {
   const id = req.params.id
   try {
    const major = await Major.findOne({where: {id: id}})
    let message;
    major ? message = major : message = "Major not found with this id: " + id  
    return res.status(200).json(message)
   } catch (err) {
    next(err)
   }
}

export const updateMajor = async (req, res, next) => {
    if (!req.body) {
        return res.status(400).json({message: "No data sent!"})    
    }
    try {
        const name = req.body.name
        await Major.update({name: name}, {where: {id: req.params.id}})
        console.log("Major updated")
        res.status(200).json({message: "Major Updated"})
    } catch(err) {
        next(err)
    }

}

export const deleteMajor = async (req, res, next) => {
    try {
        const id = req.params.id;
        await Major.destroy({where: {id: id}})
        res.status(200).json({message: "Major deleted"})
    } catch(err) {
        next(err)
    }
}