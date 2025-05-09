import { Location } from '../../../app/config/urls';
import { BLAST_LIMIT } from '../../config/limits';
import { fromCleanMapper } from '../../utils/getIdKey';
import ToolsButton from './ToolsButton';

type BlastButtonProps = {
  selectedEntries: string[];
  textSuffix?: string;
};

const BlastButton = ({ selectedEntries, textSuffix }: BlastButtonProps) => {
  const cleanedSelectedEntries = Array.from(
    new Set(selectedEntries.map(fromCleanMapper))
  );

  const n = cleanedSelectedEntries.length;

  const disabled = !n || n > BLAST_LIMIT;

  let title = 'Select at least one entry to run a BLAST job';
  if (n) {
    if (n === 1) {
      title = `Run a BLAST job against ${cleanedSelectedEntries[0]}`;
    } else if (n > BLAST_LIMIT) {
      title = `Please select a maximum of ${BLAST_LIMIT} entries to run Blast jobs`;
    } else {
      title = `Run ${n} BLAST jobs against the selected entries`;
    }
  }

  return (
    <ToolsButton
      selectedEntries={cleanedSelectedEntries}
      disabled={disabled}
      title={title}
      location={Location.Blast}
    >
      <span translate="no">BLAST</span>
      {textSuffix && ` ${textSuffix}`}
    </ToolsButton>
  );
};

export default BlastButton;
