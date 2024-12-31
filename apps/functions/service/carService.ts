import { Car } from "../interfaces/carInterface";
import { CarRepository } from "../repository/carRepo";

export class CarService {
  private repository: CarRepository;

  constructor(repository: CarRepository) {
    this.repository = repository;
  }

  public async addCar(car: Car): Promise<Car> {
    return await this.repository.addCar(car);
  }

  public async getCars(): Promise<Car[]> {
    return await this.repository.getCars();
  }

  public async getCarById(id: string): Promise<Car | null> {
    return await this.repository.getCarById(id);
  }
}
