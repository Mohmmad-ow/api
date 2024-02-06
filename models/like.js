import { DataTypes, Model } from 'sequelize';
import sequelize from './connection.js';
import Blog from './blog.js';
import Profile from './profile.js';
class Like extends Model {}

Like.init({
    id: {
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true
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
}, {sequelize, modelName: "Like"})

// sync operation
export default Like