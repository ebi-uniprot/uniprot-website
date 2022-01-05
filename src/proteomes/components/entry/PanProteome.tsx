import { Link } from 'react-router-dom';

import * as logging from '../../../shared/utils/logging';

import ftpUrls from '../../../shared/config/ftpUrls';

import { ProteomesUIModel } from '../../adapters/proteomesConverter';
import { getEntryPath } from '../../../app/config/urls';
import { Namespace } from '../../../shared/types/namespaces';

export const PanProteome = ({ proteome }: { proteome: ProteomesUIModel }) => {
  if (!proteome.panproteome) {
    return null;
  }

  const panproteomeID =
    typeof proteome.panproteome === 'string'
      ? proteome.panproteome
      : proteome.panproteome.id;
  const entryIsPanProteome = proteome.id === panproteomeID;

  const name =
    // If loading, use current proteomes scientificName as a placeholder
    (entryIsPanProteome && proteome.taxonomy?.scientificName) ||
    // At this point, the entry is not the pan proteome so try the loaded data
    (typeof proteome.panproteome !== 'string' &&
      proteome.panproteome?.taxonomy.scientificName) ||
    // As a last resort fall back on the panproteome ID which we know must exist
    panproteomeID;

  /* istanbul ignore if */
  if (!name) {
    logging.error('Nothing to render for a pan proteome');
    return null;
  }

  return (
    <>
      {'This proteome is part of the '}
      {entryIsPanProteome ? (
        name
      ) : (
        <Link to={getEntryPath(Namespace.proteomes, panproteomeID)}>
          {name}
        </Link>
      )}
      {' pan proteome ('}
      <a href={ftpUrls.panProteomes(panproteomeID)}>FASTA</a>)
    </>
  );
};
