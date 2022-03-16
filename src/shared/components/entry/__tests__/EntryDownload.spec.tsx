import { screen, fireEvent } from '@testing-library/react';

import EntryDownload from '../EntryDownload';

import customRender from '../../../__test-helpers__/customRender';

describe('EntryDownload', () => {
  it('should link to uniparc TSV download endpoint', () => {
    customRender(<EntryDownload />, {
      route: '/uniparc/UPI0000000001/entry',
    });
    const dropdownButton = screen.getByText('Download');
    fireEvent.click(dropdownButton);
    const tsv = screen.getByRole<HTMLAnchorElement>('link', { name: 'TSV' });
    expect(tsv.href).toEqual(
      expect.stringContaining('/uniparc/UPI0000000001/databases?format=tsv')
    );
  });
});
