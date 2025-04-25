
import Sequelize from "sequelize";
import configDatabase from '../config/database.js'

class Database {
  constructor() {
    this.init();
  }

  async init() {
    try {
      this.connection = new Sequelize(configDatabase);
      await this.connection.authenticate();
      console.log("Conexão com o banco de dados estabelecida com sucesso!");
    } catch (error) {
      console.error("Erro ao conectar ao banco de dados:", error);
    }
  }
}

export default new Database();
