import User from "./users.js";
import Major from "./major.js";
import Degree from "./degree.js";
import Year from "./year.js";
import Blog from "./blog.js";
import Tag from "./tag.js";
import sequelize from "./connection.js";
import Profile from "./profile.js";
import Comment from "./comments.js";

async function createAssociations() {
    try {


        // comment association
        Comment.belongsTo(Blog);
        Comment.belongsTo(Profile);

        // user association
        User.hasOne(Profile);


        // Profile association
        Profile.hasMany(Blog);
        Profile.hasMany(Comment);
        Profile.belongsToMany(Blog, {through: "Likes"});
        Profile.belongsTo(User);
        Profile.belongsTo(Major);
        Profile.belongsTo(Degree);
        Profile.belongsTo(Year);


        
        
        //Major associations
        Major.belongsToMany(Degree, {through: "DegreeMajors"});
        Major.belongsToMany(Year, {through: "MajorYears"});
        Major.hasMany(Profile);


        // Blog associations
        Blog.hasMany(Comment);
        Blog.belongsTo(Profile);
        Blog.belongsToMany(Profile, {through: "Likes"});
        Blog.belongsToMany(Tag, {through: "BlogsTags"});


        // Degree associations
        Degree.belongsToMany(Major, {through: "DegreeMajors"});
        Degree.hasMany(Profile);
        
        // Year associations
        Year.belongsToMany(Major, {through: "MajorYears"});

        // Year.hasMany(User)
        Year.hasMany(Profile);

        //Tags associations
        Tag.belongsToMany(Blog, {through: "BlogsTags"});

        await sequelize.sync({alter: true})
        console.log("Added new stuff")
    } catch (err) {
        console.log(err)
    }
}

 createAssociations()