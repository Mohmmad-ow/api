import User from "./users.js";
import Major from "./major.js";
import Degree from "./degree.js";
import Year from "./year.js";
import Blog from "./blog.js";
import Tag from "./tag.js";
import sequelize from "./connection.js";
import Profile from "./profile.js";
import Comment from "./comments.js";
import Like from "./like.js";
async function createAssociations() {
    try {

        // likes
        Like.belongsTo(Profile);
        Like.belongsTo(Blog)

        // comment association
        Comment.belongsTo(Blog);
        Comment.belongsTo(Profile);

        // user association
        User.hasOne(Profile);


        // Profile association
        Profile.hasMany(Blog);
        Profile.hasMany(Comment);
        // Profile.belongsToMany(Blog, {through: "Likes", as: "Like"});
        Profile.hasMany(Like)
        Profile.belongsTo(User);
        Profile.belongsTo(Major);
        Profile.belongsTo(Degree);
        Profile.belongsTo(Year);


        
        
        //Major associations
        
        Major.hasMany(Profile);


        // Blog associations
        Blog.hasMany(Comment);
        Blog.belongsTo(Profile);
        Blog.hasMany(Like)
        Blog.belongsToMany(Tag, {through: "BlogsTags"});


        // Degree associations
        Degree.hasMany(Profile);
        
        // Year associations
        Year.hasMany(Profile);

        //Tags associations
        Tag.belongsToMany(Blog, {through: "BlogsTags"});

        await sequelize.sync({})
        console.log("Added new stuff")
    } catch (err) {
        console.log(err)
    }
}

 createAssociations()