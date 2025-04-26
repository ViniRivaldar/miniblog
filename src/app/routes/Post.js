import { Router } from "express";
import PostController from "../controllers/Post.js";
import authMiddleware from "../../utils/auth.js";

const router = Router();

router.get('/', PostController.index);
router.post('/', authMiddleware,PostController.store);

export default router