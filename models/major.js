import { DataTypes, Model } from 'sequelize';
import sequelize from './connection.js';
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







// sync operation
console.log("(re)created the Major table")
export default Major