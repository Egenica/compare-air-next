import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CloseSearch } from './CloseSearch';

describe('CloseSearch Component', () => {
  test('should call setSearchTerm with an empty string and setHideShowDropdown with false on click', () => {
    const setSearchTermMock = jest.fn();
    const setHideShowDropdownMock = jest.fn();

    const { getByTestId } = render(
      <CloseSearch
        setSearchTerm={setSearchTermMock}
        setHideShowDropdown={setHideShowDropdownMock}
      />
    );

    const clearSearchButton = getByTestId('clear-search');
    fireEvent.click(clearSearchButton);

    expect(setSearchTermMock).toHaveBeenCalledWith('');
    expect(setHideShowDropdownMock).toHaveBeenCalledWith(false);
  });
});
