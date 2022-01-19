import { useCallback, useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';

import ContextualHelpContainer from './ContextualHelpContainer';

import { Location, LocationToPath } from '../../../app/config/urls';

const ContextualHelpHandler = () => {
  const [articleId, setArticleId] = useState<string | null>(null);

  const isHelpResults = useRouteMatch(LocationToPath[Location.HelpResults]);
  const isHelpEntry = useRouteMatch(LocationToPath[Location.HelpEntry]);
  const isContact = useRouteMatch(LocationToPath[Location.Contact]);

  const shouldBeVisible = !isHelpResults && !isHelpEntry && !isContact;

  useEffect(() => {
    const eventHandler = (event: MouseEvent) => {
      const element = event.target as HTMLElement;
      if (element.dataset.articleId) {
        setArticleId(element.dataset.articleId);
      }
    };

    document.addEventListener('click', eventHandler, { passive: true });

    return () => {
      document.removeEventListener('click', eventHandler);
    };
  }, []);

  const handleClose = useCallback<
    (reason: 'outside' | 'button' | 'navigation' | 'escape') => void
  >((reason) => {
    if (reason !== 'outside') {
      setArticleId(null);
    }
  }, []);

  if (!shouldBeVisible) {
    return null;
  }

  // TODO: return button and panel
  // Probably shouldn't rely on articleId to display panel
  return articleId ? (
    <ContextualHelpContainer articleId={articleId} onClose={handleClose} />
  ) : null;
};

export default ContextualHelpHandler;
