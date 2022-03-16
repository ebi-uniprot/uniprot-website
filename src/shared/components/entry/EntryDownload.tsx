import { useRouteMatch } from 'react-router-dom';
import { DropdownButton, DownloadIcon } from 'franklin-sites';

import apiUrls from '../../config/apiUrls';
import uniparcApiUrls from '../../../uniparc/config/apiUrls';
import { allEntryPages } from '../../../app/config/urls';

import { fileFormatEntryDownload as uniProtKBFFED } from '../../../uniprotkb/config/download';
import { fileFormatEntryDownload as uniRefFFED } from '../../../uniref/config/download';
import { fileFormatEntryDownload as uniParcFFED } from '../../../uniparc/config/download';
import { fileFormatEntryDownload as proteomesFFED } from '../../../proteomes/config/download';
import { fileFormatEntryDownload as citationsFFED } from '../../../supporting-data/citations/config/download';
import { fileFormatEntryDownload as databaseFFED } from '../../../supporting-data/database/config/download';
import { fileFormatEntryDownload as diseasesFFED } from '../../../supporting-data/diseases/config/download';
import { fileFormatEntryDownload as keywordsFFED } from '../../../supporting-data/keywords/config/download';
import { fileFormatEntryDownload as locationsFFED } from '../../../supporting-data/locations/config/download';
import { fileFormatEntryDownload as taxonomyFFED } from '../../../supporting-data/taxonomy/config/download';
import { fileFormatEntryDownload as uniRuleFFED } from '../../../automatic-annotations/unirule/config/download';
import { fileFormatEntryDownload as arbaFFED } from '../../../automatic-annotations/arba/config/download';

import { Namespace } from '../../types/namespaces';
import { FileFormat } from '../../types/resultsDownload';

const formatMap = new Map<Namespace, FileFormat[]>([
  [Namespace.uniprotkb, uniProtKBFFED],
  [Namespace.uniref, uniRefFFED],
  [Namespace.uniparc, uniParcFFED],
  [Namespace.proteomes, proteomesFFED],
  [Namespace.citations, citationsFFED],
  [Namespace.database, databaseFFED],
  [Namespace.diseases, diseasesFFED],
  [Namespace.keywords, keywordsFFED],
  [Namespace.locations, locationsFFED],
  [Namespace.taxonomy, taxonomyFFED],
  [Namespace.unirule, uniRuleFFED],
  [Namespace.arba, arbaFFED],
]);

const EntryDownload = () => {
  const match =
    useRouteMatch<{ namespace: Namespace; accession: string }>(allEntryPages);
  const { namespace, accession } = match?.params || {};

  const fileFormatEntryDownload = namespace && formatMap.get(namespace);

  if (!(namespace && accession && fileFormatEntryDownload)) {
    return null;
  }

  return (
    <DropdownButton
      variant="tertiary"
      label={
        <>
          <DownloadIcon />
          Download
        </>
      }
    >
      <div className="dropdown-menu__content">
        <ul>
          {fileFormatEntryDownload.map((fileFormat) => (
            <li key={fileFormat}>
              <a
                href={
                  namespace === Namespace.uniparc &&
                  fileFormat === FileFormat.tsv
                    ? uniparcApiUrls.databases(accession)
                    : apiUrls.entryDownload(accession, fileFormat, namespace)
                }
              >
                {fileFormat}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </DropdownButton>
  );
};

export default EntryDownload;
