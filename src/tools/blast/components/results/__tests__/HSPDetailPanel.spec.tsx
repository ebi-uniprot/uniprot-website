import React from 'react';
import { fireEvent } from '@testing-library/react';
import blastResultsMockData from '../../../../__mocks__/server-jobs/example-truncated.json';
import HSPDetailPanel, { transformFeaturesPositions } from '../HSPDetailPanel';
import modelData from '../../../../../uniprotkb/__mocks__/entryModelData.json';
import renderWithRouter from '../../../../../shared/__test-helpers__/RenderWithRouter';

jest.mock('../../../../../shared/hooks/useDataApi', () => jest.fn());
jest.mock('../../../../../shared/hooks/useSize', () => jest.fn());
import useDataApi from '../../../../../shared/hooks/useDataApi';
import useSize from '../../../../../shared/hooks/useSize';

const dataMock = {
  loading: false,
  data: modelData,
};
useDataApi.mockImplementation(() => dataMock);
useSize.mockImplementation(() => [{ width: 1000 }]);

describe.skip('HSPDetailPanel', () => {
  let rendered;
  const onClose = jest.fn();
  const hit = blastResultsMockData.hits[0];
  const hsp = hit.hit_hsps[0];

  beforeEach(async () => {
    rendered = renderWithRouter(
      <HSPDetailPanel
        hsp={hsp}
        hitAccession={hit.hit_acc}
        onClose={onClose}
        hitLength={hit.hit_len}
        queryLength={blastResultsMockData.query_len}
      />
    );
    await rendered;
  });

  it('should initially render overview', () => {
    const { asFragment, getByTestId } = rendered;
    expect(getByTestId('overview-hsp-detail')).toBeTruthy();
    expect(asFragment()).toMatchSnapshot();
  });

  it('should load correct query and match sequence data', async () => {
    const { container } = rendered;
    const msa = container.querySelector('protvista-msa');
    expect(msa.data).toEqual([
      { name: 'Query', sequence: hsp.hsp_qseq },
      { name: 'Match', sequence: hsp.hsp_hseq },
    ]);
  });

  it('should change to wrapped and render when wrapped view is clicked', async () => {
    const { getByText, findByTestId, asFragment } = rendered;
    const wrappedButton = getByText('Wrapped');
    fireEvent.click(wrappedButton);
    expect(await findByTestId('wrapped-hsp-detail')).toBeTruthy();
    expect(asFragment()).toMatchSnapshot();
  });
});
