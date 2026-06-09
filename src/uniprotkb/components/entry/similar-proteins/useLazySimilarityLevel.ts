import { useEffect, useState } from 'react';

type UseLazySimilarityLevelOptions<T> = {
  // The similarity level (UniRef cluster type) this tab shows; errors are keyed
  // on it so the reused instance never shows another level's error.
  clusterType: string;
  // Set once the level is loaded (by the parent scan or a previous visit).
  initialPartition?: T;
  // Fetch the level's data; called only when it isn't already loaded.
  fetcher: (signal: AbortSignal) => Promise<T>;
  // Report the loaded data up so the parent can cache it.
  onLoaded: (clusterType: string, partition: T) => void;
};

// Drives a lazily-loaded similarity level (UniRef cluster) shared by the
// UniProtKB and UniParc tab content: fetches when the level isn't already
// loaded, reports the result up for caching, and exposes an `error` flag +
// `retry`. A slow or failed fetch keeps the caller on its loader/error rather
// than showing stale content.
const useLazySimilarityLevel = <T>({
  clusterType,
  initialPartition,
  fetcher,
  onLoaded,
}: UseLazySimilarityLevelOptions<T>) => {
  const [erroredLevel, setErroredLevel] = useState<string | null>(null);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    if (initialPartition) {
      return undefined; // already loaded and cached by the parent
    }
    const controller = new AbortController();
    fetcher(controller.signal).then(
      (result) => onLoaded(clusterType, result),
      () => {
        if (!controller.signal.aborted) {
          setErroredLevel(clusterType);
        }
      }
    );
    return () => controller.abort();
  }, [initialPartition, fetcher, clusterType, onLoaded, reload]);

  return {
    error: erroredLevel === clusterType,
    retry: () => {
      setErroredLevel(null);
      setReload((n) => n + 1);
    },
  };
};

export default useLazySimilarityLevel;
