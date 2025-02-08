import { Car } from "../interfaces/carInterface";
import { CarRepository } from "../repository/carRepo";
import fs from "fs/promises";


export class CarService {
  private repository: CarRepository;

  constructor(repository: CarRepository) {
    this.repository = repository;
  }

  public async seedCar(filePath: string): Promise<Car[]> {
    try {
      const data = await fs.readFile(filePath, "utf8");
      const cars: Car[] = JSON.parse(data);

      return await this.repository.seedCars(cars);
    } catch (error) {
      console.error("Error reading or inserting cars:", error);
      throw new Error("Failed to insert cars from file");
    }
  }

  public async addCar(car: Car): Promise<Car> {
    return await this.repository.addCar(car);
  }

  public async getCars(year?: string, filterYear?: string, limit?: number, startAfterId?: string): Promise<Car[]> {
    return await this.repository.getCars(year, filterYear, limit, startAfterId);
  }


  public async getCarById(id: string): Promise<Car | null> {
    return await this.repository.getCarById(id);
  }
}
