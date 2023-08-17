import customRender from '../../../../shared/__test-helpers__/customRender';

import EntryProteinNames from '../ProteinNamesView';

import ProteinNamesUIData from '../../__mocks__/proteinNamesUIData';

describe('ProteinNames', () => {
  it('should render protein_name', () => {
    const { asFragment } = customRender(
      <EntryProteinNames proteinNames={ProteinNamesUIData} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
