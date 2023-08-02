// models/User.js
import { DataTypes, Model } from 'sequelize';
import sequelize from './index.js';
class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: false
      
    },
    password: {
      type: DataTypes.STRING(525),
      allowNull: false
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
    },
   
    // Add more fields as needed
  },
  {
    sequelize,
    modelName: 'User',
  }
);
console.log("The table for the User model was just (re)created!");
User.sync({alter: true})
export default User;
