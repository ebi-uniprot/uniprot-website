import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import BlastResultDownload from '../BlastResultDownload';

describe('Blast results download', () => {
  jest.spyOn(document.body, 'appendChild');
  const nDownloadedExplanationRe = /The download file will contain/;

  it('should change the format; download the correct resource/format; not display explanation when table results have not been filtered', () => {
    const onCloseMock = jest.fn();

    const { getByTestId, queryByText } = render(
      <BlastResultDownload
        id="1234"
        onToggleDisplay={onCloseMock}
        nHits={100}
        isTableResultsFiltered={false}
        isTableRowSelected={false}
      />
    );
    const select = getByTestId('file-format-select');
    fireEvent.change(select, { target: { value: 'accs' } });
    const submit = getByTestId('submit-blast');
    fireEvent.click(submit);
    expect(onCloseMock).toHaveBeenCalled();
    expect(document.body.appendChild).toHaveBeenLastCalledWith(
      expect.objectContaining({
        href:
          'https://wwwdev.ebi.ac.uk/Tools/services/rest/ncbiblast/result/1234/accs',
      })
    );
    const nDownloadExplanation = queryByText(nDownloadedExplanationRe);
    expect(nDownloadExplanation).toBeNull();
  });

  it('should display explanation when table results have been filtered and a row has been selected', () => {
    const onCloseMock = jest.fn();

    const { getByText } = render(
      <BlastResultDownload
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
