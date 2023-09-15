import {
  AsyncDownloadFormState,
  asyncDownloadFormDataReducer as reducer,
} from '../asyncDownloadFormReducer';
import * as actions from '../asyncDownloadFormActions';

import { AsyncDownloadFields } from '../../config/asyncDownloadFormData';
import { Namespace } from '../../../../shared/types/namespaces';
import { FileFormat } from '../../../../shared/types/resultsDownload';
import { UniProtKBColumn } from '../../../../uniprotkb/types/columnTypes';

export const mockDownloadUrlOptions = {
  fileFormat: FileFormat.json,
  compressed: true,
  selected: [],
  selectedIdField: UniProtKBColumn.accession,
  namespace: Namespace.uniprotkb,
  base: 'https://rest.uniprot.org/idmapping/uniprotkb/results/stream/foo',
  query: '',
  selectedFacets: [],
};

describe('Async download form reducer', () => {
  const initialState: AsyncDownloadFormState = {
    formValues: {
      Name: {
        fieldName: 'name',
        selected: '',
      },
    },
    downloadUrlOptions: mockDownloadUrlOptions,
    count: 1,
    jobTitle: 'bar',
    submitDisabled: false,
    sending: false,
    showConfirmation: false,
  };
  it('should update url download options with compressed false; set submitDisabled to true; use jobTitle', () => {
    const action = {
      type: actions.UPDATE_DOWNLOAD_URL_OPTIONS,
      payload: {
        downloadUrlOptions: {
          fileFormat: FileFormat.fastaCanonical,
          compressed: false,
          selected: [],
          selectedIdField: UniProtKBColumn.accession,
          namespace: Namespace.uniprotkb,
          base: 'https://rest.uniprot.org/idmapping/uniprotkb/results/stream/baz',
          query: '',
          selectedFacets: [],
        },
      },
    };
    const state = reducer(initialState, action);

    expect(state.downloadUrlOptions.compressed).toEqual(
      action.payload.downloadUrlOptions.compressed
    );
    expect(state.downloadUrlOptions.base).toEqual(
      action.payload.downloadUrlOptions.base
    );
    expect(state.submitDisabled).toEqual(true);
    expect(state.formValues.Name.selected).toEqual(initialState.jobTitle);
  });
  it('should update name form value and set as userSelected', () => {
    const action = {
      type: actions.UPDATE_SELECTED,
      payload: { id: AsyncDownloadFields.name, selected: 'qux' },
    };
    const state = reducer(initialState, action);
    expect(state.formValues.Name.selected).toEqual(action.payload.selected);
    expect(state.formValues.Name.userSelected).toEqual(true);
  });
  it('should set submitDisabled:true when sending', () => {
    const action = {
      type: actions.UPDATE_SENDING,
    };
    const state = reducer(initialState, action);
    expect(state.sending).toEqual(true);
    expect(state.submitDisabled).toEqual(true);
  });
});
