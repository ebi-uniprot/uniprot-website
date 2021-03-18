import customRender from '../../../__test-helpers__/customRender';

import ObsoleteEntryPage from '../ObsoleteEntryPage';

import { InactiveEntryReason } from '../../../../uniprotkb/adapters/uniProtkbConverter';

import deletedEntryData from '../../../__mocks__/deletedEntryModelData.json';
import demergedEntryData from '../../../__mocks__/demergedEntryModelData.json';

describe('ObsoleteEntryPage component', () => {
  test('should render deleted page', () => {
    const { primaryAccession } = deletedEntryData;
    const { asFragment } = customRender(
      <ObsoleteEntryPage
        accession={primaryAccession}
        details={deletedEntryData.inactiveReason as InactiveEntryReason}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('should render demerged page', () => {
    const { primaryAccession } = demergedEntryData;
    const { asFragment } = customRender(
      <ObsoleteEntryPage
        accession={primaryAccession}
        details={demergedEntryData.inactiveReason as InactiveEntryReason}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
