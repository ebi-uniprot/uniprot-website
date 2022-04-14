/* eslint-disable uniprot-website/use-config-location */

// TODO: remove all of the uniref and uniparc contingency code as soon as streaming is provided:
//  - https://www.ebi.ac.uk/panda/jira/browse/TRM-27649
//  - https://www.ebi.ac.uk/panda/jira/browse/TRM-27650
// It maybe easier to just checkout this file at 820fdb305a092 rather than going through the file.
// Just make to sure to see if any other commits have been made on top of it since.

import { useCallback } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import {
  DropdownButton,
  DownloadIcon,
  Button,
  LongNumber,
} from 'franklin-sites';

// eslint-disable-next-line import/no-relative-packages
import colors from '../../../../node_modules/franklin-sites/src/styles/colours.json';

import { useMessagesDispatch } from '../../contexts/Messages';

import { addMessage } from '../../../messages/state/messagesActions';
import apiUrls from '../../config/apiUrls';
import uniparcApiUrls from '../../../uniparc/config/apiUrls';
import unirefApiUrls from '../../../uniref/config/apiUrls';
import {
  allEntryPages,
  getLocationEntryPathFor,
  Location,
} from '../../../app/config/urls';

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
import {
  MessageFormat,
  MessageLevel,
} from '../../../messages/types/messagesTypes';

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

const maxPaginationDownload = 500;
const isUniparcTsv = (namespace: Namespace, fileFormat: FileFormat) =>
  namespace === Namespace.uniparc && fileFormat === FileFormat.tsv;
const isUniRefList = (namespace: Namespace, fileFormat: FileFormat) =>
  namespace === Namespace.uniref && fileFormat === FileFormat.list;

const getEntryDownloadUrl = (
  accession: string,
  fileFormat: FileFormat,
  namespace: Namespace
) => {
  if (isUniparcTsv(namespace, fileFormat)) {
    return uniparcApiUrls.databases(accession, {
      format: fileFormat as FileFormat.tsv,
      // TODO: remove when this endpoint has streaming https://www.ebi.ac.uk/panda/jira/browse/TRM-27649
      size: 500,
    });
  }
  if (isUniRefList(namespace, fileFormat)) {
    return unirefApiUrls.members(accession, {
      format: fileFormat as FileFormat.list,
      // TODO: remove when this endpoint has streaming https://www.ebi.ac.uk/panda/jira/browse/TRM-27650
      size: 500,
    });
  }
  return apiUrls.entryDownload(accession, fileFormat, namespace);
};

type DownloadAnchorProps = {
  accession: string;
  fileFormat: FileFormat;
  namespace: Namespace;
};

const DownloadAnchor = ({
  accession,
  fileFormat,
  namespace,
}: DownloadAnchorProps) => (
  <a
    target="_blank"
    href={getEntryDownloadUrl(accession, fileFormat, namespace)}
    rel="noreferrer"
  >
    {fileFormat}
  </a>
);

type Props = {
  nResults?: number;
};
const EntryDownload = ({ nResults }: Props) => {
  const match =
    useRouteMatch<{ namespace: Namespace; accession: string }>(allEntryPages);
  const { namespace, accession } = match?.params || {};
  const messagesDispatch = useMessagesDispatch();

  const fileFormatEntryDownload = namespace && formatMap.get(namespace);

  const downloadOnClick = useCallback(() => {
    if (namespace === Namespace.uniparc) {
      messagesDispatch(
        addMessage({
          id: 'uniparc-stream-warning',
          content: (
            <>
              There is a current limitation where UniParc cross reference TSV
              downloads are limited to 500 entries. Until this is fixed there
              are several options:
              <ul>
                <li>
                  Download the{' '}
                  <DownloadAnchor
                    accession={accession as string}
                    fileFormat={FileFormat.json}
                    namespace={namespace}
                  />{' '}
                  file format instead which includes all{' '}
                  <LongNumber>{nResults as number}</LongNumber> of the cross
                  references in the <pre>uniParcCrossReferences</pre> attribute
                </li>
                <li>
                  Continue to download the{' '}
                  <DownloadAnchor
                    accession={accession as string}
                    fileFormat={FileFormat.tsv}
                    namespace={namespace}
                  />{' '}
                  file format which only has only 500 entries (meaning{' '}
                  <LongNumber>{(nResults as number) - 500}</LongNumber> cross
                  references will not be downloaded)
                </li>
              </ul>
            </>
          ),
          format: MessageFormat.POP_UP,
          level: MessageLevel.WARNING,
        })
      );
    } else if (namespace === Namespace.uniref) {
      messagesDispatch(
        addMessage({
          id: 'uniref-stream-warning',
          content: (
            <>
              There is a current limitation where UniRef member list downloads
              are limited to 500 entries. Until this is fixed there are several
              options:
              <ul>
                <li>
                  View the{' '}
                  <Link
                    to={getLocationEntryPathFor(Location.HelpEntry)(
                      'pagination'
                    )}
                  >
                    pagination documenation
                  </Link>{' '}
                  to download all <LongNumber>{nResults as number}</LongNumber>{' '}
                  members programmatically
                </li>
                <li>
                  Continue to download the{' '}
                  <DownloadAnchor
                    accession={accession as string}
                    fileFormat={FileFormat.list}
                    namespace={namespace}
                  />{' '}
                  file format which only has only 500 entries (meaning{' '}
                  <LongNumber>{(nResults as number) - 500}</LongNumber> cross
                  references will not be downloaded)
                </li>
              </ul>
            </>
          ),
          format: MessageFormat.POP_UP,
          level: MessageLevel.WARNING,
        })
      );
    }
  }, [accession, messagesDispatch, nResults, namespace]);
  //
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
              {nResults &&
              nResults > maxPaginationDownload &&
              (isUniRefList(namespace, fileFormat) ||
                isUniparcTsv(namespace, fileFormat)) ? (
                <Button
                  variant="tertiary"
                  onClick={downloadOnClick}
                  style={{ color: colors.sapphireBlue }}
                >
                  {fileFormat}
                </Button>
              ) : (
                <DownloadAnchor
                  accession={accession}
                  fileFormat={fileFormat}
                  namespace={namespace}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </DropdownButton>
  );
};

export default EntryDownload;
