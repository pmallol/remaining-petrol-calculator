"use client"

import { useState, useEffect } from 'react';
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

  return (
    <div className="container mx-auto p-4 h-dvh">
      <h1 className="text-2xl font-bold mb-4">Gasazon</h1>
      <StationList stations={stations} liters={1} />
    </div>
  );
};

export default Home;
