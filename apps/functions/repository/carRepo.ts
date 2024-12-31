import { firestore } from "../config/config-firebase";
import { Car } from "../interfaces/carInterface";

export class CarRepository {
  private collectionRef: FirebaseFirestore.CollectionReference;

  constructor() {
    this.collectionRef = firestore.collection("cars");
  }

  public async addCar(car: Car): Promise<Car> {
    const newDoc = await this.collectionRef.add(car);
    return {id: newDoc.id, ...car};
  }

  public async getCars(): Promise<Car[]> {
    const snapshot = await this.collectionRef.get();

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