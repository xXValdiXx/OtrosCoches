import { firestore } from "../config/config-firebase";
import { Car } from "../interfaces/carInterface";

export class CarRepository {
  private readonly collectionRef: FirebaseFirestore.CollectionReference;

  constructor() {
    this.collectionRef = firestore.collection("cars");
  }

  public async addCar(car: Car): Promise<Car> {
    const newDoc = await this.collectionRef.add(car);
    return {id: newDoc.id, ...car};
  }

  public async seedCars(cars: Car[]): Promise<Car[]> {
    const batch = firestore.batch();
    const addedCars: Car[] = [];

    cars.forEach((car) => {
      const newDocRef = this.collectionRef.doc();
      batch.set(newDocRef, car);
      addedCars.push({ id: newDocRef.id, ...car });
    });

    await batch.commit();
    return addedCars;
  }


  public async getCars(year?: string, filterYear?: string, limit?: number, startAfterId?: string): Promise<Car[]> {
    let query: FirebaseFirestore.Query = this.collectionRef;

    if (year) {
      const comparisonOperator = filterYear === "newer" ? ">=" : "<";
      query = query.where("year", comparisonOperator, year);
    }

    if (limit){
      query = query.orderBy("year", filterYear === "newer" ? "desc" : "asc").limit(limit);
    }

    if (startAfterId) {
      const startAfterDoc = await this.collectionRef.doc(startAfterId).get();
      if (startAfterDoc.exists) {
        query = query.startAfter(startAfterDoc);
      }
    }

    const snapshot = await query.get();

    if (snapshot.empty) return [];

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Car[];
  }



  public async getCarById(id: string): Promise<Car | null> {
    const snapshot = await this.collectionRef.doc(id).get();
    if (!snapshot.exists) return null;
    return { id: snapshot.id, ...snapshot.data() } as Car;
  }
}