import { DataTypes, Model } from 'sequelize';
import sequelize from './connection.js';
// import Major from './major.js';
// import User from './users.js';
class Degree extends Model {}

Degree.init({
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
}, {sequelize, modelName: "Degree"})
// associations
// Degree.belongsToMany(Major, {through: "DegreeMajors"})
// Degree.hasMany(User)

// sync operation

console.log("(re)created the degree table")
export default Degree