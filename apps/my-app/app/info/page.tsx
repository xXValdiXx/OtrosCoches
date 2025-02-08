'use client';

import { useEffect, useState } from 'react';
import { Car } from '../../../../packages/zion/interfaces/carInterface';
import Link from 'next/link';

export default function Page() {
    const [cars, setCars] = useState<Car[]>([]);
    const [filterYear, setFilterYear] = useState<'newer' | 'older'>('newer');
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const currentYear = new Date().getFullYear();

    useEffect(() => {
        setCars([]);
        setHasMore(true);
        fetchCars();
    }, [filterYear]);

    const fetchCars = async (startAfterId?: string) => {
        setIsLoading(true);
        try {
            const url = `https://api-nomxiko2oa-uc.a.run.app/cars?year=${currentYear}&filterYear=${filterYear}&limit=10${startAfterId ? `&startAfterId=${startAfterId}` : ''}`;
            const response = await fetch(url);
            const data = await response.json();

            if (data.length < 10) setHasMore(false);

            setCars(prevCars => (startAfterId ? [...prevCars, ...data] : data));
        } catch (error) {
            console.error('Error fetching cars:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLoadMore = () => {
        if (cars.length > 0) {
            const lastCarId = cars[cars.length - 1].id;
            fetchCars(lastCarId);
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-center space-x-4 mb-6">
                <button
                    onClick={() => setFilterYear('newer')}
                    className={`px-4 py-2 rounded ${filterYear === 'newer' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'} transition`}
                >
                    Newer Cars
                </button>
                <button
                    onClick={() => setFilterYear('older')}
                    className={`px-4 py-2 rounded ${filterYear === 'older' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'} transition`}
                >
                    Older Cars
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cars.length > 0 ? (
                    cars.map((car: Car) => (
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
                    ))
                ) : (
                    <p className="text-gray-500 text-center">No cars found for the selected filter.</p>
                )}
            </div>

            {isLoading && <p className="text-center mt-4">Loading...</p>}

            {hasMore && !isLoading && cars.length > 0 && (
                <div className="flex justify-center mt-4">
                    <button
                        onClick={handleLoadMore}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                        Load More
                    </button>
                </div>
            )}
        </div>
    );
}
