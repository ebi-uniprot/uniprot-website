import React from 'react';

import UniProtKBInfo from '../../uniprotkb/components/results/UniProtKBInfo';
import BlastInfo from '../../tools/blast/components/BlastFormInfo';
import AlignInfo from '../../tools/align/components/AlignFormInfo';

import { Namespace } from '../../uniprotkb/types/searchTypes';
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
