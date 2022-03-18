import { useRouteMatch } from 'react-router-dom';
import { DropdownButton, DownloadIcon } from 'franklin-sites';

import apiUrls from '../../config/apiUrls';
import uniparcApiUrls from '../../../uniparc/config/apiUrls';
import unirefApiUrls from '../../../uniref/config/apiUrls';
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

const getEntryDownloadUrl = (
  accession: string,
  fileFormat: FileFormat,
  namespace: Namespace
) => {
  if (namespace === Namespace.uniparc) {
    if (fileFormat === FileFormat.tsv) {
      return uniparcApiUrls.databases(accession, {
        format: fileFormat,
        size: 500, // TODO: remove when this endpoint has streaming https://www.ebi.ac.uk/panda/jira/browse/TRM-27649
      });
    }
  }
  if (namespace === Namespace.uniref) {
    if (fileFormat === FileFormat.list) {
      return unirefApiUrls.members(accession, {
        format: fileFormat,
        size: 500, // TODO: remove when this endpoint has streaming https://www.ebi.ac.uk/panda/jira/browse/TRM-27650
      });
    }
  }
  return apiUrls.entryDownload(accession, fileFormat, namespace);
};

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
                target="_blank"
                href={getEntryDownloadUrl(accession, fileFormat, namespace)}
                rel="noreferrer"
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
