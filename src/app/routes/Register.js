import {Router} from 'express';

 import RegisterController from '../controllers/Register.js';
import authMiddleware from '../../utils/auth.js';

const routes = new Router();

routes.post('/', RegisterController.store)
routes.put('/:id', authMiddleware, RegisterController.update)
routes.delete('/:id', authMiddleware, RegisterController.delete)

export default  routes