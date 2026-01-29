import modelData from '../../__mocks__/uniProtKBEntryModelData';
import extractIsoforms, {
  constructIsoformSequence,
} from '../extractIsoformsConverter';

describe('Accessions data converter', () => {
  it('should extract all isoforms', () => {
    const isoformData = extractIsoforms(modelData);
    expect(isoformData).toEqual({ canonical: 'P21802', isoforms: ['isoID1'] });
  });
  it('should construct isoform sequence correctly', () => {
    const isoformData = constructIsoformSequence(
      {
        isoformIds: ['isoID1'],
        sequenceIds: ['SequenceID'],
        name: {
          value: '',
          evidences: undefined,
          id: undefined,
        },
        isoformSequenceStatus: 'Displayed',
      },
      [
        {
          featureId: 'SequenceID',
          location: {
            start: {
              value: 3,
              modifier: 'EXACT',
            },
            end: { value: 10, modifier: 'EXACT' },
          },
          alternativeSequence: {
            originalSequence: 'PTSPKVFP',
            alternativeSequences: ['GKPTHVNV'],
          },
          type: 'Alternative sequence',
        },
      ],
      'ASPTSPKVFPLSLCSTQPDGNVVIACLVQGFFPQEPLSVTWSESG'
    );
    expect(isoformData).toEqual({
      isoformId: 'isoID1',
      sequence: 'ASGKPTHVNVLSLCSTQPDGNVVIACLVQGFFPQEPLSVTWSESG',
    });
  });
});
