import React, { FC, Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { v1 } from 'uuid';
import { bindActionCreators, Dispatch } from 'redux';
import { groupBy } from 'lodash';
import * as actions from './state/messagesActions';
import {
  MessageType,
  MessageFormat,
  MessageLevel,
} from './types/messagesTypes';
import { RootAction, RootState } from '../state/state-types';
import InPageMessageHub from './components/InPageMessageHub';
import PopUpMessageHub from './components/PopupMessageHub';
import { Location, PathToLocation } from '../urls';

type MessageManagerContainerProps = {
  activeMessages: MessageType[];
  deletedMessages: { [id: string]: boolean };
  deleteMessage: (id: string) => void;
  addMessage: (message: MessageType) => void;
} & RouteComponentProps;

const MessageManager: FC<MessageManagerContainerProps> = ({
  activeMessages,
  deleteMessage,
  addMessage,
  match: { path },
}) => {
  let {
    [MessageFormat.IN_PAGE]: inPageMessages,
    [MessageFormat.POP_UP]: popUpMessages,
  } = groupBy(activeMessages, ({ format }) => format);

  console.log(activeMessages, inPageMessages, popUpMessages);

  // Temporary add messages to test pop ups are working
  useEffect(() => {
    const interval = setInterval(() => {
      addMessage({
        id: v1(),
        content: `New message ${v1()}`,
        format: MessageFormat.POP_UP,
        level: MessageLevel.INFO,
      });
    }, 10000);
    return () => clearInterval(interval);
  }, [addMessage]);

  const currentLocation = PathToLocation.get(path as Location);
  inPageMessages = inPageMessages.filter(
    ({ locations }) =>
      !locations || // if not locations in the message then show it everywhere
      (locations && currentLocation && locations.includes(currentLocation))
  );

  return (
    <Fragment>
      <InPageMessageHub
        messages={inPageMessages}
        handleDismiss={deleteMessage}
      />
      <PopUpMessageHub messages={popUpMessages} onDismiss={deleteMessage} />
    </Fragment>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    activeMessages: state.messages.active,
    deletedMessages: state.messages.deleted,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(
    {
      deleteMessage: (id: string) => actions.deleteMessage(id),
      addMessage: (message: MessageType) => actions.addMessage(message),
    },
    dispatch
  );

const MessageManagerContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MessageManager)
);

export default MessageManagerContainer;
