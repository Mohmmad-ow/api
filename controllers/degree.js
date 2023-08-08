import Degree from "../models/degree.js"


export const createDegree = async (req, res, next) => {
    if (!req.body) {
        res.status(400).json({message: "Degree info not inputted"})
    }
    try {
        const name = req.body.name
        Degree.create({name: name, UserId: req.user.id})
        res.status(400).json({message: "Degree created with the userId of " + req.user.id})
    } catch(err) {
        next(err)
    }
}

export const findDegrees = async (req, res, next) => {
    try {
        const degrees = await Degree.findAll();
        return res.status(200).json(degrees);
    } catch(err) {
        
        next(err);
    }
}

export const findDegree = async (req, res, next) => {
   const id = req.params.id
   try {
    const degree = await Degree.findOne({where: {id: id}})
    let message;
    degree ? message = degree : message = "Degree not found with this id: " + id  
    return res.status(200).json(message)
   } catch (err) {
    next(err)
   }
}

export const updateDegree = async (req, res, next) => {
    if (!req.body) {
        return res.status(400).json({message: "No data sent!"})    
    }
    try {
        const name = req.body.name
        await Degree.update({name: name}, {where: {id: req.params.id}})
        console.log("Degree updated")
        res.status(200).json({message: "Degree Updated"})
    } catch(err) {
        next(err)
    }

}

export const deleteDegree = async (req, res, next) => {
    try {
        const id = req.params.id;
        await Degree.destroy({where: {id: id}})
        res.status(200).json({message: "Degree deleted"})
    } catch(err) {
        next(err)
    }
}