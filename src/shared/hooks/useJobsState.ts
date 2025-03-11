import { useSyncExternalStore } from 'react';

// TODO: for consistency rename everything to Jobs rather than Tools as Async Download is a job but not necessarily a tool
import { ToolsState } from '../../tools/state/toolsInitialState';

type Listener = () => void;

export const jobsSharedWorker = window.SharedWorker
  ? new SharedWorker(new URL('../workers/jobs.ts', import.meta.url))
  : null;

let listeners: Listener[] = [];
let state: ToolsState = null;

if (jobsSharedWorker) {
  jobsSharedWorker.port.onmessage = (e) => {
    state = e.data.state;
    console.log('Message received from worker', e);
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
