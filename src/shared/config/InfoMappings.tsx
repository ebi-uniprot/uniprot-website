import UniProtKBInfo from '../../uniprotkb/components/results/UniProtKBInfo';
import BlastInfo from '../../tools/blast/components/BlastFormInfo';
import AlignInfo from '../../tools/align/components/AlignFormInfo';
import IDMappingInfo from '../../tools/id-mapping/components/IDMappingFormInfo';

import { Namespace } from '../types/namespaces';
import { JobTypes } from '../../tools/types/toolsJobTypes';

const infoMappings: Record<
  Namespace | JobTypes,
  {
    name: string;
    info: JSX.Element | null;
    links: { title: string; destination: string }[];
  }
> = {
  // Main data
  [Namespace.uniprotkb]: {
    name: 'UniProtKB',
    info: <UniProtKBInfo />,
    links: [
      { title: 'Help', destination: '' },
      { title: 'Video', destination: '' },
    ],
  },
  [Namespace.uniref]: {
    name: 'UniRef',
    info: null,
    links: [
      { title: 'Help', destination: '' },
      { title: 'Video', destination: '' },
    ],
  },
  [Namespace.uniparc]: {
    name: 'UniParc',
    info: null,
    links: [
      { title: 'Help', destination: '' },
      { title: 'Video', destination: '' },
    ],
  },
  [Namespace.proteomes]: {
    name: 'Proteomes',
    info: null,
    links: [
      { title: 'Help', destination: '' },
      { title: 'Video', destination: '' },
    ],
  },
  // Supporting data
  [Namespace.taxonomy]: {
    name: 'Taxonomy',
    info: null,
    links: [
      { title: 'Help', destination: '' },
      { title: 'Video', destination: '' },
    ],
  },
  [Namespace.keywords]: {
    name: 'Keywords',
    info: null,
    links: [
      { title: 'Help', destination: '' },
      { title: 'Video', destination: '' },
    ],
  },
  [Namespace.citations]: {
    name: 'Literature citations',
    info: null,
    links: [
      { title: 'Help', destination: '' },
      { title: 'Video', destination: '' },
    ],
  },
  [Namespace.diseases]: {
    name: 'Human diseases',
    info: null,
    links: [
      { title: 'Help', destination: '' },
      { title: 'Video', destination: '' },
    ],
  },
  [Namespace.database]: {
    name: 'Cross-referenced databases',
    info: null,
    links: [
      { title: 'Help', destination: '' },
      { title: 'Video', destination: '' },
    ],
  },
  [Namespace.locations]: {
    name: 'Subcellular locations',
    info: null,
    links: [
      { title: 'Help', destination: '' },
      { title: 'Video', destination: '' },
    ],
  },
  // Tools
  [JobTypes.ALIGN]: {
    name: 'Align',
    info: <AlignInfo />,
    links: [
      { title: 'Help', destination: '' },
      { title: 'Video', destination: '' },
    ],
  },
  [JobTypes.BLAST]: {
    name: 'BLAST',
    info: <BlastInfo />,
    links: [
      { title: 'Help', destination: '' },
      { title: 'Video', destination: '' },
    ],
  },
  [JobTypes.ID_MAPPING]: {
    name: 'Retrieve/ID mapping',
    info: <IDMappingInfo />,
    links: [
      { title: 'Help', destination: '' },
      { title: 'Video', destination: '' },
    ],
  },
  [JobTypes.PEPTIDE_SEARCH]: {
    name: 'Peptide search',
    info: null,
    links: [
      { title: 'Help', destination: '' },
      { title: 'Video', destination: '' },
    ],
  },
};

export default infoMappings;
