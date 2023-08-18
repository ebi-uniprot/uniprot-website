import { Location as HistoryLocation } from 'history';

import useJobFromUrl from '../../../hooks/useJobFromUrl';

import {
  getColumnsNamespace,
  getDownloadCount,
  getDownloadOptions,
  getExtraContent,
  getFtpFilenameAndUrl,
  getIsAsyncDownload,
  getIsAsyncDownloadIdMapping,
  getIsEmbeddings,
  getIsTooLargeForEmbeddings,
  getPreviewFileFormat,
  getPreviewOptions,
  getRedirectToIDMapping,
  hasColumns,
} from '../downloadUtils';

import { JobTypes } from '../../../../tools/types/toolsJobTypes';
import { Namespace } from '../../../types/namespaces';
import { FileFormat } from '../../../types/resultsDownload';
import { DownloadProps } from '../Download';
import { DownloadState } from '../downloadReducer';
import { defaultColumns } from '../../../../uniprotkb/config/UniProtKBColumnConfiguration';
import { fileFormatsResultsDownload as uniProtKBFileFormatsResultsDownload } from '../../../../uniprotkb/config/download';
import { MappingDetails } from '../../../../tools/id-mapping/types/idMappingSearchResults';
import { Location } from '../../../../app/config/urls';
import { IDMappingColumn } from '../../../../tools/id-mapping/config/IdMappingColumnConfiguration';

/*
[x] small uniprotkb download
[x] huge uniprotkb download
[x] reviewed uniprotkb download
[x] small idmapping uniprotkb download
[x] huge idmapping uniprotkb download
[x] small idmapping non-uniprot download
[x] huge idmapping non-uniprot download
[x] embeddings download
[ ] unisave
*/

