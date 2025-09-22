import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';

import { needsReload } from '../../service-worker/reload-flag';

const useReloadApp = () => {
  const { pathname } = useLocation();

  // Initial pathname
  const pathnameRef = useRef(pathname);

  useEffect(() => {
    // If flag for "needs reload" has been set to true
    // and, whenever the current path changes
    if (needsReload.current && pathname !== pathnameRef.current) {
      window.location.reload();
    } else {
      // Otherwise just keep storing the current pathname
      pathnameRef.current = pathname;
    }
  }, [pathname]);
};

export default useReloadApp;
