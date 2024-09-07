import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RangeFilter } from './RangeFilter';

describe('RangeFilter Component', () => {
  const min = 0;
  const max = 100;
  const value: [number, number] = [20, 80];
  const onChange = jest.fn();

  beforeEach(() => {
    render(
      <RangeFilter min={min} max={max} value={value} onChange={onChange} />
    );
  });

  test('renders the label correctly', () => {
    const label = screen.getByText(/Spending/i);
    expect(label).toBeInTheDocument();
  });

  test('renders the range input with correct attributes', () => {
    const rangeInput = screen.getByRole('slider');
    expect(rangeInput).toBeInTheDocument();
    expect(rangeInput).toHaveAttribute('min', min.toString());
    expect(rangeInput).toHaveAttribute('max', max.toString());
    expect(rangeInput).toHaveValue(value[0].toString());
  });

  test('renders the value labels correctly', () => {
    const minValueLabel = screen.getByText(`$${value[0].toLocaleString()}`);
    const maxValueLabel = screen.getByText(`$${value[1].toLocaleString()}`);
    expect(minValueLabel).toBeInTheDocument();
    expect(maxValueLabel).toBeInTheDocument();
  });

  test('calls onChange with correct values when range input changes', () => {
    const rangeInput = screen.getByRole('slider');
    fireEvent.change(rangeInput, { target: { value: '30' } });
    expect(onChange).toHaveBeenCalledWith([30, value[1]]);
  });
});