describe('Download Utils', () => {
  test('small uniprotkb download', () => {
    const props: DownloadProps<JobTypes> = {
      selectedEntries: [],
      totalNumberResults: 24094,
      namespace: Namespace.uniprotkb,
      notCustomisable: false,
      inBasketMini: false,
      onClose: jest.fn(),
    };
    const state: DownloadState = {
      selectedColumns: defaultColumns,
      fileFormatOptions: [
        FileFormat.fastaCanonical,
        FileFormat.fastaCanonicalIsoform,
        FileFormat.tsv,
        FileFormat.excel,
        FileFormat.json,
        FileFormat.xml,
        FileFormat.rdfXml,
        FileFormat.text,
        FileFormat.gff,
        FileFormat.list,
        FileFormat.embeddings,
      ],
      selectedFileFormat: FileFormat.fastaCanonical,
      downloadSelect: 'all',
      compressed: true,
      extraContent: null,
      nSelectedEntries: 0,
    };

    const location: HistoryLocation = {
      pathname: '/uniprotkb',
      search: '?query=nod2',
      hash: '',
      key: 'foo',
      state: undefined,
    };
    const job: ReturnType<typeof useJobFromUrl> = {
      jobId: undefined,
      jobResultsLocation: undefined,
      jobResultsNamespace: undefined,
    };

    expect(getPreviewFileFormat(state)).toEqual(FileFormat.fastaCanonical);
    expect(getDownloadCount(state, props)).toEqual(24094);
    expect(getIsAsyncDownloadIdMapping(state, props, job)).toEqual(false);
    expect(hasColumns(state, props, job)).toEqual(false);
    expect(getDownloadOptions(state, props, location, job)).toEqual({
      compressed: true,
      fileFormat: FileFormat.fastaCanonical,
      namespace: Namespace.uniprotkb,
      query: 'nod2',
      selected: [],
      selectedFacets: [],
      selectedIdField: 'accession',
    });
    expect(getPreviewOptions(state, props, location, job)).toEqual({
      compressed: false,
      fileFormat: FileFormat.fastaCanonical,
      namespace: Namespace.uniprotkb,
      query: 'nod2',
      selected: [],
      selectedFacets: [],
      selectedIdField: 'accession',
      size: 10,
    });
    expect(getIsAsyncDownload(state, props, location, job)).toEqual(false);
    expect(getFtpFilenameAndUrl(state, props, location, job)).toEqual(null);
    expect(getColumnsNamespace(props, job)).toEqual(Namespace.uniprotkb);
    expect(getIsEmbeddings(state)).toEqual(false);
    expect(getIsTooLargeForEmbeddings(state, props)).toEqual(false);
    expect(getExtraContent(state, props, location, job)).toEqual(null);
    expect(getRedirectToIDMapping(state, props, job)).toEqual(false);
  });

  test('huge uniprotkb TSV download with URL for API view', () => {
    const props: DownloadProps<JobTypes> = {
      selectedEntries: [],
      totalNumberResults: 248842690,
      namespace: Namespace.uniprotkb,
      notCustomisable: false,
      inBasketMini: false,
      onClose: jest.fn(),
    };
    const state: DownloadState = {
      selectedColumns: defaultColumns,
      fileFormatOptions: [
        FileFormat.fastaCanonical,
        FileFormat.fastaCanonicalIsoform,
        FileFormat.tsv,
        FileFormat.excel,
        FileFormat.json,
        FileFormat.xml,
        FileFormat.rdfXml,
        FileFormat.text,
        FileFormat.gff,
        FileFormat.list,
        FileFormat.embeddings,
      ],
      selectedFileFormat: FileFormat.tsv,
      downloadSelect: 'all',
      compressed: true,
      extraContent: 'url',
      nSelectedEntries: 0,
    };
    const location: HistoryLocation = {
      pathname: '/uniprotkb',
      search: '?query=*',
      hash: '',
      key: 'foo',
      state: undefined,
    };
    const job: ReturnType<typeof useJobFromUrl> = {
      jobId: undefined,
      jobResultsLocation: undefined,
      jobResultsNamespace: undefined,
    };

    expect(getPreviewFileFormat(state)).toEqual(FileFormat.tsv);
    expect(getDownloadCount(state, props)).toEqual(248842690);
    expect(getIsAsyncDownloadIdMapping(state, props, job)).toEqual(false);
    expect(hasColumns(state, props, job)).toEqual(true);
    expect(getDownloadOptions(state, props, location, job)).toEqual({
      columns: defaultColumns,
      compressed: true,
      fileFormat: FileFormat.tsv,
      namespace: Namespace.uniprotkb,
      query: '*',
      selected: [],
      selectedFacets: [],
      selectedIdField: 'accession',
    });
    expect(getPreviewOptions(state, props, location, job)).toEqual({
      columns: defaultColumns,
      compressed: false,
      fileFormat: FileFormat.tsv,
      namespace: Namespace.uniprotkb,
      query: '*',
      selected: [],
      selectedFacets: [],
      selectedIdField: 'accession',
      size: 10,
    });
    expect(getIsAsyncDownload(state, props, location, job)).toEqual(true);
    expect(getFtpFilenameAndUrl(state, props, location, job)).toEqual(null);
    expect(getColumnsNamespace(props, job)).toEqual(Namespace.uniprotkb);
    expect(getIsEmbeddings(state)).toEqual(false);
    expect(getIsTooLargeForEmbeddings(state, props)).toEqual(false);
    expect(getExtraContent(state, props, location, job)).toEqual('url');
    expect(getRedirectToIDMapping(state, props, job)).toEqual(false);
  });

  test('reviewed FTP available uniprotkb download', () => {
    const props: DownloadProps<JobTypes> = {
      selectedEntries: [],
      totalNumberResults: 569793,
      namespace: Namespace.uniprotkb,
      notCustomisable: false,
      inBasketMini: false,
      onClose: jest.fn(),
    };
    const state: DownloadState = {
      selectedColumns: defaultColumns,
      fileFormatOptions: [
        FileFormat.fastaCanonical,
        FileFormat.fastaCanonicalIsoform,
        FileFormat.tsv,
        FileFormat.excel,
        FileFormat.json,
        FileFormat.xml,
        FileFormat.rdfXml,
        FileFormat.text,
        FileFormat.gff,
        FileFormat.list,
        FileFormat.embeddings,
      ],
      selectedFileFormat: FileFormat.fastaCanonical,
      downloadSelect: 'all',
      compressed: true,
      extraContent: 'url',
      nSelectedEntries: 0,
    };
    const location: HistoryLocation = {
      pathname: '/uniprotkb',
      search: '?facets=reviewed%3Atrue&query=%2A',
      hash: '',
      key: 'foo',
      state: undefined,
    };
    const job: ReturnType<typeof useJobFromUrl> = {
      jobId: undefined,
      jobResultsLocation: undefined,
      jobResultsNamespace: undefined,
    };

    expect(getPreviewFileFormat(state)).toEqual(FileFormat.fastaCanonical);
    expect(getDownloadCount(state, props)).toEqual(569793);
    expect(getIsAsyncDownloadIdMapping(state, props, job)).toEqual(false);
    expect(hasColumns(state, props, job)).toEqual(false);
    expect(getDownloadOptions(state, props, location, job)).toEqual({
      compressed: true,
      fileFormat: FileFormat.fastaCanonical,
      namespace: Namespace.uniprotkb,
      query: '*',
      selected: [],
      selectedFacets: [
        {
          name: 'reviewed',
          value: 'true',
        },
      ],
      selectedIdField: 'accession',
    });
    expect(getPreviewOptions(state, props, location, job)).toEqual({
      compressed: false,
      fileFormat: FileFormat.fastaCanonical,
      namespace: Namespace.uniprotkb,
      query: '*',
      selected: [],
      selectedFacets: [
        {
          name: 'reviewed',
          value: 'true',
        },
      ],
      selectedIdField: 'accession',
      size: 10,
    });
    expect(getIsAsyncDownload(state, props, location, job)).toEqual(false);
    expect(getFtpFilenameAndUrl(state, props, location, job)).toEqual({
      filename: 'uniprot_sprot.fasta.gz',
      url: 'https://ftp.uniprot.org/pub/databases/uniprot/knowledgebase/complete/uniprot_sprot.fasta.gz',
    });
    expect(getColumnsNamespace(props, job)).toEqual(Namespace.uniprotkb);
    expect(getIsEmbeddings(state)).toEqual(false);
    expect(getIsTooLargeForEmbeddings(state, props)).toEqual(false);
    expect(getExtraContent(state, props, location, job)).toEqual('ftp');
    expect(getRedirectToIDMapping(state, props, job)).toEqual(false);
  });

  test('small idmapping uniprotkb download and a query', () => {
    const props: DownloadProps<JobTypes> = {
      selectedEntries: [],
      totalNumberResults: 1,
      namespace: Namespace.uniprotkb,
      base: 'https://rest.uniprot.org/idmapping/uniprotkb/results/5bee222d914d0826f8b1b9d9b751aaac56ac28f8',
      notCustomisable: false,
      supportedFormats: uniProtKBFileFormatsResultsDownload,
      inBasketMini: false,
      inputParamsData: {
        from: 'UniProtKB_AC-ID',
        to: 'UniProtKB',
        ids: 'P05067',
        redirectURL:
          'https://rest.uniprot.org/idmapping/uniprotkb/results/5bee222d914d0826f8b1b9d9b751aaac56ac28f8',
      } as MappingDetails,
      jobType: JobTypes.ID_MAPPING,
      onClose: jest.fn(),
    };
    const state: DownloadState = {
      selectedColumns: defaultColumns,
      fileFormatOptions: uniProtKBFileFormatsResultsDownload,
      selectedFileFormat: FileFormat.fastaCanonical,
      downloadSelect: 'all',
      compressed: true,
      extraContent: 'generate',
      nSelectedEntries: 0,
    };
    const location: HistoryLocation = {
      pathname: '/uniprotkb',
      search: '?query=human',
      hash: '',
      key: 'foo',
      state: undefined,
    };
    const job: ReturnType<typeof useJobFromUrl> = {
      jobId: undefined,
      jobResultsLocation: undefined,
      jobResultsNamespace: undefined,
    };

    expect(getPreviewFileFormat(state)).toEqual(FileFormat.fastaCanonical);
    expect(getDownloadCount(state, props)).toEqual(1);
    expect(getIsAsyncDownloadIdMapping(state, props, job)).toEqual(false);
    expect(hasColumns(state, props, job)).toEqual(false);
    expect(getDownloadOptions(state, props, location, job)).toEqual({
      base: 'https://rest.uniprot.org/idmapping/uniprotkb/results/5bee222d914d0826f8b1b9d9b751aaac56ac28f8',
      compressed: true,
      fileFormat: FileFormat.fastaCanonical,
      namespace: Namespace.uniprotkb,
      query: 'human',
      selected: [],
      selectedFacets: [],
      selectedIdField: 'accession',
    });
    expect(getPreviewOptions(state, props, location, job)).toEqual({
      base: 'https://rest.uniprot.org/idmapping/uniprotkb/results/5bee222d914d0826f8b1b9d9b751aaac56ac28f8',
      compressed: false,
      fileFormat: FileFormat.fastaCanonical,
      namespace: Namespace.uniprotkb,
      query: 'human',
      selected: [],
      selectedFacets: [],
      selectedIdField: 'accession',
      size: 1,
    });
    expect(getIsAsyncDownload(state, props, location, job)).toEqual(false);
    expect(getFtpFilenameAndUrl(state, props, location, job)).toEqual(null);
    expect(getColumnsNamespace(props, job)).toEqual(Namespace.uniprotkb);
    expect(getIsEmbeddings(state)).toEqual(false);
    expect(getIsTooLargeForEmbeddings(state, props)).toEqual(false);
    expect(getExtraContent(state, props, location, job)).toEqual(null);
    expect(getRedirectToIDMapping(state, props, job)).toEqual(false);
  });

  test('huge idmapping uniprotkb download', () => {
    const props: DownloadProps<JobTypes> = {
      selectedEntries: [],
      totalNumberResults: 279998,
      namespace: Namespace.idmapping,
      base: 'https://rest.uniprot.org/idmapping/uniprotkb/results/13a61a7a694b2a0193ccde8b937d2b7d60efddc0',
      notCustomisable: true,
      supportedFormats: [
        FileFormat.tsvIdMappingFromTo,
        FileFormat.tsv,
        FileFormat.excelIdMappingFromTo,
        FileFormat.jsonIdMappingFromTo,
        FileFormat.json,
      ],
      inBasketMini: false,
      inputParamsData: {
        from: 'UniRef50',
        to: 'UniProtKB',
        ids: 'UniRef50_P00395,UniRef50_P04578,UniRef50_P00159,UniRef50_Q35536,UniRef50_P03430',
        redirectURL:
          'https://rest.uniprot.org/idmapping/results/13a61a7a694b2a0193ccde8b937d2b7d60efddc0',
        warnings: [
          {
            code: 21,
            message:
              'UniProt data enrichment is not supported for mapping results with more than 100000 "mapped to" IDs',
          },
        ],
      } as MappingDetails,
      jobType: JobTypes.ID_MAPPING,
      onClose: jest.fn(),
    };
    const state: DownloadState = {
      selectedColumns: defaultColumns,
      fileFormatOptions: [
        FileFormat.tsvIdMappingFromTo,
        FileFormat.tsv,
        FileFormat.excelIdMappingFromTo,
        FileFormat.jsonIdMappingFromTo,
        FileFormat.json,
      ],
      selectedFileFormat: FileFormat.tsv,
      downloadSelect: 'all',
      compressed: true,
      extraContent: 'generate',
      nSelectedEntries: 0,
    };
    const location: HistoryLocation = {
      pathname:
        '/id-mapping/uniprotkb/13a61a7a694b2a0193ccde8b937d2b7d60efddc0/overview',
      state: {
        internalID: 'local-5f8357f0-3c44-11ee-8a35-0bd8ec867c12',
      },
      search: '',
      hash: '',
      key: 'foo',
    };
    const job: ReturnType<typeof useJobFromUrl> = {
      jobId: '13a61a7a694b2a0193ccde8b937d2b7d60efddc0',
      jobResultsLocation: Location.IDMappingResult,
      jobResultsNamespace: Namespace.uniprotkb,
    };

    expect(getPreviewFileFormat(state)).toEqual(FileFormat.tsv);
    expect(getDownloadCount(state, props)).toEqual(279998);
    expect(getIsAsyncDownloadIdMapping(state, props, job)).toEqual(true);
    expect(hasColumns(state, props, job)).toEqual(true);
    expect(getDownloadOptions(state, props, location, job)).toEqual({
      columns: defaultColumns,
      compressed: true,
      fileFormat: FileFormat.tsv,
      namespace: Namespace.idmapping,
      query: '',
      selected: [],
      selectedFacets: [],
      selectedIdField: 'from',
    });
    expect(getPreviewOptions(state, props, location, job)).toEqual(undefined);
    expect(getIsAsyncDownload(state, props, location, job)).toEqual(true);
    expect(getFtpFilenameAndUrl(state, props, location, job)).toEqual(null);
    expect(getColumnsNamespace(props, job)).toEqual(Namespace.uniprotkb);
    expect(getIsEmbeddings(state)).toEqual(false);
    expect(getIsTooLargeForEmbeddings(state, props)).toEqual(false);
    expect(getExtraContent(state, props, location, job)).toEqual('generate');
    expect(getRedirectToIDMapping(state, props, job)).toEqual(false);
  });

  test('small idmapping non-uniprot download', () => {
    const props: DownloadProps<JobTypes> = {
      selectedEntries: [],
      totalNumberResults: 1,
      namespace: Namespace.idmapping,
      base: 'https://rest.uniprot.org/idmapping/results/6117188d7702e2e345c6d03cda7b95b1dc9f5fdf',
      notCustomisable: true,
      supportedFormats: [
        FileFormat.tsvIdMappingFromTo,
        FileFormat.tsv,
        FileFormat.excelIdMappingFromTo,
        FileFormat.jsonIdMappingFromTo,
        FileFormat.json,
      ],
      inBasketMini: false,
      inputParamsData: {
        from: 'UniProtKB_AC-ID',
        to: 'Ensembl',
        ids: 'P05067',
        redirectURL:
          'https://rest.uniprot.org/idmapping/results/6117188d7702e2e345c6d03cda7b95b1dc9f5fdf',
      } as MappingDetails,
      jobType: JobTypes.ID_MAPPING,
      onClose: jest.fn(),
    };
    const state: DownloadState = {
      selectedColumns: [IDMappingColumn.from, IDMappingColumn.to],
      fileFormatOptions: [
        FileFormat.tsvIdMappingFromTo,
        FileFormat.tsv,
        FileFormat.excelIdMappingFromTo,
        FileFormat.jsonIdMappingFromTo,
        FileFormat.json,
      ],
      selectedFileFormat: FileFormat.tsvIdMappingFromTo,
      downloadSelect: 'all',
      compressed: true,
      extraContent: null,
      nSelectedEntries: 0,
    };
    const location: HistoryLocation = {
      pathname: '/id-mapping/6117188d7702e2e345c6d03cda7b95b1dc9f5fdf/overview',
      search: '',
      hash: '',
      state: {
        internalID: 'local-ba86e420-3dc8-11ee-9821-e9e373c0932b',
      },
      key: 'foo',
    };
    const job: ReturnType<typeof useJobFromUrl> = {
      jobId: '6117188d7702e2e345c6d03cda7b95b1dc9f5fdf',
      jobResultsLocation: Location.IDMappingResult,
      jobResultsNamespace: undefined,
    };

    expect(getPreviewFileFormat(state)).toEqual(FileFormat.tsvIdMappingFromTo);
    expect(getDownloadCount(state, props)).toEqual(1);
    expect(getIsAsyncDownloadIdMapping(state, props, job)).toEqual(false);
    expect(hasColumns(state, props, job)).toEqual(false);
    expect(getDownloadOptions(state, props, location, job)).toEqual({
      base: 'https://rest.uniprot.org/idmapping/stream/6117188d7702e2e345c6d03cda7b95b1dc9f5fdf',
      compressed: true,
      fileFormat: FileFormat.tsvIdMappingFromTo,
      namespace: Namespace.idmapping,
      query: '',
      selected: [],
      selectedFacets: [],
      selectedIdField: 'from',
    });
    expect(getPreviewOptions(state, props, location, job)).toEqual({
      base: 'https://rest.uniprot.org/idmapping/results/6117188d7702e2e345c6d03cda7b95b1dc9f5fdf',
      compressed: false,
      fileFormat: FileFormat.tsvIdMappingFromTo,
      namespace: Namespace.idmapping,
      query: '',
      selected: [],
      selectedFacets: [],
      selectedIdField: 'from',
      size: 1,
    });
    expect(getIsAsyncDownload(state, props, location, job)).toEqual(false);
    expect(getFtpFilenameAndUrl(state, props, location, job)).toEqual(null);
    expect(getColumnsNamespace(props, job)).toEqual(Namespace.idmapping);
    expect(getIsEmbeddings(state)).toEqual(false);
    expect(getIsTooLargeForEmbeddings(state, props)).toEqual(false);
    expect(getExtraContent(state, props, location, job)).toEqual(null);
    expect(getRedirectToIDMapping(state, props, job)).toEqual(false);
  });

  test('huge idmapping non-uniprot download', () => {
    const props: DownloadProps<JobTypes> = {
      selectedEntries: [],
      totalNumberResults: 335578,
      namespace: Namespace.idmapping,
      base: 'https://rest.uniprot.org/idmapping/results/fb56256d1adf57f4e181a5b3bebabb54f77b89cc',
      notCustomisable: true,
      supportedFormats: [
        FileFormat.tsvIdMappingFromTo,
        FileFormat.excelIdMappingFromTo,
        FileFormat.jsonIdMappingFromTo,
      ],
      inBasketMini: false,
      inputParamsData: {
        from: 'UniProtKB_AC-ID',
        to: 'EMBL-GenBank-DDBJ',
        ids: 'J7IIM3,F2XGD7,F5BIF0', // and many more
        redirectURL:
          'https://rest.uniprot.org/idmapping/results/fb56256d1adf57f4e181a5b3bebabb54f77b89cc',
      } as MappingDetails,
      jobType: JobTypes.ID_MAPPING,
      onClose: jest.fn(),
    };
    const state: DownloadState = {
      selectedColumns: [IDMappingColumn.from, IDMappingColumn.to],
      fileFormatOptions: [
        FileFormat.tsvIdMappingFromTo,
        FileFormat.excelIdMappingFromTo,
        FileFormat.jsonIdMappingFromTo,
      ],
      selectedFileFormat: FileFormat.tsvIdMappingFromTo,
      downloadSelect: 'all',
      compressed: true,
      extraContent: null,
      nSelectedEntries: 0,
    };
    const location: HistoryLocation = {
      pathname: '/id-mapping/fb56256d1adf57f4e181a5b3bebabb54f77b89cc/overview',
      search: '',
      hash: '',
      state: {
        internalID: 'local-dce19540-3dcf-11ee-9fbc-7bc4b480c9f9',
      },
      key: '8026qq',
    };
    const job: ReturnType<typeof useJobFromUrl> = {
      jobId: 'fb56256d1adf57f4e181a5b3bebabb54f77b89cc',
      jobResultsLocation: Location.IDMappingResult,
      jobResultsNamespace: undefined,
    };

    expect(getPreviewFileFormat(state)).toEqual(FileFormat.tsvIdMappingFromTo);
    expect(getDownloadCount(state, props)).toEqual(335578);
    expect(getIsAsyncDownloadIdMapping(state, props, job)).toEqual(false);
    expect(hasColumns(state, props, job)).toEqual(false);
    expect(getDownloadOptions(state, props, location, job)).toEqual({
      base: 'https://rest.uniprot.org/idmapping/stream/fb56256d1adf57f4e181a5b3bebabb54f77b89cc',
      compressed: true,
      fileFormat: FileFormat.tsvIdMappingFromTo,
      namespace: Namespace.idmapping,
      query: '',
      selected: [],
      selectedFacets: [],
      selectedIdField: 'from',
    });
    expect(getPreviewOptions(state, props, location, job)).toEqual({
      base: 'https://rest.uniprot.org/idmapping/results/fb56256d1adf57f4e181a5b3bebabb54f77b89cc',
      compressed: false,
      fileFormat: FileFormat.tsvIdMappingFromTo,
      namespace: Namespace.idmapping,
      query: '',
      selected: [],
      selectedFacets: [],
      selectedIdField: 'from',
      size: 10,
    });
    expect(getIsAsyncDownload(state, props, location, job)).toEqual(false);
    expect(getFtpFilenameAndUrl(state, props, location, job)).toEqual(null);
    expect(getColumnsNamespace(props, job)).toEqual(Namespace.idmapping);
    expect(getIsEmbeddings(state)).toEqual(false);
    expect(getIsTooLargeForEmbeddings(state, props)).toEqual(false);
    expect(getExtraContent(state, props, location, job)).toEqual(null);
    expect(getRedirectToIDMapping(state, props, job)).toEqual(false);
  });

  test('embeddings download with FTP', () => {
    const props: DownloadProps<JobTypes> = {
      selectedEntries: [],
      totalNumberResults: 569793,
      namespace: Namespace.uniprotkb,
      notCustomisable: false,
      inBasketMini: false,
      onClose: jest.fn(),
    };
    const state: DownloadState = {
      selectedColumns: defaultColumns,
      fileFormatOptions: [
        FileFormat.fastaCanonical,
        FileFormat.fastaCanonicalIsoform,
        FileFormat.tsv,
        FileFormat.excel,
        FileFormat.json,
        FileFormat.xml,
        FileFormat.rdfXml,
        FileFormat.text,
        FileFormat.gff,
        FileFormat.list,
        FileFormat.embeddings,
      ],
      selectedFileFormat: FileFormat.embeddings,
      downloadSelect: 'all',
      compressed: true,
      extraContent: 'ftp',
      nSelectedEntries: 0,
    };
    const location: HistoryLocation = {
      pathname: '/uniprotkb',
      search: '?facets=reviewed%3Atrue&query=%2A',
      hash: '',
      key: 'foo',
      state: undefined,
    };
    const job: ReturnType<typeof useJobFromUrl> = {
      jobId: undefined,
      jobResultsLocation: undefined,
      jobResultsNamespace: undefined,
    };

    expect(getPreviewFileFormat(state)).toEqual(undefined);
    expect(getDownloadCount(state, props)).toEqual(569793);
    expect(getIsAsyncDownloadIdMapping(state, props, job)).toEqual(false);
    expect(hasColumns(state, props, job)).toEqual(false);
    expect(getDownloadOptions(state, props, location, job)).toEqual({
      compressed: true,
      fileFormat: FileFormat.embeddings,
      namespace: Namespace.uniprotkb,
      query: '*',
      selected: [],
      selectedFacets: [
        {
          name: 'reviewed',
          value: 'true',
        },
      ],
      selectedIdField: 'accession',
    });
    expect(getPreviewOptions(state, props, location, job)).toEqual(undefined);
    expect(getIsAsyncDownload(state, props, location, job)).toEqual(false);
    expect(getFtpFilenameAndUrl(state, props, location, job)).toEqual({
      filename: 'uniprot_sprot/per-protein.h5',
      url: 'https://ftp.uniprot.org/pub/databases/uniprot/current_release/knowledgebase/embeddings/uniprot_sprot/per-protein.h5',
    });
    expect(getColumnsNamespace(props, job)).toEqual(Namespace.uniprotkb);
    expect(getIsEmbeddings(state)).toEqual(true);
    expect(getIsTooLargeForEmbeddings(state, props)).toEqual(false);
    expect(getExtraContent(state, props, location, job)).toEqual('ftp');
    expect(getRedirectToIDMapping(state, props, job)).toEqual(false);
  });

  test('embeddings download with async download', () => {
    const props: DownloadProps<JobTypes> = {
      selectedEntries: [],
      totalNumberResults: 207892,
      namespace: Namespace.uniprotkb,
      notCustomisable: false,
      inBasketMini: false,
      onClose: jest.fn(),
    };
    const state: DownloadState = {
      selectedColumns: defaultColumns,
      fileFormatOptions: [
        FileFormat.fastaCanonical,
        FileFormat.fastaCanonicalIsoform,
        FileFormat.tsv,
        FileFormat.excel,
        FileFormat.json,
        FileFormat.xml,
        FileFormat.rdfXml,
        FileFormat.text,
        FileFormat.gff,
        FileFormat.list,
        FileFormat.embeddings,
      ],
      selectedFileFormat: FileFormat.embeddings,
      downloadSelect: 'all',
      compressed: true,
      extraContent: 'generate',
      nSelectedEntries: 0,
    };
    const location: HistoryLocation = {
      pathname: '/uniprotkb',
      search: '?facets=model_organism%3A9606&query=%2A',
      hash: '',
      key: 'foo',
      state: undefined,
    };
    const job: ReturnType<typeof useJobFromUrl> = {
      jobId: undefined,
      jobResultsLocation: undefined,
      jobResultsNamespace: undefined,
    };

    expect(getPreviewFileFormat(state)).toEqual(undefined);
    expect(getDownloadCount(state, props)).toEqual(207892);
    expect(getIsAsyncDownloadIdMapping(state, props, job)).toEqual(false);
    expect(hasColumns(state, props, job)).toEqual(false);
    expect(getDownloadOptions(state, props, location, job)).toEqual({
      compressed: true,
      fileFormat: FileFormat.embeddings,
      namespace: Namespace.uniprotkb,
      query: '*',
      selected: [],
      selectedFacets: [
        {
          name: 'model_organism',
          value: '9606',
        },
      ],
      selectedIdField: 'accession',
    });
    expect(getPreviewOptions(state, props, location, job)).toEqual(undefined);
    expect(getIsAsyncDownload(state, props, location, job)).toEqual(true);
    expect(getFtpFilenameAndUrl(state, props, location, job)).toEqual(null);
    expect(getColumnsNamespace(props, job)).toEqual(Namespace.uniprotkb);
    expect(getIsEmbeddings(state)).toEqual(true);
    expect(getIsTooLargeForEmbeddings(state, props)).toEqual(false);
    expect(getExtraContent(state, props, location, job)).toEqual('generate');
    expect(getRedirectToIDMapping(state, props, job)).toEqual(false);
  });

  test('unisave', () => {
    const props: DownloadProps<JobTypes> = {
      selectedEntries: [],
      totalNumberResults: 24094,
      namespace: Namespace.uniprotkb,
      notCustomisable: false,
      inBasketMini: false,
      onClose: jest.fn(),
    };
    const state: DownloadState = {
      selectedColumns: defaultColumns,
      fileFormatOptions: [
        FileFormat.fastaCanonical,
        FileFormat.fastaCanonicalIsoform,
        FileFormat.tsv,
        FileFormat.excel,
        FileFormat.json,
        FileFormat.xml,
        FileFormat.rdfXml,
        FileFormat.text,
        FileFormat.gff,
        FileFormat.list,
        FileFormat.embeddings,
      ],
      selectedFileFormat: FileFormat.fastaCanonical,
      downloadSelect: 'all',
      compressed: true,
      extraContent: null,
      nSelectedEntries: 0,
    };

    const location: HistoryLocation = {
      pathname: '/uniprotkb',
      search: '?query=nod2',
      hash: '',
      key: 'foo',
      state: undefined,
    };
    const job: ReturnType<typeof useJobFromUrl> = {
      jobId: undefined,
      jobResultsLocation: undefined,
      jobResultsNamespace: undefined,
    };

    expect(getPreviewFileFormat(state)).toEqual(FileFormat.fastaCanonical);
    expect(getDownloadCount(state, props)).toEqual(24094);
    expect(getIsAsyncDownloadIdMapping(state, props, job)).toEqual(false);
    expect(hasColumns(state, props, job)).toEqual(false);
    expect(getDownloadOptions(state, props, location, job)).toEqual({
      compressed: true,
      fileFormat: FileFormat.fastaCanonical,
      namespace: Namespace.uniprotkb,
      query: 'nod2',
      selected: [],
      selectedFacets: [],
      selectedIdField: 'accession',
    });
    expect(getPreviewOptions(state, props, location, job)).toEqual({
      compressed: false,
      fileFormat: FileFormat.fastaCanonical,
      namespace: Namespace.uniprotkb,
      query: 'nod2',
      selected: [],
      selectedFacets: [],
      selectedIdField: 'accession',
      size: 10,
    });
    expect(getIsAsyncDownload(state, props, location, job)).toEqual(false);
    expect(getFtpFilenameAndUrl(state, props, location, job)).toEqual(null);
    expect(getColumnsNamespace(props, job)).toEqual(Namespace.uniprotkb);
    expect(getIsEmbeddings(state)).toEqual(false);
    expect(getIsTooLargeForEmbeddings(state, props)).toEqual(false);
    expect(getExtraContent(state, props, location, job)).toEqual(null);
    expect(getRedirectToIDMapping(state, props, job)).toEqual(false);
  });
});
