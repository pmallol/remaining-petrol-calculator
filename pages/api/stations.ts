import { NextApiRequest, NextApiResponse } from 'next';

const stations = [
  { name: "Gasnat Petrol", prices: { "1L": 3.6, "3L": 9.1, "5L": 14.2, "15L": 40.6 } },
  { name: "QuickFuel Station", prices: { "1L": 3.7, "3L": 9.05, "5L": 14.25, "15L": 40.1 } },
  { name: "EcoFuel Depot", prices: { "1L": 3.55, "3L": 9.2, "5L": 14.3, "15L": 41.2 } },
  { name: "PetroMax", prices: { "1L": 3.75, "3L": 9.15, "5L": 14.4, "15L": 41.5 } },
  { name: "FuelMaster", prices: { "1L": 3.65, "3L": 9.0, "5L": 14.1, "15L": 40.8 } },
  { name: "SpeedyGas", prices: { "1L": 3.8, "3L": 9.25, "5L": 14.35, "15L": 41.0 } },
  { name: "PrimePetrol", prices: { "1L": 3.5, "3L": 9.3, "5L": 14.5, "15L": 41.7 } },
  { name: "JetFuel Station", prices: { "1L": 3.85, "3L": 9.1, "5L": 14.2, "15L": 41.3 } },
  { name: "PetroPlus", prices: { "1L": 3.6, "3L": 9.35, "5L": 14.6, "15L": 41.8 } },
  { name: "FuelKing", prices: { "1L": 3.7, "3L": 9.2, "5L": 14.55, "15L": 41.9 } },
];

const getRandomPrice = (min: number, max: number) => (Math.random() * (max - min) + min).toFixed(2);

const updatePrices = () => {
  stations.forEach(station => {
    station.prices["1L"] = parseFloat(getRandomPrice(3.5, 4));
    station.prices["3L"] = parseFloat(getRandomPrice(9, 11));
    station.prices["5L"] = parseFloat(getRandomPrice(14, 15));
    station.prices["15L"] = parseFloat(getRandomPrice(41, 43));
  });
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  updatePrices();
  res.status(200).json(stations);
}
