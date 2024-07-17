import { GroupByAPIModel } from '../components/results/UniProtKBGroupBy';

// Source: https://rest.uniprot.org/uniprotkb/groups/taxonomy?query=%28%2A%29
// Retrieved: 2024-06-10
export const taxonomyRoot: GroupByAPIModel = {
  ancestors: [],
  groups: [
    {
      id: '131567',
      label: 'cellular organisms',
      expandable: true,
      count: 237365811,
    },
    {
      id: '2787854',
      label: 'other entries',
      expandable: true,
      count: 1162,
    },
    {
      id: '2787823',
      label: 'unclassified entries',
      expandable: true,
      count: 2426676,
    },
    {
      id: '10239',
      label: 'Viruses',
      expandable: true,
      count: 5688878,
    },
  ],
  parent: {
    count: 245482527,
  },
};
// Source: https://rest.uniprot.org/uniprotkb/groups/taxonomy?parent=131567&query=%28%2A%29
// Retrieved: 2024-06-10
export const taxonomyCellularOrgranisms = {
  ancestors: [],
  groups: [
    {
      id: '2157',
      label: 'Archaea',
      expandable: true,
      count: 6658352,
    },
    {
      id: '2',
      label: 'Bacteria',
      expandable: true,
      count: 152212928,
    },
    {
      id: '2759',
      label: 'Eukaryota',
      expandable: true,
      count: 78494531,
    },
  ],
  parent: {
    label: 'cellular organisms',
    count: 237365811,
  },
};

// Source: https://rest.uniprot.org/uniprotkb/groups/ec?parent=3.-.-.-&query=%28shadab%29
// Retrieved: 2024-06-10
export const ecNonRoot = {
  ancestors: [
    {
      id: '3.2.-.-',
      label: 'Glycosylases',
    },
    {
      id: '3.2.1.-',
      label:
        'Glycosidases, i.e. enzymes hydrolyzing O- and S-glycosyl compounds',
    },
  ],
  groups: [
    {
      id: '3.2.1.18',
      label: 'exo-alpha-sialidase',
      expandable: false,
      count: 37,
    },
  ],
  parent: {
    label: 'Hydrolases',
    count: 37,
  },
};
