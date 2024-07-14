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
    <div className="container mx-auto p-4 h-dvh">
      <h1 className="text-2xl font-bold mb-4">Gasazon</h1>
      <div className="mb-4">
        <label className="block text-md font-medium text-gray-700">Enter the desired amount of petrol liters you would like to buy:</label>
        <input
          type="number"
          value={liters}
          onChange={(e) => setLiters(Number(e.target.value))}
          min="1"
          className="mt-1 p-2 block border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div className="mb-10">
        <p className='mb-4'>You want to buy a total of <b>{liters}L</b> of petrol.</p>
        <p>For which you will need to purchase the following amount of bottles:</p>
        <ol className="list-disc list-inside">
          {Object.entries(bottles).map(([key, value]) => (
            <li key={key}>
              {value} unit{ value === 1 ? '': 's'} of {key} liter{ key === '1' ? '': 's'}
            </li>
          ))}
        </ol>
      </div>
      <StationList stations={stations} liters={liters} />
    </div>
  );
};

export default Home;
