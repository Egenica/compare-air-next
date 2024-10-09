import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from './App';

// teardown and cleanup
afterEach(() => {
  jest.clearAllMocks();
});

window.scrollTo = jest.fn();

describe('App Component', () => {
  it('should render without crashing', async () => {
    const appComp = await App();

    const { container } = render(appComp);

    await expect(container).toBeInTheDocument();
  });

  it('should render the App component', async () => {
    const appComp = await App();
    const { getByText } = render(appComp);
    expect(getByText('Compare your Air')).toBeInTheDocument();
  });

  test('Renders loading text', async () => {
    const appComp = await App();
    const { getByText } = render(appComp);
    expect(getByText(/LOADING DATA/i)).toBeInTheDocument();
  });

  test('Renders subheading text', async () => {
    const appComp = await App();
    render(appComp);
    const el = screen.getByText(
      /Compare the air quality between cities in the UK/i
    );
    expect(el).toBeInTheDocument();
  });

  test('Renders to top of page button and tests click', async () => {
    const appComp = await App();
    render(appComp);

    const el = screen.getByText(/TOP/i);

    expect(el).toBeInTheDocument();

    el.onclick = jest.fn();
    expect(el.onclick).not.toHaveBeenCalled();
    el.click();
    expect(el.onclick).toHaveBeenCalled();
  });
});
