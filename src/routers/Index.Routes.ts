import { Router } from "express";
const router = Router();
import { IndexWelcome } from "../controllers/Index.Controller";


router.route('/')
    .get(IndexWelcome);

export default router;