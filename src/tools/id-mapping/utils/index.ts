import { memoize, groupBy } from 'lodash-es';

import { RuleIdToRuleInfo, TreeData } from '../components/IDMappingForm';

import { IDMappingField, IDMappingRule } from '../types/idMappingFormConfig';

// Memoize this as there could be lots of calls to this function as the user explores
// the various from-to combinations. Also, the rule is an ideal key for the memoize's WeakMap.
// Better to use memoize than react's useMemo as we are not concerned with dependency/arg diffs
// but having to reconstruct the tree data for the same rule.
export const getTreeData = memoize(
  (
    dbs: IDMappingField[],
    ruleIdToRuleInfo: RuleIdToRuleInfo,
    rule?: number
  ) => {
    let tos: IDMappingRule['tos'];
    if (rule) {
      ({ tos } = ruleIdToRuleInfo[rule]);
    }
    const filteredDbs = dbs.filter(({ name, from, to }) =>
      tos ? tos.includes(name) && to : from
    );

    const groupNameToDbs = groupBy(filteredDbs, 'groupName');

    const treeData: TreeData = Object.entries(groupNameToDbs).map(
      ([groupName, groupDbs]) => ({
        label: groupName,
        id: groupName,
        items: groupDbs.map(({ displayName, name }) => ({
          label: displayName,
          id: name,
        })),
      })
    );
    return treeData;
  },
  // In the case tree data is being built for the "from" tree select no rule is passed
  // so let 0 be the memoize's WeakMap key for quick retrieval
  (_dbs, _ruleIdToRuleInfo, rule?: number) => rule ?? 0
);

const reWhitespace = /\s+/;

export const parseIDs = (text: string) =>
  text.split(reWhitespace).filter(Boolean);

const newLine = `
`;
export const joinIDs = (ids: string[]) => ids.join(newLine);
