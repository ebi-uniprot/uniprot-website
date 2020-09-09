import React, { FC } from 'react';

import ToolsButton from './ToolsButton';

import { Location } from '../../../app/config/urls';

const BLAST_LIMIT = 20;

type BlastButtonProps = {
  selectedEntries: string[];
};

const BlastButton: FC<BlastButtonProps> = ({ selectedEntries }) => {
  const n = selectedEntries.length;

  const disabled = !n || n > BLAST_LIMIT;

  let title = 'Select at least one entry to run a BLAST job';
  if (n) {
    if (n === 1) {
      title = `Run a BLAST job against ${selectedEntries[0]}`;
    } else if (n > BLAST_LIMIT) {
      title = `Please select a maximum of ${BLAST_LIMIT} entries to run Blast jobs`;
    } else {
      title = `Run ${n} BLAST jobs against the selected entries`;
    }
  }

  return (
    <ToolsButton
      selectedEntries={selectedEntries}
      disabled={disabled}
      title={title}
      location={Location.Blast}
    >
      BLAST
    </ToolsButton>
  );
};

export default BlastButton;
