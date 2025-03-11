import { useSyncExternalStore } from 'react';

import { ToolsState } from '../../tools/state/toolsInitialState';

type Listener = () => void;

const worker = window.SharedWorker
  ? new SharedWorker(new URL('../workers/tools.ts', import.meta.url))
  : null;

let listeners: Listener[] = [];
let state: ToolsState = null;

if (worker) {
  worker.port.onmessage = (e) => {
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
