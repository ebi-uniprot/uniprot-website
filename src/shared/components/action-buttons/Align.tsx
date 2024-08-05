import { useRouteMatch } from 'react-router-dom';

import ToolsButton from './ToolsButton';

import { fromCleanMapper } from '../../utils/getIdKey';
import { pluralise } from '../../utils/utils';

import { ALIGN_LIMIT } from '../../config/limits';

import { Location, LocationToPath } from '../../../app/config/urls';

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
  const blastMatch = useRouteMatch(LocationToPath[Location.BlastResult]);
  const cleanedSelectedEntries = Array.from(
    new Set(selectedEntries.map(fromCleanMapper))
  );

  const n = cleanedSelectedEntries.length;

  if (blastMatch) {
    return (
      <>
        <ToolsButton
          selectedEntries={cleanedSelectedEntries}
          disabled={isDisabled(n)}
          title={getTitle(n)}
          location={Location.Align}
        >
          Align selected results
        </ToolsButton>
        {/* Temporary, re-check after refactor to see where to put <li> */}
        <br />
        <ToolsButton
          selectedEntries={cleanedSelectedEntries}
          sequence={extraSequence}
          disabled={isDisabled(n + 1)}
          title={getTitle(n + 1)}
          location={Location.Align}
        >
          Align selected {pluralise('result', n)} with query
        </ToolsButton>
      </>
    );
  }

  return (
    <ToolsButton
      selectedEntries={cleanedSelectedEntries}
      disabled={isDisabled(n)}
      title={getTitle(n)}
      location={Location.Align}
    >
      <span translate="no">Align</span>
      {textSuffix && ` ${textSuffix}`}
    </ToolsButton>
  );
};

export default AlignButton;
