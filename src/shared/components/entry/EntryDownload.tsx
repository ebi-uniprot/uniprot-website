import { useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { Button, LongNumber } from 'franklin-sites';
import cn from 'classnames';

import DownloadPreview from '../download/DownloadPreview';
import DownloadAPIURL from '../download/DownloadAPIURL';
import ColumnSelect from '../column-select/ColumnSelect';

import useDataApi from '../../hooks/useDataApi';

import apiUrls, { proteinsApi } from '../../config/apiUrls';
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

import { FileFormat } from '../../types/resultsDownload';
import { Namespace } from '../../types/namespaces';
import {
  DownloadMethod,
  DownloadPanelFormCloseReason,
} from '../../utils/gtagEvents';
import { Column } from '../../config/columns';
import { ReceivedFieldData } from '../../../uniprotkb/types/resultsTypes';

import sticky from '../../styles/sticky.module.scss';
import styles from '../download/styles/download.module.scss';

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

const proteinsAPIVariationFormats = [
  FileFormat.json,
  FileFormat.xml,
  FileFormat.gff,
  FileFormat.peff,
];

const proteinsAPIProteomicsAndGenomicCoordinatesFormats = [
  FileFormat.json,
  FileFormat.xml,
  FileFormat.gff,
];

enum Dataset {
  uniprotData = 'UniProt API',
  variation = 'Proteins API - Variations',
  coordinates = 'Proteins API - Genomic Coordinates',
  proteomicsPtm = 'Proteins API - Proteomics-PTM',
}

const uniprotKBDatasets = [
  Dataset.uniprotData,
  Dataset.variation,
  Dataset.coordinates,
  Dataset.proteomicsPtm,
];

const maxPaginationDownload = 500;
const isUniparcTsv = (namespace: Namespace, fileFormat: FileFormat) =>
  namespace === Namespace.uniparc && fileFormat === FileFormat.tsv;
const isUniRefList = (namespace: Namespace, fileFormat: FileFormat) =>
  namespace === Namespace.uniref && fileFormat === FileFormat.list;

const getEntryDownloadUrl = (
  accession: string,
  fileFormat: FileFormat,
  namespace: Namespace,
  dataset: Dataset,
  columns?: Column[]
) => {
  switch (dataset) {
    case Dataset.uniprotData: {
      if (isUniparcTsv(namespace, fileFormat)) {
        return uniparcApiUrls.databases(accession, {
          format: fileFormat as FileFormat.tsv,
          // TODO: remove when this endpoint has streaming https://www.ebi.ac.uk/panda/jira/browse/TRM-27649
          size: 500,
          fields: columns?.join(','),
        });
      }
      if (isUniRefList(namespace, fileFormat)) {
        return unirefApiUrls.members(accession, {
          format: fileFormat as FileFormat.list,
          // TODO: remove when this endpoint has streaming https://www.ebi.ac.uk/panda/jira/browse/TRM-27650
          size: 500,
          fields: columns?.join(','),
        });
      }

      const entryUrl = apiUrls.entryDownload(accession, fileFormat, namespace);
      if (columns) {
        return `${entryUrl}?fields=${columns.join(',')}`;
      }
      return entryUrl;
    }
    case Dataset.coordinates:
      return `${proteinsApi.coordinates(accession)}?format=${fileFormat}`;
    case Dataset.variation:
      return `${proteinsApi.variation(accession)}?format=${fileFormat}`;
    case Dataset.proteomicsPtm:
      return `${proteinsApi.proteomicsPtm(accession)}?format=${fileFormat}`;
    default:
      return '';
  }
};

type DownloadAnchorProps = {
  accession: string;
  fileFormat: FileFormat;
  namespace: Namespace;
  dataset: Dataset;
  columns?: Column[];
};

const DownloadAnchor = ({
  accession,
  fileFormat,
  namespace,
  dataset,
  columns,
}: DownloadAnchorProps) => (
  <a
    target="_blank"
    href={getEntryDownloadUrl(
      accession,
      fileFormat,
      namespace,
      dataset,
      columns
    )}
    rel="noreferrer"
  >
    {fileFormat}
  </a>
);

export type EntryDownloadProps = {
  nResults?: number;
  isoformsAvailable?: boolean;
  onClose: (
    panelCloseReason: DownloadPanelFormCloseReason,
    downloadMethod?: DownloadMethod
  ) => void;
  columns?: Column[];
  dataset?: Dataset;
};

const EntryDownload = ({
  nResults,
  isoformsAvailable,
  onClose,
  columns,
  dataset,
}: EntryDownloadProps) => {
  const match = useRouteMatch<{ namespace: Namespace; accession: string }>(
    allEntryPages
  );
  const { namespace, accession } = match?.params || {};

  const [downloadColumns, setDownloadColumns] = useState(columns);
  const [fileFormats, setFileFormats] = useState(
    namespace && formatMap.get(namespace)
  );
  const [selectedFormat, setSelectedFormat] = useState(fileFormats?.[0]);
  const [selectedDataset, setSelectedDataset] = useState(
    dataset || uniprotKBDatasets[0]
  );
  const [extraContent, setExtraContent] = useState('');

  const { data } = useDataApi<ReceivedFieldData>(
    namespace &&
      namespace !== Namespace.uniparc &&
      (fileFormats?.includes(FileFormat.tsv) ||
        fileFormats?.includes(FileFormat.excel))
      ? apiUrls.resultsFields(namespace)
      : null
  );

  useEffect(() => {
    if (data) {
      const fields = data[0]?.fields?.flatMap((item) => item.name);
      setDownloadColumns(fields);
    }
  }, [data]);

  useEffect(() => {
    if (
      fileFormats?.includes(FileFormat.fastaCanonicalIsoform) &&
      !isoformsAvailable
    ) {
      setFileFormats(
        fileFormats.splice(
          fileFormats.indexOf(FileFormat.fastaCanonicalIsoform),
          1
        )
      );
    }
  }, [fileFormats, isoformsAvailable]);

  useEffect(() => {
    switch (selectedDataset) {
      case Dataset.uniprotData:
        setFileFormats(namespace ? formatMap.get(namespace) : []);
        break;
      case Dataset.variation:
        setFileFormats(proteinsAPIVariationFormats);
        break;
      case Dataset.proteomicsPtm:
      case Dataset.coordinates:
        setFileFormats(proteinsAPIProteomicsAndGenomicCoordinatesFormats);
        break;
      default:
        break;
    }
  }, [namespace, selectedDataset]);

  let extraContentNode: JSX.Element | null = null;

  if (!(namespace && accession && fileFormats)) {
    return null;
  }

  const downloadUrl = getEntryDownloadUrl(
    accession,
    selectedFormat || FileFormat.fasta,
    namespace,
    selectedDataset,
    downloadColumns
  );

  const previewFileFormat =
    selectedFormat === FileFormat.excel ? FileFormat.tsv : selectedFormat;
  const previewUrl = getEntryDownloadUrl(
    accession,
    previewFileFormat || FileFormat.fasta,
    namespace,
    selectedDataset,
    downloadColumns
  );

  if (extraContent === 'preview') {
    extraContentNode = (
      <DownloadPreview
        previewUrl={previewUrl}
        previewFileFormat={previewFileFormat}
      />
    );
  } else if (extraContent === 'url') {
    extraContentNode = (
      <DownloadAPIURL
        apiURL={downloadUrl}
        onCopy={() => onClose('copy', 'api-url')}
        isEntry
      />
    );
  }

  if (nResults && nResults > maxPaginationDownload) {
    if (
      namespace === Namespace.uniparc &&
      (selectedFormat === FileFormat.tsv || selectedFormat === FileFormat.excel)
    ) {
      extraContentNode = (
        <>
          There is a current limitation where UniParc cross-reference{' '}
          {selectedFormat}
          downloads are limited to {maxPaginationDownload} entries. Until this
          is fixed, there are several options:
          <ul>
            <li>
              Download the{' '}
              <DownloadAnchor
                accession={accession as string}
                fileFormat={FileFormat.json}
                namespace={namespace}
                dataset={selectedDataset}
                columns={downloadColumns}
              />{' '}
              file format instead which includes all{' '}
              <LongNumber>{nResults as number}</LongNumber> of the
              cross-references in the <pre>uniParcCrossReferences</pre>{' '}
              attribute
            </li>
            <li>
              Continue to download the{' '}
              <DownloadAnchor
                accession={accession as string}
                fileFormat={selectedFormat}
                namespace={namespace}
                dataset={selectedDataset}
                columns={downloadColumns}
              />{' '}
              file format which has only {maxPaginationDownload} entries
              (meaning <LongNumber>{(nResults as number) - 500}</LongNumber>{' '}
              cross-references will not be downloaded)
            </li>
          </ul>
        </>
      );
    }
    if (namespace === Namespace.uniref && selectedFormat === FileFormat.list) {
      extraContentNode = (
        <>
          There is a current limitation where UniRef member list downloads are
          limited to {maxPaginationDownload} entries. Until this is fixed, there
          are several options:
          <ul>
            <li>
              View the{' '}
              <Link
                to={getLocationEntryPathFor(Location.HelpEntry)('pagination')}
              >
                pagination documentation
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
                dataset={selectedDataset}
                columns={downloadColumns}
              />{' '}
              file format which has only {maxPaginationDownload} entries
              (meaning <LongNumber>{(nResults as number) - 500}</LongNumber>{' '}
              members will not be downloaded)
            </li>
          </ul>
        </>
      );
    }
  }

  return (
    <>
      {namespace === Namespace.uniprotkb && (
        <fieldset>
          <label>
            <span data-article-id="programmatic_access">Dataset</span>
            <select
              id="dataset-select"
              data-testid="dataset-select"
              value={selectedDataset}
              onChange={(e) => setSelectedDataset(e.target.value as Dataset)}
            >
              {uniprotKBDatasets.map((dataset) => (
                <option value={dataset} key={dataset}>
                  {dataset}
                </option>
              ))}
            </select>
          </label>
        </fieldset>
      )}

      <fieldset>
        <label>
          Format
          <select
            id="file-format-select"
            data-testid="file-format-select"
            value={selectedFormat}
            onChange={(e) => setSelectedFormat(e.target.value as FileFormat)}
          >
            {fileFormats.map((format) => (
              <option value={format} key={format}>
                {format}
              </option>
            ))}
          </select>
        </label>
      </fieldset>

      {(selectedFormat === FileFormat.tsv ||
        selectedFormat === FileFormat.excel) &&
        downloadColumns && (
          <>
            <legend>Customize columns</legend>
            <ColumnSelect
              onChange={(columns) => setDownloadColumns(columns)}
              selectedColumns={downloadColumns}
              namespace={namespace}
              isEntryPage={namespace === Namespace.uniparc}
            />
          </>
        )}

      <section
        className={cn(
          'button-group',
          'sliding-panel__button-row',
          sticky['sticky-bottom-right'],
          styles['action-buttons']
        )}
      >
        <Button variant="tertiary" onClick={() => setExtraContent('url')}>
          Generate URL for API
        </Button>
        <Button variant="tertiary" onClick={() => setExtraContent('preview')}>
          Preview
        </Button>
        <Button variant="secondary" onClick={() => onClose('cancel')}>
          Cancel
        </Button>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a
          href={downloadUrl}
          className={cn('button', 'primary')}
          title="Download file"
          target="_blank"
          rel="noreferrer"
          onClick={() => onClose('download', 'sync')}
        >
          Download
        </a>
      </section>
      <section>{extraContentNode}</section>
    </>
  );
};

export default EntryDownload;
