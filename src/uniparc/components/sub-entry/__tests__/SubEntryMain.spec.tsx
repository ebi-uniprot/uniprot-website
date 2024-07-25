import { screen } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import SubEntryMain from '../SubEntryMain';

import uniParcSubEntryConverter, {
  UniParcSubEntryUIModel,
} from '../../../adapters/uniParcSubEntryConverter';

import customRender from '../../../../shared/__test-helpers__/customRender';

import uniParcEntryModelData from '../../../__mocks__/uniParcEntryModelData';
import allDatabases from './__mocks__/allDatabases';

const mock = new MockAdapter(axios);

mock.onGet(/\/configure\/uniparc\/allDatabases/).reply(200, allDatabases);

jest.mock('../SubEntrySimilarProteinsSection', () => ({
  __esModule: true,
  default: () => '{{ SubEntrySimilarProteinsSection }}',
}));

describe('SubEntryMain', () => {
  it('should render', async () => {
    const transformedData = uniParcSubEntryConverter(
      uniParcEntryModelData,
      'YP_232970'
    ) as UniParcSubEntryUIModel;
    const { asFragment } = customRender(
      <SubEntryMain transformedData={transformedData} />
    );
    // Need to do this because we're lazy loading VisualFeaturesView and it raises an act warning
    await screen.findByText('Showing features for other.');
    expect(asFragment()).toMatchSnapshot();
  });
});
