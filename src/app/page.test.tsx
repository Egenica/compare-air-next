import '@testing-library/jest-dom';
import { render, act } from '@testing-library/react';
// import preview from 'jest-preview';
import App from './App';

describe('Home Component', () => {
  it('should render without crashing', async () => {
    await act(async () => {
      const appComp = await App();
      const { container } = render(appComp);
      // preview.debug();
      await expect(container).toBeInTheDocument();
    });
  });
});
