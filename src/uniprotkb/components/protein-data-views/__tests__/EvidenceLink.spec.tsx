import customRender from '../../../../shared/__test-helpers__/customRender';
import EvidenceLink from '../EvidenceLink';

describe('EvidenceLink', () => {
  it('should not return anything if no value', () => {
    const { container } = customRender(<EvidenceLink source="Ensembl" />);
    expect(container).toBeEmptyDOMElement();
  });
  it('should return the correct internal link JSX', () => {
    const { asFragment } = customRender(
      <EvidenceLink source="ARBA" value="rule_id" />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should return the correct external link JSX', () => {
    const { asFragment } = customRender(
      <EvidenceLink source="Ensembl" value="rule_id" />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should return a plain value if unknown source', () => {
    const { asFragment } = customRender(
      <EvidenceLink source="<Unknown source>" value="rule_id" />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
