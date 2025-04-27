import { Router } from "express";

import upload from "../../config/multerConfig.js"
import FotoUserController from "../controllers/FotoUser.js";
import authMiddleware from "../../utils/auth.js"

const router = Router();

router.post('/', authMiddleware, upload.single('foto_user'),FotoUserController.store)
router.delete('/:id', authMiddleware,FotoUserController.delete)

export default router