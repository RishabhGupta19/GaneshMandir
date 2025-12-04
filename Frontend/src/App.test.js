import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Ganesh Akhara website', () => {
  render(<App />);
  const headerElement = screen.getAllByText(/Ganesh Akhara/i)[0];
  expect(headerElement).toBeInTheDocument();
});
