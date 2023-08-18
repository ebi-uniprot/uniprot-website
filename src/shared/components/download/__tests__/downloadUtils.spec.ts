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

/*
[x] small uniprotkb download
[x] huge uniprotkb download
[x] reviewed uniprotkb download
[x] small idmapping uniprotkb download
[ ] huge idmapping uniprotkb download
[ ] small idmapping non-uniprot download
[ ] huge idmapping non-uniprot download
[ ] embeddings download
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
    expect(getIsAsyncDownload(state, props, job)).toEqual(false);
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
    expect(getIsAsyncDownload(state, props, job)).toEqual(true);
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
    expect(getIsAsyncDownload(state, props, job)).toEqual(false);
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
    expect(getIsAsyncDownload(state, props, job)).toEqual(false);
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
    expect(getIsAsyncDownload(state, props, job)).toEqual(true);
    expect(getFtpFilenameAndUrl(state, props, location, job)).toEqual(null);
    expect(getColumnsNamespace(props, job)).toEqual(Namespace.uniprotkb);
    expect(getIsEmbeddings(state)).toEqual(false);
    expect(getIsTooLargeForEmbeddings(state, props)).toEqual(false);
    expect(getExtraContent(state, props, location, job)).toEqual('generate');
    expect(getRedirectToIDMapping(state, props, job)).toEqual(false);
  });
});
