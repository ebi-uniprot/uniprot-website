import { v1 } from 'uuid';
import MessageManagerContainer from '../MessageManagerContainer';
import renderWithRedux from '../../../shared/__test-helpers__/RenderWithRedux';
import { MessageFormat, MessageLevel } from '../../types/messagesTypes';

const getState = ({
  content,
  format,
  locations = undefined,
  omitAndDeleteAtLocations = undefined,
}) => ({
  messages: {
    active: [
      {
        id: v1(),
        content,
        format,
        level: MessageLevel.INFO,
        locations,
        omitAndDeleteAtLocations,
      },
    ],
  },
});

describe('Message Manager component', () => {
  test('should show pop-up message', () => {
    const content = 'Pop-up message content';
    const { getByText } = renderWithRedux(<MessageManagerContainer />, {
      initialState: getState({ content, format: MessageFormat.POP_UP }),
    });
    const messageContent = getByText(content);
    expect(messageContent).toBeTruthy();
  });

  test('should show in-page message when location is not specified', () => {
    const content = 'In-page message content';
    const { getByText } = renderWithRedux(<MessageManagerContainer />, {
      initialState: getState({ content, format: MessageFormat.IN_PAGE }),
    });
    const messageContent = getByText(content);
    expect(messageContent).toBeTruthy();
  });

  test('should show in-page message when location is specified and the router is at that location', () => {
    const content = 'In-page message content';
    const { getByText } = renderWithRedux(<MessageManagerContainer />, {
      initialState: getState({
        content,
        format: MessageFormat.IN_PAGE,
        locations: ['UniProtKBResults'],
      }),
      route: '/uniprotkb?query=blah',
      path: '/uniprotkb',
    });
    const messageContent = getByText(content);
    expect(messageContent).toBeTruthy();
  });

  test('should not show in-page message when location is specified but the router is not at that location', () => {
    const content = 'In-page message content';
    const { queryByText } = renderWithRedux(<MessageManagerContainer />, {
      initialState: getState({
        content,
        format: MessageFormat.IN_PAGE,
        locations: ['UniProtKBResults'],
      }),
      route: '/',
      path: '/',
    });
    const messageContent = queryByText(content);
    expect(messageContent).toBeNull();
  });

  test('should delete and not show pop-up message when omitAndDeleteAtLocations is specified and the router is at that location', () => {
    const content = 'Pop-up message content';
    const { queryByText } = renderWithRedux(<MessageManagerContainer />, {
      initialState: getState({
        content,
        format: MessageFormat.POP_UP,
        omitAndDeleteAtLocations: ['Dashboard'],
      }),
      route: '/tool-dashboard',
      path: '/tool-dashboard',
    });
    const messageContent = queryByText(content);
    expect(messageContent).toBeNull();
  });
});
