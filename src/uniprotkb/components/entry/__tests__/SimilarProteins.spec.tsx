import renderWithRouter from '../../../../shared/__test-helpers__/RenderWithRouter';
import SimilarProteins from '../similar-proteins/SimilarProteins';
import similarProteinsData from './__mocks__/similarProteinsData.json';

jest.mock('../../../../shared/hooks/useDataApi', () => jest.fn());
import useDataApi from '../../../../shared/hooks/useDataApi';
import { fireEvent } from '@testing-library/react';

const dataMock = {
  loading: false,
  data: similarProteinsData,
};

const getRendered = () =>
  renderWithRouter(
    <SimilarProteins
      primaryAccession="P05067"
      isoforms={{ isoforms: ['P05067-4'] }}
    />
  );
describe('SimilarProteins tests', () => {
  beforeEach(() => {
    useDataApi.mockImplementation(() => dataMock);
  });

  it('should call useDataApi and render', async () => {
    const { findByText } = getRendered();
    expect(useDataApi).toHaveBeenCalled();
    expect(await findByText(/0FGN2/)).toBeTruthy();
  });

  it('should change tabs', async () => {
    const { getByText, findByText } = getRendered();
    fireEvent.click(getByText('50% identity'));
    expect(await findByText(/P12023/)).toBeTruthy();
  });
});
