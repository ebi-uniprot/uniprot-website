import UniProtKBColumnConfiguration from '../UniProtKBColumnConfiguration';

import uniProtKbConverter, {
  UniProtkbUIModel,
} from '../../adapters/uniProtkbConverter';
import testColumnConfiguration from '../../../shared/__test-helpers__/testColumnConfiguration';

import { UniProtKBColumn } from '../../types/columnTypes';

import data from '../../__mocks__/uniProtKBEntryModelData';
import databaseInfoMaps from '../../utils/__tests__/__mocks__/databaseInfoMaps';

jest.mock('../../../tools/utils/storage');

const transformedData: UniProtkbUIModel = uniProtKbConverter(
  data,
  databaseInfoMaps
);

describe('UniProtKBColumnConfiguration component', () => {
  beforeAll(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.SVGElement.prototype.getBBox = () => ({
      width: 10,
      height: 10,
    });
  });

  afterAll(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    delete window.SVGElement.prototype.getBBox;
  });

  // TODO: find mock data to generate non-null snapshot for:
  // go_id, go, and many others
  testColumnConfiguration<UniProtKBColumn, UniProtkbUIModel>(
    UniProtKBColumnConfiguration,
    transformedData
  );
});
