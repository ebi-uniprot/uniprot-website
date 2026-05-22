import { Location } from '../../../app/config/urls';
import { type SelectedTaxon } from '../../../jobs/types/jobsFormData';
import { BLAST_LIMIT } from '../../config/limits';
import { fromCleanMapper } from '../../utils/getIdKey';
import ToolsButton from './ToolsButton';

type BlastButtonProps = {
  selectedEntries: string[];
  textSuffix?: string;
  taxons?: SelectedTaxon[];
};

const BlastButton = ({
  selectedEntries,
  textSuffix,
  taxons,
}: BlastButtonProps) => {
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

  if (taxons && taxons.length > 0) {
    title =
      taxons.length >= 3
        ? `Run a BLAST job against ${taxons.length} taxonomies`
        : `Run a BLAST job against ${taxons.map((t) => t.label).join(', ')}`;
  }

  return (
    <ToolsButton
      selectedEntries={cleanedSelectedEntries}
      disabled={disabled}
      title={title}
      location={Location.Blast}
      taxons={taxons}
    >
      <span translate="no">BLAST</span>
      {textSuffix && ` ${textSuffix}`}
    </ToolsButton>
  );
};

export default BlastButton;
