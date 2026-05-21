import 'interaction-viewer';

import { isUniProtKBAccession } from '../../utils/regexes';

type Props = {
  accession: string;
};

const InteractionViewer = ({ accession }: Props) => {
  // The IntAct viewer fetches by accession — render nothing for a non-UniProtKB
  // accession (e.g. a UniParc sub-entry), where that fetch would fail.
  if (!isUniProtKBAccession(accession)) {
    return null;
  }
  return <interaction-viewer accession={accession} />;
};

export default InteractionViewer;
