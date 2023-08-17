import { GroupBy } from '../../config/apiUrls';

export const getPercentageLabel = (percentage: number) => {
  const percentageLabel = percentage?.toFixed(0);
  if (+percentageLabel === 0) {
    return '<1%';
  }
  if (percentageLabel === '100' && percentage !== 100) {
    return '>99%';
  }
  return `${percentageLabel}%`;
};

export const groupByToTerm: Record<GroupBy, string> = {
  ec: 'ec',
  go: 'go',
  keyword: 'keyword',
  taxonomy: 'taxonomy_id',
};

export const getGroupBySuggesterUrl = (groupBy: GroupBy) =>
  `/suggester?dict=${groupBy}&query=?`;

export const groupByToLabel: Record<GroupBy, string> = {
  ec: 'Enzyme Classification',
  go: 'Gene Ontology',
  keyword: 'Keyword',
  taxonomy: 'Taxonomy',
};

export const getGroupBySuggesterTitle = (groupBy: GroupBy) =>
  `Search for ${groupByToLabel[groupBy]}`;
