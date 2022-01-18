import customRender from '../../../shared/__test-helpers__/customRender';
import EvidenceLink, {
  formatEvidenceContent,
  getEvidenceLink,
} from '../evidenceUrls';

describe('Evidence urls', () => {
  describe('getEvidenceLink', () => {
    it('should generate the correct internal link', () => {
      const { url, isInternal } = getEvidenceLink('ARBA', 'rule_id');
      expect(isInternal).toBeTruthy();
      expect(url).toBe('/arba/rule_id');
    });

    it('should generate the correct external link', () => {
      const { url, isInternal } = getEvidenceLink('Ensembl', 'rule_id');
      expect(isInternal).toBeFalsy();
      expect(url).toBe('https://www.ensembl.org/id/rule_id');
    });
  });

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

  describe('formatEvidenceContent', () => {
    it('should correctly identify different types of rules', () => {
      expect(formatEvidenceContent('ARBA12345678')).toBe('ARBA: ARBA12345678');
      expect(formatEvidenceContent('MF_12345')).toBe(
        'UniRule HAMAP-Rule: MF_12345'
      );
      expect(formatEvidenceContent('RU123456')).toBe(
        'UniRule RuleBase: RU123456'
      );
      expect(formatEvidenceContent('PIRNR123')).toBe('UniRule PIRNR: PIRNR123');
      expect(formatEvidenceContent('PIRSR123')).toBe('UniRule PIRSR: PIRSR123');
      expect(formatEvidenceContent('PRU12345')).toBe(
        'UniRule PROSITE-ProRule: PRU12345'
      );
    });
  });
});
