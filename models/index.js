import { Sequelize } from 'sequelize';
import {DB, HOST, PASSWORD, USER,dialect} from "../util/db.config.js";

const sequelize = new Sequelize(DB, USER, PASSWORD, {host: HOST, dialect: dialect})
async function testDatabaseConnection() {
    try {
      await sequelize.authenticate();
      console.log('Connection to the database has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }
  
  testDatabaseConnection();
export default sequelize;
