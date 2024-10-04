import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoadingSpinner from './LoadingSpinner';

describe('LoadingSpinner Component', () => {
  test('renders without crashing', () => {
    const { container } = render(<LoadingSpinner />);

    expect(container).toBeInTheDocument();
  });

  test('renders the correct number of div elements', () => {
    const { container } = render(<LoadingSpinner />);
    const divElements = container.querySelectorAll('.lds-ring > div');
    expect(divElements.length).toBe(4);
  });

  test('has the correct class name', () => {
    const { container } = render(<LoadingSpinner />);
    const spinnerElement = container.querySelector('.lds-ring');
    expect(spinnerElement).toHaveClass('lds-ring');
  });

  test('renders the loading text', () => {
    const { getByTestId } = render(
      <LoadingSpinner loadingText="Loading data..." />
    );
    expect(getByTestId('loading-spinner')).toHaveTextContent('Loading data...');
  });

  test('renders the default loading text', () => {
    const { getByTestId } = render(<LoadingSpinner />);
    expect(getByTestId('loading-spinner')).toHaveTextContent('Loading...');
  });

  test('renders the default text color class', () => {
    const { getByTestId } = render(<LoadingSpinner />);
    expect(getByTestId('loading-spinner')).toHaveClass('text-white');
  });

  test('renders the custom text color class', () => {
    const { getByTestId } = render(
      <LoadingSpinner textColorClass="text-black" />
    );
    expect(getByTestId('loading-spinner')).toHaveClass('text-black');
  });
});
