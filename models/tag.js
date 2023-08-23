import { DataTypes, Model } from 'sequelize';
import sequelize from './connection.js';
class Tag extends Model {}

Tag.init({
    name: {
        type: DataTypes.STRING(55),
        unique: true
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
}, {sequelize, modelName: "Tag"} )

export default Tag