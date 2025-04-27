import { Router } from "express";

import FotoUserController from "../controllers/FotoUser.js";

const router = Router();

router.get('/', FotoUserController.index)

export default router