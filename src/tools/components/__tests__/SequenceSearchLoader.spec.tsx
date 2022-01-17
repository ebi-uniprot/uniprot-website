import { screen, fireEvent } from '@testing-library/react';

import SequenceSearchLoader from '../SequenceSearchLoader';

import customRender from '../../../shared/__test-helpers__/customRender';

import entryModelData from '../../../uniprotkb/__mocks__/uniProtKBEntryModelData';
import useDataApi from '../../../shared/hooks/useDataApi';

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
    const input = screen.getByPlaceholderText(
      'UniProt IDs'
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'P05' } });
    expect(input.value).toEqual('P05');
    expect(onLoadMock).toBeCalledWith([
      {
        name: 'sp|P21802|uniprot_id',
        sequence: '',
        header: '',
        raw: '>sp|P21802|uniprot_id rec full Name OS=scientific name OX=9606 GN=some Gene PE=1 SV=5\nSAPSQDFMRF\n',
        valid: true,
      },
    ]);
  });
});
