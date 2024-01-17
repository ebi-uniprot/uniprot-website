import { fireEvent, screen, waitFor } from '@testing-library/react';

import customRender from '../../../__test-helpers__/customRender';

import Download from '../Download';

import { IDMappingDetailsContext } from '../../../contexts/IDMappingDetails';

import { stringifyQuery } from '../../../utils/url';

import { DOWNLOAD_SIZE_LIMIT } from '../../../config/limits';

import { FileFormat } from '../../../types/resultsDownload';
import { Namespace } from '../../../types/namespaces';
import { UniProtKBColumn } from '../../../../uniprotkb/types/columnTypes';

import mockFasta from '../../../../uniprotkb/components/__mocks__/fasta.json';
import SimpleMappingDetails from '../../../../tools/id-mapping/components/results/__mocks__/SimpleMappingDetails';
import UniProtkbMappingDetails from '../../../../tools/id-mapping/components/results/__mocks__/UniProtkbMappingDetails';
import '../../../../uniprotkb/components/__mocks__/mockApi';

const initialColumns = [
  UniProtKBColumn.accession,
  UniProtKBColumn.reviewed,
  UniProtKBColumn.geneNames,
];

describe('Download component', () => {
  const namespace = Namespace.uniprotkb;
  const selectedEntries = ['Q9HC29', 'O43353', 'Q3KP66'];
  let onCloseMock: jest.Mock;

  beforeEach(() => {
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
      '(proteome:UP000002494) AND (proteomecomponent:"Chromosome 1" OR proteomecomponent:"Chromosome 2")';
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
  });
});

describe('Download with UniProtKB entry history / UniSave', () => {
  it('should render as expected, 2 selected', () => {
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
  });

  it('should render as expected, none selected, "download all"', () => {
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
  });
});

describe('Download with ID mapping results', () => {
  it('should not display column selection for results which map to a non-uniprot namespace and have correct download link', () => {
    customRender(
      <IDMappingDetailsContext.Provider
        // eslint-disable-next-line react/jsx-no-constructed-context-values
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
  });

  it('should display column selection for results which map to a uniprot namespace and have correct download link', async () => {
    customRender(
      <IDMappingDetailsContext.Provider
        // eslint-disable-next-line react/jsx-no-constructed-context-values
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
