import { screen, fireEvent } from '@testing-library/react';

import EntryDownload from '../EntryDownload';

import { FileFormat } from '../../../types/resultsDownload';

import customRender from '../../../__test-helpers__/customRender';

describe('EntryDownload', () => {
  let onCloseMock: jest.Mock;

  beforeEach(() => {
    onCloseMock = jest.fn();
  });

  it('should link to uniparc TSV download endpoint', () => {
    customRender(<EntryDownload nResults={1000} onClose={onCloseMock} />, {
      route: '/uniparc/UPI0000000001/entry',
    });
    const formatSelect = screen.getByTestId('file-format-select');
    fireEvent.change(formatSelect, { target: { value: FileFormat.tsv } });
    const downloadLink = screen.getByTitle<HTMLAnchorElement>('Download file');
    expect(downloadLink.href).toEqual(
      expect.stringContaining('/uniparc/UPI0000000001/databases?format=tsv')
    );
  });

  it('should link to uniref list download endpoint', () => {
    customRender(<EntryDownload nResults={1000} onClose={onCloseMock} />, {
      route: '/uniref/UniRef100_A0A009E088',
    });
    const formatSelect = screen.getByTestId('file-format-select');
    fireEvent.change(formatSelect, { target: { value: FileFormat.list } });
    const downloadLink = screen.getByTitle<HTMLAnchorElement>('Download file');
    expect(downloadLink.href).toEqual(
      expect.stringContaining(
        '/uniref/UniRef100_A0A009E088/members?format=list'
      )
    );
  });
});
