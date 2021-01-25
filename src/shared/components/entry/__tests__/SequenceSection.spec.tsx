import { render } from '@testing-library/react';
import sequenceUIData from './__mocks__/sequenceUIData.json';
import SequenceSection from '../SequenceSection';

describe('SequenceSection component', () => {
  test('should render the SequenceSection properly and match snapshot', () => {
    const { asFragment } = render(
      <SequenceSection data={sequenceUIData['sequence']} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should return null when the provided object values are empty', () => {
    const { asFragment } = render(
      <SequenceSection data={{ thing: undefined }} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
