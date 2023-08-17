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
import { UniProtKBColumn } from '../../../../uniprotkb/types/columnTypes';
import { FileFormat } from '../../../types/resultsDownload';
import { DownloadProps } from '../Download';
import { DownloadState } from '../downloadReducer';

/*
[x] small uniprotkb download
[ ] huge uniprotkb download
[ ] reviewed uniprotkb download
[ ] small idmapping uniprotkb download
[ ] huge idmapping uniprotkb download
[ ] small idmapping non-uniprot download
[ ] huge idmapping non-uniprot download
[ ] embeddings download
*/

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
    selectedColumns: [
      UniProtKBColumn.accession,
      UniProtKBColumn.reviewed,
      UniProtKBColumn.id,
      UniProtKBColumn.proteinName,
      UniProtKBColumn.geneNames,
      UniProtKBColumn.organismName,
      UniProtKBColumn.length,
      UniProtKBColumn.ec,
    ],
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
    key: 'u126tx',
    state: undefined,
  };
  const job: ReturnType<typeof useJobFromUrl> = {
    jobId: undefined,
    jobResultsLocation: undefined,
    jobResultsNamespace: undefined,
  };

  expect(getPreviewFileFormat(state)).toEqual('FASTA (canonical)');
  expect(getDownloadCount(state, props)).toEqual(24094);
  expect(getIsAsyncDownloadIdMapping(state, props, job)).toEqual(false);
  expect(hasColumns(state, props, job)).toEqual(false);
  expect(getDownloadOptions(state, props, location, job)).toEqual({
    accessions: undefined,
    base: undefined,
    compressed: true,
    fileFormat: 'FASTA (canonical)',
    namespace: 'uniprotkb',
    query: 'nod2',
    selected: [],
    selectedFacets: [],
    selectedIdField: 'accession',
    sortColumn: undefined,
    sortDirection: undefined,
  });
  expect(getPreviewOptions(state, props, location, job)).toEqual({
    accessions: undefined,
    base: undefined,
    compressed: false,
    fileFormat: 'FASTA (canonical)',
    namespace: 'uniprotkb',
    query: 'nod2',
    selected: [],
    selectedFacets: [],
    selectedIdField: 'accession',
    size: 10,
    sortColumn: undefined,
    sortDirection: undefined,
  });
  expect(getIsAsyncDownload(state, props, job)).toEqual(false);
  expect(getFtpFilenameAndUrl(state, props, location, job)).toEqual(null);
  expect(getColumnsNamespace(props, job)).toEqual(Namespace.uniprotkb);
  expect(getIsEmbeddings(state)).toEqual(false);
  expect(getIsTooLargeForEmbeddings(state, props)).toEqual(false);
  expect(getExtraContent(state, props, location, job)).toEqual(null);
  expect(getRedirectToIDMapping(state, props, job)).toEqual(false);
});
