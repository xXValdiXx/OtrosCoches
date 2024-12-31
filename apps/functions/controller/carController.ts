import { Request, Response } from "express";
import { CarService } from "../service/carService";
import { CarRepository } from "../repository/carRepo";
import { Car } from "../interfaces/carInterface";

const carRepository = new CarRepository();
const carService = new CarService(carRepository);

export const carController = {
  async createCar(req: Request, res: Response): Promise<void> {
    try {
      const car: Car = {
        model: req.body.model as string,
        color: req.body.color as string,
        owner: req.body.owner as string,
        year: req.body.year as number,
        services: req.body.services as string[],
      };

      const addCar = await carService.addCar(car);
      res.status(200).json(addCar);
    } catch (error) {
      console.error("Error adding car document:", error);
      res.status(500).json({ error: "Failed to add car document" });
    }
  },

  async getCars(req: Request, res: Response): Promise<void> {
    try {
      const cars = await carService.getCars();
      if (cars && cars.length > 0) {
        res.status(200).json(cars);
      } else {
        res.status(404).json({ message: "Cars not found" });
      }
    } catch (error) {
      console.error("Error fetching cars:", error);
      res.status(500).json({ error: "Failed to fetch cars" });
    }
  },
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
