// models/User.js
import { DataTypes, Model } from 'sequelize';
import sequelize from './connection.js';
class Profile extends Model {}

Profile.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    full_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    profile_pic: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    // isBlogger: {
    //   type: DataTypes.BOOLEAN,
    //   defaultValue: false,
    //   allowNull: false
    // },
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
   
    // Add more fields as needed
  },
  {
    sequelize,
    modelName: 'Profile',
  }
);


// sync operation

export default Profile;
