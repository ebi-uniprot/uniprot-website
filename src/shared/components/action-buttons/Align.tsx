import ToolsButton from './ToolsButton';

import { fromCleanMapper } from '../../utils/getIdKey';

import { ALIGN_LIMIT } from '../../config/limits';

import { Location } from '../../../app/config/urls';

const isDisabled = (n: number) => n <= 1 || n > ALIGN_LIMIT;

const getTitle = (n: number) => {
  if (n > 1) {
    if (n > ALIGN_LIMIT) {
      return `Please select a maximum of ${ALIGN_LIMIT} entries to run an Align job`;
    }
    return `Run an Align job against ${n} entries`;
  }
  return 'Select at least 2 entries to run an Align job';
};

type AlignButtonProps = {
  selectedEntries: string[];
  textSuffix?: string;
  extraSequence?: string;
};

const AlignButton = ({
  selectedEntries,
  textSuffix,
  extraSequence,
}: AlignButtonProps) => {
  const cleanedSelectedEntries = Array.from(
    new Set(selectedEntries.map(fromCleanMapper))
  );

  const n = cleanedSelectedEntries.length;

  return (
    <ToolsButton
      selectedEntries={cleanedSelectedEntries}
      sequence={extraSequence}
      disabled={isDisabled(n + (extraSequence ? 1 : 0))}
      title={getTitle(n + (extraSequence ? 1 : 0))}
      location={Location.Align}
    >
      <span translate="no">Align</span>
      {textSuffix && ` ${textSuffix}`}
    </ToolsButton>
  );
};

export default AlignButton;
