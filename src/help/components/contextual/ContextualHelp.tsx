import { MouseEventHandler, useCallback, useEffect, useState } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { frame } from 'timing-functions';

import ContextualHelpContainer from './ContextualHelpContainer';
import SideButtons from './SideButtons';

import useMatchMedia from '../../../shared/hooks/useMatchMedia';

import {
  getLocationEntryPath,
  Location,
  LocationToPath,
} from '../../../app/config/urls';

const ContextualHelp = () => {
  const history = useHistory();
  const [articleId, setArticleId] = useState<string | undefined>(undefined);
  const [displayButton, setDisplayButton] = useState(false);
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
          setDisplayButton(false);
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
      setArticleId(undefined);
      setDisplayButton(true);
    }
  }, []);

  const handleButtonClick = useCallback<
    MouseEventHandler<HTMLButtonElement>
  >(() => {
    setDisplayButton(false);
  }, []);

  useEffect(() => {
    frame().then(() => {
      // To trigger the animation, we switch the classname after first render
      setDisplayButton(true);
    });
  }, []);

  // TODO: return button and panel
  // Probably shouldn't rely on articleId to display panel
  return (
    <>
      {!displayButton && shouldBeVisible && (
        <ContextualHelpContainer articleId={articleId} onClose={handleClose} />
      )}
      <SideButtons
        displayHelp={shouldBeVisible && displayButton && !smallScreen}
        onClick={handleButtonClick}
      />
    </>
  );
};

export default ContextualHelp;
