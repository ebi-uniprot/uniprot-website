import { GroupBy } from '../../config/apiUrls';

export const getPercentageLabel = (percentage: number) => {
  const percentageLabel = percentage?.toFixed(0);
  if (+percentageLabel === 0) {
    return '≈0%';
  }
  if (percentageLabel === '100' && percentage !== 100) {
    return '≈100%';
  }
  return `${percentageLabel}%`;
};

export const groupByToTerm: Record<GroupBy, string> = {
  ec: 'ec',
  go: 'go',
  keyword: 'keyword',
  taxonomy: 'taxonomy_id',
};

export const getSuggesterUrl = (groupBy: GroupBy) =>
  `/suggester?dict=${groupBy}&query=?`;

export const groupByToLabel: Record<GroupBy, string> = {
  ec: 'Enzyme Classification [EC]',
  go: 'Gene Ontology [GO]',
  keyword: 'Keyword [KW]',
  taxonomy: 'Taxonomy [OC]',
};

export const getSuggesterTitle = (groupBy: GroupBy) =>
  `Search for ${groupByToLabel[groupBy]}`;
