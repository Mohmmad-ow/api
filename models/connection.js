import { Sequelize } from 'sequelize';
import {DB, HOST, PASSWORD, USER,dialect} from "../util/db.config.js";

const sequelize = new Sequelize(DB, USER, PASSWORD, {host: HOST, dialect: dialect, logging: console.log})

export default sequelize