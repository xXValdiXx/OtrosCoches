import { Request, Response } from "express";
import { CarService } from "../service/carService";
import { CarRepository } from "../repository/carRepo";
import { Car } from "../interfaces/carInterface";
import * as path from "node:path";

const carRepository = new CarRepository();
const carService = new CarService(carRepository);

export const carController = {
  async createCar(req: Request, res: Response): Promise<void> {
    try {
      const car: Car = {
        model: req.body.model as string,
        color: req.body.color as string,
        owner: req.body.owner as string,
        year: req.body.year as string,
        services: req.body.services as string[],
      };

      const addCar = await carService.addCar(car);
      res.status(200).json(addCar);
    } catch (error) {
      console.error("Error adding car document:", error);
      res.status(500).json({ error: "Failed to add car document" });
    }
  },
  async seedCars(req: Request, res: Response): Promise<void> {
    try {
      //const filePath = path.join(__dirname, "../config/seed.js"); // Ruta del archivo JSON
      const filePath = path.join(process.cwd(), "../data/seed.json");
      const addedCars = await carService.seedCar(filePath);

      res.status(200).json({ message: "Cars inserted successfully", cars: addedCars });
    } catch (error) {
      console.error("Error uploading cars:", error);
      res.status(500).json({ error: "Failed to upload cars" });
    }
  },

  async getCars(req: Request, res: Response): Promise<void> {
    try {
      const year = req.query.year as string | undefined;
      const filterYear = req.query.filterYear as string | undefined;
      const limit = parseInt(req.query.limit as string);
      const startAfterId = req.query.startAfterId as string | undefined;

      const cars = await carService.getCars(year, filterYear, limit, startAfterId);

      res.status(200).json(cars);
    } catch (error) {
      console.error("Error fetching cars:", error);
      res.status(500).json({ error: "Failed to fetch cars" });
    }
  }

  ,
  async getCarById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const car = await carService.getCarById(id);
      if (car ) {
        res.status(200).json(car);
      } else {
        res.status(404).json({ message: "Cars not found" });
      }
    } catch (error) {
      console.error("Error fetching cars:", error);
      res.status(500).json({ error: "Failed to fetch cars" });
    }
  },
};
