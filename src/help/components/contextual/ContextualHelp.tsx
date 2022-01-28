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
  const [articlePath, setArticlePath] = useState<string | undefined>(undefined);
  const [displayButton, setDisplayButton] = useState<boolean | undefined>();
  // Needs to match the height value in the contextual-help stylesheet
  const smallScreen = useMatchMedia('only screen and (max-height: 35em)');

  const isHelpResults = useRouteMatch(LocationToPath[Location.HelpResults]);
  const isGenericContact = useRouteMatch(
    LocationToPath[Location.ContactGeneric]
  );
  const isUpdateContact = useRouteMatch(LocationToPath[Location.ContactUpdate]);

  const shouldBeVisible =
    !isHelpResults && !isGenericContact && !isUpdateContact && !smallScreen;

  useEffect(() => {
    // Make sure to reset the button when in pages without contextual help
    if (!shouldBeVisible) {
      setDisplayButton(true);
    }
  }, [shouldBeVisible]);

  useEffect(() => {
    const eventHandler = (event: MouseEvent) => {
      const element = event.target as HTMLElement;
      if (element.dataset.articleId) {
        if (element.dataset.articleId.match(/^http(s?)/)) {
          // External link, open in new window
          window.open(element.dataset.articleId, 'external_help');
        } else if (smallScreen) {
          history.push(
            getLocationEntryPath(Location.HelpEntry, element.dataset.articleId)
          );
        } else {
          setArticlePath(element.dataset.articleId);
          setDisplayButton(false);
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
      setArticlePath(undefined);
      setDisplayButton(true);
    }
  }, []);

  const handleButtonClick = useCallback<MouseEventHandler<HTMLAnchorElement>>(
    (event) => {
      if (event.metaKey || event.ctrlKey) {
        return; // default behaviour of opening a new tab
      }
      event.preventDefault();
      setDisplayButton(false);
    },
    []
  );

  useEffect(() => {
    frame().then(() => {
      // To trigger the animation, we switch the classname after first render
      setDisplayButton(true);
    });
  }, []);

  return (
    <>
      {displayButton === false && shouldBeVisible && (
        <ContextualHelpContainer
          articlePath={articlePath}
          onClose={handleClose}
        />
      )}
      <SideButtons
        displayHelp={shouldBeVisible && !!displayButton && !smallScreen}
        onClick={handleButtonClick}
      />
    </>
  );
};

export default ContextualHelp;
