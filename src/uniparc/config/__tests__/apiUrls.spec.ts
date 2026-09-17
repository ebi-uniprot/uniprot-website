import apiUrls from '../apiUrls';

describe('uniparc apiUrls.precomputedProteomeAnnotations', () => {
  const upId = 'UP000005640';

  it('builds stream + compressed + download URL', () => {
    expect(
      apiUrls.precomputedProteomeAnnotations(upId, {
        stream: true,
        compressed: true,
        download: true,
      })
    ).toBe(
      '/<testing>/api/uniprotkb/precomputed/proteome/UP000005640/stream?compressed=true&download=true'
    );
  });

  it('builds plain stream URL', () => {
    expect(
      apiUrls.precomputedProteomeAnnotations(upId, {
        stream: true,
      })
    ).toBe('/<testing>/api/uniprotkb/precomputed/proteome/UP000005640/stream');
  });

  it('builds paginated URL with size=10', () => {
    expect(
      apiUrls.precomputedProteomeAnnotations(upId, {
        size: 10,
      })
    ).toBe('/<testing>/api/uniprotkb/precomputed/proteome/UP000005640?size=10');
  });

  it('builds paginated URL with size=0 for HEAD probe', () => {
    expect(
      apiUrls.precomputedProteomeAnnotations(upId, {
        size: 0,
      })
    ).toBe('/<testing>/api/uniprotkb/precomputed/proteome/UP000005640?size=0');
  });
});
