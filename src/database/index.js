
import Sequelize from "sequelize";
import configDatabase from '../config/database.js'

class Database {
  constructor() {
      this.init();
  }

  init() {
      this.connection = new Sequelize(configDatabase)
    }
    this.connection.authenticate()
    
    .then(() =>{
        console.log("Conexão com o banco de dados estabelecida com sucesso!");
    }
    .catch((err) => {
        console.error("Erro ao conectar ao banco de dados:", err);
    })
}  


export default new Database();
