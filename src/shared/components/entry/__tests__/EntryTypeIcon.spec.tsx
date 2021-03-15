import { render } from '@testing-library/react';

import EntryTypeIcon, { EntryType } from '../EntryTypeIcon';

describe('EntryTypeIcon', () => {
  it('should return the correct icon if input is EntryType', () => {
    const { asFragment } = render(
      <EntryTypeIcon entryType={EntryType.REVIEWED} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should return the correct icon if input is a string', () => {
    const { asFragment } = render(<EntryTypeIcon entryType="unreviewed" />);
    expect(asFragment()).toMatchSnapshot();
  });
});
