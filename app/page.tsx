"use client"

import { useState, useEffect } from 'react';

import { calculateBottles } from '../utils/calculateBottles';
import StationList from '../components/StationList';

interface Station {
  name: string;
  prices: {
    "1L": number;
    "3L": number;
    "5L": number;
    "15L": number;
  };
}

const Home: React.FC = () => {
  const [stations, setStations] = useState<Station[]>([]);
  const [liters, setLiters] = useState<number>(1);

  const fetchStations = async () => {
    const res = await fetch('/api/stations');
    const data = await res.json();
    setStations(data);
  };

  useEffect(() => {
    fetchStations();
    const interval = setInterval(fetchStations, 30000); // Fetch new prices every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const bottles = calculateBottles(liters);

  return (
    <div className="container mx-auto p-6 min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600 mb-8">Gasazon</h1>
      <div className="mb-6">
        <label className="block text-lg font-medium text-gray-700 mb-2">Enter the desired amount of petrol liters you would like to buy:</label>
        <input
          type="number"
          value={liters}
          onChange={(e) => setLiters(Number(e.target.value))}
          min="1"
          className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
        <p className='mb-4 text-lg'>You want to buy a total of <b>{liters}L</b> of petrol.</p>
        <p className="text-md mb-2">For which you will need to purchase the following amount of bottles:</p>
        <ol className="list-disc list-inside pl-5">
          {Object.entries(bottles).map(([key, value]) => (
            <li key={key} className="text-md">
              {value} unit{value === 1 ? '' : 's'} of {key} liter{key === '1' ? '' : 's'}
            </li>
          ))}
        </ol>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <StationList stations={stations} liters={liters} />
      </div>
    </div>
  );
};

export default Home;
