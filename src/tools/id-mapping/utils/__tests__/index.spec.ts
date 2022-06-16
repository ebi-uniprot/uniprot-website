import { getTreeData } from '../index';

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
          uriLink: '/item/1/1/link',
        },
        {
          displayName: 'item 1 2',
          name: 'item_1_2',
          from: true,
          to: false,
          ruleId: 1,
          uriLink: '/item/1/2/link',
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
          uriLink: '/item/2/1/link',
        },
        {
          displayName: 'item 2 2',
          name: 'item_2 2',
          from: true,
          to: true,
          ruleId: 2,
          uriLink: '/item/2/2/link',
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
