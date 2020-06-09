import React, { FC, Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import { groupBy } from 'lodash-es';
import * as actions from '../state/messagesActions';
import { MessageType, MessageFormat } from '../types/messagesTypes';
import { RootAction, RootState } from '../../app/state/rootInitialState';
import InPageMessageHub from './InPageMessageHub';
import PopUpMessageHub from './PopupMessageHub';
import { Location } from '../../app/config/urls';
import { getLocationForPathname } from '../../shared/utils/url';

type MessageManagerContainerProps = {
  activeMessages: MessageType[];
  deleteMessage: (id: string) => void;
};

const MessageManager: FC<MessageManagerContainerProps> = ({
  activeMessages,
  deleteMessage,
}) => {
  // MessageManager is a part of the base layout and as this has been extracted from the page component
  // (eg HomePage, EntryPage,...) and we can't get the match path using react-router's withRouter. useLocation
  // provides paths and not a match pattern. Eg:
  //  useLocation.pathname: /uniprotkb/P05067/external-links
  //  useRouteMatch.path & match.path: /uniprotkb/:id/external-links
  // The getLocationForPathname will find the location by searching over LocationToPath in app/config/urls
  const { pathname } = useLocation();
  const currentLocation = getLocationForPathname(pathname) as Location;

  const {
    true: omitAndDeleteMessages = [],
    false: restActiveMessages = [],
  } = groupBy(
    activeMessages,
    ({ omitAndDeleteAtLocations = [] }) =>
      omitAndDeleteAtLocations &&
      omitAndDeleteAtLocations.includes(currentLocation)
  );

  useEffect(() => {
    omitAndDeleteMessages.forEach(({ id }) => {
      deleteMessage(id);
    });
  }, [deleteMessage, omitAndDeleteMessages]);

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
    <Fragment>
      <InPageMessageHub messages={inPageMessages} onDismiss={deleteMessage} />
      <PopUpMessageHub messages={popUpMessages} onDismiss={deleteMessage} />
    </Fragment>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    activeMessages: state.messages.active,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(
    {
      deleteMessage: (id: string) => actions.deleteMessage(id),
    },
    dispatch
  );

const MessageManagerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageManager);

export default MessageManagerContainer;
