import { RequireAtLeastOne } from 'type-fest';
import { StatisticsItem } from './StatisticsPage';
import { stringifyQuery } from '../../../shared/utils/url';
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
