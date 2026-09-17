import '../../../../uniprotkb/components/__mocks__/mockApi';

jest.mock('../../../hooks/useSupportsJobs', () => ({
  __esModule: true,
  default: () => true,
}));

import { fireEvent, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import SimpleMappingDetails from '../../../../jobs/id-mapping/components/results/__mocks__/SimpleMappingDetails';
import UniProtkbMappingDetails from '../../../../jobs/id-mapping/components/results/__mocks__/UniProtkbMappingDetails';
import { UniParcColumn } from '../../../../uniparc/config/UniParcColumnConfiguration';
import mockFasta from '../../../../uniprotkb/components/__mocks__/fasta.json';
import { UniProtKBColumn } from '../../../../uniprotkb/types/columnTypes';
import customRender from '../../../__test-helpers__/customRender';
import settle from '../../../__test-helpers__/settle';
import { DOWNLOAD_SIZE_LIMIT } from '../../../config/limits';
import { IDMappingDetailsContext } from '../../../contexts/IDMappingDetails';
import { Namespace } from '../../../types/namespaces';
import { FileFormat } from '../../../types/resultsDownload';
import { stringifyQuery } from '../../../utils/url';
import Download from '../Download';

const mock = new MockAdapter(axios, { onNoMatch: 'passthrough' });

afterEach(() => {
  mock.reset();
});

afterAll(() => {
  mock.restore();
});

const initialColumns = [
  UniProtKBColumn.accession,
  UniProtKBColumn.reviewed,
  UniProtKBColumn.geneNames,
];

describe('Download component', () => {
  const namespace = Namespace.uniprotkb;
  const selectedEntries = ['Q9HC29', 'O43353', 'Q3KP66'];
  let onCloseMock: jest.Mock;

  beforeEach(async () => {
    onCloseMock = jest.fn();

    customRender(
      <Download
        selectedEntries={selectedEntries}
        totalNumberResults={10}
        onClose={onCloseMock}
        namespace={namespace}
      />,
      {
        route: '/uniprotkb?query=nod2',
        initialLocalStorage: {
          'table columns for uniprotkb': initialColumns,
        },
      }
    );
    // Flush the in-flight column-config fetch triggered by the render above so
    // its dispatch runs within act (no act() warnings) before each test body.
    await settle();
  });

  it('should call onClose when cancel button is clicked', () => {
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
    expect(onCloseMock).toHaveBeenCalled();
  });

  it('should call onClose and download link have href with JSON format when format is selected and Download button is clicked', () => {
    const formatSelect = screen.getByTestId('file-format-select');
    fireEvent.change(formatSelect, { target: { value: FileFormat.json } });
    const downloadLink = screen.getByRole<HTMLAnchorElement>('link');
    fireEvent.click(downloadLink);
    expect(downloadLink.href).toEqual(expect.stringContaining('format=json'));
    expect(onCloseMock).toHaveBeenCalled();
  });

  it('should call onClose and download link to have href without compressed=true when selected false in the form and Download button is clicked', () => {
    fireEvent.click(screen.getByLabelText('No'));
    const downloadLink = screen.getByRole<HTMLAnchorElement>('link');
    fireEvent.click(downloadLink);
    expect(downloadLink.href).toEqual(
      expect.not.stringContaining('compressed')
    );
    expect(onCloseMock).toHaveBeenCalled();
  });

  it('should handle preview button click', async () => {
    Element.prototype.scrollIntoView = jest.fn();
    const previewButton = screen.getByRole('button', { name: /Preview/ });
    fireEvent.click(previewButton);
    const preview = await screen.findByTestId('download-preview');
    expect(preview.textContent).toEqual(mockFasta);
  });

  test.each([
    [FileFormat.excel, true],
    [FileFormat.xml, false],
    [FileFormat.tsv, true],
  ])(
    'should show column selection component when %s file type is selected and otherwise hide it',
    async (value, columnSelect) => {
      const formatSelect = screen.getByTestId('file-format-select');
      fireEvent.change(formatSelect, { target: { value } });
      if (columnSelect) {
        await waitFor(() => screen.getByText('Customize columns'));
      } else {
        expect(screen.queryByText('Customize columns')).not.toBeInTheDocument();
      }
    }
  );

  it('should change the column selection before preview and download', async () => {
    const formatSelect = screen.getByTestId('file-format-select');
    fireEvent.change(formatSelect, { target: { value: FileFormat.tsv } });
    let downloadLink = screen.getByRole<HTMLAnchorElement>('link');
    expect(downloadLink.href).toEqual(
      expect.stringContaining('fields=accession%2Creviewed%2Cgene_names')
    );
    const removeButton = await screen.findAllByTestId('remove-icon');
    fireEvent.click(removeButton[0]);
    downloadLink = screen.getByRole<HTMLAnchorElement>('link');
    expect(downloadLink.href).toEqual(
      expect.stringContaining('fields=accession%2Cgene_names')
    );
  });

  it('should change Preview button text when Download selected radio is selected', () => {
    fireEvent.click(
      screen.getByLabelText(`Download selected (${selectedEntries.length})`)
    );
    expect(
      screen.getByText(`Preview ${selectedEntries.length}`)
    ).toBeInTheDocument();
  });
});

describe('Download with passed query and selectedQuery props', () => {
  it('should use query and selectedQuery if provided as props rather than using the query from the url', async () => {
    const namespace = Namespace.uniprotkb;
    const onCloseMock = jest.fn();
    const query = '(proteome:UP000002494)';
    const selectedQuery =
      '(proteomecomponent:"UP000002494:Chromosome 1" OR proteomecomponent:"UP000002494:Chromosome 2")';
    const numberSelectedEntries = 123;
    const totalNumberResults = 456;

    customRender(
      <Download
        query={query}
        selectedQuery={selectedQuery}
        numberSelectedEntries={numberSelectedEntries}
        totalNumberResults={totalNumberResults}
        onClose={onCloseMock}
        namespace={namespace}
      />,
      {
        route: '/proteomes/UP000002494',
        initialLocalStorage: {
          'table columns for uniprotkb': initialColumns,
        },
      }
    );
    let downloadLink = screen.getByRole<HTMLAnchorElement>('link');
    expect(downloadLink.href).toEqual(
      expect.stringContaining(stringifyQuery({ query: `(${query})` }))
    );
    fireEvent.click(
      screen.getByLabelText(`Download selected (${numberSelectedEntries})`)
    );
    downloadLink = screen.getByRole<HTMLAnchorElement>('link');
    expect(downloadLink.href).toEqual(
      expect.stringContaining(stringifyQuery({ query: `(${selectedQuery})` }))
    );
    await settle();
  });
});

describe('Download uniparc entries with passed proteome id as query', () => {
  it('should display proteome-specific url for FASTA only', async () => {
    const namespace = Namespace.uniparc;
    const onCloseMock = jest.fn();
    const query = '(upid:UP000001478)';
    const numberSelectedEntries = 0;
    const totalNumberResults = 4042;

    customRender(
      <Download
        query={query}
        numberSelectedEntries={numberSelectedEntries}
        totalNumberResults={totalNumberResults}
        onClose={onCloseMock}
        namespace={namespace}
      />,
      {
        route: '/uniprotkb?query=nod2',
        initialLocalStorage: {
          'table columns for uniparc': [UniParcColumn.accession],
        },
      }
    );
    let downloadLink = screen.getByRole<HTMLAnchorElement>('link');
    expect(downloadLink.href).toEqual(
      expect.stringContaining(
        '/uniparc/proteome/UP000001478/stream?compressed=true&format=fasta'
      )
    );
    fireEvent.click(
      screen.getByLabelText(
        'Proceed with FASTA header for proteomes (recommended).'
      )
    );
    downloadLink = screen.getByRole<HTMLAnchorElement>('link');
    expect(downloadLink.href).toEqual(
      expect.stringContaining(stringifyQuery({ query: `(${query})` }))
    );
    fireEvent.click(
      screen.getByLabelText(
        'Proceed with FASTA header for proteomes (recommended).'
      )
    );
    const formatSelect = screen.getByTestId('file-format-select');
    fireEvent.change(formatSelect, { target: { value: FileFormat.tsv } });
    downloadLink = screen.getByRole<HTMLAnchorElement>('link');
    expect(downloadLink.href).toEqual(
      expect.stringContaining(stringifyQuery({ query: `(${query})` }))
    );
    await settle();
  });

  it('should offer precomputed annotations option and handle format toggling when probe count > 0', async () => {
    mock
      .onHead(/\/uniprotkb\/precomputed\/proteome\/UP000001478/)
      .reply(200, undefined, { 'x-total-results': '13794' });

    const namespace = Namespace.uniparc;
    const onCloseMock = jest.fn();
    const query = '(upid:UP000001478)';
    const numberSelectedEntries = 0;
    const totalNumberResults = 4042;

    customRender(
      <Download
        query={query}
        numberSelectedEntries={numberSelectedEntries}
        totalNumberResults={totalNumberResults}
        onClose={onCloseMock}
        namespace={namespace}
      />,
      {
        route: '/uniprotkb?query=nod2',
        initialLocalStorage: {
          'table columns for uniparc': [UniParcColumn.accession],
        },
      }
    );

    // Format select contains JSON (precomputed annotation)
    expect(
      await screen.findByText('JSON (precomputed annotation)')
    ).toBeInTheDocument();

    // Default FASTA selected -> precomputed fieldset not shown
    expect(
      screen.queryByLabelText('Proceed with precomputed annotations.')
    ).not.toBeInTheDocument();

    // Switch to JSON
    const formatSelect = screen.getByTestId('file-format-select');
    fireEvent.change(formatSelect, { target: { value: FileFormat.json } });

    // Helper fieldset shown and unchecked
    const precomputedCheckbox = screen.getByLabelText<HTMLInputElement>(
      'Proceed with precomputed annotations.'
    );
    expect(precomputedCheckbox).toBeInTheDocument();
    expect(precomputedCheckbox.checked).toBe(false);

    let downloadLink = screen.getByRole<HTMLAnchorElement>('link');
    expect(downloadLink.href).toEqual(expect.stringContaining('format=json'));

    // Ticking the checkbox selects JSON (precomputed annotation) and updates URL to stream
    fireEvent.click(precomputedCheckbox);
    expect(precomputedCheckbox.checked).toBe(true);
    expect(
      screen.getByTestId<HTMLSelectElement>('file-format-select').value
    ).toBe(FileFormat.jsonPrecomputed);

    downloadLink = screen.getByRole<HTMLAnchorElement>('link');
    expect(downloadLink.href).toEqual(
      expect.stringContaining(
        '/uniprotkb/precomputed/proteome/UP000001478/stream?compressed=true&download=true'
      )
    );

    // Generate URL for API should strip download=true from stream and search URLs
    fireEvent.click(
      screen.getByRole('button', { name: 'Generate URL for API' })
    );
    const streamCode = screen.getByText((content) =>
      content.includes(
        '/uniprotkb/precomputed/proteome/UP000001478/stream?compressed=true'
      )
    );
    expect(streamCode).toBeInTheDocument();
    expect(streamCode.textContent).not.toContain('download=true');

    const searchCode = screen.getByText((content) =>
      content.includes(
        '/uniprotkb/precomputed/proteome/UP000001478?compressed=true&size=500'
      )
    );
    expect(searchCode).toBeInTheDocument();
    expect(searchCode.textContent).not.toContain('download=true');

    // Compressed toggle reflected in href
    fireEvent.click(screen.getByLabelText('No'));
    downloadLink = screen.getByRole<HTMLAnchorElement>('link', {
      name: 'Download',
    });
    expect(downloadLink.href).toEqual(
      expect.stringContaining(
        '/uniprotkb/precomputed/proteome/UP000001478/stream?download=true'
      )
    );
    expect(downloadLink.href).toEqual(
      expect.not.stringContaining('compressed')
    );

    // Unticking the checkbox restores plain JSON
    fireEvent.click(precomputedCheckbox);
    expect(
      screen.getByTestId<HTMLSelectElement>('file-format-select').value
    ).toBe(FileFormat.json);
    downloadLink = screen.getByRole<HTMLAnchorElement>('link', {
      name: 'Download',
    });
    expect(downloadLink.href).toEqual(expect.stringContaining('format=json'));

    // Selecting dropdown option directly checks the checkbox
    fireEvent.change(formatSelect, {
      target: { value: FileFormat.jsonPrecomputed },
    });
    expect(
      screen.getByLabelText<HTMLInputElement>(
        'Proceed with precomputed annotations.'
      ).checked
    ).toBe(true);

    await settle();
  });

  it('should not offer precomputed annotations when probe returns 404', async () => {
    mock.onHead(/\/uniprotkb\/precomputed\/proteome\/UP000009999/).reply(404);

    const namespace = Namespace.uniparc;
    const onCloseMock = jest.fn();
    const query = 'proteome:UP000009999';

    customRender(
      <Download
        query={query}
        numberSelectedEntries={0}
        totalNumberResults={100}
        onClose={onCloseMock}
        namespace={namespace}
      />,
      {
        route: '/uniprotkb?query=nod2',
        initialLocalStorage: {
          'table columns for uniparc': [UniParcColumn.accession],
        },
      }
    );

    await settle();

    expect(
      screen.queryByText('JSON (precomputed annotation)')
    ).not.toBeInTheDocument();

    const formatSelect = screen.getByTestId('file-format-select');
    fireEvent.change(formatSelect, { target: { value: FileFormat.json } });

    expect(
      screen.queryByLabelText('Proceed with precomputed annotations.')
    ).not.toBeInTheDocument();
  });

  it('should not offer precomputed annotations for non-proteome queries', async () => {
    const namespace = Namespace.uniparc;
    const onCloseMock = jest.fn();
    const query = 'gene:BRCA1';

    customRender(
      <Download
        query={query}
        numberSelectedEntries={0}
        totalNumberResults={100}
        onClose={onCloseMock}
        namespace={namespace}
      />,
      {
        route: '/uniprotkb?query=nod2',
        initialLocalStorage: {
          'table columns for uniparc': [UniParcColumn.accession],
        },
      }
    );

    await settle();

    expect(
      screen.queryByText('JSON (precomputed annotation)')
    ).not.toBeInTheDocument();
  });
});

describe('Download with UniProtKB entry history / UniSave', () => {
  it('should render as expected, 2 selected', async () => {
    const onCloseMock = jest.fn();
    const selectedEntries = ['23', '22'];
    const accession = 'P05067';

    customRender(
      <Download
        selectedEntries={selectedEntries}
        totalNumberResults={30}
        onClose={onCloseMock}
        namespace={Namespace.unisave}
        base={`/unisave/${accession}`}
      />
    );

    // No compressed radio button
    expect(
      screen.queryByRole('radio', { name: 'compressed' })
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: `Preview ${selectedEntries.length}` })
    ).toBeInTheDocument();
    // Correct link
    const downloadLink = screen.getByRole<HTMLAnchorElement>('link');
    expect(downloadLink.href).toEqual(
      expect.stringContaining(
        `unisave/${accession}?download=true&format=txt&versions=${selectedEntries[0]}%2C${selectedEntries[1]}`
      )
    );
    await settle();
  });

  it('should render as expected, none selected, "download all"', async () => {
    const onCloseMock = jest.fn();
    const accession = 'P05067';

    customRender(
      <Download
        selectedEntries={[]}
        totalNumberResults={30}
        onClose={onCloseMock}
        namespace={Namespace.unisave}
        base={`/unisave/${accession}`}
      />
    );

    // No compressed radio button
    expect(
      screen.queryByRole('radio', { name: 'compressed' })
    ).not.toBeInTheDocument();
    // Specific "preview file" button
    expect(
      screen.getByRole('button', { name: `Preview file` })
    ).toBeInTheDocument();
    // Correct link
    const downloadLink = screen.getByRole<HTMLAnchorElement>('link');
    expect(downloadLink.href).toEqual(
      expect.stringContaining(`unisave/${accession}?download=true&format=txt`)
    );
    await settle();
  });
});

