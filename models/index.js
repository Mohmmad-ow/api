import { Sequelize } from 'sequelize';
import {DB, HOST, PASSWORD, USER,dialect} from "../util/db.config.js";
// import User from './users.js';
// import Major from './major.js';
// import Degree from './degree.js';
// import Year from './year.js';
// import Blog from './blog.js';
const sequelize = new Sequelize(DB, USER, PASSWORD, {host: HOST, dialect: dialect})
async function testDatabaseConnection() {
    try {
      await sequelize.authenticate();
      console.log('Connection to the database has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }
  
  testDatabaseConnection();
// // User associations
// User.hasMany(Blog)
// User.belongsTo(Year)
// User.belongsTo(Major)
// User.belongsTo(Degree)

// //Major associations
// Major.belongsToMany(Degree, {through: "DegreeMajors"})
// Major.belongsToMany(Year, {through: "MajorYears"})
// Major.hasMany(User)

// // Blog associations
// Blog.belongsTo(User)

// // Degree associations
// Degree.belongsToMany(Major, {through: "DegreeMajors"})
// Degree.hasMany(User)

// // Year associations
// Year.belongsToMany(Major, {through: "MajorYears"})
// Year.hasMany(User)
export default sequelize;
