import { DataTypes, Model } from 'sequelize';
import sequelize from './connection.js';
import User from './users.js';
class Blog extends Model {}

Blog.init({
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
    blog: {
        type: DataTypes.TEXT,
        allowNull: true
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
}, {sequelize, modelName: "Blog"})

// sync operation
export default Blog