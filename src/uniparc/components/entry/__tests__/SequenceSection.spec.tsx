import { render } from '@testing-library/react';

import SequenceSection from '../SequenceSection';

import { Sequence as SequenceType } from '../../../../shared/types/sequence';

import sequenceUIData from '../../../../shared/components/entry/__tests__/__mocks__/sequenceUIData';

describe('SequenceSection component', () => {
  it('should render the SequenceSection properly and match snapshot', () => {
    const { asFragment } = render(
      <SequenceSection data={sequenceUIData.sequence as SequenceType} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
