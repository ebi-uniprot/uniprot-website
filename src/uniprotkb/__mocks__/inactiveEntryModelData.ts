import { type UniProtkbAPIModel } from '../adapters/uniProtkbConverter';
import uniProtKBEntryModelData from './uniProtKBEntryModelData';

// A deleted entry. The API returns entryType "Inactive", which the
// UniProtkbAPIModel union doesn't name -- but getEntryTypeFromString does
// handle it, and that is what the converter runs the value through.
const inactiveEntryModelData: UniProtkbAPIModel = {
  ...uniProtKBEntryModelData,
  primaryAccession: 'P00000',
  entryType: 'Inactive' as UniProtkbAPIModel['entryType'],
  inactiveReason: {
    inactiveReasonType: 'DELETED',
    deletedReason: 'Redundant sequence',
  },
};

export default inactiveEntryModelData;
