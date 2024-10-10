import { getAspectGroupedGoTerms } from '../../../functionConverter';
import { convertXrefProperties } from '../../../uniProtkbConverter';

import mock from '../../../../__mocks__/nonHumanEntryModelData';

const uniprotkbGroupedGoTerms = getAspectGroupedGoTerms(
  convertXrefProperties(mock.uniProtKBCrossReferences)
);
export default uniprotkbGroupedGoTerms;
