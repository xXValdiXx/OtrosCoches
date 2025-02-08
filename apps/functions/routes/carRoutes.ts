import { Router } from "express";
import { carController } from "../controller/carController";

const router = Router();
router.get("/cars", carController.getCars);
router.get("/cars/:id", carController.getCarById);
router.post("/cars", carController.createCar);
router.post("/cars/upload", carController.seedCars);

export default router;
