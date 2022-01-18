import { useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Location, LocationToPath } from '../../../app/config/urls';

import './styles/contextual-help.scss';

const eventHandler = (event: MouseEvent) => {
  const element = event.target as HTMLElement;
  if (element.dataset.articleId) {
    console.log(element.dataset.articleId);
  }
};

const ContextualHelpHandler = () => {
  const isHelpResults = useRouteMatch(LocationToPath[Location.HelpResults]);
  const isHelpEntry = useRouteMatch(LocationToPath[Location.HelpEntry]);
  const isContact = useRouteMatch(LocationToPath[Location.Contact]);

  const shouldBeVisible = !isHelpResults && !isHelpEntry && !isContact;

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
  return null;
};

export default ContextualHelpHandler;
