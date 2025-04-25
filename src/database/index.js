import Sequelize from "sequelize";
import configDatabase from '../config/database.js'
import User from '../app/models/User.js';

class Database {
  constructor() {
    this.connection = new Sequelize(configDatabase);
    this.init();
  }

  async init() {
    try {
      this.initModels()
      await this.connection.authenticate();
      console.log("Conexão com o banco de dados estabelecida com sucesso!");
    } catch (error) {
      console.error("Erro ao conectar ao banco de dados:", error);
    }
  }

  initModels(){
    User.init(this.connection);
  }
}

export default new Database();
