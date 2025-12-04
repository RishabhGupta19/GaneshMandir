import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Ganesh Akhara website', () => {
  render(<App />);
  const headerElements = screen.getAllByText(/Ganesh Akhara/i);
  expect(headerElements.length).toBeGreaterThan(0);
  expect(headerElements[0]).toBeInTheDocument();
});
