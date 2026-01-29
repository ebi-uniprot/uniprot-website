import { type SequenceUIModel } from '../../../../../uniprotkb/adapters/sequenceConverter';

const mock: SequenceUIModel = {
  sequence: {
    value: 'ATGHASOADSDKDSAJALDSAMCMNDSKMDSKNCSAKN',
    length: 1234,
    molWeight: 5678,
    crc64: 'ASSDFFFDSAASDDSDFSASDF',
    md5: 'C899F597B1B5D205357C9FAEDA9FF553',
  },
  status: 'Sequence status',
  processing: 'Sequence processing',
  alternativeProducts: {
    commentType: 'ALTERNATIVE PRODUCTS',
    isoforms: [
      {
        name: {
          value: 'APP770',
        },
        synonyms: [
          {
            value: 'PreA4 770',
          },
        ],
        note: {
          texts: [
            {
              value: 'A major isoform.',
            },
          ],
        },
        isoformIds: ['P05067-1'],
        isoformSequenceStatus: 'Displayed',
      },
      {
        name: {
          value: 'APP770-2',
        },
        synonyms: [
          {
            value: 'PreA4 770-2',
          },
        ],
        note: {
          texts: [
            {
              value: 'A not so major isoform.',
            },
          ],
        },
        isoformIds: ['P05067-2'],
        isoformSequenceStatus: 'Described',
      },
    ],
    note: {
      texts: [{ value: 'some text' }],
    },
    events: ['event 1', 'event 2'],
  },
  lastUpdateDate: '12/04/2010',
};

export default mock;
