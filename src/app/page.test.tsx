import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import App from './App';

describe('Home Component', () => {
  it('should render without crashing', () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });

  it('should render the App component', () => {
    const { getByText } = render(<App />);
    expect(getByText('Compare your Air')).toBeInTheDocument();
  });
});
