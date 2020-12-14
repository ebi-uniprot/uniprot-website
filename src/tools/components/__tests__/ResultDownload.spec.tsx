import { fireEvent, render } from '@testing-library/react';
import ResultDownload from '../ResultDownload';
import { JobTypes } from '../../types/toolsJobTypes';

describe('Blast results download', () => {
  jest.spyOn(document.body, 'appendChild');
  const nDownloadedExplanationRe = /The download file will contain/;

  it('should change the format; download link have the correct resource/format; not display explanation when table results have not been filtered', () => {
    const onCloseMock = jest.fn();

    const { getByTestId, queryByText, getAllByText } = render(
      <ResultDownload
        jobType={JobTypes.BLAST}
        id="1234"
        onToggleDisplay={onCloseMock}
        nHits={100}
        isTableResultsFiltered={false}
        isTableRowSelected={false}
      />
    );
    const select = getByTestId('file-format-select');
    fireEvent.change(select, { target: { value: 'accs' } });
    const downloadLink = getAllByText('Download')[1];
    fireEvent.click(downloadLink);
    expect(onCloseMock).toHaveBeenCalled();
    expect(downloadLink.href).toEqual(
      'https://wwwdev.ebi.ac.uk/Tools/services/rest/ncbiblast/result/1234/accs'
    );

    const nDownloadExplanation = queryByText(nDownloadedExplanationRe);
    expect(nDownloadExplanation).toBeNull();
  });

  it('should display explanation when table results have been filtered and a row has been selected', () => {
    const onCloseMock = jest.fn();

    const { getByText } = render(
      <ResultDownload
        jobType={JobTypes.BLAST}
        id="1234"
        onToggleDisplay={onCloseMock}
        nHits={100}
        isTableResultsFiltered={true}
        isTableRowSelected={true}
      />
    );
    const nDownloadExplanation = getByText(nDownloadedExplanationRe);
    expect(nDownloadExplanation).toBeTruthy();
  });
});
