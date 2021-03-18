import { render, fireEvent, screen } from '@testing-library/react';

import GDPR from '../GDPR';

import localStorageKeys from '../../../../app/config/localStorageKeys';

describe('GDPR', () => {
  test('should render', () => {
    const { asFragment } = render(<GDPR />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('should add UP_COVID_GDPR: true to localStorage', () => {
    render(<GDPR />);
    const acceptButton = screen.getByText('Accept');
    fireEvent.click(acceptButton);
    expect(localStorage.getItem(localStorageKeys.GDPR)).toBe('true');
  });

  test('if UP_COVID_GDPR in localStorage, do not render component', () => {
    localStorage.setItem('UP_COVID_GDPR', 'true');
    render(<GDPR />);
    const text = screen.queryByText('Privacy Notice');
    expect(text).toBeNull();
  });
});