describe('Download with ID mapping results', () => {
  it('should not display column selection for results which map to a non-uniprot namespace and have correct download link', async () => {
    customRender(
      <IDMappingDetailsContext.Provider
        value={{ loading: false, data: SimpleMappingDetails }}
      >
        <Download
          query="*"
          totalNumberResults={3}
          onClose={jest.fn()}
          namespace={Namespace.idmapping}
          base={SimpleMappingDetails.redirectURL}
        />
      </IDMappingDetailsContext.Provider>,
      { route: `/id-mapping/id1` }
    );
    const formatSelect = screen.getByTestId('file-format-select');
    fireEvent.change(formatSelect, { target: { value: FileFormat.tsv } });
    const downloadLink = screen.getByRole<HTMLAnchorElement>('link');
    expect(downloadLink.href).toEqual(
      expect.stringContaining('/idmapping/stream/id1')
    );
    expect(screen.queryByText('Customize columns')).not.toBeInTheDocument();
    await settle();
  });

  it('should display column selection for results which map to a uniprot namespace and have correct download link', async () => {
    customRender(
      <IDMappingDetailsContext.Provider
        value={{ loading: false, data: UniProtkbMappingDetails }}
      >
        <Download
          query="*"
          totalNumberResults={3}
          onClose={jest.fn()}
          namespace={Namespace.uniprotkb}
          base={UniProtkbMappingDetails.redirectURL}
        />
      </IDMappingDetailsContext.Provider>,
      {
        route: '/id-mapping/uniprotkb/id2',
        initialLocalStorage: {
          'table columns for uniprotkb': initialColumns,
        },
      }
    );
    const formatSelect = screen.getByTestId('file-format-select');
    fireEvent.change(formatSelect, { target: { value: FileFormat.tsv } });
    const downloadLink = screen.getByRole<HTMLAnchorElement>('link');
    expect(downloadLink.href).toEqual(
      expect.stringContaining('/idmapping/uniprotkb/results/stream/id2')
    );
    expect(await screen.findByText('Customize columns')).toBeInTheDocument();
  });
});

