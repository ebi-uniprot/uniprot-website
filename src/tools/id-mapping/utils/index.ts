import { memoize } from 'lodash-es';

import { reUniProtKBAccession } from '../../../uniprotkb/utils';
import { nsToFileFormatsResultsDownload } from '../../../shared/config/resultsDownload';

import { RuleIdToRuleInfo } from '../components/IDMappingForm';
import { Namespace } from '../../../shared/types/namespaces';
import { IDMappingGroup } from '../types/idMappingFormConfig';
import { APIModel } from '../../../shared/types/apiModel';
import { FileFormat } from '../../../shared/types/resultsDownload';

// Memoize this as there could be lots of calls to this function as the user explores
// the various from-to combinations. Also, the rule is an ideal key for the memoize's WeakMap.
// Better to use memoize than react's useMemo as we are not concerned with dependency/arg diffs
// but having to reconstruct the tree data for the same rule.
export const getTreeData = memoize(
  (
    dbGroups: IDMappingGroup[],
    ruleIdToRuleInfo: RuleIdToRuleInfo,
    rule?: number
  ) => {
    // Create a set for quick O(1) look up time when filtering
    let tos: Set<string>;
    if (rule) {
      tos = new Set(ruleIdToRuleInfo[rule].tos);
    }
    return dbGroups
      .map(({ groupName, items }) => ({
        label: groupName,
        id: groupName,
        items: items
          .filter(({ name, from, to }) => (tos ? to && tos.has(name) : from))
          .map(({ displayName, name }) => ({
            label: displayName,
            id: name,
          })),
      }))
      .filter(({ items }) => items.length);
  },
  // In the case tree data is being built for the "from" tree select no rule is passed
  // so let 0 be the memoize's WeakMap key for quick retrieval
  (_dbs, _ruleIdToRuleInfo, rule?: number) => rule ?? 0
);

export const rawDBToNamespace = (db?: string) => {
  const lowerCaseDB = db?.toLowerCase() || '';
  if (lowerCaseDB.includes('uniprotkb')) {
    return Namespace.uniprotkb;
  }
  if (lowerCaseDB.includes('uniref')) {
    return Namespace.uniref;
  }
  if (lowerCaseDB.includes('uniparc')) {
    return Namespace.uniparc;
  }
  return Namespace.idmapping;
};

const reSubsequence = /\[\d{1,5}-\d{1,5}\]/;
const reSubsequenceFrom = new RegExp(
  `(${reUniProtKBAccession.source})${reSubsequence.source}`,
  'i'
);

export const isSubsequenceFrom = (results: APIModel[]) =>
  results.some(
    (result) =>
      'from' in result &&
      typeof result.from === 'string' &&
      result.from.match(reSubsequenceFrom)
  );

export const getSupportedFormats = (
  results: APIModel[],
  namespace: Namespace
) => {
  const fileFormats = nsToFileFormatsResultsDownload[namespace];
  return namespace === Namespace.uniprotkb && isSubsequenceFrom(results)
    ? [FileFormat.fastaSubsequence, ...fileFormats]
    : fileFormats;
};
