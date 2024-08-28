import { useEffect } from 'react';
import { History } from 'history';
import { UniProtkbAPIModel } from '../../uniprotkb/adapters/uniProtkbConverter';
import { APIModel } from '../types/apiModel';

const useResultsToEntryRedirect = (
  history: History<unknown>,
  direct: boolean | undefined,
  hasMoreData: boolean,
  allResults: APIModel[],
  getEntryPathForEntry: (entry: APIModel) => string,
  getIdKey: (datum: APIModel) => string,
  query: string
) => {
  // redirect to entry directly when...
  useEffect(() => {
    const trimmedQuery = query.toUpperCase().trim();
    // ... only 1 result and ...
    if (!hasMoreData && allResults.length === 1) {
      const uniqueItem = allResults[0];
      let idKey;
      try {
        idKey = getIdKey(uniqueItem);
      } catch {
        // TODO: this happens when the namespace and data don't match up. Fix in a future refactor.
      }
      if (
        // ... and query marked as "direct" ...
        direct ||
        // ... or the result's ID or accession matches the query ...
        idKey?.toUpperCase() === trimmedQuery ||
        // ... or matches the UniProtKB ID ...
        ('uniProtkbId' in uniqueItem && uniqueItem.uniProtkbId === trimmedQuery)
      ) {
        history.replace(getEntryPathForEntry(uniqueItem));
      }
    } else if (
      // Limit it to the first set of results as the exact match is very likely in the top results and it applies only for UniProtKB
      allResults.length &&
      allResults.length <= 25 &&
      'uniProtkbId' in allResults[0]
    ) {
      // if any one of them matches the UniProtKB ID, redirect to entry page (same behaviour as accession)
      const firstMatch = allResults.find(
        (entry) =>
          (entry as UniProtkbAPIModel).uniProtkbId?.toUpperCase() ===
          trimmedQuery
      );
      if (firstMatch) {
        history.replace(getEntryPathForEntry(firstMatch));
      }
    }
  }, [
    history,
    direct,
    hasMoreData,
    allResults,
    getEntryPathForEntry,
    getIdKey,
    query,
  ]);
};

export default useResultsToEntryRedirect;
