import { render } from '@testing-library/react';

import sequenceUIData from '../../../../shared/components/entry/__tests__/__mocks__/sequenceUIData';
import { Sequence as SequenceType } from '../../../../shared/types/sequence';
import SequenceSection from '../SequenceSection';

describe('SequenceSection component', () => {
  it('should render the SequenceSection properly and match snapshot', () => {
    const { asFragment } = render(
      <SequenceSection
        accession="UPI000002DB1C"
        data={sequenceUIData.sequence as SequenceType}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
