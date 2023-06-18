import { Router } from "express";
import PruebaController from "../controller/PruebaController.js";

const router = Router();
const pruebaController = new PruebaController();

router.get("/usuarios", pruebaController.getPruebaController);



export default router;
