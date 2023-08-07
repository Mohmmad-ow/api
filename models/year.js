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
      type: DataTypes.SMALLINT,
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

console.log("(re)created the year table")


export default Year