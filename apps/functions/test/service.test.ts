import { CarService } from "../service/carService";
import { CarRepository } from "../repository/carRepo";
import { Car } from "../interfaces/carInterface";

// Creamos un mock de CarRepository
jest.mock("../repository/carRepo");

describe("CarService", () => {
  let carService: CarService;
  let carRepositoryMock: jest.Mocked<CarRepository>;

  beforeEach(() => {
    // Usamos el mock directamente
    carRepositoryMock = new CarRepository() as jest.Mocked<CarRepository>;

    // Ahora pasamos carRepositoryMock al constructor de CarService
    carService = new CarService(carRepositoryMock);
  });

  it("should add a car", async () => {
    const car: Car = { color: "blue", services: ["whells"], id: "1", owner: "Valdi", model: "Corolla", year: "2020" };

    carRepositoryMock.addCar.mockResolvedValue(car);

    // Llamamos al método del servicio
    const result = await carService.addCar(car);

    // Verificamos que el resultado sea el esperado
    expect(result).toEqual(car);
    expect(carRepositoryMock.addCar).toHaveBeenCalledWith(car);
  });

  it("should get cars", async () => {
    const cars: Car[] = [
      { color: "blue", services: ["whells"], id: "1", owner: "Valdi", model: "Corolla", year: "2020" },
      { color: "red", services: ["other"], id: "2", owner: "Erik", model: "mazda", year: "2021" },
    ];

    carRepositoryMock.getCars.mockResolvedValue(cars);

    // Llamamos al método del servicio
    const result = await carService.getCars();

    // Verificamos que el resultado sea el esperado
    expect(result).toEqual(cars);
    expect(carRepositoryMock.getCars).toHaveBeenCalled();
  });
});
