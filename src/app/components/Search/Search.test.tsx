import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Search } from './Search';

// teardown and cleanup
afterEach(() => {
  jest.clearAllMocks();
});

const mockSetLoading = jest.fn();

test('renders input search component', () => {
  act(() => {
    render(<Search setLoading={mockSetLoading} />);
  });
  const searchInput = screen.getByPlaceholderText(/Search for a city/i);
  expect(searchInput).toBeInTheDocument();
});

// create test that checks if the search input is empty when the clear button is clicked

test('clears search input when clear button is clicked', () => {
  act(() => {
    render(<Search setLoading={mockSetLoading} />);
  });

  const searchInput = screen.getByPlaceholderText(/Search for a city/i);
  expect(searchInput).toBeInTheDocument();
  expect(searchInput).toHaveValue('');
});
