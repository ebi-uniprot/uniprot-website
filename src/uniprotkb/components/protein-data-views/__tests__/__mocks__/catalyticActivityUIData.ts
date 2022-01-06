import { CatalyticActivityComment } from '../../../../types/commentTypes';

const mock: CatalyticActivityComment[] = [
  {
    commentType: 'CATALYTIC ACTIVITY',
    reaction: {
      name: 'Reaction name',
      reactionCrossReferences: [
        {
          database: 'dbType',
          id: '1234abc',
        },
      ],
      ecNumber: 'EC:12112',
      evidences: [
        {
          evidenceCode: 'ECO:1234',
          source: 'UniProtKB',
          id: 'some id',
        },
      ],
    },
    physiologicalReactions: [
      {
        directionType: 'right-to-left',
        reactionCrossReference: {
          database: 'Rhea',
          id: 'RHEA:10390',
        },
        evidences: [
          {
            evidenceCode: 'ECO:0000269',
            source: 'PubMed',
            id: '30193097',
          },
        ],
      },
      {
        directionType: 'left-to-right',
        reactionCrossReference: {
          database: 'Rhea',
          id: 'RHEA:10389',
        },
        evidences: [
          {
            evidenceCode: 'ECO:0000269',
            source: 'PubMed',
            id: '30193097',
          },
        ],
      },
    ],
  },
];

export default mock;
