import { useCallback, useEffect, useState } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';

import ContextualHelpContainer from './ContextualHelpContainer';

import useMatchMedia from '../../../shared/hooks/useMatchMedia';

import {
  getLocationEntryPath,
  Location,
  LocationToPath,
} from '../../../app/config/urls';

const ContextualHelpHandler = () => {
  const history = useHistory();
  const [articleId, setArticleId] = useState<string | null>(null);
  // Needs to match the height value in the contextual-help stylesheet
  const smallScreen = useMatchMedia('only screen and (max-height: 35em)');

  const isHelpResults = useRouteMatch(LocationToPath[Location.HelpResults]);
  const isHelpEntry = useRouteMatch(LocationToPath[Location.HelpEntry]);
  const isContact = useRouteMatch(LocationToPath[Location.Contact]);

  const shouldBeVisible =
    !isHelpResults && !isHelpEntry && !isContact && !smallScreen;

  useEffect(() => {
    const eventHandler = (event: MouseEvent) => {
      const element = event.target as HTMLElement;
      if (element.dataset.articleId) {
        if (smallScreen) {
          history.push(
            getLocationEntryPath(Location.HelpEntry, element.dataset.articleId)
          );
        } else {
          setArticleId(element.dataset.articleId);
        }
      }
    };

    document.addEventListener('click', eventHandler, { passive: true });

    return () => {
      document.removeEventListener('click', eventHandler);
    };
  }, [history, smallScreen]);

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
