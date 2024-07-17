import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../app/page';

const mockStations = [
  { name: "EcoFuel Depot", prices: { "1L": 3.55, "3L": 9.2, "5L": 14.3, "15L": 41.2 } },
  { name: "FuelKing", prices: { "1L": 3.7, "3L": 9.2, "5L": 14.55, "15L": 41.9 } },
  { name: "FuelMaster", prices: { "1L": 3.75, "3L": 9.15, "5L": 14.4, "15L": 41.5 } },
  { name: "Gasnat Petrol", prices: { "1L": 3.6, "3L": 9.1, "5L": 14.2, "15L": 40.6 } },
  { name: "JetFuel Station", prices: { "1L": 3.85, "3L": 9.1, "5L": 14.2, "15L": 41.3 } },
  { name: "PetroMax", prices: { "1L": 3.75, "3L": 9.15, "5L": 14.4, "15L": 41.5 } },
  { name: "PetroPlus", prices: { "1L": 3.6, "3L": 9.35, "5L": 14.6, "15L": 41.8 } },
  { name: "PrimePetrol", prices: { "1L": 3.5, "3L": 9.3, "5L": 14.5, "15L": 41.7 } },
  { name: "QuickFuel Station", prices: { "1L": 3.7, "3L": 9.05, "5L": 14.25, "15L": 40.1 } },
  { name: "SpeedyGas", prices: { "1L": 3.8, "3L": 9.25, "5L": 14.35, "15L": 41.0 } },
];

beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockStations),
    })
  ) as jest.Mock;
});

// Function for flexible text matcher
const expectTextToBeInTheDocument = (text: string | RegExp) => {
  expect(screen.getByText(text)).toBeInTheDocument();
};


test('renders the app and fetches station data', async () => {
  render(<Home />);

  const stationData = await screen.findAllByText(/Gasnat Petrol/i);
  expect(stationData.length).toBe(1);

  // Check that there are 10 rows in the table + header row = 11
  const tableElement = screen.getByRole('table');
  expect(tableElement).toBeInTheDocument();
  const tableRows = screen.getAllByRole('row');
  expect(tableRows.length).toBe(11);
});

test('displays correct price for 1 liter', async () => {
  render(<Home />);

  await waitFor(() => expect(screen.getByText(/Gasnat Petrol/i)).toBeInTheDocument());

  const litersInput = screen.getByLabelText(/Enter the desired amount of petrol liters you would like to buy/i);
  fireEvent.change(litersInput, { target: { value: '1' } });

  expectTextToBeInTheDocument(/1 unit of 1 liter/i);
  expectTextToBeInTheDocument(/0 units of 3 liters/i);
  expectTextToBeInTheDocument(/0 units of 5 liters/i);
  expectTextToBeInTheDocument(/0 units of 15 liters/i);
});

test('displays correct price for 4 liters', async () => {
  render(<Home />);

  await waitFor(() => expect(screen.getByText(/Gasnat Petrol/i)).toBeInTheDocument());

  const litersInput = screen.getByLabelText(/Enter the desired amount of petrol liters you would like to buy/i);
  fireEvent.change(litersInput, { target: { value: '4' } });

  expectTextToBeInTheDocument(/1 unit of 1 liter/i);
  expectTextToBeInTheDocument(/1 unit of 3 liters/i);
  expectTextToBeInTheDocument(/0 units of 5 liters/i);
  expectTextToBeInTheDocument(/0 units of 15 liters/i);
});

test('displays correct price for 44 liters', async () => {
  render(<Home />);

  await waitFor(() => expect(screen.getByText(/Gasnat Petrol/i)).toBeInTheDocument());

  const litersInput = screen.getByLabelText(/Enter the desired amount of petrol liters you would like to buy/i);
  fireEvent.change(litersInput, { target: { value: '44' } });

  expectTextToBeInTheDocument(/1 unit of 1 liter/i);
  expectTextToBeInTheDocument(/1 unit of 3 liters/i);
  expectTextToBeInTheDocument(/2 units of 5 liters/i);
  expectTextToBeInTheDocument(/2 units of 15 liters/i);
});

test('checks if a row in the table has a blue background color"', async () => {
  render(<Home />);
  await waitFor(() => expect(screen.getByText(/Gasnat Petrol/i)).toBeInTheDocument());
  
  const tableRows = screen.getAllByRole('row');
  const rowWithBgBlue100 = tableRows.find(row => row.classList.contains('bg-blue-100'));
  
  expect(rowWithBgBlue100).toBeInTheDocument();
});
