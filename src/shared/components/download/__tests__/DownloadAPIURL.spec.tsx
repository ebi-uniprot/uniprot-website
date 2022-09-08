import { fireEvent, screen, waitFor } from '@testing-library/react';

import DownloadAPIURL, { getSearchURL } from '../DownloadAPIURL';

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
      <DownloadAPIURL
        apiURL={apiURL}
        onCopy={onCopy}
        onMount={onMount}
        count={5}
      />
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
      <DownloadAPIURL
        apiURL={apiURL}
        onCopy={onCopy}
        onMount={onMount}
        count={5}
      />
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

describe('getSearchURL', () => {
  it('should get uniprotkb search URL', () => {
    expect(
      getSearchURL(
        'https://rest.uniprot.org/uniprotkb/stream?format=json&query=NOD2'
      )
    ).toEqual(
      'https://rest.uniprot.org/uniprotkb/search?format=json&query=NOD2&size=500'
    );
  });
  it('should get idmapping non-uniprot search URL and with batch size of 500', () => {
    expect(
      getSearchURL(
        'https://rest.uniprot.org/idmapping/stream/1b743f36b11f8e16969cf344b6c70236847b1183?format=tsv'
      )
    ).toEqual(
      'https://rest.uniprot.org/idmapping/results/1b743f36b11f8e16969cf344b6c70236847b1183?format=tsv&size=500'
    );
  });
  it('should get idmapping uniprotkb search URL and with batch size of 500', () => {
    expect(
      getSearchURL(
        'https://rest.uniprot.org/idmapping/uniprotkb/results/stream/77035de28771bdd279b1c5ce66c3aebe8ec8b028?format=fasta'
      )
    ).toEqual(
      'https://rest.uniprot.org/idmapping/uniprotkb/results/77035de28771bdd279b1c5ce66c3aebe8ec8b028?format=fasta&size=500'
    );
  });
});
