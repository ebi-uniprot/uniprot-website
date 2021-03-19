import customRender from '../../../../shared/__test-helpers__/customRender';

import UniParcCard from '../UniParcCard';

import { UniParcAPIModel } from '../../../adapters/uniParcConverter';

import data from '../../../__mocks__/entryModelData';

describe('UniRefCard tests', () => {
  it('should render and match snapshot', () => {
    const { asFragment } = customRender(
      <UniParcCard
        data={data as UniParcAPIModel}
        handleEntrySelection={jest.fn()}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
