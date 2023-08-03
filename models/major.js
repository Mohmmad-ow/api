import { DataTypes, Model } from 'sequelize';
import sequelize from './index.js';
// import Year from './year.js';
// import Degree from './degree.js';
// import User from './users.js';
class Major extends Model {}

Major.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
    name: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      }
}, {sequelize, modelName: "Major"})


// associations
// Major.belongsToMany(Degree, {through: "DegreeMajors"})
// Major.belongsToMany(Year, {through: "MajorYears"})
// Major.hasMany(User)

// sync operation
Major.sync({force: true})
console.log("(re)created the Major table")
export default Major