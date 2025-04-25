import {Router} from 'express';

 import RegisterController from '../controllers/Register.js';

const routes = new Router();

routes.get('/', RegisterController.store)

export default  routes