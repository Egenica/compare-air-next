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
    const spinnerElement = container.firstChild;
    expect(spinnerElement).toHaveClass('lds-ring');
  });
});
