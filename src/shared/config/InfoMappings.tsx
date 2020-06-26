import React from 'react';

import UniProtKBInfo from '../../uniprotkb/components/results/UniProtKBInfo';
import BlastInfo from '../../tools/blast/components/BlastFormInfo';
import AlignInfo from '../../tools/align/components/AlignFormInfo';

import { Namespace } from '../../uniprotkb/types/searchTypes';
import { Tool } from '../../tools/types';

const infoMappings: {
  [index in Namespace | Tool]: {
    name: string;
    info: JSX.Element;
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
  [Tool.blast]: {
    name: 'BLAST',
    info: <BlastInfo />,
    links: [
      { title: 'Help', destination: '' },
      { title: 'Video', destination: '' },
    ],
  },
  [Tool.align]: {
    name: 'Align',
    info: <AlignInfo />,
    links: [
      { title: 'Help', destination: '' },
      { title: 'Video', destination: '' },
    ],
  },
};

export default infoMappings;
