import { formatEvidenceContent, getEvidenceLink } from '../evidenceUrls';

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
      expect(formatEvidenceContent('abcd', 'source')).toBe('source: abcd');
    });
  });
});
