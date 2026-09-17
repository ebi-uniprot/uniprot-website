import { type GroupByAPIModel } from '../components/results/UniProtKBGroupBy';

// Source: https://rest.uniprot.org/uniprotkb/groups/taxonomy?query=%28%2A%29
// Retrieved: 2026-08-31
export const taxonomyRoot: GroupByAPIModel = {
  ancestors: [],
  groups: [
    {
      id: '131567',
      label: 'cellular organisms',
      expandable: true,
      count: 148700306,
    },
    {
      id: '2787854',
      label: 'other entries',
      expandable: true,
      count: 434,
    },
    {
      id: '2787823',
      label: 'unclassified entries',
      expandable: true,
      count: 4719,
    },
    {
      id: '10239',
      label: 'Viruses',
      expandable: true,
      count: 1104680,
    },
  ],
  parent: {
    count: 149810139,
  },
};
// Source: https://rest.uniprot.org/uniprotkb/groups/taxonomy?parent=131567&query=%28%2A%29
// Retrieved: 2026-08-31
export const taxonomyCellularOrgranisms = {
  ancestors: [],
  groups: [
    {
      id: '2157',
      label: 'Archaea',
      expandable: true,
      count: 1767834,
    },
    {
      id: '2',
      label: 'Bacteria',
      expandable: true,
      count: 74117227,
    },
    {
      id: '2759',
      label: 'Eukaryota',
      expandable: true,
      count: 72815245,
    },
  ],
  parent: {
    label: 'cellular organisms',
    count: 148700306,
  },
};

// Source: https://rest.uniprot.org/uniprotkb/groups/ec?parent=3.-.-.-&query=%28shadab%29
// Retrieved: 2026-08-31
export const ecNonRoot = {
  ancestors: [],
  groups: [],
  parent: {
    label: 'Hydrolases',
    count: 0,
  },
};
