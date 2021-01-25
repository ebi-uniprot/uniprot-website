import { render, fireEvent } from '@testing-library/react';
import PopupMessageHub from '../PopupMessageHub';
import { MessageFormat, MessageLevel } from '../../types/messagesTypes';

const messages = [
  {
    id: 'msg1',
    content: 'lorem',
    format: MessageFormat.POP_UP,
    level: MessageLevel.INFO,
  },
];

describe('PopupMessageHub tests', () => {
  test('it should render and call dismiss', () => {
    const onDismissFn = jest.fn();
    const { asFragment, getByRole } = render(
      <PopupMessageHub messages={messages} onDismiss={onDismissFn} />
    );
    const button = getByRole('button');
    fireEvent.click(button);
    expect(onDismissFn).toHaveBeenCalled();
    expect(asFragment()).toMatchSnapshot();
  });
});
