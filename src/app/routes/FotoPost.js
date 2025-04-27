import { Router } from "express";

import upload from "../../config/multerConfig.js"
import FotoPostController from "../controllers/FotoPost.js";
import authMiddleware from "../../utils/auth.js"

const router = Router()

router.post('/', 
  authMiddleware,
  (req, res, next) => {
             
    if (!req.userAdmin) {
      return res.status(403).json({ error: 'Apenas administradores podem adicionar fotos' });
    }
    next();
  },
  upload.single('foto_post'), 
  FotoPostController.store
)

export default router