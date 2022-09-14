import { Button, Dropdown } from 'franklin-sites';
import { useRouteMatch } from 'react-router-dom';

import ToolsButton from './ToolsButton';

import { fromCleanMapper } from '../../utils/getIdKeyForNamespace';
import { pluralise } from '../../utils/utils';

import { Location, LocationToPath } from '../../../app/config/urls';
import { JobTypes } from '../../../tools/types/toolsJobTypes';
import { PublicServerParameters } from '../../../tools/types/toolsServerParameters';

const ALIGN_LIMIT = 100;
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
  inputParamsData?: PublicServerParameters[JobTypes];
};

const AlignButton = ({
  selectedEntries,
  textSuffix,
  inputParamsData,
}: AlignButtonProps) => {
  const blastMatch = useRouteMatch(LocationToPath[Location.BlastResult]);
  const cleanedSelectedEntries = Array.from(
    new Set(selectedEntries.map(fromCleanMapper))
  );

  const n = cleanedSelectedEntries.length;

  const sequence =
    inputParamsData &&
    'sequence' in inputParamsData &&
    inputParamsData.sequence;

  if (sequence && blastMatch) {
    return (
      <Dropdown
        visibleElement={
          <Button
            // If both buttons within were to be disabled
            disabled={isDisabled(n) && isDisabled(n + 1)}
            variant="tertiary"
            title={`Select from 1 to ${ALIGN_LIMIT} entries to run an Align job`}
          >
            Align
          </Button>
        }
      >
        <ul>
          <li>
            <ToolsButton
              selectedEntries={cleanedSelectedEntries}
              disabled={isDisabled(n)}
              title={getTitle(n)}
              location={Location.Align}
            >
              Align selected results
            </ToolsButton>
          </li>
          <li>
            <ToolsButton
              selectedEntries={cleanedSelectedEntries}
              sequence={sequence}
              disabled={isDisabled(n + 1)}
              title={getTitle(n + 1)}
              location={Location.Align}
            >
              Align selected {pluralise('result', n)} with query
            </ToolsButton>
          </li>
        </ul>
      </Dropdown>
    );
  }

  return (
    <ToolsButton
      selectedEntries={cleanedSelectedEntries}
      disabled={isDisabled(n)}
      title={getTitle(n)}
      location={Location.Align}
    >
      Align{textSuffix && ` ${textSuffix}`}
    </ToolsButton>
  );
};

export default AlignButton;
