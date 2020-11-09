import React from 'react';
import { createMemoryHistory } from 'history';

import { fireEvent } from '@testing-library/react';
import renderWithRedux from '../../../../shared/__test-helpers__/RenderWithRedux';

import SequenceView from '../SequenceView';

import SequenceUIDataJson from './__mocks__/sequenceUIData.json';

jest.mock('../../../hooks/useDataApi.ts');
import useDataApi from '../../../hooks/useDataApi';

useDataApi.mockImplementation((url) =>
  url
    ? {
        data: {
          sequence: {
            length: 100,
            molWeight: 100000,
            crc64: 'ABCSSDDD',
            value: 'MNOPQRSTUVWXYZ',
          },
        },
      }
    : {}
);

let rendered;
const history = createMemoryHistory();

describe('SequenceView component', () => {
  beforeEach(() => {
    window.SVGElement.prototype.getBBox = () => ({
      width: 10,
      height: 10,
    });
    rendered = renderWithRedux(
      <SequenceView data={SequenceUIDataJson} accession="P05067" />,
      { history }
    );
  });

  afterEach(() => {
    delete window.SVGElement.prototype.getBBox;
  });

  test('should render SequenceInfo with provided sequence info (canonical)', () => {
    const { asFragment } = rendered;
    expect(asFragment()).toMatchSnapshot();
  });

  test('should trigger Isoform sequence load', async () => {
    const { getByText, queryByText, findByText } = rendered;
    const viewSequenceButton = getByText(/Show sequence/i);
    expect(queryByText(/ABCSSDDD/)).toBeNull();
    fireEvent.click(viewSequenceButton);
    const sequence = await findByText(/ABCSSDDD/);
    expect(sequence).toBeTruthy();
  });

  test('should submit Blast', async () => {
    const { getByText, findByText } = rendered;
    const toolsButton = getByText(/Tools/i);
    fireEvent.click(toolsButton);
    const blastButton = await findByText('BLAST');
    fireEvent.click(blastButton);
    expect(history.location.pathname).toBe('/blast');
    expect(history.location.state.parameters).toStrictEqual({
      sequence: 'ATGHASOADSDKDSAJALDSAMCMnDSKMDSKNCSAKN',
    });
  });
});
