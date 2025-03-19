import customRender from '../../../shared/__test-helpers__/customRender';
import { MessageFormat, MessageLevel } from '../../types/messagesTypes';
import MessageHub from '../MessageHub';

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
