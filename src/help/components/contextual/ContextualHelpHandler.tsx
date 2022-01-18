import { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Location, LocationToPath } from '../../../app/config/urls';
import ContextualHelpContainer from './ContextualHelpContainer';

import './styles/contextual-help.scss';

const ContextualHelpHandler = () => {
  const [articleId, setArticleId] = useState<string>();

  const isHelpResults = useRouteMatch(LocationToPath[Location.HelpResults]);
  const isHelpEntry = useRouteMatch(LocationToPath[Location.HelpEntry]);
  const isContact = useRouteMatch(LocationToPath[Location.Contact]);

  const shouldBeVisible = !isHelpResults && !isHelpEntry && !isContact;

  const eventHandler = (event: MouseEvent) => {
    const element = event.target as HTMLElement;
    if (element.dataset.articleId) {
      setArticleId(element.dataset.articleId);
    }
  };

  useEffect(() => {
    document.addEventListener('click', eventHandler);
    return () => {
      document.removeEventListener('click', eventHandler);
    };
  }, []);

  if (!shouldBeVisible) {
    return null;
  }

  // TODO: return button and panel
  return articleId ? <ContextualHelpContainer articleId={articleId} /> : null;
};

export default ContextualHelpHandler;
