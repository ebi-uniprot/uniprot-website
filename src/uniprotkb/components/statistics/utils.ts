import { sumBy } from 'lodash-es';
import { RequireAtLeastOne } from 'type-fest';

import { stringifyQuery } from '../../../shared/utils/url';

import { CategoryToStatistics, StatisticsItem } from './StatisticsPage';
import { LocationToPath, Location } from '../../../app/config/urls';

export const getSequenceSizeLocation = (
  name: StatisticsItem['name'],
  reviewed: boolean
) => {
  const reSubsequence = /(?<start>\d+)?(-|>)(?<end>\d+)/;
  const groups = name.match(reSubsequence)?.groups;
  return groups
    ? {
        pathname: LocationToPath[Location.UniProtKBResults],
        search: stringifyQuery({
          query: `(reviewed:${reviewed}) AND (fragment:false) AND (length:[${
            groups.start || +groups.end + 1
          } TO ${groups.start ? groups.end : '*'}])`,
        }),
      }
    : null;
};

export type MergedStatisticsItem = {
  name: string;
  label?: string;
  statistics: MergedStatistics;
  query?: string;
};

export type MergedStatistics = RequireAtLeastOne<
  {
    reviewed?: StatisticsItem;
    unreviewed?: StatisticsItem;
  },
  'reviewed' | 'unreviewed'
>;

export const mergeToMap = (
  reviewed: StatisticsItem[],
  unreviewed: StatisticsItem[]
) => {
  const accumulator = new Map<string, MergedStatistics>();
  for (const item of reviewed) {
    accumulator.set(item.name, { reviewed: item });
  }
  for (const item of unreviewed) {
    const stats = accumulator.get(item.name);
    if (stats) {
      stats.unreviewed = item;
    } else {
      accumulator.set(item.name, { unreviewed: item });
    }
  }
  return accumulator;
};

export const merge = (
  reviewed: StatisticsItem[],
  unreviewed: StatisticsItem[]
): MergedStatisticsItem[] =>
  Array.from(mergeToMap(reviewed, unreviewed), ([name, statistics]) => ({
    name,
    label: statistics.reviewed?.label || statistics.unreviewed?.label,
    statistics,
  }));

export const frequencySort = (
  a: MergedStatisticsItem,
  b: MergedStatisticsItem
) => {
  const aValue = +a.name.split(/\D/).filter((part) => Boolean(part))[0];
  const bValue = +b.name.split(/\D/).filter((part) => Boolean(part))[0];
  return aValue - bValue;
};

export const getUniqueAuthorString = (data: CategoryToStatistics) => {
  const uniqueAuthors = data.MISCELLANEOUS.items.find(
    ({ name }) => name === 'UNIQUE_AUTHOR'
  );
  return uniqueAuthors?.count
    ? `Total number of distinct authors cited: ${uniqueAuthors.count}`
    : '';
};

const excludedMisc = new Set([
  'UNIQUE_AUTHOR',
  'SEQUENCE_CORRECTION',
  'UNIQUE_CITATION_ID',
]);

export const getEncodedLocations = (data: CategoryToStatistics) => {
  const misc = data.MISCELLANEOUS;
  const items = misc.items.filter(({ name }) => !excludedMisc.has(name));
  const totalCount = sumBy(items, 'count');
  return {
    MISCELLANEOUS: { ...misc, totalCount, items },
  } as CategoryToStatistics;
};

export const getSequenceCorrections = (data: CategoryToStatistics) =>
  data.MISCELLANEOUS.items.find(({ name }) => name === 'SEQUENCE_CORRECTION');
