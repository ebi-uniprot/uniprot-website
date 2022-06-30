import { Button } from 'franklin-sites';
import { useHistory } from 'react-router-dom';

import { fromCleanMapper } from '../../utils/getIdKeyForNamespace';

import { LocationToPath, Location } from '../../../app/config/urls';
import { Namespace } from '../../types/namespaces';

const MAPID_LIMIT = 100_000;

type MapIDButtonProps = {
  selectedEntries: string[];
  namespace: Namespace;
};

const MapIDButton = ({ selectedEntries, namespace }: MapIDButtonProps) => {
  const history = useHistory();

  const cleanedSelectedEntries = Array.from(
    new Set(selectedEntries.map(fromCleanMapper))
  );

  const n = cleanedSelectedEntries.length;

  const disabled = !n || n > MAPID_LIMIT;

  let title = 'Select at least one entry to map';
  if (n) {
    if (n === 1) {
      title = 'Map the ID of this selected entry';
    } else if (n > MAPID_LIMIT) {
      title = `Please select a maximum of ${MAPID_LIMIT} entries to map`;
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

  const handleClick = () => {
    history.push(LocationToPath[Location.IDMapping], {
      parameters: { ids: cleanedSelectedEntries, from, to },
    });
  };

  return (
    <Button
      variant="tertiary"
      title={title}
      disabled={disabled}
      onClick={handleClick}
    >
      Map ID{n === 1 ? '' : 's'}
    </Button>
  );
};

export default MapIDButton;
