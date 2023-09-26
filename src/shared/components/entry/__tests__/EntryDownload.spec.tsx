import { screen, fireEvent } from '@testing-library/react';

import EntryDownloadOld from '../EntryDownloadOld';

import customRender from '../../../__test-helpers__/customRender';

describe('EntryDownload', () => {
  it('should link to uniparc TSV download endpoint', () => {
    customRender(<EntryDownloadOld />, {
      route: '/uniparc/UPI0000000001/entry',
    });
    const dropdownButton = screen.getByText('Download');
    fireEvent.click(dropdownButton);
    const tsv = screen.getByRole<HTMLAnchorElement>('link', { name: 'TSV' });
    expect(tsv.href).toEqual(
      expect.stringContaining('/uniparc/UPI0000000001/databases?format=tsv')
    );
  });
  it('should link to uniref list download endpoint', () => {
    customRender(<EntryDownloadOld />, {
      route: '/uniref/UniRef100_A0A009E088',
    });
    const dropdownButton = screen.getByText('Download');
    fireEvent.click(dropdownButton);
    const tsv = screen.getByRole<HTMLAnchorElement>('link', { name: 'List' });
    expect(tsv.href).toEqual(
      expect.stringContaining(
        '/uniref/UniRef100_A0A009E088/members?format=list'
      )
    );
  });
});
