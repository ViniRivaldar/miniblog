import { Router } from "express";
import PostController from "../controllers/Post.js";
import authMiddleware from "../../utils/auth.js";

const router = Router();

router.get('/', PostController.index);
router.get('/:id', PostController.show);
router.post('/', authMiddleware,PostController.store);
router.put('/:id', authMiddleware,PostController.update);
router.delete('/:id', authMiddleware,PostController.delete);

export default router