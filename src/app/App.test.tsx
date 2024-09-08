import React, { act } from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
// import { debug } from 'jest-preview';

const mockData = [
  {
    id: 'app-1',
    name: 'Application 1',
    spend: 100000,
    BCAP1: 'Business Capability 1',
    BCAP2: 'Business Capability 1.2',
    BCAP3: 'Business Capability 1.2.3',
  },
  {
    id: 'app-2',
    name: 'Application 2',
    spend: 50000,
    BCAP1: 'Business Capability 2',
    BCAP2: 'Business Capability 2.1',
    BCAP3: 'Business Capability 2.1.1',
  },
];

describe('App Component', () => {
  it('should render all applications when no filters are applied', async () => {
    await act(async () => {
      render(<App data={mockData} />);
    });
    // debug();
    expect(screen.getByText('Application 1')).toBeInTheDocument();
    expect(screen.getByText('Application 2')).toBeInTheDocument();
  });

  it('should filter applications by selected capability', async () => {
    await act(async () => {
      render(<App data={mockData} />);
    });

    const capabilityElement = screen.getAllByRole('button', {
      name: 'Business Capability 1',
    })[0];
    await act(async () => {
      capabilityElement.click();
    });

    // debug();
    // Wait for the filtering to complete
    await waitFor(() => {
      expect(screen.getByText('Application 1')).toBeInTheDocument();
      expect(screen.queryByText('Application 2')).not.toBeInTheDocument();
    });
  });

  it('should render the navigation menu', async () => {
    await act(async () => {
      render(<App data={mockData} />);
    });
    const navMenu = screen.getAllByRole('heading', {
      name: /Navigation/i,
      level: 1,
    })[0];
    // debug();
    expect(navMenu).toBeInTheDocument();
  });

  it('should render the filters section', async () => {
    await act(async () => {
      render(<App data={mockData} />);
    });
    const filtersSection = screen.getAllByRole('heading', {
      name: /Filters/i,
      level: 2,
    })[0];
    // debug();
    expect(filtersSection).toBeInTheDocument();
  });

  it('should render the application list', async () => {
    await act(async () => {
      render(<App data={mockData} />);
    });
    const appList = screen.getByRole('list');
    // debug();
    expect(appList).toBeInTheDocument();
  });

  it('should render a loading spinner when data is loading', async () => {
    await act(async () => {
      render(<App data={[]} />);
    });
    // debug();
    const loadingSpinner = screen.getByRole('status');
    expect(loadingSpinner).toBeInTheDocument();
  });

  it('should render a loading message when data is loading', async () => {
    await act(async () => {
      render(<App data={[]} />);
    });

    const loadingMessage = screen.getByText('Loading data...');
    // debug();
    expect(loadingMessage).toBeInTheDocument();
  });

  // test menu open
  it('should open the menu when the button is clicked', async () => {
    await act(async () => {
      render(<App data={mockData} />);
    });

    const menuButton = screen.getByRole('menu-open');
    await act(async () => {
      menuButton.click();
    });

    // debug();
    const mobileMenu = screen.getByRole('mobile-menu');

    expect(mobileMenu).toBeInTheDocument();
  });

  // menu close mobile menu to be hidden
  it('should close the menu when the menu-close button is clicked', async () => {
    await act(async () => {
      render(<App data={mockData} />);
    });

    const menuButton = screen.getByRole('menu-close');
    await act(async () => {
      menuButton.click();
    });

    // debug();
    const mobileMenu = screen.getByRole('mobile-menu');

    expect(mobileMenu).toHaveClass('-translate-x-full');
  });
});
