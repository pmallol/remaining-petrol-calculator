import React from 'react';
import { calculateBottles } from '../utils/calculateBottles';

interface Station {
  name: string;
  prices: {
    "1L": number;
    "3L": number;
    "5L": number;
    "15L": number;
  };
}

interface Props {
  stations: Station[];
  liters: number;
}

const StationList: React.FC<Props> = ({ stations, liters }) => {
  const bottles = calculateBottles(liters);

  // Calculate totals for each station
  const totals = stations.map(station => (
    bottles[1] * station.prices["1L"] +
    bottles[3] * station.prices["3L"] +
    bottles[5] * station.prices["5L"] +
    bottles[15] * station.prices["15L"]
  ));

  // Find the minimum total to highlight the cheapest station
  const minTotal = Math.min(...totals);

  return (
    <table className="min-w-full table-auto">
      <thead>
        <tr>
          <th className="border px-4 py-2">Petrol Station</th>
          <th className="border px-4 py-2">1L</th>
          <th className="border px-4 py-2">3L</th>
          <th className="border px-4 py-2">5L</th>
          <th className="border px-4 py-2">15L</th>
          <th className="border px-4 py-2">Total (€)</th>
        </tr>
      </thead>
      <tbody>
        {stations.map((station, index) => {
          const total = totals[index];
          return (
            <tr
              key={index}
              className={total === minTotal ? 'bg-blue-100' : ''}
            >
              <td className="border px-4 py-2 font-medium text-gray-700">{station.name}</td>
              <td className="border px-4 py-2">{station.prices["1L"].toFixed(2)}</td>
              <td className="border px-4 py-2">{station.prices["3L"].toFixed(2)}</td>
              <td className="border px-4 py-2">{station.prices["5L"].toFixed(2)}</td>
              <td className="border px-4 py-2">{station.prices["15L"].toFixed(2)}</td>
              <td className="border px-4 py-2">€{total.toFixed(2)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default StationList;
