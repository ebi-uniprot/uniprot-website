import { renderHook } from '@testing-library/react';

import useResultsToEntryRedirect from '../useResultsToEntryRedirect';

import { getEntryPathFor } from '../../../app/config/urls';
import { getIdKeyForData } from '../../utils/getIdKey';

import getCustomRenderHook from '../../__test-helpers__/customRenderHook';

import { Namespace } from '../../types/namespaces';
import { APIModel } from '../../types/apiModel';

import results from '../../../uniprotkb/components/__mocks__/results';

// TODO: fixme
describe.skip('useResultsToEntryRedirect', () => {
  it('should redirect to the entry page when query matches the accession of the only result', () => {
    const singleResult = results.results[0];
    const query = singleResult.primaryAccession;
    const getIdKey = getIdKeyForData(singleResult);
    const getEntryPathForEntry = (entry: APIModel) =>
      getEntryPathFor(Namespace.uniprotkb)(getIdKey(entry));
    const customRenderHook = getCustomRenderHook(() =>
      useResultsToEntryRedirect(
        undefined,
        false,
        [singleResult],
        getEntryPathForEntry,
        getIdKey,
        query
      )
    );
    const { history } = customRenderHook(`/uniprotkb?query=${query}`);
    expect(history.location.pathname).toBe(
      `/uniprotkb/${singleResult.primaryAccession}`
    );
  });
  it('should redirect to the entry page when query matches the id of the only result', () => {
    const singleResult = results.results[0];
    const query = singleResult.primaryAccession;
    const getIdKey = getIdKeyForData(singleResult);
    const getEntryPathForEntry = (entry: APIModel) =>
      getEntryPathFor(Namespace.uniprotkb)(getIdKey(entry));
    const customRenderHook = getCustomRenderHook(() =>
      useResultsToEntryRedirect(
        undefined,
        false,
        [singleResult],
        getEntryPathForEntry,
        getIdKey,
        query
      )
    );
    const { history } = customRenderHook(
      `/uniprotkb?query=${singleResult.uniProtkbId}`
    );
    expect(history.location.pathname).toBe(
      `/uniprotkb/${singleResult.primaryAccession}`
    );
  });

  it('should redirect to the entry page when "?direct" is specified', () => {
    const singleResult = results.results[0];
    const query = singleResult.primaryAccession;
    const getIdKey = getIdKeyForData(singleResult);
    const getEntryPathForEntry = (entry: APIModel) =>
      getEntryPathFor(Namespace.uniprotkb)(getIdKey(entry));
    const customRenderHook = getCustomRenderHook(() =>
      useResultsToEntryRedirect(
        undefined,
        false,
        [singleResult],
        getEntryPathForEntry,
        getIdKey,
        query
      )
    );
    const { history } = customRenderHook('/uniprotkb?direct');
    expect(history.location.pathname).toBe(
      `/uniprotkb/${singleResult.primaryAccession}`
    );
  });

  it('should redirect to the entry page when query matches the id of any one of the results from first fetch', () => {
    const potentialMatch = results.results[0];
    const query = potentialMatch.uniProtkbId;
    const getIdKey = getIdKeyForData(potentialMatch);
    const getEntryPathForEntry = (entry: APIModel) =>
      getEntryPathFor(Namespace.uniprotkb)(getIdKey(entry));
    const history = createMemoryHistory({
      initialEntries: [`/uniprotkb?query=${query}`],
    });
    renderHook(() =>
      useResultsToEntryRedirect(
        history,
        undefined,
        false,
        results.results,
        getEntryPathForEntry,
        getIdKey,
        query
      )
    );
    expect(history.location.pathname).toBe(
      `/uniprotkb/${potentialMatch.primaryAccession}`
    );
  });
});
