import { screen } from '@testing-library/react';

import customRender from '../../../../shared/__test-helpers__/customRender';
import EntrySection from '../../../types/entrySection';
import CommunityCurated, {
  groupByCommunityAnnotation,
} from '../CommunityCurated';
import mock from './__mocks__/communityCuratedData';

describe('Community annotatation', () => {
  it('should render the community annotation content', async () => {
    const { asFragment } = customRender(
      <CommunityCurated
        accession="Q95PB5"
        section={EntrySection.NamesAndTaxonomy}
        communityReferences={mock}
      />
    );
    expect(await screen.findByText(/Spike glycoprotein/)).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('groupByCommunityAnnotation', () => {
  it('should group by community annotation and sort all references by submission date and then sort all annotations by latest reference submission date', () => {
    expect(
      Array.from(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        groupByCommunityAnnotation(EntrySection.NamesAndTaxonomy, mock)!
      ).map(([annotation, references]) => [
        annotation,
        references.map((r) => r.communityAnnotation?.submissionDate),
      ])
    ).toEqual([
      ['Spike glycoprotein; S.', ['2023-06-28']],
      [
        'S',
        [
          '2023-05-28',
          '2023-05-28',
          '2023-05-28',
          '2022-01-28',
          '2021-12-28',
          undefined,
        ],
      ],
      ['Spike S.', ['2022-01-05']],
    ]);
  });
});
