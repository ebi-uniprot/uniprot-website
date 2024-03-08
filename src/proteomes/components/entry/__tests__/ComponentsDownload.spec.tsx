import { fireEvent, screen } from '@testing-library/react';

import ComponentsDownload from '../ComponentsDownload';

import { stringifyQuery } from '../../../../shared/utils/url';
import customRender from '../../../../shared/__test-helpers__/customRender';

import { FileFormat } from '../../../../shared/types/resultsDownload';
import { UniProtKBColumn } from '../../../../uniprotkb/types/columnTypes';

const initialColumns = [
  UniProtKBColumn.accession,
  UniProtKBColumn.reviewed,
  UniProtKBColumn.geneNames,
];

describe('Download reviewed proteins for a proteome entry that is an Eukaryote', () => {
  it('should check the filteredNumberResults and add the additional select options', async () => {
    const onCloseMock = jest.fn();
    const query = '(proteome:UP000005640)';
    const proteomeStatistics = {
      reviewedProteinCount: 20422,
      unreviewedProteinCount: 62067,
      isoformProteinCount: 22072,
    };

    customRender(
      <ComponentsDownload
        query={query}
        onClose={onCloseMock}
        proteomeStatistics={proteomeStatistics}
        numberSelectedEntries={0}
        // selectedEntries={[]}
        selectedQuery="(proteome:UP000005640)"
        isUniparcSearch={false}
      />,
      {
        route: '/proteomes/UP000005640',
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
      screen.getByLabelText(
        `Download only reviewed (Swiss-Prot) canonical proteins (20,422)`
      )
    );
    downloadLink = screen.getByRole<HTMLAnchorElement>('link');
    expect(downloadLink.href).toEqual(
      expect.stringContaining(
        stringifyQuery({
          query: `((proteome:UP000005640) AND reviewed=true)`,
        })
      )
    );

    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(10);

    const formatSelect = screen.getByTestId('file-format-select');
    fireEvent.change(formatSelect, { target: { value: FileFormat.tsv } });

    fireEvent.click(screen.getByRole('checkbox'));

    downloadLink = screen.getByRole<HTMLAnchorElement>('link');
    const foo = stringifyQuery({
      query: `((proteome:UP000005640) AND reviewed=true)`,
      includeIsoform: true,
    });
    expect(downloadLink.href).toEqual(expect.stringContaining(foo));
    expect(formatSelect).toHaveValue(FileFormat.fasta);

    fireEvent.click(screen.getByRole('checkbox'));
    fireEvent.change(formatSelect, { target: { value: FileFormat.tsv } });
    expect(await screen.findByText('Customize columns')).toBeInTheDocument();
  });
});

describe('Download proteins for a redundant proteome', () => {
  it('should point to uniparc search', async () => {
    const onCloseMock = jest.fn();
    const query = '(proteome:UP000006503)';
    const proteomeStatistics = {
      reviewedProteinCount: 0,
      unreviewedProteinCount: 0,
      isoformProteinCount: 0,
    };

    customRender(
      <ComponentsDownload
        query={query}
        onClose={onCloseMock}
        proteomeStatistics={proteomeStatistics}
        numberSelectedEntries={0}
        selectedQuery="(proteome:UP000006503)"
        isUniparcSearch
      />,
      {
        route: '/proteomes/UP000006503',
      }
    );
    const downloadLink = screen.getByRole<HTMLAnchorElement>('link');
    expect(downloadLink.href).toContain('uniparc');
    expect(downloadLink.href).toEqual(
      expect.stringContaining(stringifyQuery({ query: `(${query})` }))
    );
  });
});
