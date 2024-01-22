import { DataTypes, Model } from 'sequelize';
import sequelize from './connection.js';
class Comment extends Model {}

Comment.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  content: {
      type: DataTypes.TEXT,
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
}, {sequelize, modelName: "Comment"})







// sync operation
console.log("(re)created the Comment table")
export default Comment