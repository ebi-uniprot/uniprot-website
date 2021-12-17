import { FreeTextComment } from '../../../../types/commentTypes';

const mock: FreeTextComment[] = [
  {
    commentType: 'FUNCTION',
    texts: [
      {
        value:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        evidences: [
          {
            evidenceCode: 'ECO:0000269',
            source: 'PubMed',
            id: '31182795',
          },
        ],
      },
    ],
  },
  {
    commentType: 'FUNCTION',
    texts: [
      {
        value:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua (PubMed:1234567, PubMed:12345678). Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        evidences: [
          {
            evidenceCode: 'ECO:0000269',
            source: 'PubMed',
            id: '31182795',
          },
        ],
      },
    ],
  },
  {
    commentType: 'FUNCTION',
    texts: [
      {
        value:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua (PubMed:1234567, PubMed:12345678). Ut enim ad minim veniam, quis AC P05067 nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
    ],
  },
];

export default mock;
