import { screen } from '@testing-library/react';

import customRender from '../../../shared/__test-helpers__/customRender';
import testColumnConfiguration from '../../../shared/__test-helpers__/testColumnConfiguration';
import mockGoXrefs from '../../__mocks__/goXrefs';
import data from '../../__mocks__/uniProtKBEntryModelData';
import {
  getAndPrepareSubcellGoXrefs,
  type SubcellularLocationUIModel,
} from '../../adapters/subcellularLocationConverter';
import uniProtKbConverter, {
  type UniProtkbUIModel,
} from '../../adapters/uniProtkbConverter';
import { UniProtKBColumn } from '../../types/columnTypes';
import EntrySection from '../../types/entrySection';
import databaseInfoMaps from '../../utils/__tests__/__mocks__/databaseInfoMaps';
import UniProtKBColumnConfiguration from '../UniProtKBColumnConfiguration';

jest.mock('../../../shared/workers/jobs/utils/storage');

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

  // Regression test for the go_c column that previously always rendered empty:
  // the column render reads CC GO terms from the Subcellular Location section,
  // not the Function section (where they are deliberately filtered out).
  describe('Cellular Component GO columns (regression)', () => {
    // Build a UIModel with CC GoXrefs on the Subcellular Location section.
    const preparedGoXrefs = getAndPrepareSubcellGoXrefs(mockGoXrefs);
    const subcellularSection: SubcellularLocationUIModel = {
      ...(transformedData[
        EntrySection.SubCellularLocation
      ] as SubcellularLocationUIModel),
      primaryAccession: transformedData.primaryAccession,
      goXrefs: preparedGoXrefs,
    };
    const dataWithCellCompGo: UniProtkbUIModel = {
      ...transformedData,
      [EntrySection.SubCellularLocation]: subcellularSection,
    };

    const getColumn = (key: UniProtKBColumn) => {
      const column = UniProtKBColumnConfiguration.get(key);
      if (!column) {
        throw new Error(`Column "${key}" is not configured`);
      }
      return column;
    };

    it('renders Cellular Component terms in the go_c column', () => {
      customRender(
        <>{getColumn(UniProtKBColumn.goC).render(dataWithCellCompGo)}</>
      );
      // From mockGoXrefs — the "C:" prefix is stripped by the converter.
      expect(screen.getByText('extracellular region')).toBeInTheDocument();
      expect(screen.getByText('extracellular space')).toBeInTheDocument();
    });

    it('includes Cellular Component terms in the combined go column', () => {
      customRender(
        <>{getColumn(UniProtKBColumn.go).render(dataWithCellCompGo)}</>
      );
      expect(screen.getByText('extracellular region')).toBeInTheDocument();
    });

    it('includes Cellular Component GO IDs in the go_id column', () => {
      customRender(
        <>{getColumn(UniProtKBColumn.goId).render(dataWithCellCompGo)}</>
      );
      expect(screen.getByText('GO:0005576')).toBeInTheDocument();
      expect(screen.getByText('GO:0005615')).toBeInTheDocument();
    });
  });
});
