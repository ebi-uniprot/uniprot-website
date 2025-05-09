import { History } from 'history';
import { useEffect } from 'react';

import { needsReload } from '../../service-worker/reload-flag';

const useReloadApp = (history: History) => {
  useEffect(() => {
    let previousPathname = history.location.pathname;
    const unlisten = history.listen((location) => {
      // if the path changes, and the app needs a reload
      if (previousPathname !== location.pathname && needsReload.current) {
        window.location.reload();
      }
      previousPathname = location.pathname;
    });

    return () => {
      unlisten();
    };
  }, [history]);
};

export default useReloadApp;
