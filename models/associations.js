import User from "./users.js";
import Major from "./major.js";
import Degree from "./degree.js";
import Year from "./year.js";
import Blog from "./blog.js";
import Tag from "./tag.js";
import sequelize from "./connection.js";
async function createAssociations() {
    try {

        // User associations
        User.hasMany(Blog); 
        User.belongsTo(Year);
        User.belongsTo(Major); 
        User.belongsTo(Degree); 
        
        
        //Major associations
        Major.belongsToMany(Degree, {through: "DegreeMajors"})
        Major.belongsToMany(Year, {through: "MajorYears"})
        Major.hasMany(User)
        
        // Blog associations
        Blog.belongsTo(User)
        Blog.belongsToMany(Tag, {through: "BlogsTags"})


        // Degree associations
        Degree.belongsToMany(Major, {through: "DegreeMajors"})
        Degree.hasMany(User)
        
        // Year associations
        Year.belongsToMany(Major, {through: "MajorYears"})
        Year.hasMany(User)

        //Tags associations
        Tag.belongsToMany(Blog, {through: "BlogsTags"})

        await sequelize.sync()
        console.log("Added new stuff")
    } catch (err) {
        console.log(err)
    }
}

 createAssociations()