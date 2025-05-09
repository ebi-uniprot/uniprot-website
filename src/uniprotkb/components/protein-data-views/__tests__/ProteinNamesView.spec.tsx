import customRender from '../../../../shared/__test-helpers__/customRender';
import ProteinNamesUIData from '../../__mocks__/proteinNamesUIData';
import EntryProteinNames from '../ProteinNamesView';

describe('ProteinNames', () => {
  it('should render protein_name', () => {
    const { asFragment } = customRender(
      <EntryProteinNames proteinNames={ProteinNamesUIData} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
