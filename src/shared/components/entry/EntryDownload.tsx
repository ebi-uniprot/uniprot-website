import { useEffect, useMemo, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { Button, ExternalLink, LongNumber } from 'franklin-sites';
import { pick } from 'lodash-es';
import cn from 'classnames';

import DownloadPreview from '../download/DownloadPreview';
import DownloadAPIURL from '../download/DownloadAPIURL';
import ColumnSelect from '../column-select/ColumnSelect';

import useDataApi from '../../hooks/useDataApi';

import apiUrls from '../../config/apiUrls/apiUrls';
import uniparcApiUrls from '../../../uniparc/config/apiUrls';
import unirefApiUrls from '../../../uniref/config/apiUrls';
import externalUrls from '../../config/externalUrls';
import {
  allEntryPages,
  getLocationEntryPathFor,
  Location,
} from '../../../app/config/urls';
import { stringifyUrl } from '../../utils/url';

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
import { UniProtkbAPIModel } from '../../../uniprotkb/adapters/uniProtkbConverter';

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

const uniprotkbFeatureFormats = [FileFormat.json, FileFormat.gff];
// GFF is not supported for specific fields. Once backend has got it enabled filtering in GFF too, we expose both formats
const uniprotkbSpecificFeatureFormats = [FileFormat.json];

const proteinsAPICommonFormats = [
  FileFormat.json,
  FileFormat.xml,
  FileFormat.gff,
];

const interProRepresentativeDomainsFormats = [FileFormat.json, FileFormat.tsv];
const alphaFoldCoordinatesFormats = [
  FileFormat.mmCIF,
  FileFormat.binaryCif,
  FileFormat.pdb,
];
const alphaFoldConfidenceFormats = [FileFormat.json];

// once it is OK to expose peff format, uncomment the following
// const proteinsAPIVariationFormats = [
//   ...proteinsAPICommonFormats,
//   FileFormat.peff,
// ];

export enum Dataset {
  uniprotData = 'Entry',
  features = 'Features Only',
  selectedFeatures = 'Features - ',
  variation = 'Variations (includes UniProtKB)',
  mutagenesis = 'Mutagenesis (includes UniProtKB)',
  coordinates = 'Genomic Coordinates',
  proteomics = 'Proteomics',
  proteomicsPtm = 'Proteomics-PTM',
  antigen = 'Antigen',
  interProRepresentativeDomains = 'InterPro Representative Domains',
  alphaFoldConfidence = 'AlphaFold Confidence',
  alphaFoldCoordinates = 'AlphaFold Coordinates',
}

const uniprotKBEntryDatasets = {
  UniProtKB: [Dataset.uniprotData, Dataset.features, Dataset.selectedFeatures],
  'Additional Datasets': [
    Dataset.variation,
    Dataset.mutagenesis,
    Dataset.coordinates,
    Dataset.proteomics,
    Dataset.proteomicsPtm,
    Dataset.antigen,
    Dataset.interProRepresentativeDomains,
    Dataset.alphaFoldConfidence,
    Dataset.alphaFoldCoordinates,
  ],
};

type AlphafoldPayloadEntry = {
  entryId: string;
  gene: string;
  uniprotAccession: string;
  uniprotId: string;
  uniprotDescription: string;
  taxId: number;
  organismScientificName: string;
  uniprotStart: number;
  uniprotEnd: number;
  uniprotSequence: string;
  modelCreatedDate: string;
  latestVersion: number;
  allVersions: number[];
  cifUrl: string;
  bcifUrl: string;
  pdbUrl: string;
  paeImageUrl: string;
  paeDocUrl: string;
  amAnnotationsUrl?: string;
};

type AlphafoldPayload = AlphafoldPayloadEntry[];

// TODO: add amAnnotationsUrl
type AlphaFoldUrls = Pick<
  AlphafoldPayloadEntry,
  'cifUrl' | 'bcifUrl' | 'pdbUrl'
> & { confidenceUrl?: string };

const maxPaginationDownload = 500;
const isUniparcTsv = (namespace: Namespace, fileFormat: FileFormat) =>
  namespace === Namespace.uniparc && fileFormat === FileFormat.tsv;
const isUniRefList = (namespace: Namespace, fileFormat: FileFormat) =>
  namespace === Namespace.uniref && fileFormat === FileFormat.list;
const getAlphaFoldUrls = (
  data?: AlphafoldPayload
): AlphaFoldUrls | undefined => {
  const first = data?.[0];
  if (!first) {
    return undefined;
  }
  const alphaFoldUrls = pick(first, ['cifUrl', 'bcifUrl', 'pdbUrl']);
  if (Object.values(alphaFoldUrls).some((url) => !url)) {
    return undefined;
  }
  return {
    ...alphaFoldUrls,
    confidenceUrl: alphaFoldUrls.cifUrl
      .replace('-model', '-confidence')
      .replace('.cif', '.json'),
  };
};

const getEntryDownloadUrl = (
  accession: string,
  fileFormat: FileFormat,
  namespace: Namespace,
  dataset: Dataset,
  columns?: Column[],
  fields?: string[],
  alphaFoldUrls?: AlphaFoldUrls
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
        });
      }

      const entryUrl = apiUrls.entry.download(accession, fileFormat, namespace);

      if (
        columns &&
        (fileFormat === FileFormat.tsv || fileFormat === FileFormat.excel)
      ) {
        return stringifyUrl(entryUrl, { fields: columns.join(',') });
      }

      return entryUrl;
    }
    case Dataset.features:
    case Dataset.selectedFeatures: {
      const entryUrl = apiUrls.entry.download(accession, fileFormat, namespace);
      return stringifyUrl(entryUrl, {
        fields: fields?.filter(Boolean).join(','),
      });
    }
    case Dataset.coordinates:
      return apiUrls.proteinsApi.coordinates(accession, fileFormat);
    case Dataset.variation:
      return apiUrls.proteinsApi.variation(accession, fileFormat);
    case Dataset.proteomics:
      return apiUrls.proteinsApi.proteomics(accession, fileFormat);
    case Dataset.proteomicsPtm:
      return apiUrls.proteinsApi.proteomicsPtm(accession, fileFormat);
    case Dataset.mutagenesis:
      return apiUrls.proteinsApi.mutagenesis(accession, fileFormat);
    case Dataset.antigen:
      return apiUrls.proteinsApi.antigen(accession, fileFormat);
    case Dataset.interProRepresentativeDomains:
      return fileFormat === FileFormat.tsv || fileFormat === FileFormat.json
        ? externalUrls.InterProRepresentativeDomains(accession, fileFormat)
        : '';
    case Dataset.alphaFoldCoordinates: {
      if (!alphaFoldUrls) {
        return '';
      }
      switch (fileFormat) {
        case FileFormat.binaryCif:
          return alphaFoldUrls.bcifUrl;
        case FileFormat.mmCIF:
          return alphaFoldUrls.cifUrl;
        case FileFormat.pdb:
          return alphaFoldUrls.pdbUrl;
        default:
          return '';
      }
    }
    case Dataset.alphaFoldConfidence:
      return alphaFoldUrls?.confidenceUrl || '';
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
  alphaFoldUrls?: AlphaFoldUrls;
};

