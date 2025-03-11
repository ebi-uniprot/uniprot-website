import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react';

type Listener = () => void;
function useJobState() {
  const [state, setState] = useState();
  const listeners = useRef<Listener[]>([]);

  useEffect(() => {
    if (!window.SharedWorker) {
      console.warn('SharedWorker is not supported in this browser.');
      return;
    }
    const myWorker = new SharedWorker(
      new URL('../workers/tools.ts', import.meta.url)
    );

    myWorker.port.onmessage = (e) => {
      setState(e.data.state);
      console.log('Message received from worker', e);
    };

    // myWorker.port.onerror = (error) => {
    //   console.error('Worker error:', error);
    // };

    // Close port on cleanup
    return () => {
      myWorker.port.close();
    };
  }, []);

  const subscribe = useMemo(
    () => (listener: Listener) => {
      listeners.current.push(listener);
      // Remove listener on cleanup
      return () => {
        listeners.current = listeners.current.filter((l) => l !== listener);
      };
    },
    []
  );

  const getSnapshot = useMemo(() => {
    return () => state;
  }, [state]);

  // Whenever state changes, notify subscribers
  useEffect(() => {
    listeners.current.forEach((listener) => listener());
  }, [state]);

  const store = useSyncExternalStore(subscribe, getSnapshot);
  return store;
}

export default useJobState;
