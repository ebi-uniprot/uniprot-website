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
    const totalNumberResults = 82678;
    const isoformStats = {
      allWithIsoforms: undefined,
      reviewed: 20408,
      reviewedWithIsoforms: undefined,
    };

    customRender(
      <ComponentsDownload
        query={query}
        totalNumberResults={totalNumberResults}
        onClose={onCloseMock}
        statistics={isoformStats}
        superkingdom="eukaryota"
        proteomeType="Reference and representative proteome"
        numberSelectedEntries={0}
        // selectedEntries={[]}
        selectedQuery="(proteome:UP000005640)"
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
        `Download only reviewed (Swiss-Prot) canonical proteins (20,408)`
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

    let options = screen.getAllByRole('option');
    expect(options).toHaveLength(10);

    fireEvent.click(
      screen.getByLabelText(`Include reviewed (Swiss-Prot) isoforms`)
    );

    downloadLink = screen.getByRole<HTMLAnchorElement>('link');
    const foo = stringifyQuery({
      query: `((proteome:UP000005640) AND reviewed=true)`,
      includeIsoform: true,
    });
    expect(downloadLink.href).toEqual(expect.stringContaining(foo));
    options = screen.getAllByRole('option');
    expect(options).toHaveLength(1);

    fireEvent.click(
      screen.getByLabelText(`Include reviewed (Swiss-Prot) isoforms`)
    );
    const formatSelect = screen.getByTestId('file-format-select');
    fireEvent.change(formatSelect, { target: { value: FileFormat.tsv } });
    expect(await screen.findByText('Customize columns')).toBeInTheDocument();
  });
});
