import UniProtKBEntryConfig from '../../../../config/UniProtEntryConfig';
import EntrySection from '../../../../types/entrySection';

describe('HomologsSection ordering', () => {
  it('should appear directly after SimilarProteins in the entry config', () => {
    const sectionIds = UniProtKBEntryConfig.map(({ id }) => id);
    const similarProteinsIndex = sectionIds.indexOf(
      EntrySection.SimilarProteins
    );
    const homologsIndex = sectionIds.indexOf(EntrySection.Homologs);

    expect(similarProteinsIndex).toBeGreaterThanOrEqual(0);
    expect(homologsIndex).toBeGreaterThanOrEqual(0);
    expect(homologsIndex).toBe(similarProteinsIndex + 1);
  });
});
