import { Router } from "express";

import CommentController from "../controllers/Comment.js";
import authMiddleware from "../../utils/auth.js";

const router = Router();

router.get('/',CommentController.index);
router.post('/',authMiddleware, CommentController.store);
router.put('/:id',authMiddleware, CommentController.update);
router.delete('/:id',authMiddleware, CommentController.delete);

export default router