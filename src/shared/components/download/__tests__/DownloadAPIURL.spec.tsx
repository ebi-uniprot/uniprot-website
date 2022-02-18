import { fireEvent, screen, waitFor } from '@testing-library/react';
import { Store } from 'redux';

import DownloadAPIURL from '../DownloadAPIURL';

import customRender from '../../../__test-helpers__/customRender';

const store: Store = {
  getState: jest.fn(),
  dispatch: jest.fn(),
  subscribe: jest.fn(),
  replaceReducer: jest.fn(),
  [Symbol.observable]: jest.fn(),
};

const apiURL = 'https://foo.org';

describe('DownloadAPIURL', () => {
  it('should dispatch an unsuccessful copy message when the navigator.clipboard is not available', async () => {
    customRender(<DownloadAPIURL apiURL={apiURL} />, { store });
    const copyButton = screen.getByRole('button', { name: 'Copy' });
    fireEvent.click(copyButton);
    await waitFor(() =>
      expect(store.dispatch).toHaveBeenCalledWith({
        payload: {
          content: 'There was an issue copying to clipboard',
          displayTime: 15000,
          format: 'POP_UP',
          level: 'failure',
        },
        type: 'ADD_MESSAGE',
      })
    );
  });
  it('should copy a message with navigator.clipboard and dispatch a successful copy message', async () => {
    const mockWriteText = jest.fn();
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: mockWriteText,
      },
    });
    customRender(<DownloadAPIURL apiURL={apiURL} />, { store });
    const copyButton = screen.getByRole('button', { name: 'Copy' });
    fireEvent.click(copyButton);
    expect(mockWriteText).toHaveBeenCalledWith(apiURL);
    await waitFor(() =>
      expect(store.dispatch).toHaveBeenCalledWith({
        payload: {
          content: 'Link copied to clipboard',
          displayTime: 5000,
          format: 'POP_UP',
          level: 'success',
        },
        type: 'ADD_MESSAGE',
      })
    );
  });
});
