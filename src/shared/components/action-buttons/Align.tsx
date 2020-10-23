import React, { FC } from 'react';

import ToolsButton from './ToolsButton';

import { Location } from '../../../app/config/urls';

const ALIGN_LIMIT = 100;

type AlignButtonProps = {
  selectedEntries: string[];
  textSuffix?: string;
};

const AlignButton: FC<AlignButtonProps> = ({ selectedEntries, textSuffix }) => {
  const n = selectedEntries.length;

  const disabled = n <= 1 || n > ALIGN_LIMIT;

  let title = 'Select at least 2 entries to run an Align job';
  if (n > 1) {
    if (n > ALIGN_LIMIT) {
      title = `Please select a maximum of ${ALIGN_LIMIT} entries to run an Align job`;
    } else {
      title = `Run an Align job against ${n} entries`;
    }
  }

  return (
    <ToolsButton
      selectedEntries={selectedEntries}
      disabled={disabled}
      title={title}
      location={Location.Align}
    >
      Align{textSuffix && ` ${textSuffix}`}
    </ToolsButton>
  );
};

export default AlignButton;
