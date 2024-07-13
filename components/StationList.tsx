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
  return (
    <table className="min-w-full table-auto">
      <thead>
        <tr>
          <th>Petrol Station</th>
          <th>1L</th>
          <th>3L</th>
          <th>5L</th>
          <th>15L</th>
        </tr>
      </thead>
      <tbody>
        {stations.map((station, index) => {
          return (
            <tr key={index}>
              <td>{station.name}</td>
              <td>{station.prices["1L"].toFixed(2)}</td>
              <td>{station.prices["3L"].toFixed(2)}</td>
              <td>{station.prices["5L"].toFixed(2)}</td>
              <td>{station.prices["15L"].toFixed(2)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default StationList;
