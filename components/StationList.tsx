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

const calculateBottles = (liters: number) => {
  const sizes = [15, 5, 3, 1];
  const result: { [key: string]: number } = {};

  sizes.forEach(size => {
    result[size] = Math.floor(liters / size);
    liters %= size;
  });

  return result;
};

const StationList: React.FC<Props> = ({ stations, liters }) => {
  const bottles = calculateBottles(liters);

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
          const total = bottles[1] * station.prices["1L"] + bottles[3] * station.prices["3L"] +
                        bottles[5] * station.prices["5L"] + bottles[15] * station.prices["15L"];
          return (
            <tr key={index}>
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

