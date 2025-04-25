
import Sequelize from "sequelize";
import configDatabase from '../config/database.js'
import { EventEmitter } from 'events'

const emitter = new EventEmitter()

class Database {
  constructor() {
      this.init();
  }

  init() {
      this.connection = new Sequelize(configDatabase)
      emitter.emit('database_ready')
    }
}  

export { emitter }
export default new Database();
