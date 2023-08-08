import { DataTypes, Model } from 'sequelize';
import sequelize from './connection.js';
class Year extends Model {}

Year.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: {
      type: DataTypes.STRING(255),
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
}, {sequelize, modelName: "Year"})



// sync operation
// Year.sync({alter: true})
console.log("(re)created the year table")


export default Year