import ToolsButton from './ToolsButton';

import { fromCleanMapper } from '../../utils/getIdKeyForNamespace';

import { Location } from '../../../app/config/urls';

const ALIGN_LIMIT = 100;

type AlignButtonProps = {
  selectedEntries: string[];
  textSuffix?: string;
};

const AlignButton = ({ selectedEntries, textSuffix }: AlignButtonProps) => {
  const cleanedSelectedEntries = Array.from(
    new Set(selectedEntries.map(fromCleanMapper))
  );

  const n = cleanedSelectedEntries.length;

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
      selectedEntries={cleanedSelectedEntries}
      disabled={disabled}
      title={title}
      location={Location.Align}
    >
      Align{textSuffix && ` ${textSuffix}`}
    </ToolsButton>
  );
};

export default AlignButton;
