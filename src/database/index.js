import Sequelize from "sequelize";
import configDatabase from '../config/database.js'

import app from "../app.js";

class Database {
  constructor() {
      this.init();
  }

  init() {
      app.emit('pronto')
      this.connection = new Sequelize(configDatabase)
    }
}  

export default new Database();