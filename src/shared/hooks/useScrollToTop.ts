import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';

import baseLayoutStyles from '../components/layouts/styles/base-layout.module.scss';

const useScrollToTop = () => {
  const { pathname } = useLocation();

  // Store initial pathname
  const previousPathname = useRef(pathname);

  // Everytime pathname changes
  useEffect(() => {
    // If it is different (it should be if we arrived here)
    if (previousPathname.current !== pathname) {
      // Scroll to the top of the main content...
      document
        .querySelector(`.${baseLayoutStyles['main-content']}`)
        ?.scrollTo(0, 0);
      // ... and store the current pathname as the previous one for next time
      previousPathname.current = pathname;
    }
  }, [pathname]);
};

export default useScrollToTop;
