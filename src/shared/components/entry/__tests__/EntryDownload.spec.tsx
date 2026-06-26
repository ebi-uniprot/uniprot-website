import { fireEvent, screen } from '@testing-library/react';

import { type UniParcPrecomputedModel } from '../../../../uniparc/types/precomputed';
import customRender from '../../../__test-helpers__/customRender';
import { FileFormat } from '../../../types/resultsDownload';
import generateAndDownloadJSON from '../../../utils/generateAndDownloadJSON';
import EntryDownload, { Dataset } from '../EntryDownload';

jest.mock('../../../utils/generateAndDownloadJSON');

// jsdom doesn't implement scrollIntoView; `DownloadPreview` triggers it via
// `useScrollIntoViewRef` on mount when the Preview button is clicked.
Element.prototype.scrollIntoView = jest.fn();

const mockGenerateAndDownloadJSON =
  generateAndDownloadJSON as jest.MockedFunction<
    typeof generateAndDownloadJSON
  >;

describe('EntryDownload', () => {
  let onCloseMock: jest.Mock;

  beforeEach(() => {
    onCloseMock = jest.fn();
    mockGenerateAndDownloadJSON.mockClear();
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
        '/uniref/UniRef100_A0A009E088/members/stream?format=list'
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

  it('downloads the precomputed sub-entry annotation from its API URL', () => {
    const apiURL =
      'https://example.org/uniprotkb/precomputed/UPI0000000001/9606';
    customRender(
      <EntryDownload
        onClose={onCloseMock}
        subEntryAnnotationDownload={{ source: 'precomputed', apiURL }}
      />,
      { route: '/uniparc/UPI0000000001/entry' }
    );
    // The annotation is the default selection, in its own optgroup.
    expect(
      screen.getByRole('option', { name: 'JSON (precomputed)' })
    ).toBeInTheDocument();
    const downloadLink = screen.getByTitle<HTMLAnchorElement>('Download file');
    expect(downloadLink.href).toEqual(apiURL);
  });

  it('flips back to a UniParc cross-reference URL when the format is switched away from the annotation', () => {
    customRender(
      <EntryDownload
        onClose={onCloseMock}
        subEntryAnnotationDownload={{
          source: 'precomputed',
          apiURL:
            'https://example.org/uniprotkb/precomputed/UPI0000000001/9606',
        }}
      />,
      { route: '/uniparc/UPI0000000001/entry' }
    );
    // Default selection is the annotation — Download is a link to the API URL.
    expect(screen.getByTitle<HTMLAnchorElement>('Download file').href).toEqual(
      'https://example.org/uniprotkb/precomputed/UPI0000000001/9606'
    );

    // Switching to a UniParc format must reset the dataset to `uniprotData`
    // and rebuild the URL via `getEntryDownloadUrl`.
    fireEvent.change(screen.getByTestId('file-format-select'), {
      target: { value: FileFormat.tsv },
    });
    expect(screen.getByTitle<HTMLAnchorElement>('Download file').href).toEqual(
      expect.stringContaining(
        '/uniparc/UPI0000000001/databases/stream?format=tsv'
      )
    );
  });

  it('generates the UniFire sub-entry annotation JSON on the fly', () => {
    const model = {
      primaryAccession: 'UPI0000000001-9606',
      entryType: 'AA',
    } as UniParcPrecomputedModel;
    customRender(
      <EntryDownload
        onClose={onCloseMock}
        subEntryAnnotationDownload={{
          source: 'unifire',
          model,
          filename: 'UPI0000000001-9606-annotations.json',
        }}
      />,
      { route: '/uniparc/UPI0000000001/entry' }
    );
    expect(
      screen.getByRole('option', { name: 'JSON (generated by UniFire)' })
    ).toBeInTheDocument();
    // No API URL exists for a UniFire-transformed model — the Download control
    // is a button that builds the file in the browser, not a link.
    expect(screen.queryByTitle('Download file')?.tagName).toBe('BUTTON');
    fireEvent.click(screen.getByRole('button', { name: 'Download' }));
    expect(mockGenerateAndDownloadJSON).toHaveBeenCalledWith(
      model,
      'UPI0000000001-9606-annotations.json'
    );
    expect(onCloseMock).toHaveBeenCalledWith('download', 'sync');
  });

  it('previews the UniFire sub-entry annotation from the in-memory model', () => {
    const model = {
      primaryAccession: 'UPI0000000001-9606',
      entryType: 'AA',
    } as UniParcPrecomputedModel;
    customRender(
      <EntryDownload
        onClose={onCloseMock}
        subEntryAnnotationDownload={{
          source: 'unifire',
          model,
          filename: 'UPI0000000001-9606-annotations.json',
        }}
      />,
      { route: '/uniparc/UPI0000000001/entry' }
    );
    fireEvent.click(screen.getByRole('button', { name: 'Preview' }));
    // Preview must come from the in-memory model — there is no URL to fetch.
    expect(screen.getByTestId('download-preview').textContent).toBe(
      JSON.stringify(model, null, 2)
    );
  });
});
