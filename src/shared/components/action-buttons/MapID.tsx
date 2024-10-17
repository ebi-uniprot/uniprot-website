import ToolsButton from './ToolsButton';

import { fromCleanMapper } from '../../utils/getIdKey';

import { ID_MAPPING_LIMIT } from '../../config/limits';

import { Location } from '../../../app/config/urls';
import { Namespace } from '../../types/namespaces';

type MapIDButtonProps = {
  selectedEntries: string[];
  namespace: Namespace;
};

const MapIDButton = ({ selectedEntries, namespace }: MapIDButtonProps) => {
  const cleanedSelectedEntries = Array.from(
    new Set(selectedEntries.map(fromCleanMapper))
  );

  const n = cleanedSelectedEntries.length;

  const disabled = !n || n > ID_MAPPING_LIMIT;

  let title = 'Select at least one entry to map';
  if (n) {
    if (n === 1) {
      title = 'Map the ID of this selected entry';
    } else if (n > ID_MAPPING_LIMIT) {
      title = `Please select a maximum of ${ID_MAPPING_LIMIT} entries to map`;
    } else {
      title = `Map the IDs of these ${n} selected entries`;
    }
  }

  let from = 'UniProtKB_AC-ID';
  let to = 'UniRef90';
  if (namespace === Namespace.uniref) {
    from = cleanedSelectedEntries[0]?.split('_')[0];
    to = 'UniProtKB';
  } else if (namespace === Namespace.uniparc) {
    from = 'UniParc';
  }

  return (
    <ToolsButton
      selectedEntries={cleanedSelectedEntries}
      from={from}
      to={to}
      disabled={disabled}
      title={title}
      location={Location.IDMapping}
    >
      Map ID{n === 1 ? '' : 's'}
    </ToolsButton>
  );
};

export default MapIDButton;
