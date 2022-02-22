import React from 'react';
import App from './App';
import { render, screen } from '@testing-library/react';  

it('renders the welcome screen', () => {
  render(<App />);
  expect(screen.getByText('Welcome to Customer App')).toBeInTheDocument();
});
