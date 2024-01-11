import Year from "../models/year.js";


export const createYear = async (req, res, next) => {
    if (!req.body) {
        return res.status(400).json({message: "No data sent!"})    
    }
    try {
        const name = req.body.year
        await Year.create({name: name})
        console.log("Year has been created")
        return res.status(200).json({message: "Year has been created"})
    } catch(err) {
        next(err)
    }
}

export const findYears= async (req, res, next) => {
    try {
        const years = await Year.findAll()
        return res.status(200).json(years)
    } catch (err) {
        next(err)
    }
}

export const findYear = async (req, res, next) => {
    try {
        const id = req.params.id;
        const year = await Year.findOne({where: {id: id}});
        return res.status(200).json(year)
    } catch(err) {
        next(err)
    }
}

export const updateYear = async (req, res, next) => {
    if (!req.body) {
        return res.status(400).json({message: "No data sent!"})    
    }
    try {
        const name = req.body.year;
        await Year.update({name: name}, {where: {id: req.params.id}})
        console.log("Year updated")
        return res.status(200).json({message: "Year Updated"})
    } catch(err) {
        next(err)
    }
}

export const deleteYear = async (req, res, next) => {
    try {
        await Year.destroy( {where: {id: req.params.id}})
        return res.status(200).json({message: "Year deleted"})
    } catch (err) {
        next(err);
    }
}

