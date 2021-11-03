/**
 * @jest-environment node
 */
import { getEvidenceCodeData } from '../../config/evidenceCodes';

describe('Evidence codes', () => {
  beforeAll(() => {
    // eslint-disable-next-line no-console
    console.warn = jest.fn();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  test('should get correct data', () => {
    const data = getEvidenceCodeData(7005);
    expect(data).toHaveProperty('label');
  });

  test('should return null', () => {
    const data = getEvidenceCodeData(0);
    expect(data).toBeNull();
  });
});
