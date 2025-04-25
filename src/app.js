import express  from "express";

import LoginRoutes from './app/routes/Login.js';

import './database/index.js';

class App{
  constructor(){
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares(){
    this.app.use(express.json());
  }

  routes(){
    this.app.use('/login', LoginRoutes);
  }
}

export default new App().app