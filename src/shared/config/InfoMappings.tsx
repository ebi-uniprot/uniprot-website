import UniProtKBInfo from '../../uniprotkb/components/results/UniProtKBInfo';
import BlastInfo from '../../tools/blast/components/BlastFormInfo';
import AlignInfo from '../../tools/align/components/AlignFormInfo';

import { Namespace } from '../types/namespaces';
import { JobTypes } from '../../tools/types/toolsJobTypes';

const infoMappings: {
  [index in Namespace | JobTypes]: {
    name: string;
    info: JSX.Element | null;
    links: { title: string; destination: string }[];
  };
} = {
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
  [Namespace.publications]: {
    name: 'Publications',
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
  [JobTypes.IDMAP]: {
    name: 'ID mapping',
    info: null,
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
