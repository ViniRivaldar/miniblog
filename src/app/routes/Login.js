import {Router} from 'express';
import LoginController from '../controllers/Login.js'

const routes = new Router();

routes.get('/', LoginController.store)

export default routes