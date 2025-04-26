import express  from "express";

import LoginRoutes from './app/routes/Login.js';
import RegisterRoutes from './app/routes/Register.js';
import PostRoutes from './app/routes/Post.js';

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
    this.app.use('/register', RegisterRoutes)
    this.app.use('/posts', PostRoutes);
  }
}

export default new App().app