import { fireEvent, render, screen } from '@testing-library/react';

import { JobTypes } from '../../types/jobTypes';
import ResultDownload from '../ResultDownload';

describe('Blast results download', () => {
  jest.spyOn(document.body, 'appendChild');
  const nDownloadedExplanationRe = /The download file will contain/;

  it('should change the format; download link have the correct resource/format; not display explanation when table results have not been filtered', () => {
    const onCloseMock = jest.fn();

    render(
      <ResultDownload
        jobType={JobTypes.BLAST}
        id="1234"
        onToggleDisplay={onCloseMock}
        nHits={100}
        isTableResultsFiltered={false}
        isTableRowSelected={false}
      />
    );
    const select = screen.getByTestId('file-format-select');
    fireEvent.change(select, { target: { value: 'accs' } });
    const downloadLink = screen.getByRole<HTMLAnchorElement>('link', {
      name: 'Download',
    });
    fireEvent.click(downloadLink);
    expect(onCloseMock).toHaveBeenCalled();
    expect(downloadLink.href).toEqual(
      'https://www.ebi.ac.uk/Tools/services/rest/ncbiblast/result/1234/accs'
    );

    const nDownloadExplanation = screen.queryByText(nDownloadedExplanationRe);
    expect(nDownloadExplanation).not.toBeInTheDocument();
  });

  it('should display explanation when table results have been filtered and a row has been selected', () => {
    const onCloseMock = jest.fn();

    const { getByText } = render(
      <ResultDownload
        jobType={JobTypes.BLAST}
        id="1234"
        onToggleDisplay={onCloseMock}
        nHits={100}
        isTableResultsFiltered
        isTableRowSelected
      />
    );
    const nDownloadExplanation = getByText(nDownloadedExplanationRe);
    expect(nDownloadExplanation).toBeInTheDocument();
  });
});
