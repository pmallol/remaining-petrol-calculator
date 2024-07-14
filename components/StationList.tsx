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

  // Find the minimum total to hightlight the cheapest station
  const minTotal = Math.min(...totals);

  return (
    <table className="min-w-full table-auto">
      <thead>
        <tr>
          <th>Petrol Station</th>
          <th>1L</th>
          <th>3L</th>
          <th>5L</th>
          <th>15L</th>
          <th>Total (€)</th>
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
              <td>{station.name}</td>
              <td>{station.prices["1L"].toFixed(2)}</td>
              <td>{station.prices["3L"].toFixed(2)}</td>
              <td>{station.prices["5L"].toFixed(2)}</td>
              <td>{station.prices["15L"].toFixed(2)}</td>
              <td>{total.toFixed(2)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default StationList;
