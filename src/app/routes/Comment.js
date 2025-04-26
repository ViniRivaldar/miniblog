import { Router } from "express";

import CommentController from "../controllers/Comment.js";
import authMiddleware from "../../utils/auth.js";

const router = Router();

router.get('/',CommentController.index);
router.post('/',authMiddleware, CommentController.store);

export default router