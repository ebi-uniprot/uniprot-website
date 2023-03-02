import { useEffect } from 'react';
import { History } from 'history';

import baseLayoutStyles from '../components/layouts/styles/base-layout.module.scss';

const useScrollToTop = (history: History) => {
  useEffect(() => {
    let previousPathname = history.location.pathname;
    const unlisten = history.listen((location) => {
      if (previousPathname !== location.pathname) {
        document
          .querySelector(`.${baseLayoutStyles['main-content']}`)
          ?.scrollTo(0, 0);
      }
      previousPathname = location.pathname;
    });

    return () => {
      unlisten();
    };
  }, [history]);
};

export default useScrollToTop;
