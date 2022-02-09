import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { groupBy } from 'lodash-es';

import MessageHub from './MessageHub';

import { deleteMessage } from '../state/messagesActions';

import { getLocationForPathname } from '../../shared/utils/url';

import { MessageFormat } from '../types/messagesTypes';
import { RootState } from '../../app/state/rootInitialState';
import { Location } from '../../app/config/urls';

import styles from './styles/popup-message-hub.module.scss';

const MessageManager = () => {
  // MessageManager is a part of the base layout and as this has been extracted from the page component
  // (eg HomePage, EntryPage,...) and we can't get the match path using react-router's withRouter. useLocation
  // provides paths and not a match pattern. Eg:
  //  useLocation.pathname: /uniprotkb/P05067/external-links
  //  useRouteMatch.path & match.path: /uniprotkb/:id/external-links
  // The getLocationForPathname will find the location by searching over LocationToPath in app/config/urls
  const { pathname } = useLocation();
  const currentLocation = getLocationForPathname(pathname) as Location;
  const dispatch = useDispatch();
  const activeMessages = useSelector((state: RootState) => state.messages);
  const { true: omitAndDeleteMessages = [], false: restActiveMessages = [] } =
    groupBy(
      activeMessages,
      ({ omitAndDeleteAtLocations = [] }) =>
        !!omitAndDeleteAtLocations &&
        omitAndDeleteAtLocations.length > 0 &&
        omitAndDeleteAtLocations.includes(currentLocation)
    );

  useEffect(() => {
    for (const { id } of omitAndDeleteMessages) {
      dispatch(deleteMessage(id));
    }
  }, [dispatch, omitAndDeleteMessages]);

  const filteredActiveMessages = restActiveMessages.filter(
    ({ locations }) =>
      // if no locations in the message object then show it everywhere or if locations exists only where indicated
      !locations || locations.includes(currentLocation)
  );

  const {
    [MessageFormat.IN_PAGE]: inPageMessages = [],
    [MessageFormat.POP_UP]: popUpMessages = [],
  } = groupBy(filteredActiveMessages, ({ format }) => format);

  return (
    <>
      <MessageHub messages={inPageMessages} />
      {popUpMessages.length ? (
        <MessageHub
          messages={popUpMessages}
          className={styles['popup-message-container']}
        />
      ) : null}
    </>
  );
};

export default MessageManager;
