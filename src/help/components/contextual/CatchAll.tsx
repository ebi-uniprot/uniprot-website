import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router';

import { ContextualHelpContext } from '../../../shared/contexts/ContextualHelp';

const CatchAll = () => {
  const { pathname, search, hash } = useLocation();
  const { globalPathname, globalNavigate, onClose } = useContext(
    ContextualHelpContext
  );

  useEffect(() => {
    globalNavigate({ pathname, search, hash });
    if (pathname === globalPathname) {
      onClose('navigation');
    }
  }, [globalNavigate, globalPathname, hash, onClose, pathname, search]);

  return null;
};

export default CatchAll;
