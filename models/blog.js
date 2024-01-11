import { DataTypes, Model } from 'sequelize';
import sequelize from './connection.js';
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
    description: {
        type: DataTypes.STRING(755),
        allowNull: true
    },
    blog: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    imgUrl: {
      type: DataTypes.STRING(255),
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