const DownloadAnchor = ({
  accession,
  fileFormat,
  namespace,
  dataset,
  columns,
  alphaFoldUrls,
}: DownloadAnchorProps) => (
  <a
    target="_blank"
    href={getEntryDownloadUrl(
      accession,
      fileFormat,
      namespace,
      dataset,
      columns,
      undefined,
      alphaFoldUrls
    )}
    rel="noreferrer"
    download
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
  featureTypes?: string[];
  sequence?: string;
};

const EntryDownload = ({
  nResults,
  isoformsAvailable,
  onClose,
  columns,
  dataset,
  featureTypes,
  sequence,
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
    dataset || Dataset.uniprotData
  );
  const [extraContent, setExtraContent] = useState('');

  const { data } = useDataApi<ReceivedFieldData>(
    namespace &&
      namespace !== Namespace.uniparc &&
      (fileFormats?.includes(FileFormat.tsv) ||
        fileFormats?.includes(FileFormat.excel))
      ? apiUrls.configure.resultsFields(namespace)
      : null
  );
  const { data: resultFieldsData } = useDataApi<ReceivedFieldData>(
    namespace === Namespace.uniprotkb
      ? apiUrls.configure.resultsFields(namespace)
      : null
  );

  const uniprotFeaturesMap = useMemo(() => {
    const featuresMap = new Map();
    if (resultFieldsData) {
      const fields = resultFieldsData.flatMap((item) => item.fields);
      fields.forEach((element) => {
        if (element.name.startsWith('ft_')) {
          // There is a mismatch in the feature type returned by the backend between entry and result-field endpoints.
          // Two exceptions are Domain and Signal (in result fields they are named as 'Domain [FT]' and 'Signal peptide')
          if (element.name === 'ft_domain') {
            featuresMap.set('Domain', element.name);
          } else if (element.name === 'ft_signal') {
            featuresMap.set('Signal', element.name);
          } else {
            featuresMap.set(element.label, element.name);
          }
        }
      });
    }
    return featuresMap;
  }, [resultFieldsData]);

  const availableDatasets: Dataset[] = [];

  const entryFeatures = useDataApi<UniProtkbAPIModel>(
    namespace === Namespace.uniprotkb && accession
      ? apiUrls.entry.entry(accession, namespace)
      : ''
  );

  const proteinsApiVariation = useDataApi(
    namespace === Namespace.uniprotkb && accession
      ? apiUrls.proteinsApi.variation(accession)
      : '',
    { method: 'HEAD' }
  );

  const proteinsApiProteomics = useDataApi(
    namespace === Namespace.uniprotkb && accession
      ? apiUrls.proteinsApi.proteomics(accession)
      : '',
    { method: 'HEAD' }
  );

  const proteinsApiPTMs = useDataApi(
    namespace === Namespace.uniprotkb && accession
      ? apiUrls.proteinsApi.proteomicsPtm(accession)
      : '',
    { method: 'HEAD' }
  );

  const proteinsApiMutagenesis = useDataApi(
    namespace === Namespace.uniprotkb && accession
      ? apiUrls.proteinsApi.mutagenesis(accession)
      : '',
    { method: 'HEAD' }
  );

  const proteinsApiAntigen = useDataApi(
    namespace === Namespace.uniprotkb && accession
      ? apiUrls.proteinsApi.antigen(accession)
      : '',
    { method: 'HEAD' }
  );

  const proteinsApiCoordinates = useDataApi(
    namespace === Namespace.uniprotkb && accession
      ? apiUrls.proteinsApi.coordinates(accession)
      : '',
    { method: 'HEAD' }
  );

  const interProRepresentativeDomains = useDataApi(
    (namespace === Namespace.uniprotkb || namespace === Namespace.uniparc) &&
      accession
      ? externalUrls.InterProRepresentativeDomains(accession)
      : '',
    { method: 'HEAD' }
  );

  const alphaFoldPrediction = useDataApi<AlphafoldPayload>(
    namespace === Namespace.uniprotkb && accession
      ? externalUrls.AlphaFoldPrediction(accession)
      : ''
  );

  const alphaFoldUrls =
    // As there can be a build mismatch only use AlphaFold predictions if the sequence is the same as the entry's
    sequence && sequence === alphaFoldPrediction?.data?.[0].uniprotSequence
      ? getAlphaFoldUrls(alphaFoldPrediction?.data)
      : undefined;

  if (alphaFoldUrls) {
    availableDatasets.push(Dataset.alphaFoldCoordinates);
    availableDatasets.push(Dataset.alphaFoldConfidence);
  }

  if (!entryFeatures.loading && entryFeatures.data) {
    if (entryFeatures.data?.features) {
      availableDatasets.push(Dataset.features);
    }
  }
  if (
    !proteinsApiVariation.loading &&
    proteinsApiVariation.status === 200 &&
    // Proteins associated with a proteome will have status code of 200 even if there is no variation data. All proteins that belong to a proteome are included in the XML file.
    // So that we can fetch PEFF fasta (which variation API supports) for all proteins that belong to a single proteome.
    // Use 'x-feature-records' form the headers to check in this case
    proteinsApiVariation.headers?.['x-feature-records'] !== '0'
  ) {
    availableDatasets.push(Dataset.variation);
  }
  if (!proteinsApiProteomics.loading && proteinsApiProteomics.status === 200) {
    availableDatasets.push(Dataset.proteomics);
  }
  if (!proteinsApiPTMs.loading && proteinsApiPTMs.status === 200) {
    availableDatasets.push(Dataset.proteomicsPtm);
  }
  if (
    !proteinsApiMutagenesis.loading &&
    proteinsApiMutagenesis.status === 200
  ) {
    availableDatasets.push(Dataset.mutagenesis);
  }
  if (!proteinsApiAntigen.loading && proteinsApiAntigen.status === 200) {
    availableDatasets.push(Dataset.antigen);
  }
  if (
    !proteinsApiCoordinates.loading &&
    proteinsApiCoordinates.status === 200
  ) {
    availableDatasets.push(Dataset.coordinates);
  }
  if (
    !interProRepresentativeDomains.loading &&
    interProRepresentativeDomains.status === 200
  ) {
    availableDatasets.push(Dataset.interProRepresentativeDomains);
  }

  useEffect(() => {
    if (data) {
      const fields = data[0]?.fields?.flatMap((item) => item.name);
      setDownloadColumns(fields);
    }
  }, [data]);

  useEffect(() => {
    switch (selectedDataset) {
      case Dataset.uniprotData:
        setFileFormats(namespace ? formatMap.get(namespace) : []);
        break;
      case Dataset.features:
        setFileFormats(uniprotkbFeatureFormats);
        break;
      case Dataset.selectedFeatures:
        setFileFormats(uniprotkbSpecificFeatureFormats);
        break;
      // case Dataset.variation:
      //   setFileFormats(proteinsAPIVariationFormats);
      //   break;
      case Dataset.variation:
      case Dataset.proteomics:
      case Dataset.proteomicsPtm:
      case Dataset.coordinates:
      case Dataset.antigen:
      case Dataset.mutagenesis:
        setFileFormats(proteinsAPICommonFormats);
        break;
      case Dataset.interProRepresentativeDomains:
        setFileFormats(interProRepresentativeDomainsFormats);
        break;
      case Dataset.alphaFoldConfidence:
        setFileFormats(alphaFoldConfidenceFormats);
        break;
      case Dataset.alphaFoldCoordinates:
        setFileFormats(alphaFoldCoordinatesFormats);
        break;
      default:
        break;
    }
  }, [namespace, selectedDataset]);

  useEffect(() => {
    if (fileFormats) {
      setSelectedFormat(fileFormats[0]);
    }
  }, [fileFormats]);

  let additionalInformation: JSX.Element | null = null;
  let extraContentNode: JSX.Element | null = null;

  if (!(namespace && accession && fileFormats)) {
    return null;
  }

  const uniprotkbFields = featureTypes?.map((type) =>
    uniprotFeaturesMap.get(type)
  );

  const downloadUrl = getEntryDownloadUrl(
    accession,
    selectedFormat || FileFormat.fasta,
    namespace,
    selectedDataset,
    downloadColumns,
    selectedDataset === Dataset.selectedFeatures
      ? uniprotkbFields
      : Array.from(uniprotFeaturesMap.values()),
    alphaFoldUrls
  );

  const previewFileFormat =
    selectedFormat === FileFormat.excel ? FileFormat.tsv : selectedFormat;

  const previewUrl = getEntryDownloadUrl(
    accession,
    previewFileFormat || FileFormat.fasta,
    namespace,
    selectedDataset,
    downloadColumns,
    selectedDataset === Dataset.selectedFeatures
      ? uniprotkbFields
      : Array.from(uniprotFeaturesMap.values()),
    alphaFoldUrls
  );

  if (nResults && nResults > maxPaginationDownload) {
    if (
      namespace === Namespace.uniparc &&
      (selectedFormat === FileFormat.tsv || selectedFormat === FileFormat.excel)
    ) {
      additionalInformation = (
        <div>
          There is a current limitation where UniParc cross-reference{' '}
          {selectedFormat} downloads are limited to {maxPaginationDownload}{' '}
          entries. Until this is fixed, there are several options:
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
        </div>
      );
    }
    if (namespace === Namespace.uniref && selectedFormat === FileFormat.list) {
      additionalInformation = (
        <div>
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
        </div>
      );
    }
  }
  if (
    selectedDataset === Dataset.selectedFeatures &&
    featureTypes?.includes('Modified residue (large scale data)')
  ) {
    additionalInformation = (
      <div>
        There are additional PTM data available from large scale studies for
        this entry. It is provided by the{' '}
        <ExternalLink
          url={`${apiUrls.proteinsApi.proteinsApiPrefix}/doc/#/proteomics-ptm`}
        >
          Proteomics-ptm
        </ExternalLink>{' '}
        service of Proteins API in the{' '}
        <DownloadAnchor
          accession={accession as string}
          fileFormat={FileFormat.json}
          namespace={namespace}
          dataset={Dataset.proteomicsPtm}
        />{' '}
        file format.
      </div>
    );
  }

  if (extraContent === 'preview') {
    extraContentNode = (
      <DownloadPreview
        previewUrl={previewUrl}
        previewFileFormat={previewFileFormat}
        acceptHeaderOverride={
          selectedDataset === Dataset.interProRepresentativeDomains
            ? '*/*'
            : undefined
        }
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

  return (
    <>
      {namespace === Namespace.uniprotkb && (
        <fieldset>
          <label>
            <span data-article-id="programmatic_access">Dataset</span>
            <select
              id="dataset-select"
              data-testid="dataset-select"
              value={selectedDataset || dataset}
              onChange={(e) => setSelectedDataset(e.target.value as Dataset)}
            >
              {Object.entries(uniprotKBEntryDatasets).map(([key, value]) => (
                <optgroup label={key} key={key}>
                  {value.map((datasetOption) => {
                    if (datasetOption === Dataset.selectedFeatures) {
                      if (featureTypes) {
                        const uniprotKBFeatures = featureTypes.filter(
                          (type) =>
                            type !== 'Modified residue (large scale data)'
                        );
                        return (
                          <option
                            value={datasetOption}
                            key={`${datasetOption} (${uniprotKBFeatures.join(
                              ','
                            )})`}
                          >
                            {datasetOption} {uniprotKBFeatures.join(', ')}
                          </option>
                        );
                      }
                      return null;
                    }
                    return (
                      <option
                        value={datasetOption}
                        key={datasetOption}
                        disabled={
                          datasetOption !== Dataset.uniprotData &&
                          !availableDatasets?.includes(datasetOption)
                        }
                      >
                        {datasetOption}&emsp;&emsp;&emsp;
                        {datasetOption !== Dataset.uniprotData &&
                          !availableDatasets?.includes(datasetOption) &&
                          '(No data available)'}
                      </option>
                    );
                  })}
                </optgroup>
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
              <option
                value={format}
                key={format}
                disabled={
                  format === FileFormat.fastaCanonicalIsoform &&
                  !isoformsAvailable
                }
              >
                {format}
              </option>
            ))}
          </select>
        </label>
      </fieldset>

      {(selectedFormat === FileFormat.tsv ||
        selectedFormat === FileFormat.excel) &&
        selectedDataset !== Dataset.interProRepresentativeDomains &&
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
          download
        >
          Download
        </a>
      </section>
      <section>
        {additionalInformation}
        <br />
        {extraContentNode}
      </section>
    </>
  );
};

export default EntryDownload;
