import { GroupByItem } from '../components/results/UniProtKBGroupBy';

// Source: https://rest.uniprot.org/uniprotkb/view/taxonomy?query=%28%2A%29
// Retrieved: 2023-05-18
const mock: GroupByItem[] = [
  {
    id: '10239',
    label: 'Viruses',
    link: 'https://www.uniprot.org/taxonomy/10239',
    expand: true,
    count: 5392718,
  },
  {
    id: '131567',
    label: 'cellular organisms',
    link: 'https://www.uniprot.org/taxonomy/131567',
    expand: true,
    count: 242102520,
  },
  {
    id: '2787854',
    label: 'other entries',
    link: 'https://www.uniprot.org/taxonomy/2787854',
    expand: true,
    count: 1245,
  },
  {
    id: '2787823',
    label: 'unclassified entries',
    link: 'https://www.uniprot.org/taxonomy/2787823',
    expand: true,
    count: 2422449,
  },
];
export default mock;
