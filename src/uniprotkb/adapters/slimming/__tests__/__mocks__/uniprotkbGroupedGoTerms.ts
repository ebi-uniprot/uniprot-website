import mock from '../../../../__mocks__/nonHumanEntryModelData';
import { getAspectGroupedGoTerms } from '../../../functionConverter';
import { convertXrefProperties } from '../../../uniProtkbConverter';

const uniprotkbGroupedGoTerms = getAspectGroupedGoTerms(
  convertXrefProperties(mock.uniProtKBCrossReferences)
);
export default uniprotkbGroupedGoTerms;
