import { useRouteMatch } from 'react-router-dom';
import { DropdownButton, DownloadIcon } from 'franklin-sites';

import apiUrls from '../../../shared/config/apiUrls';
import { allSupportingDataEntryLocations } from '../../../app/config/urls';

import { fileFormatEntryDownload as citationsFFED } from '../../citations/config/download';
import { fileFormatEntryDownload as databaseFFED } from '../../database/config/download';
import { fileFormatEntryDownload as diseasesFFED } from '../../diseases/config/download';
import { fileFormatEntryDownload as keywordsFFED } from '../../keywords/config/download';
import { fileFormatEntryDownload as locationsFFED } from '../../locations/config/download';
import { fileFormatEntryDownload as taxonomyFFED } from '../../taxonomy/config/download';

import { Namespace } from '../../../shared/types/namespaces';

const lut = new Map([
  [Namespace.citations, citationsFFED],
  [Namespace.database, databaseFFED],
  [Namespace.diseases, diseasesFFED],
  [Namespace.keywords, keywordsFFED],
  [Namespace.locations, locationsFFED],
  [Namespace.taxonomy, taxonomyFFED],
]);

const EntryDownload = () => {
  const match = useRouteMatch<{ namespace: Namespace; accession: string }>(
    allSupportingDataEntryLocations
  );
  const { namespace, accession } = match?.params || {};

  const fileFormatEntryDownload = namespace && lut.get(namespace);

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
              <a href={apiUrls.entryDownload(accession, fileFormat, namespace)}>
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
