import { render, fireEvent } from '@testing-library/react';
import InPageMessageHub from '../InPageMessageHub';
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
  test('it should render and call dismiss', () => {
    const onDismissFn = jest.fn();
    const { asFragment, getByRole } = render(
      <InPageMessageHub messages={messages} onDismiss={onDismissFn} />
    );
    const button = getByRole('button');
    fireEvent.click(button);
    expect(onDismissFn).toHaveBeenCalled();
    expect(asFragment()).toMatchSnapshot();
  });
});
