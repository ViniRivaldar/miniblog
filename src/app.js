import express  from "express";

import './database/index.js';

class App{
  constructor(){
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares(){}

  routes(){}
}

export default new App().app