import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { LinkIcon } from './LinkIcon';

// Test to check if the LinkIcon component renders without crashing
test('renders LinkIcon component', () => {
  render(<LinkIcon />);
});

// Test to check if the svg element is present
test('contains svg element', () => {
  const { container } = render(<LinkIcon />);
  const svgElement = container.querySelector('svg');
  expect(svgElement).toBeInTheDocument();
});

// Test to check if the path element with specific attributes is present
test('contains path element with correct attributes', () => {
  const { container } = render(<LinkIcon />);
  const pathElement = container.querySelector('path');
  expect(pathElement).toBeInTheDocument();
  expect(pathElement).toHaveAttribute('fill', '#000');
  expect(pathElement).toHaveClass('text-slate-400');
});
