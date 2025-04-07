import { useSyncExternalStore } from 'react';

import { jobsSharedWorker } from '../workers/jobs/getJobSharedWorker';
import { JobsState } from '../workers/jobs/state/jobsInitialState';

type Listener = () => void;

let listeners: Listener[] = [];
let state: JobsState = null;

if (jobsSharedWorker) {
  jobsSharedWorker.port.onmessage = (e) => {
    if (e.data.state) {
      state = e.data.state;
    }
    for (const listener of listeners) {
      listener();
    }
  };
}

const subscribe = (listener: Listener) => {
  listeners = [...listeners, listener];
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
};

const getSnapshot = () => state;

function useJobState() {
  return useSyncExternalStore(subscribe, getSnapshot);
}

export default useJobState;
