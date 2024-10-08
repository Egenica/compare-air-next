import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ErrorMessage } from './ErrorMessage';

test('renders ErrorMessage with correct text', () => {
  const { getByText } = render(<ErrorMessage errorTxt="Error occurred!" />);
  expect(getByText('Error occurred!')).toBeInTheDocument();
});

test('renders ErrorMessage with correct class names', () => {
  const { container } = render(<ErrorMessage errorTxt="Error occurred!" />);
  const divElement = container.firstChild;
  expect(divElement).toHaveClass(
    'bg-white text-red-700 px-4 py-3 rounded relative'
  );
  expect(divElement).toHaveAttribute('role', 'alert');
});
