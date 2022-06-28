import getCustomRenderHook from '../../__test-helpers__/customRenderHook';

import useJobFromUrl from '../useJobFromUrl';

describe('useInitialFormParameters', () => {
  const customRenderHook = getCustomRenderHook(() => useJobFromUrl());

  it('should return correct job data from ID mapping results URL', () => {
    const { result } = customRenderHook(
      '/id-mapping/uniparc/jobid?query=(gene:foo)'
    );
    const { jobId, jobResultsLocation, jobResultsNamespace } = result.current;
    expect(jobId).toEqual('jobid');
    expect(jobResultsLocation).toEqual('IDMappingResult');
    expect(jobResultsNamespace).toEqual('uniparc');
  });

  it('should return correct job data from a peptide search URL', () => {
    const { result } = customRenderHook('peptide-search/jobid');
    const { jobId, jobResultsLocation, jobResultsNamespace } = result.current;
    expect(jobId).toEqual('jobid');
    expect(jobResultsLocation).toEqual('PeptideSearchResult');
    expect(jobResultsNamespace).toEqual('uniprotkb');
  });
});
