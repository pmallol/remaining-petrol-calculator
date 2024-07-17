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

const Footer: React.FC = () => {
  return (
    <footer className="text-center text-sm text-gray-600 mt-8">
      &copy; 2050 Gasazon
    </footer>
  );
};

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
    <div className="container mx-auto p-4 sm:p-6 min-h-screen bg-gray-100">
      <header className="mb-6 sm:mb-8 border-b border-blue-700">
        <h1 className="text-2xl sm:text-4xl font-bold text-blue-600 mb-2">Gasazon</h1>
        <h3 className="text-sm sm:text-md text-gray-800 mb-4">Calculate liters and find best prices every 30s. Simplify your petrol purchase with precision.</h3>
      </header>
      <div className="mb-4 sm:mb-6">
        <label className="block text-md sm:text-lg font-medium text-gray-700 mb-2">Enter the desired amount of petrol liters you would like to buy:</label>
        <input
          type="number"
          value={liters}
          onChange={(e) => setLiters(Number(e.target.value))}
          min="1"
          className="mt-1 p-2 sm:p-3 border border-gray-300 text-black rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-white rounded-lg shadow-md">
        <p className="mb-4 text-md sm:text-lg text-black">You want to buy a total of <b>{liters}L</b> of petrol.</p>
        <p className="text-sm sm:text-md text-black mb-2">For which you will need to purchase the following amount of bottles:</p>
        <ol className="list-disc list-inside text-black pl-5">
          {Object.entries(bottles).map(([key, value]) => (
            <li key={key} className="text-sm sm:text-md text-black">
              {value} unit{value === 1 ? '' : 's'} of {key} liter{key === '1' ? '' : 's'}
            </li>
          ))}
        </ol>
      </div>
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <StationList stations={stations} liters={liters} />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
