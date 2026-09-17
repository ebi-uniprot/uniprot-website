import externalUrls from '../externalUrls';

describe('CommunityCuratedGetByAccession', () => {
  it('should link to the accession when no citation ID is given', () => {
    expect(externalUrls.CommunityCuratedGetByAccession('P05067')).toBe(
      'https://community.uniprot.org/bbsub/bbsubinfo.html?accession=P05067'
    );
  });

  it('should link to the specific publication for a PubMed ID', () => {
    expect(
      externalUrls.CommunityCuratedGetByAccession('P05067', '12345678')
    ).toBe(
      'https://community.uniprot.org/bbsub/bbsubinfo.html?accession=P05067&pmid=12345678'
    );
  });

  it.each(['CI-1234ABCD5', 'IND1234567', ''])(
    'should ignore the non-PubMed citation ID %s',
    (citationId) => {
      expect(
        externalUrls.CommunityCuratedGetByAccession('P05067', citationId)
      ).toBe(
        'https://community.uniprot.org/bbsub/bbsubinfo.html?accession=P05067'
      );
    }
  );
});
