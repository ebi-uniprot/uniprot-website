import renderWithRedux from '../../../__test-helpers__/RenderWithRedux';

import ObsoleteEntryPage from '../ObsoleteEntryPage';

import { InactiveEntryReason } from '../../../../uniprotkb/adapters/uniProtkbConverter';

import deletedEntryData from '../../../../shared/__mocks__/deletedEntryModelData.json';
import demergedEntryData from '../../../../shared/__mocks__/demergedEntryModelData.json';

describe('ObsoleteEntryPage component', () => {
  test('should render deleted page', () => {
    const { primaryAccession } = deletedEntryData;
    const { asFragment } = renderWithRedux(
      <ObsoleteEntryPage
        accession={primaryAccession}
        details={deletedEntryData.inactiveReason as InactiveEntryReason}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('should render demerged page', () => {
    const { primaryAccession } = demergedEntryData;
    const { asFragment } = renderWithRedux(
      <ObsoleteEntryPage
        accession={primaryAccession}
        details={demergedEntryData.inactiveReason as InactiveEntryReason}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
