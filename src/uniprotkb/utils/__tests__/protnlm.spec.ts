import { includeOnlyItemsWithEvidences } from '../protnlm';
import A0A059Q8K8WithEvidences from './__mocks__/protnlm_A0A059Q8K8_with_evidences';
import A0A059Q8K8WithoutEvidences from './__mocks__/protnlm_A0A059Q8K8_without_evidences';

describe('filterEvidences', () => {
  it('should return an object which has only items with evidences', () => {
    expect(includeOnlyItemsWithEvidences(A0A059Q8K8WithEvidences)).toEqual({
      proteinDescription: {
        recommendedName: {
          fullName: {
            evidences: [
              {
                evidenceCode: 'ECO:0008006',
                source: 'Google',
                id: 'ProtNLM2',
                properties: [
                  {
                    key: 'model_score',
                    value: '0.56',
                  },
                  {
                    key: 'exact_match_sanitized_to_all_2023_04',
                    value: null,
                  },
                  {
                    key: 'exact_match_sanitized_to_all_2025_01',
                    value: null,
                  },
                ],
              },
            ],
            value: 'WRKY domain-containing protein',
          },
        },
      },
    });
  });
  it('should return an object which has only items with evidences', () => {
    expect(includeOnlyItemsWithEvidences(A0A059Q8K8WithoutEvidences)).toEqual(
      null
    );
  });
});
