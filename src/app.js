import express  from "express";

import LoginRoutes from './app/routes/Login.js';
import RegisterRoutes from './app/routes/Register.js';
import PostRoutes from './app/routes/Post.js';
import CommentRoutes from './app/routes/Comment.js';
import FotoUserRoutes from './app/routes/FotoUser.js'

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
    this.app.use('/comments', CommentRoutes)
    this.app.use('/fotouser', FotoUserRoutes)
  }
}

export default new App().app