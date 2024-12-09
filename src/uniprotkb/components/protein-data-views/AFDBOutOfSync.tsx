import { useContext, useState, useCallback } from 'react';
import { flushSync } from 'react-dom';
import { Message, Button } from 'franklin-sites';

import cn from 'classnames';

import { AFDBOutOfSyncContext } from '../../../shared/contexts/AFDBOutOfSync';

const message =
  'Caution: This AlphaFold model was generated using a prior version of the UniProt sequence that differs from that now shown.';

export const AFDBOutOfSync = ({ modal }: { modal?: boolean }) => {
  const isAFDBOutOfSync = useContext(AFDBOutOfSyncContext);

  const [isModalClosed, setIsModalClosed] = useState(!modal);

  const handleClick = useCallback(() => {
    // view transitions not supported
    if (!document.startViewTransition) {
      setIsModalClosed(true);
      return;
    }

    // view transitions supported
    document.startViewTransition(() => {
      // OK to use flushSync in this case
      // https://developer.chrome.com/docs/web-platform/view-transitions/same-document#working_with_frameworks
      flushSync(() => {
        setIsModalClosed(true);
      });
    });
  }, []);

  if (!isAFDBOutOfSync) {
    return null;
  }

  return (
    <Message level="warning" className={cn({ 'af-modal': !isModalClosed })}>
      {isModalClosed ? (
        message
      ) : (
        <>
          <p>{message}</p>
          <Button onClick={handleClick}>I understand</Button>
        </>
      )}
    </Message>
  );
};
