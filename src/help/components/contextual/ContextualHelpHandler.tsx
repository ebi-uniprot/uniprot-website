import { useEffect } from 'react';

import './styles/contextual-help.scss';

const eventHandler = (event: MouseEvent) => {
  const element = event.target as HTMLElement;
  if (element.dataset.articleId) {
    console.log(element.dataset.articleId);
  }
};

const ContextualHelpHandler = () => {
  useEffect(() => {
    document.addEventListener('click', eventHandler);
    return () => {
      document.removeEventListener('click', eventHandler);
    };
  }, []);

  // TODO: return button and panel
  return null;
};

export default ContextualHelpHandler;
