import { Car } from "../../../../packages/zion/interfaces/carInterface";
import Link from 'next/link';

export default async function Page() {
    const data = await fetch('https://api-nomxiko2oa-uc.a.run.app/cars');
    const cars = await data.json();

    console.log(cars);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {cars.map((car: Car) => (
                <div key={car.id} className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-all">
                    <h3 className="text-xl font-semibold mb-2 text-black">{car.model}</h3>
                    <p className="text-black"><strong>Color:</strong> {car.color}</p>
                    <p className="text-black"><strong>Owner:</strong> {car.owner}</p>
                    <p className="text-black"><strong>Year:</strong> {car.year}</p>
                    <p className="text-black"><strong>Services:</strong> {car.services}</p>
                    <Link href={`/info/${car.id}`} className="mt-4 inline-block text-black hover:text-gray-700">
                        View Details
                    </Link>
                </div>
            ))}
        </div>
    );
}

