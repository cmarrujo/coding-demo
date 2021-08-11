import { render, screen } from '@testing-library/react';
import MyGamesApp from './App';

test('renders learn react link', () => {
  render(<MyGamesApp />);
  const linkElement = screen.getByText(/Hello World/i);
  expect(linkElement).toBeInTheDocument();
});
