
import Sequelize from "sequelize";
import configDatabase from '../config/database.js'
import { EventEmitter } from 'events'

const emitter = new EventEmitter()

class Database {
  constructor() {
    this.init();
  }

  async init() {
    try {
      this.connection = new Sequelize(configDatabase);
      await this.connection.authenticate();
      console.log("Conexão com o banco de dados estabelecida com sucesso!");
      emitter.emit('database_ready');
    } catch (error) {
      console.error("Erro ao conectar ao banco de dados:", error);
    }
  }
}

export { emitter };
export default new Database();