describe('Download with file generation job', () => {
  it('should show file generation form then confirmation with form elements disabled', async () => {
    Element.prototype.scrollIntoView = jest.fn();
    const onCloseMock = jest.fn();

    customRender(
      <Download
        totalNumberResults={DOWNLOAD_SIZE_LIMIT + 1}
        onClose={onCloseMock}
        namespace={Namespace.uniprotkb}
      />,
      {
        route: '/uniprotkb?query=*',
        initialLocalStorage: {
          'table columns for uniprotkb': initialColumns,
        },
      }
    );
    fireEvent.change(screen.getByTestId('file-format-select'), {
      target: { value: FileFormat.tsv },
    });
    fireEvent.click(
      screen.getByTitle<HTMLAnchorElement>(
        'Download with a File Generation job'
      )
    );
    expect(
      await screen.findByText(/File Generation Needed/)
    ).toBeInTheDocument();
    fireEvent.click(screen.getByText('Submit'));
    expect(
      await screen.findByText(/Review your file generation request/)
    ).toBeInTheDocument();
    expect(screen.getByTestId('file-format-select')).toBeDisabled();
    expect(screen.queryByRole('radio', { name: 'compressed' })).toBeDisabled();
    expect(screen.queryByText('Customize columns')).not.toBeInTheDocument();
  });
});
