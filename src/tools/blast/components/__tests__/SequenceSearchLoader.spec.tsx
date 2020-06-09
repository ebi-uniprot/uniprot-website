import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SequenceSearchLoader from '../SequenceSearchLoader';
import entryModelData from '../../../../uniprotkb/__mocks__/entryModelData.json';

jest.mock('../../../../shared/hooks/useDataApi', () => jest.fn());
import useDataApi from '../../../../shared/hooks/useDataApi';

describe('SequenceSearchLoader tests', () => {
  it('Should load a sequence', () => {
    useDataApi.mockImplementation(() => {
      return {
        loading: false,
        data: {
          results: [entryModelData],
        },
      };
    });

    const onLoadMock = jest.fn();
    const component = render(<SequenceSearchLoader onLoad={onLoadMock} />);
    const { getByPlaceholderText } = component;
    const input = getByPlaceholderText('P05067, A4_HUMAN, UPI0000000001');
    fireEvent.change(input, { target: { value: 'P05' } });
    expect(input.value).toEqual('P05');
    expect(onLoadMock).toBeCalledWith({
      likelyType: null,
      message: null,
      name: 'P21802',
      sequence:
        '>sp|P21802|uniprot id rec full Name OS=scientific name OX=9606 GN=some Gene PE=1 SV=5\nSAPSQDFMRF',
      valid: true,
    });
  });

  it.skip('Should reset the sequence when no results are found', () => {
    useDataApi.mockImplementation(() => {
      return {
        loading: false,
        data: {
          results: [],
        },
      };
    });

    const onLoadMock = jest.fn();
    const component = render(<SequenceSearchLoader onLoad={onLoadMock} />);
    const { getByPlaceholderText } = component;
    const input = getByPlaceholderText('P05067, A4_HUMAN, UPI0000000001');
    fireEvent.change(input, { target: { value: 'P05' } });
    expect(input.value).toEqual('P05');
    expect(onLoadMock).toBeCalledWith({
      sequence: '',
      valid: false,
      likelyType: null,
      message: null,
    });
  });
});
