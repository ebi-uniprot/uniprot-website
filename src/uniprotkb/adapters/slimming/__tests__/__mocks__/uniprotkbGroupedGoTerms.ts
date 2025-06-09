import mock from '../../../../__mocks__/nonHumanEntryModelData';
import { getAspectGroupedGoTermsWithoutCellComp } from '../../../functionConverter';
import { convertXrefProperties } from '../../../uniProtkbConverter';

const uniprotkbGroupedGoTerms = getAspectGroupedGoTermsWithoutCellComp(
  convertXrefProperties(mock.uniProtKBCrossReferences)
);
export default uniprotkbGroupedGoTerms;
