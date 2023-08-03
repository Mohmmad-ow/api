import { DataTypes, Model } from 'sequelize';
import sequelize from './index.js';
// import User from './users.js';

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
// associations
// Blog.belongsTo(User)


// sync operation
Blog.sync({force: true})
console.log("(re)created the Blog table")
export default Blog