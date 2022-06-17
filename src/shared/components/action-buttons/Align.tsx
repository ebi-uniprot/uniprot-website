import { Button, Dropdown } from 'franklin-sites';

import ToolsButton from './ToolsButton';

import { fromCleanMapper } from '../../utils/getIdKeyForNamespace';
import { pluralise } from '../../utils/utils';

import { Location } from '../../../app/config/urls';
import { JobTypes } from '../../../tools/types/toolsJobTypes';
import { PublicServerParameters } from '../../../tools/types/toolsServerParameters';

const ALIGN_LIMIT = 100;

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

  const sequence =
    inputParamsData &&
    'sequence' in inputParamsData &&
    inputParamsData.sequence;

  if (sequence) {
    return (
      <Dropdown
        visibleElement={
          <Button
            disabled={cleanedSelectedEntries.length === 0}
            variant="tertiary"
          >
            Align
          </Button>
        }
      >
        <ul>
          <li>
            <ToolsButton
              selectedEntries={cleanedSelectedEntries}
              disabled={disabled}
              title={title}
              location={Location.Align}
            >
              Align selected results
            </ToolsButton>
          </li>
          <li>
            <ToolsButton
              selectedEntries={cleanedSelectedEntries}
              sequence={sequence}
              disabled={cleanedSelectedEntries.length === 0}
              title={title}
              location={Location.Align}
            >
              Align selected{' '}
              {pluralise('result', cleanedSelectedEntries.length)} with query
            </ToolsButton>
          </li>
        </ul>
      </Dropdown>
    );
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
