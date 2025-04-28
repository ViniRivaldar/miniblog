import Sequelize from "sequelize";
import configDatabase from '../config/database.js';
import User from '../app/models/User.js';
import Post from '../app/models/Post.js';
import Comment from '../app/models/Comment.js';
import FotoUser from "../app/models/FotoUser.js";
import FotoPost from "../app/models/FotoPost.js";

const models = [User, Post, Comment, FotoUser, FotoPost];

class Database {
  constructor() {
    this.connection = new Sequelize(configDatabase);
    this.init();
  }

  async init() {
    try {
      this.initModels();
      this.associateModels(); 
      await this.connection.authenticate();
      console.log("Conexão com o banco de dados estabelecida com sucesso!");
    } catch (error) {
      console.error("Erro ao conectar ao banco de dados:", error);
    }
  }

  initModels() {
    models.forEach(model => model.init(this.connection));
  }

  associateModels() {
    models.forEach(model => {
      if (typeof model.associate === 'function') {
        model.associate(this.connection.models); 
      }
    });
  }
}

export default new Database();
