import Years from "../models/year.js"
import Degree from "../models/degree.js"
import Major from "../models/major.js"

export const findProfileSettings = async (req, res, next) => {
    let years, degrees, majors
    try {
         years = await Years.findAll();
         degrees = await Degree.findAll();
         majors = await Major.findAll();
        
    } catch(err) {
        next(err);
    } finally {
        res.status(200).json({years, degrees, majors })
    }
}