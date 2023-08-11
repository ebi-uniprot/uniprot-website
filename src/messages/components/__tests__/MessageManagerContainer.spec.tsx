import { screen } from '@testing-library/react';

import MessageManagerContainer from '../MessageManagerContainer';

import customRender from '../../../shared/__test-helpers__/customRender';

import { Location } from '../../../app/config/urls';
import {
  MessageFormat,
  MessageLevel,
  MessageType,
} from '../../types/messagesTypes';
import { MessagesState } from '../../state/messagesInitialState';

const getState = ({
  content,
  format,
  locations = undefined,
  omitAndDeleteAtLocations = undefined,
}: Pick<
  MessageType,
  'content' | 'format' | 'locations' | 'omitAndDeleteAtLocations'
>): MessagesState => ({
  'message-id': {
    id: 'message-id',
    content,
    format,
    level: MessageLevel.INFO,
    locations,
    omitAndDeleteAtLocations,
  },
});

describe('Message Manager component', () => {
  it('should show pop-up message', () => {
    const content = 'Pop-up message content';
    customRender(<MessageManagerContainer />, {
      messagesState: getState({ content, format: MessageFormat.POP_UP }),
    });
    const messageContent = screen.getByText(content);
    expect(messageContent).toBeInTheDocument();
  });

  it('should show in-page message when location is not specified', () => {
    const content = 'In-page message content';
    customRender(<MessageManagerContainer />, {
      messagesState: getState({ content, format: MessageFormat.IN_PAGE }),
    });
    const messageContent = screen.getByText(content);
    expect(messageContent).toBeInTheDocument();
  });

  it('should show in-page message when location is specified and the router is at that location', () => {
    const content = 'In-page message content';
    customRender(<MessageManagerContainer />, {
      messagesState: getState({
        content,
        format: MessageFormat.IN_PAGE,
        locations: [Location.UniProtKBResults],
      }),
      route: '/uniprotkb?=query=blah',
      path: '/uniprotkb',
    });
    const messageContent = screen.getByText(content);
    expect(messageContent).toBeInTheDocument();
  });

  it('should not show in-page message when location is specified but the router is not at that location', () => {
    const content = 'In-page message content';
    customRender(<MessageManagerContainer />, {
      messagesState: getState({
        content,
        format: MessageFormat.IN_PAGE,
        locations: [Location.UniProtKBResults],
      }),
      route: '/',
      path: '/',
    });
    const messageContent = screen.queryByText(content);
    expect(messageContent).not.toBeInTheDocument();
  });

  it('should delete and not show pop-up message when omitAndDeleteAtLocations is specified and the router is at that location', () => {
    const content = 'Pop-up message content';
    customRender(<MessageManagerContainer />, {
      messagesState: getState({
        content,
        format: MessageFormat.POP_UP,
        omitAndDeleteAtLocations: [Location.Dashboard],
      }),
      route: '/tool-dashboard',
      path: '/tool-dashboard',
    });
    const messageContent = screen.queryByText(content);
    expect(messageContent).not.toBeInTheDocument();
  });
});
