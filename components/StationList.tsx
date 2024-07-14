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
    <div className='overflow-x-auto'>
      <table className="min-w-full bg-white border border-gray-200 divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            <th className="px-6 py-3">Petrol Station</th>
            <th className="px-6 py-3">1L</th>
            <th className="px-6 py-3">3L</th>
            <th className="px-6 py-3">5L</th>
            <th className="px-6 py-3">15L</th>
            <th className="px-6 py-3">Total (€)</th>
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-200'>
          {stations.map((station, index) => {
            const total = totals[index];
            return (
              <tr
                key={index}
                className={total === minTotal ? 'bg-blue-100' : ''}
              >
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-700">{station.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{station.prices["1L"].toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{station.prices["3L"].toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{station.prices["5L"].toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{station.prices["15L"].toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">€{total.toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default StationList;
