import { Request, Response } from "express";
import { carController } from "../controller/carController";

jest.mock("../service/carService");

describe("CarController", () => {

  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {

    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should create a car", async () => {
    req.body = { model: "Corolla", color: "blue", owner: "Valdi", year: 2020, services: ["wheels"] };

    await carController.createCar(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
  });

});
