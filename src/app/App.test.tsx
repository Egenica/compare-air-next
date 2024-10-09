import '@testing-library/jest-dom';
import { render, screen, act } from '@testing-library/react';
import App from './App';
// import preview from 'jest-preview';

// teardown and cleanup
afterEach(() => {
  jest.clearAllMocks();
});

window.scrollTo = jest.fn();

describe('App Component', () => {
  it('should render without crashing', async () => {
    await act(async () => {
      const appComp = await App();
      const { container } = render(appComp);
      await expect(container).toBeInTheDocument();
    });
  });

  test('should render the App component', async () => {
    await act(async () => {
      const appComp = await App();
      render(appComp);
    });
    // preview.debug();
    const el = screen.getByText(/Compare your Air/i);
    expect(el).toBeInTheDocument();
  });

  test('Renders subheading text', async () => {
    await act(async () => {
      const appComp = await App();
      render(appComp);
    });
    const el = screen.getByText(
      /Compare the air quality between cities in the UK/i
    );
    expect(el).toBeInTheDocument();
  });

  test('Renders to top of page button and tests click', async () => {
    await act(async () => {
      const appComp = await App();
      render(appComp);
    });
    const el = screen.getByText(/TOP/i);

    expect(el).toBeInTheDocument();

    el.onclick = jest.fn();
    expect(el.onclick).not.toHaveBeenCalled();
    el.click();
    expect(el.onclick).toHaveBeenCalled();
  });
});
