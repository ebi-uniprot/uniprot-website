import type { AlphaFoldPayload } from '@nightingale-elements/nightingale-structure';
import cn from 'classnames';
import { Button, LongNumber } from 'franklin-sites';
import { type JSX, useEffect, useMemo, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';

import { allEntryPages } from '../../../app/config/urls';
import { fileFormatEntryDownload as arbaFFED } from '../../../automatic-annotations/arba/config/download';
import { fileFormatEntryDownload as uniRuleFFED } from '../../../automatic-annotations/unirule/config/download';
import { fileFormatEntryDownload as proteomesFFED } from '../../../proteomes/config/download';
import { fileFormatEntryDownload as citationsFFED } from '../../../supporting-data/citations/config/download';
import { fileFormatEntryDownload as databaseFFED } from '../../../supporting-data/database/config/download';
import { fileFormatEntryDownload as diseasesFFED } from '../../../supporting-data/diseases/config/download';
import { fileFormatEntryDownload as keywordsFFED } from '../../../supporting-data/keywords/config/download';
import { fileFormatEntryDownload as locationsFFED } from '../../../supporting-data/locations/config/download';
import { fileFormatEntryDownload as taxonomyFFED } from '../../../supporting-data/taxonomy/config/download';
import { type SubEntryAnnotationDownload } from '../../../uniparc/adapters/subEntryAnnotations';
import uniparcApiUrls from '../../../uniparc/config/apiUrls';
import { fileFormatEntryDownload as uniParcFFED } from '../../../uniparc/config/download';
import { type UniProtkbAPIModel } from '../../../uniprotkb/adapters/uniProtkbConverter';
import { fileFormatEntryDownload as uniProtKBFFED } from '../../../uniprotkb/config/download';
import { type ReceivedFieldData } from '../../../uniprotkb/types/resultsTypes';
import unirefApiUrls from '../../../uniref/config/apiUrls';
import { fileFormatEntryDownload as uniRefFFED } from '../../../uniref/config/download';
import apiUrls from '../../config/apiUrls/apiUrls';
import { type Column } from '../../config/columns';
import externalUrls from '../../config/externalUrls';
import useDataApi from '../../hooks/useDataApi';
import sticky from '../../styles/sticky.module.scss';
import { Namespace } from '../../types/namespaces';
import { FileFormat } from '../../types/resultsDownload';
import generateAndDownloadJSON from '../../utils/generateAndDownloadJSON';
import {
  type DownloadMethod,
  type DownloadPanelFormCloseReason,
} from '../../utils/gtagEvents';
import * as logging from '../../utils/logging';
import { stringifyUrl } from '../../utils/url';
import ColumnSelect from '../column-select/ColumnSelect';
import DownloadAPIURL from '../download/DownloadAPIURL';
import DownloadPreview from '../download/DownloadPreview';
import styles from '../download/styles/download.module.scss';
import ExternalLink from '../ExternalLink';

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
const alphaMissenseAnnotationsFormats = [FileFormat.csv];

const proteinsAPIVariationFormats = [
  ...proteinsAPICommonFormats,
  FileFormat.peff,
];

export enum Dataset {
  uniprotData = 'Entry',
  features = 'Features Only',
  selectedFeatures = 'Features - ',
  variation = 'Variations (includes UniProtKB)',
  mutagenesis = 'Mutagenesis (includes UniProtKB)',
  coordinates = 'Genomic Coordinates',
  proteomicsNonPtm = 'Proteomics-nonPTM',
  proteomicsPtm = 'Proteomics-PTM',
  ProteomicsHpp = 'Human Proteome Project',
  epitope = 'Epitope',
  antigen = 'Antigen',
  rnaEditing = 'RNA Editing',
  interProRepresentativeDomains = 'InterPro Representative Domains',
  alphaFoldConfidence = 'AlphaFold Confidence',
  alphaFoldCoordinates = 'AlphaFold Coordinates',
  alphaMissenseAnnotations = 'AlphaMissense Annotations',
  subEntryAnnotation = 'Sub-entry annotation',
}

const uniprotKBEntryDatasets = {
  UniProtKB: [Dataset.uniprotData, Dataset.features, Dataset.selectedFeatures],
  'Additional Datasets': [
    Dataset.variation,
    Dataset.rnaEditing,
    Dataset.mutagenesis,
    Dataset.coordinates,
    Dataset.proteomicsNonPtm,
    Dataset.proteomicsPtm,
    Dataset.ProteomicsHpp,
    Dataset.epitope,
    Dataset.antigen,
    Dataset.interProRepresentativeDomains,
    Dataset.alphaFoldConfidence,
    Dataset.alphaFoldCoordinates,
    Dataset.alphaMissenseAnnotations,
  ],
};

type AlphaFoldPayloadEntry = AlphaFoldPayload[number];

type AlphaFoldUrls = Pick<
  AlphaFoldPayloadEntry,
  'cifUrl' | 'bcifUrl' | 'pdbUrl' | 'amAnnotationsUrl'
> & { confidenceUrl: string };

const maxPaginationDownload = 500;
const isUniparcTsv = (namespace: Namespace, fileFormat: FileFormat) =>
  namespace === Namespace.uniparc && fileFormat === FileFormat.tsv;
const isUniRefList = (namespace: Namespace, fileFormat: FileFormat) =>
  namespace === Namespace.uniref && fileFormat === FileFormat.list;
const getAlphaFoldUrls = (
  alphaFoldPayloadEntry: AlphaFoldPayloadEntry
): AlphaFoldUrls | undefined => {
  const { cifUrl, bcifUrl, pdbUrl, amAnnotationsUrl } = alphaFoldPayloadEntry;
  return cifUrl && bcifUrl && pdbUrl
    ? {
        cifUrl,
        bcifUrl,
        pdbUrl,
        amAnnotationsUrl,
        confidenceUrl: cifUrl
          .replace('-model', '-confidence')
          .replace('.cif', '.json'),
      }
    : undefined;
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
        return uniparcApiUrls.databases(accession, undefined, false, true, {
          format: fileFormat as FileFormat.tsv,
          fields: columns?.join(','),
        });
      }
      if (isUniRefList(namespace, fileFormat)) {
        return unirefApiUrls.members(accession, true, {
          format: fileFormat as FileFormat.list,
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
    case Dataset.rnaEditing:
      return apiUrls.proteinsApi.rnaEditing(accession, fileFormat);
    case Dataset.proteomicsNonPtm:
      return apiUrls.proteinsApi.proteomicsNonPtm(accession, fileFormat);
    case Dataset.proteomicsPtm:
      return apiUrls.proteinsApi.proteomicsPtm(accession, fileFormat);
    case Dataset.ProteomicsHpp:
      return apiUrls.proteinsApi.proteomicsHpp(accession, fileFormat);
    case Dataset.mutagenesis:
      return apiUrls.proteinsApi.mutagenesis(accession, fileFormat);
    case Dataset.antigen:
      return apiUrls.proteinsApi.antigen(accession, fileFormat);
    case Dataset.epitope:
      return apiUrls.proteinsApi.epitope(accession, fileFormat);
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
    case Dataset.alphaMissenseAnnotations:
      return alphaFoldUrls?.amAnnotationsUrl || '';
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
  // When set, the format selector gains an "Annotation" optgroup offering the
  // sub-entry's annotations as JSON (UniParc sub-entry pages only).
  subEntryAnnotationDownload?: SubEntryAnnotationDownload;
};

const EntryDownload = ({
  nResults,
  isoformsAvailable,
  onClose,
  columns,
  dataset,
  featureTypes,
  sequence,
  subEntryAnnotationDownload,
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
    // The sub-entry annotation is the contextually relevant download, so make
    // it the default selection when offered.
    subEntryAnnotationDownload
      ? Dataset.subEntryAnnotation
      : dataset || Dataset.uniprotData
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

  const proteinsApiRnaEditing = useDataApi(
    namespace === Namespace.uniprotkb && accession
      ? apiUrls.proteinsApi.rnaEditing(accession)
      : '',
    { method: 'HEAD' }
  );

  const proteinsApiProteomicsNonPtm = useDataApi(
    namespace === Namespace.uniprotkb && accession
      ? apiUrls.proteinsApi.proteomicsNonPtm(accession)
      : '',
    { method: 'HEAD' }
  );

  const proteinsApiPTMs = useDataApi(
    namespace === Namespace.uniprotkb && accession
      ? apiUrls.proteinsApi.proteomicsPtm(accession)
      : '',
    { method: 'HEAD' }
  );

  const proteinsApiHpp = useDataApi(
    namespace === Namespace.uniprotkb && accession
      ? apiUrls.proteinsApi.proteomicsHpp(accession)
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

  const proteinsApiEpitope = useDataApi(
    namespace === Namespace.uniprotkb && accession
      ? apiUrls.proteinsApi.epitope(accession)
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

  const alphaFoldPrediction = useDataApi<AlphaFoldPayload>(
    namespace === Namespace.uniprotkb && accession
      ? externalUrls.AlphaFoldPrediction(accession)
      : ''
  );

  // As there can be a build mismatch only use AlphaFold predictions if the sequence is the same as the entry's
  // Also need now need to filter all AF results as the canonical can be anywhere the array.
  let alphaFoldUrls;
  if (alphaFoldPrediction?.data) {
    const alphaFoldSequenceMatch = alphaFoldPrediction.data.filter(
      (af) => af.sequence === sequence
    );
    if (alphaFoldSequenceMatch.length === 1) {
      alphaFoldUrls = getAlphaFoldUrls(alphaFoldSequenceMatch[0]);
    } else if (alphaFoldSequenceMatch.length > 1) {
      logging.warn(
        `Found more than one match (${alphaFoldSequenceMatch.length}) for AlphaFold against accession ${accession} with protein sequence: ${sequence}`
      );
    }
  }
  if (alphaFoldUrls) {
    availableDatasets.push(Dataset.alphaFoldCoordinates);
    availableDatasets.push(Dataset.alphaFoldConfidence);
    if (alphaFoldUrls.amAnnotationsUrl) {
      availableDatasets.push(Dataset.alphaMissenseAnnotations);
    }
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
  if (!proteinsApiRnaEditing.loading && proteinsApiRnaEditing.status === 200) {
    availableDatasets.push(Dataset.rnaEditing);
  }
  if (
    !proteinsApiProteomicsNonPtm.loading &&
    proteinsApiProteomicsNonPtm.status === 200
  ) {
    availableDatasets.push(Dataset.proteomicsNonPtm);
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
  if (!proteinsApiHpp.loading && proteinsApiHpp.status === 200) {
    availableDatasets.push(Dataset.ProteomicsHpp);
  }
  if (!proteinsApiEpitope.loading && proteinsApiEpitope.status === 200) {
    availableDatasets.push(Dataset.epitope);
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
      // eslint-disable-next-line @eslint-react/set-state-in-effect -- seeds the editable column selection from fetched field metadata
      setDownloadColumns(fields);
    }
  }, [data]);

  useEffect(() => {
    /* eslint-disable @eslint-react/set-state-in-effect -- the available file formats are a function of the selected dataset/namespace */
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
      case Dataset.variation:
        setFileFormats(proteinsAPIVariationFormats);
        break;
      case Dataset.proteomicsNonPtm:
      case Dataset.proteomicsPtm:
      case Dataset.coordinates:
      case Dataset.antigen:
      case Dataset.ProteomicsHpp:
      case Dataset.epitope:
      case Dataset.rnaEditing:
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
      case Dataset.alphaMissenseAnnotations:
        setFileFormats(alphaMissenseAnnotationsFormats);
        break;
      default:
        break;
    }
    /* eslint-enable @eslint-react/set-state-in-effect */
  }, [namespace, selectedDataset]);

  useEffect(() => {
    if (fileFormats) {
      // eslint-disable-next-line @eslint-react/set-state-in-effect -- resets the selected format when the available formats change
      setSelectedFormat(fileFormats[0]);
    }
  }, [fileFormats]);

  // `selectedDataset` is React state, so it can outlive the annotation prop
  // that seeded its initial value. If the prop goes away, reset it so the
  // dialog never holds `subEntryAnnotation` with no matching option (which
  // would otherwise leave the Download control with an empty URL).
  useEffect(() => {
    if (
      !subEntryAnnotationDownload &&
      selectedDataset === Dataset.subEntryAnnotation
    ) {
      // eslint-disable-next-line @eslint-react/set-state-in-effect -- resets the dataset when the prop that seeded it disappears
      setSelectedDataset(dataset || Dataset.uniprotData);
    }
  }, [subEntryAnnotationDownload, selectedDataset, dataset]);

  let additionalInformation: JSX.Element | null = null;
  let extraContentNode: JSX.Element | null = null;

  if (!(namespace && accession && fileFormats)) {
    return null;
  }

  const uniprotkbFields = featureTypes?.map((type) =>
    uniprotFeaturesMap.get(type)
  );

  // Sub-entry annotation download. Precomputed has a real endpoint; UniFire is
  // serialised to JSON on the fly (`isGeneratedAnnotation`), so it has no URL.
  const isAnnotation = selectedDataset === Dataset.subEntryAnnotation;
  const isGeneratedAnnotation =
    isAnnotation && subEntryAnnotationDownload?.source === 'unifire';
  const annotationApiURL =
    subEntryAnnotationDownload?.source === 'precomputed'
      ? subEntryAnnotationDownload.apiURL
      : '';

  const downloadUrl = isAnnotation
    ? annotationApiURL
    : getEntryDownloadUrl(
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

  // The annotation preview is always JSON; for everything else it follows the
  // selected format (Excel previews as TSV — the preview endpoint can't return
  // a binary xlsx, and TSV is the closest tabular equivalent).
  const previewFileFormat = isAnnotation
    ? FileFormat.json
    : selectedFormat === FileFormat.excel
      ? FileFormat.tsv
      : selectedFormat;

  const previewUrl = isAnnotation
    ? annotationApiURL
    : getEntryDownloadUrl(
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

  // The on-the-fly UniFire annotation has no URL — pass the model to
  // `DownloadPreview` directly and let it skip the fetch.
  const previewData =
    isGeneratedAnnotation && subEntryAnnotationDownload?.source === 'unifire'
      ? subEntryAnnotationDownload.model
      : undefined;

  if (!isAnnotation && nResults && nResults > maxPaginationDownload) {
    if (
      namespace === Namespace.uniparc &&
      selectedFormat === FileFormat.excel
    ) {
      additionalInformation = (
        <div>
          UniParc cross reference {selectedFormat} downloads are limited to{' '}
          {maxPaginationDownload} entries (meaning{' '}
          <LongNumber>{(nResults as number) - 500}</LongNumber> cross references
          will not be downloaded). There are alternative options available:
          <ul>
            <li>
              For use in Excel, please use{' '}
              <DownloadAnchor
                accession={accession as string}
                fileFormat={FileFormat.tsv}
                namespace={namespace}
                dataset={selectedDataset}
                columns={downloadColumns}
              />
              , a non-proprietary format for tabularized data that includes all
              the cross references.
            </li>
            <li>
              Or, Download the{' '}
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
              attribute.
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
          url={`${apiUrls.proteinsApi.proteinsApiPrefix}/doc/#/ptm`}
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
        previewData={previewData}
        acceptHeaderOverride={
          selectedDataset === Dataset.interProRepresentativeDomains
            ? '*/*'
            : undefined
        }
      />
    );
  } else if (extraContent === 'url' && downloadUrl) {
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
          {subEntryAnnotationDownload ? (
            // Sub-entry: one grouped selector — the annotation (JSON) sits in
            // its own optgroup so "JSON (precomputed)" reads distinctly from the
            // plain "JSON" of the UniParc cross-reference formats.
            <select
              id="file-format-select"
              data-testid="file-format-select"
              value={isAnnotation ? Dataset.subEntryAnnotation : selectedFormat}
              onChange={(e) => {
                const { value } = e.target;
                if (value === Dataset.subEntryAnnotation) {
                  setSelectedDataset(Dataset.subEntryAnnotation);
                } else {
                  setSelectedDataset(Dataset.uniprotData);
                  setSelectedFormat(value as FileFormat);
                }
              }}
            >
              <optgroup label="Annotation available for cross reference">
                <option value={Dataset.subEntryAnnotation}>
                  {subEntryAnnotationDownload.source === 'precomputed'
                    ? 'JSON (precomputed)'
                    : 'JSON (generated by UniFire)'}
                </option>
              </optgroup>
              <optgroup label="UniParc">
                {fileFormats.map((format) => (
                  <option value={format} key={format}>
                    {format}
                  </option>
                ))}
              </optgroup>
            </select>
          ) : (
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
          )}
        </label>
      </fieldset>

      {(selectedFormat === FileFormat.tsv ||
        selectedFormat === FileFormat.excel) &&
        selectedDataset !== Dataset.interProRepresentativeDomains &&
        !isAnnotation &&
        downloadColumns && (
          <>
            <legend data-article-id="customize">Customize columns</legend>
            <ColumnSelect
              onColumnChange={(columns) => setDownloadColumns(columns)}
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
        {/* "Generate URL for API" is hidden only for the on-the-fly UniFire
            annotation, which has no API URL (the precomputed annotation keeps
            it). Preview is available for both annotation sources: precomputed
            previews the API response, UniFire previews the in-memory model. */}
        {!isGeneratedAnnotation && (
          <Button variant="tertiary" onClick={() => setExtraContent('url')}>
            Generate URL for API
          </Button>
        )}
        <Button variant="tertiary" onClick={() => setExtraContent('preview')}>
          Preview
        </Button>
        <Button variant="secondary" onClick={() => onClose('cancel')}>
          Cancel
        </Button>
        {isGeneratedAnnotation ? (
          <button
            type="button"
            className={cn('button', 'primary')}
            title="Download file"
            onClick={() => {
              if (subEntryAnnotationDownload?.source === 'unifire') {
                generateAndDownloadJSON(
                  subEntryAnnotationDownload.model,
                  subEntryAnnotationDownload.filename
                );
              }
              onClose('download', 'sync');
            }}
          >
            Download
          </button>
        ) : (
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
        )}
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
