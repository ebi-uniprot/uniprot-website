import { UniProtkbAPIModel } from '../../../adapters/uniProtkbConverter';

const data: UniProtkbAPIModel = {
  entryType: 'UniProtKB unreviewed (TrEMBL)',
  primaryAccession: 'A0A059Q8K8',
  uniProtkbId: 'A0A059Q8K8_GOSHI',
  entryAudit: {
    firstPublicDate: '1111-11-10',
    lastAnnotationUpdateDate: '1111-11-10',
    lastSequenceUpdateDate: '1111-11-10',
    entryVersion: 1,
    sequenceVersion: 1,
  },
  annotationScore: 0,
  proteinExistence: '5: Uncertain',
  proteinDescription: {
    recommendedName: {
      fullName: {
        value: 'WRKY domain-containing protein',
      },
    },
  },
  references: [
    {
      referenceNumber: 1,
      citation: {
        id: 'CI-FC84BSHK1H4IL',
        citationType: 'unpublished observations',
      },
      referencePositions: ['required field'],
    },
  ],
};
export default data;
