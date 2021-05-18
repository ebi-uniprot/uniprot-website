import { screen, fireEvent, waitFor } from '@testing-library/react';
import { frame } from 'timing-functions';

import customRender from '../../../__test-helpers__/customRender';

import GDPR from '../GDPR';

describe('GDPR', () => {
  test('should render', () => {
    const { asFragment } = customRender(<GDPR />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("should add 'gdpr': true to localStorage", async () => {
    expect(localStorage.getItem('gdpr')).toBe(null);
    customRender(<GDPR />);
    // Needed to wait for the user preference to be initialised
    await waitFor(frame);
    const acceptButton = screen.getByText('Accept');
    fireEvent.click(acceptButton);
    expect(screen.queryByText('Privacy Notice')).not.toBeInTheDocument();
    await waitFor(() => {
      // console.error(window.localStorage.getItem('gdpr'));
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      expect(JSON.parse(window.localStorage.getItem('gdpr')!)).toBe(true);
    });
  });

  test("if 'gdpr' in localStorage, do not render component", () => {
    localStorage.setItem('gdpr', 'true');
    customRender(<GDPR />);
    expect(screen.queryByText('Privacy Notice')).not.toBeInTheDocument();
  });
});
