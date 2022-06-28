import { fireEvent, screen, waitFor } from '@testing-library/react';

import DownloadAPIURL from '../DownloadAPIURL';

import customRender from '../../../__test-helpers__/customRender';

const apiURL = 'https://foo.org';

describe('DownloadAPIURL', () => {
  const onCopy = jest.fn();
  const onMount = jest.fn();

  beforeEach(() => {
    onCopy.mockReset();
  });

  it('should dispatch an unsuccessful copy message when the navigator.clipboard is not available and call onCopy', async () => {
    const { messagesDispatch } = customRender(
      <DownloadAPIURL apiURL={apiURL} onCopy={onCopy} onMount={onMount} />
    );
    const copyButton = screen.getByRole('button', { name: 'Copy' });
    fireEvent.click(copyButton);
    await waitFor(() =>
      expect(messagesDispatch).toHaveBeenCalledWith({
        payload: {
          content: 'There was an issue copying to clipboard',
          displayTime: 15000,
          format: 'POP_UP',
          level: 'failure',
        },
        type: 'ADD_MESSAGE',
      })
    );
    expect(onCopy).toHaveBeenCalledTimes(1);
  });

  it('should copy a message with navigator.clipboard and dispatch a successful copy message and call onCopy', async () => {
    const mockWriteText = jest.fn();
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: mockWriteText,
      },
    });
    const { messagesDispatch } = customRender(
      <DownloadAPIURL apiURL={apiURL} onCopy={onCopy} onMount={onMount} />
    );
    const copyButton = screen.getByRole('button', { name: 'Copy' });
    fireEvent.click(copyButton);
    expect(mockWriteText).toHaveBeenCalledWith(apiURL);
    await waitFor(() =>
      expect(messagesDispatch).toHaveBeenCalledWith({
        payload: {
          content: 'Link copied to clipboard',
          displayTime: 5000,
          format: 'POP_UP',
          level: 'success',
        },
        type: 'ADD_MESSAGE',
      })
    );
    expect(onCopy).toHaveBeenCalledTimes(1);
  });
});
