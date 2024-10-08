//import '@testing-library/jest-dom';
import { displayDate } from './utils';

describe('displayDate', () => {
  it('should return "0 seconds ago" for the current date', () => {
    const now = new Date();
    expect(displayDate(now)).toBe('0 second ago');
  });

  it('should return "30 seconds ago" for a date 30 seconds in the past', () => {
    const pastDate = new Date(new Date().getTime() - 30 * 1000);
    expect(displayDate(pastDate)).toBe('30 second`s ago');
  });

  it('should return "5 minutes ago" for a date 5 minutes in the past', () => {
    const pastDate = new Date(new Date().getTime() - 5 * 60 * 1000);
    expect(displayDate(pastDate)).toBe('5 minute`s ago');
  });

  it('should return "2 hours ago" for a date 2 hours in the past', () => {
    const pastDate = new Date(new Date().getTime() - 2 * 60 * 60 * 1000);
    expect(displayDate(pastDate)).toBe('2 hour`s ago');
  });

  it('should return "1 day ago" for a date 1 day in the past', () => {
    const pastDate = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
    expect(displayDate(pastDate)).toBe('1 day ago');
  });

  it('should return "1 month ago" for a date 1 month in the past', () => {
    const pastDate = new Date(new Date().setMonth(new Date().getMonth() - 1));
    expect(displayDate(pastDate)).toBe('1 month ago');
  });

  it('should return "1 year ago" for a date 1 year in the past', () => {
    const pastDate = new Date(
      new Date().setFullYear(new Date().getFullYear() - 1)
    );
    expect(displayDate(pastDate)).toBe('1 year ago');
  });
});
