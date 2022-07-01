import { useEffect } from 'react';
import { History } from 'history';

const useScrollToTop = (history: History) => {
  useEffect(() => {
    let previousPathname = history.location.pathname;
    const unlisten = history.listen((location) => {
      if (previousPathname !== location.pathname) {
        window.scrollTo(0, 0);
        try {
          gtag('set', 'page_path', location.pathname);
          gtag('event', 'page_view');
        } catch {
          /* */
        }
      }
      previousPathname = location.pathname;
    });

    return () => {
      unlisten();
    };
  }, [history]);
};

export default useScrollToTop;
