import { useEffect, useState } from 'react';
import ContextualHelpContainer from './ContextualHelpContainer';

import './styles/contextual-help.scss';

const ContextualHelpHandler = () => {
  const [articleId, setArticleId] = useState<string>();

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

  // TODO: return button and panel
  return articleId ? <ContextualHelpContainer articleId={articleId} /> : null;
};

export default ContextualHelpHandler;
