import { fireEvent, screen } from '@testing-library/react';

import customRender from '../../../shared/__test-helpers__/customRender';
import useDataApi from '../../../shared/hooks/useDataApi';
import entryModelData from '../../../uniprotkb/__mocks__/uniProtKBEntryModelData';
import SequenceSearchLoader from '../SequenceSearchLoader';

jest.mock('../../../shared/hooks/useDataApi', () => jest.fn());

describe('SequenceSearchLoader tests', () => {
  it('Should load a sequence', () => {
    (useDataApi as jest.Mock).mockImplementation(() => ({
      loading: false,
      data: {
        results: [entryModelData],
      },
    }));

    const onLoadMock = jest.fn();
    customRender(<SequenceSearchLoader onLoad={onLoadMock} />);
    const input = screen.getByPlaceholderText<HTMLInputElement>('UniProt IDs');
    fireEvent.change(input, { target: { value: 'P05' } });
    expect(input.value).toEqual('P05');
    expect(onLoadMock).toHaveBeenLastCalledWith([
      {
        name: 'sp|P21802|uniprotkb',
        sequence: 'SAPSQDFMRF',
        header:
          '>sp|P21802|uniprotkb rec full Name OS=scientific name OX=9606 GN=some Gene PE=1 SV=5',
        raw: '>sp|P21802|uniprotkb rec full Name OS=scientific name OX=9606 GN=some Gene PE=1 SV=5\nSAPSQDFMRF\n',
        valid: true,
      },
    ]);
  });
});
