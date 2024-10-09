import '@testing-library/jest-dom';
//import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('Home Component', () => {
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
});
