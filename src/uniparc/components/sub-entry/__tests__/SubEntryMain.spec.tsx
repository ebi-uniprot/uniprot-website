import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import SubEntryMain from '../SubEntryMain';

import uniParcSubEntryConverter, {
  UniParcSubEntryUIModel,
} from '../../../adapters/uniParcSubEntryConverter';

import uniParcEntryModelData from '../../../__mocks__/uniParcEntryModelData';
import customRender from '../../../../shared/__test-helpers__/customRender';
import apiUrls from '../../../../shared/config/apiUrls/apiUrls';
import { Namespace } from '../../../../shared/types/namespaces';
import allDatabases from './__mocks__/allDatabases';

const mock = new MockAdapter(axios);

mock
  .onGet(apiUrls.configure.allDatabases(Namespace.uniparc))
  .reply(200, allDatabases);

describe('SubEntryMain', () => {
  it('should render', () => {
    const transformedData = uniParcSubEntryConverter(
      uniParcEntryModelData,
      'YP_232970'
    ) as UniParcSubEntryUIModel;
    const { asFragment } = customRender(
      <SubEntryMain transformedData={transformedData} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
