import { fireEvent, screen } from '@testing-library/react';

import customRender from '../../../__test-helpers__/customRender';
import { FileFormat } from '../../../types/resultsDownload';
import EntryDownload, { Dataset } from '../EntryDownload';

describe('EntryDownload', () => {
  let onCloseMock: jest.Mock;

  beforeEach(() => {
    onCloseMock = jest.fn();
  });

  it('should link to uniparc TSV download streaming endpoint', () => {
    customRender(<EntryDownload nResults={1000} onClose={onCloseMock} />, {
      route: '/uniparc/UPI0000000001/entry',
    });
    const formatSelect = screen.getByTestId('file-format-select');
    fireEvent.change(formatSelect, { target: { value: FileFormat.tsv } });
    const downloadLink = screen.getByTitle<HTMLAnchorElement>('Download file');
    expect(downloadLink.href).toEqual(
      expect.stringContaining(
        '/uniparc/UPI0000000001/databases/stream?format=tsv'
      )
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

  it('should include UniProtKB related datasets and warnings', () => {
    customRender(<EntryDownload onClose={onCloseMock} />, {
      route: '/uniprotkb/P05067',
    });
    const formatSelect = screen.getByTestId('file-format-select');
    fireEvent.change(formatSelect, { target: { value: FileFormat.json } });
    const downloadLink = screen.getByRole<HTMLAnchorElement>('link');
    fireEvent.click(downloadLink);
    expect(downloadLink.href).toEqual(expect.stringContaining('P05067.json'));
    expect(onCloseMock).toHaveBeenCalled();

    const datasetSelect = screen.getByTestId('dataset-select');
    fireEvent.change(datasetSelect, {
      target: { value: Dataset.proteomicsPtm },
    });
    expect(downloadLink.href).toEqual(
      expect.stringContaining(
        'https://www.ebi.ac.uk/proteins/api/proteomics/ptm/P05067?format=json'
      )
    );
  });
});
