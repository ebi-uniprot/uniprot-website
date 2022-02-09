import customRender from '../../../shared/__test-helpers__/customRender';

import MessageHub from '../MessageHub';

import { MessageFormat, MessageLevel } from '../../types/messagesTypes';

const messages = [
  {
    id: 'msg1',
    content: 'in page message',
    format: MessageFormat.IN_PAGE,
    level: MessageLevel.INFO,
  },
];

describe('InPageMessageHub tests', () => {
  it('should render', () => {
    const { asFragment } = customRender(<MessageHub messages={messages} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
