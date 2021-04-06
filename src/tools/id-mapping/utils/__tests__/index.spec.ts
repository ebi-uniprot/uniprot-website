import { getTreeData, parseIDs, joinIDs } from '../index';

describe('getTreeData', () => {
  const groups = [
    {
      groupName: 'group1',
      items: [
        {
          displayName: 'item 1 1',
          name: 'item_1_1',
          from: true,
          to: true,
          ruleId: 1,
        },
        {
          displayName: 'item 1 2',
          name: 'item_1_2',
          from: true,
          to: false,
          ruleId: 1,
        },
      ],
    },
    {
      groupName: 'group2',
      items: [
        {
          displayName: 'item 2 1',
          name: 'item_2_1',
          from: false,
          to: true,
          ruleId: 2,
        },
        {
          displayName: 'item 2 2',
          name: 'item_2 2',
          from: true,
          to: true,
          ruleId: 2,
        },
      ],
    },
  ];
  const ruleIdToRuleInfo = {
    1: {
      ruleId: 1,
      tos: ['item_1_1', 'item_1_2'],
      defaultTo: 'UniProtKB',
      taxonId: false,
    },
  };

  it('should get tree data when a rule is passed and not include item_1_2 which as to: false', () => {
    expect(getTreeData(groups, ruleIdToRuleInfo, 1)).toEqual([
      {
        label: 'group1',
        id: 'group1',
        items: [
          {
            label: 'item 1 1',
            id: 'item_1_1',
          },
        ],
      },
    ]);
  });
  it('should get tree data when no rule is passed', () => {
    expect(getTreeData(groups, ruleIdToRuleInfo)).toEqual([
      {
        label: 'group1',
        id: 'group1',
        items: [
          {
            label: 'item 1 1',
            id: 'item_1_1',
          },
          {
            label: 'item 1 2',
            id: 'item_1_2',
          },
        ],
      },
      {
        label: 'group2',
        id: 'group2',
        items: [
          {
            label: 'item 2 2',
            id: 'item_2 2',
          },
        ],
      },
    ]);
  });
});

describe('parseIDs', () => {
  it('should parse IDs by whitespace and ignore blank lines', () => {
    expect(parseIDs(`\n\nID1 ID2\n\n\n\tID3\n`)).toEqual(['ID1', 'ID2', 'ID3']);
  });
});

describe('joinIDs', () => {
  it('should join IDs with newline characters', () => {
    expect(joinIDs(['ID1', 'ID2', 'ID3'])).toEqual('ID1\nID2\nID3');
  });
});
