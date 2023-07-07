import { GroupByAPIModel } from '../components/results/UniProtKBGroupBy';

// Source: https://rest.uniprot.org/uniprotkb/groups/taxonomy?query=%28%2A%29
// Retrieved: 2023-05-18
export const noParent: GroupByAPIModel = {
  ancestors: [],
  groups: [
    {
      id: '131567',
      label: 'cellular organisms',
      expandable: true,
      count: 241067738,
    },
    {
      id: '2787854',
      label: 'other entries',
      expandable: true,
      count: 1245,
    },
    {
      id: '2787823',
      label: 'unclassified entries',
      expandable: true,
      count: 2422449,
    },
    {
      id: '10239',
      label: 'Viruses',
      expandable: true,
      count: 5392244,
    },
  ],
};

// TODO: get mock data with parent
