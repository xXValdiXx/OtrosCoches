import { Car } from "../../../../functions/interfaces/carInterface";

// El parámetro params es una promesa que debe resolverse.
export default async function CarDetailPage({params,}: { params: Promise<{ id: string }>;}) {
    const { id } = await params;  // Esperamos a que la promesa se resuelva

    const data = await fetch(`https://api-nomxiko2oa-uc.a.run.app/cars/${id}`);
    if (!data.ok) {
        throw new Error(`Error fetching car data: ${data.statusText}`);
    }
    const car: Car = await data.json();


    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4 text-black">Car Details</h1>
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-2 text-black">{car.model}</h3>
                <p className="text-black"><strong>Color:</strong> {car.color}</p>
                <p className="text-black"><strong>Owner:</strong> {car.owner}</p>
                <p className="text-black"><strong>Year:</strong> {car.year}</p>
                <p className="text-black"><strong>Services:</strong> {car.services}</p>
            </div>
        </div>
    );
}

